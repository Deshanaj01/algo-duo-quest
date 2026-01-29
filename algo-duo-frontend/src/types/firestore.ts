// Firestore Schema Types for Algo Duo
export interface UserProfile {
  uid: string;
  name?: string;
  email?: string;
  photoURL?: string | null;
  xp: number;
  level: number;
  streak?: {
    current: number;
    longest: number;
    lastLoginDate: string;
  };
  topic_performance: {
    [topic: string]: {
      correct: number;
      total: number;
      accuracy: number;
    };
  };
  weak_areas: string[];
  ai_recommendations: {
    suggested_topics: string[];
    next_difficulty: string;
    focus_areas: string[];
  };
  progress?: {
    completedLessons: string[];
    currentLesson: string | null;
  };
  created_at: Date;
  updated_at: Date;
  lastLogin?: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  hints: string[];
  solution_approach?: string;
  time_complexity?: string;
  space_complexity?: string;
  created_at: Date;
  updated_at: Date;
}

export interface MLInsight {
  id: string;
  user_id: string;
  predicted_weak_topics: string[];
  suggested_difficulty: string;
  confidence_score: number;
  reasoning?: string;
  generated_at: Date;
  model_version?: string;
  insight_type: string;
}

export interface Progress {
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  xpEarned: number;
  completedAt?: Date;
  attempts: number;
}
