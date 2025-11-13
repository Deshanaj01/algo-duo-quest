// Types for AI Tutor features
export type DifficultyBand = 'easy' | 'medium' | 'hard';

export interface AttemptDoc {
  id?: string;
  userId: string;
  questionId: string;
  topic: string;
  difficulty: DifficultyBand;
  language?: string;
  startedAt: Date;
  endedAt?: Date | null;
  timeTakenSec?: number; // computed on end
  wrongAttempts: number; // number of wrong submissions within this attempt session
  finalCorrect: boolean;
  wasSkipped: boolean;
  errorTypes: string[]; // e.g., ['index_out_of_bounds', 'off_by_one']
  code?: string; // latest snapshot (optional)
  hintTiersUsed?: number[]; // record of tiers shown during attempt
}

export interface TopicStatsDoc {
  id?: string; // typically the topic name
  userId: string;
  topic: string;
  // Exponential moving averages
  accuracyEma: number; // 0..1
  avgTimeSecEma: number; // seconds
  attempts: number; // count
  correct: number; // count
  recentFailures: number; // streak of failures in this topic
  currentDifficulty: DifficultyBand; // band currently assigned for this topic
  lastUpdated: Date;
}

export interface NextProblemRequest {
  userId: string;
  topicPreference?: string; // optional override
}

export interface NextProblemResponse {
  questionId: string;
  title: string;
  topic: string;
  difficulty: DifficultyBand;
}

export interface AdaptiveHintRequest {
  questionId: string;
  userId: string;
  attemptId: string;
  attemptNumber: number;
  errorTypes?: string[];
  language?: string;
}

export interface AdaptiveHintResponse {
  hint: string;
  isLastHint: boolean;
  tier: number;
  encouragement?: string;
}