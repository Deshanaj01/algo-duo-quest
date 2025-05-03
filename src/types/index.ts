
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string; // name of the icon to display
  color: string; // Tailwind class for the background color
  totalLessons: number;
  completedLessons: number;
  unlocked: boolean;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description: string;
  content: string;
  difficulty: Difficulty;
  points: number;
  timeEstimate: number; // in minutes
  completed: boolean;
  unlocked: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  code: string; // starter code
  solution: string; // solution code
  tests: string[]; // test cases
}

export interface UserProfile {
  id: string;
  username: string;
  points: number;
  level: number;
  streakDays: number;
  lastActive: string; // ISO date string
  completedLessons: string[]; // array of lesson ids
  completedQuizzes: string[]; // array of quiz ids
  completedChallenges: string[]; // array of challenge ids
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  code?: string;
  solution?: string;
  question?: string;
  options?: string[];
  correctOptionIndex?: number;
  completed: boolean;
  date: string; // ISO date string
}

export interface UserStats {
  daysStreak: number;
  totalPoints: number;
  completionRate: number;
  averageScore: number;
  badges: string[];
}
