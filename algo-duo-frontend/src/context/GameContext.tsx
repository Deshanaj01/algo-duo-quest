import React, { createContext, useContext, useEffect, useState } from 'react';
import { xpThresholds, getLevelForXP, getLevelBounds, getProgressForXP } from '../utils/xp.ts';
import { useAuth } from './AuthContext.tsx';
import { updateXP } from '../services/firestoreService.ts';
import { useFirestoreUser } from '../hooks/useFirestoreUser.ts';

// Types for gamification
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'challenges' | 'speed' | 'mastery';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  level: number;
  totalXP: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  streakDays: number;
  longestStreak: number;
  lessonsCompleted: number;
  challengesCompleted: number;
  totalTimeSpent: number; // in minutes
  averageScore: number;
  rank: string;
  joinDate: Date;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  earnedAt?: Date;
}

interface GameContextType {
  userStats: UserStats;
  achievements: Achievement[];
  badges: Badge[];
  earnXP: (amount: number, reason: string) => void; // persists to backend if user logged in
  unlockAchievement: (achievementId: string) => void;
  incrementStreak: () => void;
  completeLesson: (lessonId: string, score: number) => void;
  completeChallenge: (challengeId: string, score: number) => void;
  getLevelInfo: (level: number) => { title: string; icon: string; color: string };
  getXPForLevel: (level: number) => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Predefined achievements
const initialAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'learning',
    xpReward: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'common'
  },
  {
    id: 'array-master',
    title: 'Array Master',
    description: 'Complete all Array lessons',
    icon: '📊',
    category: 'mastery',
    xpReward: 200,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    id: 'streak-warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    xpReward: 300,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    rarity: 'epic'
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete 5 lessons in one day',
    icon: '⚡',
    category: 'speed',
    xpReward: 150,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: 'rare'
  },
  {
    id: 'challenge-champion',
    title: 'Challenge Champion',
    description: 'Complete 10 daily challenges',
    icon: '🏆',
    category: 'challenges',
    xpReward: 400,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: 'epic'
  },
  {
    id: 'algorithm-legend',
    title: 'Algorithm Legend',
    description: 'Master all data structures and algorithms',
    icon: '👑',
    category: 'mastery',
    xpReward: 1000,
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    rarity: 'legendary'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Score 100% on 5 consecutive lessons',
    icon: '💎',
    category: 'mastery',
    xpReward: 250,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: 'epic'
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Complete lessons after 10 PM',
    icon: '🦉',
    category: 'learning',
    xpReward: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rarity: 'common'
  }
];

// Level titles and dynamic thresholds (thresholds come from utils/xp)
const levelInfo = [
  { level: 1, title: 'Novice', icon: '🌱', color: '#4ade80' },
  { level: 2, title: 'Learner', icon: '📚', color: '#3b82f6' },
  { level: 3, title: 'Explorer', icon: '🔍', color: '#8b5cf6' },
  { level: 4, title: 'Practitioner', icon: '⚡', color: '#f59e0b' },
  { level: 5, title: 'Specialist', icon: '🎯', color: '#ef4444' },
  { level: 6, title: 'Expert', icon: '💪', color: '#06b6d4' },
  { level: 7, title: 'Master', icon: '🏆', color: '#d946ef' },
  { level: 8, title: 'Grandmaster', icon: '👑', color: '#f97316' },
  { level: 9, title: 'Legend', icon: '⭐', color: '#eab308' },
  { level: 10, title: 'Algorithm God', icon: '🌟', color: '#dc2626' }
];


export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { profile } = useFirestoreUser(user);

  const initialXP = 0;
  const prog = getProgressForXP(initialXP);
  const [userStats, setUserStats] = useState<UserStats>({
    level: prog.level,
    totalXP: initialXP,
    currentLevelXP: prog.currentLevelXP,
    xpToNextLevel: prog.xpToNextLevel,
    streakDays: 0,
    longestStreak: 0,
    lessonsCompleted: 0,
    challengesCompleted: 0,
    totalTimeSpent: 0,
    averageScore: 0,
    rank: levelInfo.find(l => l.level === prog.level)?.title || 'Novice',
    joinDate: new Date()
  });

  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'early-bird',
      name: 'Early Bird',
      icon: '🐦',
      color: '#f59e0b',
      description: 'Completed first lesson',
      earnedAt: new Date()
    }
  ]);

  const getXPForLevel = (level: number): number => {
    // Cumulative XP required to reach the given level
    const idx = Math.max(0, level - 1);
    return xpThresholds[idx] ?? 0;
  };

  const getLevelInfo = (level: number) => {
    const info = levelInfo.find(l => l.level === level) || levelInfo[0];
    return {
      title: info.title,
      icon: info.icon,
      color: info.color
    };
  };

  const calculateLevel = (totalXP: number): number => {
    return getLevelForXP(totalXP);
  };

  // Keep GameContext userStats in sync with Firestore profile XP/level
  useEffect(() => {
    if (!profile) return;
    const totalXP = profile.xp || 0;
    const level = profile.level || getLevelForXP(totalXP);
    const progSync = getProgressForXP(totalXP);
    setUserStats(prev => ({
      ...prev,
      totalXP,
      level,
      currentLevelXP: progSync.currentLevelXP,
      xpToNextLevel: progSync.xpToNextLevel,
      rank: getLevelInfo(level).title,
    }));
  }, [profile]);

  const earnXP = (amount: number, reason: string) => {
    // #region agent log
    fetch('http://127.0.0.1:7636/ingest/eb9226df-3a87-4a4d-b980-a9535ec6387b', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ddd24' },
      body: JSON.stringify({
        sessionId: '1ddd24',
        runId: 'initial',
        hypothesisId: 'H1',
        location: 'GameContext.tsx:earnXP:entry',
        message: 'earnXP called',
        data: { amount, reason, uid: user?.uid || null, totalXP: userStats.totalXP },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    // Persist to backend if logged in, then sync local state
    if (user?.uid) {
      void updateXP(user.uid, amount)
        .then(({ newXP, newLevel }) => {
          // #region agent log
          fetch('http://127.0.0.1:7636/ingest/eb9226df-3a87-4a4d-b980-a9535ec6387b', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ddd24' },
            body: JSON.stringify({
              sessionId: '1ddd24',
              runId: 'initial',
              hypothesisId: 'H1',
              location: 'GameContext.tsx:earnXP:afterUpdateXP',
              message: 'earnXP updated user XP',
              data: { amount, reason, uid: user?.uid || null, newXP, newLevel },
              timestamp: Date.now(),
            }),
          }).catch(() => {});
          // #endregion

          const prog = getProgressForXP(newXP);
          setUserStats(prev => ({
            ...prev,
            totalXP: newXP,
            level: newLevel,
            currentLevelXP: prog.currentLevelXP,
            xpToNextLevel: prog.xpToNextLevel,
            rank: getLevelInfo(newLevel).title
          }));
          showXPNotification(amount, reason);
        })
        .catch(() => {
          // Fallback local update
          setUserStats(prev => {
            const newTotalXP = Math.max(0, prev.totalXP + amount);
            const prog = getProgressForXP(newTotalXP);
            showXPNotification(amount, reason);
            return {
              ...prev,
              totalXP: newTotalXP,
              level: prog.level,
              currentLevelXP: prog.currentLevelXP,
              xpToNextLevel: prog.xpToNextLevel,
              rank: getLevelInfo(prog.level).title
            };
          });
        });
    } else {
      // Local-only update
      setUserStats(prev => {
        const newTotalXP = Math.max(0, prev.totalXP + amount);
        const prog = getProgressForXP(newTotalXP);
        showXPNotification(amount, reason);
        return {
          ...prev,
          totalXP: newTotalXP,
          level: prog.level,
          currentLevelXP: prog.currentLevelXP,
          xpToNextLevel: prog.xpToNextLevel,
          rank: getLevelInfo(prog.level).title
        };
      });
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    );

    // Award XP for unlocking achievement
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      earnXP(achievement.xpReward, `Achievement: ${achievement.title}`);
      showAchievementNotification(achievement);
    }
  };

  const incrementStreak = () => {
    setUserStats(prev => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      longestStreak: Math.max(prev.longestStreak, prev.streakDays + 1)
    }));

    // Check streak achievements
    checkStreakAchievements();
  };

  const completeLesson = (lessonId: string, score: number) => {
    setUserStats(prev => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1,
      averageScore: Math.round((prev.averageScore * prev.lessonsCompleted + score) / (prev.lessonsCompleted + 1))
    }));

    // Award XP based on score
    const xpEarned = Math.round(20 + (score / 100) * 30);
    earnXP(xpEarned, `Lesson completed (${score}%)`);

    // Check achievements
    checkLessonAchievements();
  };

  const completeChallenge = (challengeId: string, score: number) => {
    setUserStats(prev => ({
      ...prev,
      challengesCompleted: prev.challengesCompleted + 1
    }));

    const xpEarned = Math.round(50 + (score / 100) * 50);
    earnXP(xpEarned, `Challenge completed (${score}%)`);

    checkChallengeAchievements();
  };

  const checkLessonAchievements = () => {
    // Check if first lesson completed
    if (userStats.lessonsCompleted === 0) {
      updateAchievementProgress('first-lesson', 1);
    }
    
    // Check array mastery (mock check)
    if (userStats.lessonsCompleted >= 5) {
      updateAchievementProgress('array-master', 5);
    }
  };

  const checkStreakAchievements = () => {
    if (userStats.streakDays >= 7) {
      updateAchievementProgress('streak-warrior', 7);
    }
  };

  const checkChallengeAchievements = () => {
    updateAchievementProgress('challenge-champion', userStats.challengesCompleted);
  };

  const updateAchievementProgress = (achievementId: string, progress: number) => {
    setAchievements(prev => 
      prev.map(achievement => {
        if (achievement.id === achievementId) {
          const newProgress = Math.min(progress, achievement.maxProgress);
          const shouldUnlock = newProgress >= achievement.maxProgress && !achievement.unlocked;
          
          if (shouldUnlock) {
            unlockAchievement(achievementId);
          }
          
          return { ...achievement, progress: newProgress };
        }
        return achievement;
      })
    );
  };

  const showXPNotification = (amount: number, reason: string) => {
    // This would show a toast notification in a real app
    console.log(`🎉 +${amount} XP: ${reason}`);
  };

  const showAchievementNotification = (achievement: Achievement) => {
    // This would show an achievement unlock animation
    console.log(`🏆 Achievement Unlocked: ${achievement.title}`);
  };

  return (
    <GameContext.Provider
      value={{
        userStats,
        achievements,
        badges,
        earnXP,
        unlockAchievement,
        incrementStreak,
        completeLesson,
        completeChallenge,
        getLevelInfo,
        getXPForLevel
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
