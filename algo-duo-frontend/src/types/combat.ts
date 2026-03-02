export type CombatMatchStatus = 'waiting' | 'in_progress' | 'completed';

export type CombatVerdict =
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit'
  | 'memory_limit'
  | 'runtime_error';

export interface CombatPlayerInfo {
  uid: string;
  displayName: string;
  xp: number;
  photoURL?: string | null;
}

export interface SubmissionResult {
  testCasesPassed: number;
  totalTestCases: number;
  executionTimeMs: number;
  memoryUsageMB?: number;
  estimatedTimeComplexity: string;
  estimatedSpaceComplexity: string;
  submittedAt?: Date;
  verdict: CombatVerdict;
}

export interface CombatMatch {
  matchId: string;
  player1: CombatPlayerInfo;
  player2: CombatPlayerInfo | null;
  problemId: string;
  status: CombatMatchStatus;
  startedAt: Date | null;
  endedAt: Date | null;
  duration: number;
  player1Result: SubmissionResult | null;
  player2Result: SubmissionResult | null;
  winnerId: string | null;
  winReason: string;
  createdAt: Date | null;
}

export interface CombatSubmission {
  orderId?: string;
  matchId: string;
  playerId: string;
  code: string;
  language: string;
  testCasesPassed: number;
  totalTestCases: number;
  executionTimeMs: number;
  memoryUsageMB?: number;
  estimatedTimeComplexity: string;
  estimatedSpaceComplexity: string;
  submittedAt: Date;
  verdict: CombatVerdict;
}

export interface CombatSampleTestCase {
  input: string;
  expectedOutput: string;
}

export interface CombatBenchmarkInputs {
  small: string;
  medium: string;
  large: string;
}

export type CombatDifficulty = 'easy' | 'medium' | 'hard';

export interface CombatProblem {
  problemId: string;
  title: string;
  description: string;
  constraints: string;
  sampleTestCases: CombatSampleTestCase[];
  difficulty: CombatDifficulty;
  tags: string[];
}

export interface CombatStats {
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  bestWinStreak: number;
  combatXP: number;
  matchHistory: string[];
}

export interface CombatQueueJoinPayload {
  userId: string;
  displayName: string;
  xp: number;
  photoURL?: string | null;
}

export interface CombatMatchFoundPayload {
  matchId: string;
  opponent: {
    displayName: string;
    xp: number;
    photoURL?: string | null;
    isBot?: boolean;
  };
  problem: CombatProblem;
}

export interface CombatTimerSyncPayload {
  remainingSeconds: number;
}

export interface CombatOpponentProgressPayload {
  testCasesPassed: number;
  totalTestCases: number;
  submissionCount: number;
}

export interface CombatSubmissionResultPayload {
  testCasesPassed: number;
  totalTestCases: number;
  executionTimeMs: number;
  estimatedTimeComplexity: string;
  estimatedSpaceComplexity: string;
  verdict: CombatVerdict;
  submissionsLeft: number;
}

export interface CombatMatchEndPayload {
  matchId: string;
  winnerId: string | null;
  winReason: string;
  player1Result: SubmissionResult | null;
  player2Result: SubmissionResult | null;
}

