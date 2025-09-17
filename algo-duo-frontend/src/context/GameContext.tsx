import React, { createContext, useContext, useState, useEffect } from 'react';

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
  earnXP: (amount: number, reason: string) => void;
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

// Level titles and requirements
const levelInfo = [
  { level: 1, title: 'Novice', icon: '🌱', color: '#4ade80', xpRequired: 0 },
  { level: 2, title: 'Learner', icon: '📚', color: '#3b82f6', xpRequired: 100 },
  { level: 3, title: 'Explorer', icon: '🔍', color: '#8b5cf6', xpRequired: 250 },
  { level: 4, title: 'Practitioner', icon: '⚡', color: '#f59e0b', xpRequired: 500 },
  { level: 5, title: 'Specialist', icon: '🎯', color: '#ef4444', xpRequired: 1000 },
  { level: 6, title: 'Expert', icon: '💪', color: '#06b6d4', xpRequired: 1800 },
  { level: 7, title: 'Master', icon: '🏆', color: '#d946ef', xpRequired: 3000 },
  { level: 8, title: 'Grandmaster', icon: '👑', color: '#f97316', xpRequired: 5000 },
  { level: 9, title: 'Legend', icon: '⭐', color: '#eab308', xpRequired: 8000 },
  { level: 10, title: 'Algorithm God', icon: '🌟', color: '#dc2626', xpRequired: 12000 }
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 2,
    totalXP: 145,
    currentLevelXP: 45,
    xpToNextLevel: 105,
    streakDays: 3,
    longestStreak: 5,
    lessonsCompleted: 2,
    challengesCompleted: 1,
    totalTimeSpent: 120,
    averageScore: 87,
    rank: 'Learner',
    joinDate: new Date(2024, 0, 15)
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
    const levelData = levelInfo.find(l => l.level === level);
    return levelData?.xpRequired || 0;
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
    for (let i = levelInfo.length - 1; i >= 0; i--) {
      if (totalXP >= levelInfo[i].xpRequired) {
        return levelInfo[i].level;
      }
    }
    return 1;
  };

  const earnXP = (amount: number, reason: string) => {
    setUserStats(prev => {
      const newTotalXP = prev.totalXP + amount;
      const newLevel = calculateLevel(newTotalXP);
      const currentLevelXP = newTotalXP - getXPForLevel(newLevel);
      const nextLevelXP = getXPForLevel(newLevel + 1);
      const xpToNextLevel = nextLevelXP - newTotalXP;

      // Show XP notification
      showXPNotification(amount, reason);

      return {
        ...prev,
        totalXP: newTotalXP,
        level: newLevel,
        currentLevelXP,
        xpToNextLevel: Math.max(0, xpToNextLevel),
        rank: getLevelInfo(newLevel).title
      };
    });
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
