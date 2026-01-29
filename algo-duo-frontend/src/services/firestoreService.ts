import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  increment,
  Unsubscribe,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase.ts';
import { UserProfile } from '../types/firestore';

// Level-up logic driven by centralized thresholds
import { getLevelForXP, getLevelBounds } from '../utils/xp.ts';

export const calculateLevel = (totalXP: number): number => {
  return getLevelForXP(totalXP);
};

export const getXPForNextLevel = (currentXP: number): number => {
  const level = getLevelForXP(currentXP);
  const { nextXP } = getLevelBounds(level);
  return nextXP ?? Infinity;
};

export const getCurrentLevelProgress = (totalXP: number): { currentLevelXP: number; xpToNextLevel: number } => {
  const level = getLevelForXP(totalXP);
  const { startXP, nextXP } = getLevelBounds(level);
  const currentLevelXP = Math.max(0, totalXP - startXP);
  const xpToNextLevel = nextXP == null ? 0 : Math.max(0, nextXP - totalXP);
  return { currentLevelXP, xpToNextLevel };
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid,
        ...data,
        created_at: data.created_at?.toDate() || new Date(),
        updated_at: data.updated_at?.toDate() || new Date(),
      } as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Create a new user document with default values
 */
export const createUserProfile = async (uid: string, initialData?: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const defaultProfile: Omit<UserProfile, 'uid'> = {
      xp: 0,
      level: 1,
      topic_performance: {
        arrays: { correct: 0, total: 0, accuracy: 0 },
        strings: { correct: 0, total: 0, accuracy: 0 },
        linked_lists: { correct: 0, total: 0, accuracy: 0 },
        trees: { correct: 0, total: 0, accuracy: 0 },
        graphs: { correct: 0, total: 0, accuracy: 0 },
        dynamic_programming: { correct: 0, total: 0, accuracy: 0 },
        sorting: { correct: 0, total: 0, accuracy: 0 },
        searching: { correct: 0, total: 0, accuracy: 0 }
      },
      weak_areas: [],
      ai_recommendations: {
        suggested_topics: [],
        next_difficulty: 'easy',
        focus_areas: []
      },
      created_at: new Date(),
      updated_at: new Date(),
      ...initialData
    };

    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...defaultProfile,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    return {
      uid,
      ...defaultProfile
    };
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Update user XP and recalculate level
 */
export const updateXP = async (uid: string, deltaXP: number): Promise<{ newXP: number; newLevel: number; leveledUp: boolean }> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    const currentData = userSnap.data() as UserProfile;
    const oldXP = currentData.xp || 0;
    const oldLevel = currentData.level || 1;
    
    const newXP = Math.max(0, oldXP + deltaXP);
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > oldLevel;

    // Update user document
    await updateDoc(userRef, {
      xp: newXP,
      level: newLevel,
      updated_at: serverTimestamp()
    });

    console.log(`XP Update: ${oldXP} → ${newXP} (${deltaXP >= 0 ? '+' : ''}${deltaXP})`);
    if (leveledUp) {
      console.log(`🎉 Level Up! ${oldLevel} → ${newLevel}`);
    }

    return { newXP, newLevel, leveledUp };
  } catch (error) {
    console.error('Error updating XP:', error);
    throw error;
  }
};

/**
 * Update performance for a specific topic
 */
export const updatePerformance = async (uid: string, topic: string, correct: boolean): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    const currentData = userSnap.data() as UserProfile;
    const currentPerformance = currentData.topic_performance[topic] || { correct: 0, total: 0, accuracy: 0 };
    
    const newCorrect = currentPerformance.correct + (correct ? 1 : 0);
    const newTotal = currentPerformance.total + 1;
    const newAccuracy = Math.round((newCorrect / newTotal) * 100);

    await updateDoc(userRef, {
      [`topic_performance.${topic}`]: {
        correct: newCorrect,
        total: newTotal,
        accuracy: newAccuracy
      },
      updated_at: serverTimestamp()
    });

    // Update weak areas if accuracy drops below 60%
    if (newAccuracy < 60 && newTotal >= 3) {
      await addToWeakAreas(uid, topic);
    } else if (newAccuracy >= 80) {
      await removeFromWeakAreas(uid, topic);
    }

  } catch (error) {
    console.error('Error updating performance:', error);
    throw error;
  }
};

/**
 * Add topic to weak areas
 */
const addToWeakAreas = async (uid: string, topic: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data() as UserProfile;
      const weakAreas = currentData.weak_areas || [];
      
      if (!weakAreas.includes(topic)) {
        await updateDoc(userRef, {
          weak_areas: [...weakAreas, topic],
          updated_at: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error adding to weak areas:', error);
  }
};

/**
 * Remove topic from weak areas
 */
const removeFromWeakAreas = async (uid: string, topic: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentData = userSnap.data() as UserProfile;
      const weakAreas = currentData.weak_areas || [];
      
      if (weakAreas.includes(topic)) {
        await updateDoc(userRef, {
          weak_areas: weakAreas.filter(area => area !== topic),
          updated_at: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error removing from weak areas:', error);
  }
};

/**
 * Set up real-time listener for user data
 */
export const subscribeToUserData = (uid: string, callback: (userData: UserProfile | null) => void): Unsubscribe => {
  const userRef = doc(db, 'users', uid);
  
  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData: UserProfile = {
        uid,
        ...data,
        created_at: data.created_at?.toDate() || new Date(),
        updated_at: data.updated_at?.toDate() || new Date(),
      } as UserProfile;
      
      callback(userData);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error in user data subscription:', error);
    callback(null);
  });
};

/**
 * Get or create user profile
 */
export const getOrCreateUserProfile = async (uid: string, initialData?: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    let userData = await getUserData(uid);
    
    if (!userData) {
      console.log('Creating new user profile for:', uid);
      userData = await createUserProfile(uid, initialData);
    }
    
    return userData;
  } catch (error) {
    console.error('Error getting or creating user profile:', error);
    throw error;
  }
};

// ==================== LEGACY FUNCTIONS FROM firestore.ts ====================

/**
 * Save new user (from auth) - creates profile if doesn't exist
 * Legacy function from firestore.ts for compatibility
 */
export const saveNewUser = async (user: any) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const userData = {
      uid: user.uid,
      name: user.displayName || 'Anonymous',
      email: user.email,
      photoURL: user.photoURL,
      xp: 0,
      level: 1,
      streak: {
        current: 0,
        longest: 0,
        lastLoginDate: new Date().toISOString()
      },
      progress: {
        completedLessons: [],
        currentLesson: null
      },
      topic_performance: {
        arrays: { correct: 0, total: 0, accuracy: 0 },
        strings: { correct: 0, total: 0, accuracy: 0 },
        linked_lists: { correct: 0, total: 0, accuracy: 0 },
        trees: { correct: 0, total: 0, accuracy: 0 },
        graphs: { correct: 0, total: 0, accuracy: 0 },
        dynamic_programming: { correct: 0, total: 0, accuracy: 0 },
        sorting: { correct: 0, total: 0, accuracy: 0 },
        searching: { correct: 0, total: 0, accuracy: 0 }
      },
      weak_areas: [],
      ai_recommendations: {
        suggested_topics: [],
        next_difficulty: 'easy',
        focus_areas: []
      },
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      lastLogin: serverTimestamp()
    };

    await setDoc(userRef, userData);
    return userData;
  }

  return userDoc.data();
};

/**
 * Update user progress for a lesson
 */
export const updateUserProgress = async (userId: string, lessonId: string, xpEarned: number): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  const progressRef = doc(db, 'users', userId, 'progress', lessonId);

  try {
    // Update per-user progress document for this lesson
    await setDoc(progressRef, {
      userId,
      lessonId,
      status: 'completed',
      xpEarned,
      completedAt: serverTimestamp()
    }, { merge: true });

    // Update user XP
    await updateXP(userId, xpEarned);

    // Update completed lessons array
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const completedLessons = userData?.progress?.completedLessons || [];
    
    if (!completedLessons.includes(lessonId)) {
      await updateDoc(userRef, {
        'progress.completedLessons': [...completedLessons, lessonId],
        lastLogin: serverTimestamp()
      });
    }

  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

export interface LeaderboardEntry {
  userId: string;
  name: string;
  photoURL?: string;
  xp: number;
  level: number;
  streak: number;
}

/**
 * Get leaderboard data sorted by XP
 */
export const getLeaderboard = async (maxResults = 10): Promise<LeaderboardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'users');
    const q = query(leaderboardRef, orderBy('xp', 'desc'), limit(maxResults));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      userId: doc.id,
      name: doc.data().name || 'Anonymous',
      photoURL: doc.data().photoURL,
      xp: doc.data().xp || 0,
      level: doc.data().level || 1,
      streak: doc.data().streak?.current || 0
    }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

/**
 * Get leaderboard data sorted by level
 */
export const getLeaderboardByLevel = async (maxResults = 10): Promise<LeaderboardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'users');
    const q = query(leaderboardRef, orderBy('level', 'desc'), orderBy('xp', 'desc'), limit(maxResults));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      userId: doc.id,
      name: doc.data().name || 'Anonymous',
      photoURL: doc.data().photoURL,
      xp: doc.data().xp || 0,
      level: doc.data().level || 1,
      streak: doc.data().streak?.current || 0
    }));
  } catch (error) {
    console.error('Error fetching leaderboard by level:', error);
    throw error;
  }
};

/**
 * Get leaderboard data sorted by streak
 */
export const getLeaderboardByStreak = async (maxResults = 10): Promise<LeaderboardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'users');
    const q = query(leaderboardRef, orderBy('streak.current', 'desc'), limit(maxResults));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      userId: doc.id,
      name: doc.data().name || 'Anonymous',
      photoURL: doc.data().photoURL,
      xp: doc.data().xp || 0,
      level: doc.data().level || 1,
      streak: doc.data().streak?.current || 0
    }));
  } catch (error) {
    console.error('Error fetching leaderboard by streak:', error);
    throw error;
  }
};

// ==================== PROBLEM & CURRICULUM MANAGEMENT ====================

/**
 * Add problem to Firebase
 */
export const addProblem = async (problemData: any): Promise<void> => {
  try {
    const problemRef = doc(db, 'problems', problemData.id);
    await setDoc(problemRef, {
      ...problemData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`✅ Added problem: ${problemData.id}`);
  } catch (error) {
    console.error(`❌ Error adding problem ${problemData.id}:`, error);
    throw error;
  }
};

/**
 * Batch add multiple problems to Firebase
 */
export const batchAddProblems = async (problems: any[]): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  // Firebase batch has a limit of 500 operations
  const BATCH_SIZE = 500;
  
  for (let i = 0; i < problems.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const chunk = problems.slice(i, i + BATCH_SIZE);
    
    chunk.forEach(problem => {
      const problemRef = doc(db, 'problems', problem.id);
      batch.set(problemRef, {
        ...problem,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
    
    try {
      await batch.commit();
      success += chunk.length;
      console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: Added ${chunk.length} problems`);
    } catch (error) {
      failed += chunk.length;
      console.error(`❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error);
    }
  }

  return { success, failed };
};

/**
 * Get problem by ID
 */
export const getProblem = async (problemId: string): Promise<any | null> => {
  try {
    const problemRef = doc(db, 'problems', problemId);
    const problemSnap = await getDoc(problemRef);
    
    if (problemSnap.exists()) {
      return {
        id: problemSnap.id,
        ...problemSnap.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
};

/**
 * Get all problems from Firebase
 */
export const getAllProblemsFromFirebase = async (): Promise<any[]> => {
  try {
    const problemsRef = collection(db, 'problems');
    const snapshot = await getDocs(problemsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching all problems:', error);
    throw error;
  }
};
