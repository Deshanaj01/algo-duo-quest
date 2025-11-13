import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { Unsubscribe } from 'firebase/firestore';
import { 
  getUserData, 
  updateXP, 
  updatePerformance, 
  subscribeToUserData, 
  getOrCreateUserProfile,
  calculateLevel,
  getCurrentLevelProgress
} from '../services/firestoreService';
import { UserProfile } from '../types/firestore';

export interface FirestoreUserData {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface FirestoreUserActions {
  addXP: (delta: number) => Promise<{ newXP: number; newLevel: number; leveledUp: boolean }>;
  recordPerformance: (topic: string, correct: boolean) => Promise<void>;
  refreshData: () => Promise<void>;
  getLevelProgress: () => { currentLevelXP: number; xpToNextLevel: number };
}

export const useFirestoreUser = (user: User | null): FirestoreUserData & FirestoreUserActions => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time subscription to user data
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let unsubscribe: Unsubscribe | null = null;

    const initializeUser = async () => {
      try {
        // Get or create user profile
        const userData = await getOrCreateUserProfile(user.uid, {
          name: user.displayName || undefined,
          email: user.email || undefined,
          photoURL: user.photoURL || undefined,
        });

        setProfile(userData);

        // Set up real-time listener
        unsubscribe = subscribeToUserData(user.uid, (updatedProfile) => {
          setProfile(updatedProfile);
          setLoading(false);
        });

      } catch (err) {
        console.error('Error initializing user:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    initializeUser();

    // Cleanup subscription on unmount or user change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const addXP = useCallback(async (delta: number) => {
    if (!user) throw new Error('No user authenticated');
    
    try {
      const result = await updateXP(user.uid, delta);
      
      // Show level up notification if applicable
      if (result.leveledUp) {
        console.log(`🎉 Congratulations! You've reached level ${result.newLevel}!`);
        // You can trigger a toast notification here
      }
      
      return result;
    } catch (err) {
      console.error('Error adding XP:', err);
      setError('Failed to update XP');
      throw err;
    }
  }, [user]);

  const recordPerformance = useCallback(async (topic: string, correct: boolean) => {
    if (!user) throw new Error('No user authenticated');
    
    try {
      await updatePerformance(user.uid, topic, correct);
      
      // Award XP for completing a question
      const xpReward = correct ? 10 : 5; // 10 XP for correct, 5 XP for attempt
      await addXP(xpReward);
      
    } catch (err) {
      console.error('Error recording performance:', err);
      setError('Failed to record performance');
      throw err;
    }
  }, [user, addXP]);

  const refreshData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userData = await getUserData(user.uid);
      setProfile(userData);
      setError(null);
    } catch (err) {
      console.error('Error refreshing user data:', err);
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getLevelProgress = useCallback(() => {
    if (!profile) {
      return { currentLevelXP: 0, xpToNextLevel: 100 };
    }
    
    return getCurrentLevelProgress(profile.xp);
  }, [profile]);

  return {
    profile,
    loading,
    error,
    addXP,
    recordPerformance,
    refreshData,
    getLevelProgress,
  };
};