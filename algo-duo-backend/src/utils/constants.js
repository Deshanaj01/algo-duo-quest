// Combat configuration
const COMBAT = {
  MATCH_DURATION_SECONDS: 600,
  MATCHMAKING_XP_RANGE: 50,
  MATCHMAKING_TIMEOUT_MS: 30000,
  MAX_SUBMISSIONS_PER_MATCH: 5,
  TIMER_SYNC_INTERVAL_MS: 1000,
};

const XP_REWARDS = {
  WIN: 25,
  LOSE: -10,
  DRAW: 5,
  STREAK_BONUS: 5,
  STREAK_CAP: 25,
};

const CODE_EXECUTION = {
  TIMEOUT_MS: 2000,
  MEMORY_MB: 256,
  CPU_LIMIT: 0.5,
  SUPPORTED_LANGUAGES: ['javascript', 'python'],
  DOCKER_IMAGE: {
    javascript: 'node:18-alpine',
    python: 'python:3.11-alpine',
  },
};

const COMPLEXITY = {
  CONSTANT: 2,
  LOGARITHMIC: 5,
  LINEAR: 150,
  LINEARITHMIC: 300,
  QUADRATIC: 15000,
};

const ANTI_CHEAT = {
  PLAGIARISM_THRESHOLD: 0.85,
  MAX_TAB_SWITCHES: 3,
};

const MATCH_STATUS = {
  WAITING: 'waiting',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

const VERDICT = {
  ACCEPTED: 'accepted',
  WRONG_ANSWER: 'wrong_answer',
  TIME_LIMIT: 'time_limit',
  MEMORY_LIMIT: 'memory_limit',
  RUNTIME_ERROR: 'runtime_error',
};

module.exports = {
  COMBAT,
  XP_REWARDS,
  CODE_EXECUTION,
  COMPLEXITY,
  ANTI_CHEAT,
  MATCH_STATUS,
  VERDICT,
};