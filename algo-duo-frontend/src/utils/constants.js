export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

export const DIFFICULTY_COLORS = {
  easy: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100',
  hard: 'text-red-600 bg-red-100'
};

export const LANGUAGES = [
  { id: 'python', name: 'Python', value: 'python' },
  { id: 'cpp', name: 'C++', value: 'cpp' },
  { id: 'java', name: 'Java', value: 'java' },
  { id: 'javascript', name: 'JavaScript', value: 'javascript' }
];

export const XP_LEVELS = [
  { level: 1, minXP: 0, maxXP: 100 },
  { level: 2, minXP: 100, maxXP: 250 },
  { level: 3, minXP: 250, maxXP: 450 },
  { level: 4, minXP: 450, maxXP: 700 },
  { level: 5, minXP: 700, maxXP: 1000 },
  { level: 6, minXP: 1000, maxXP: 1400 },
  { level: 7, minXP: 1400, maxXP: 1900 },
  { level: 8, minXP: 1900, maxXP: 2500 },
  { level: 9, minXP: 2500, maxXP: 3200 },
  { level: 10, minXP: 3200, maxXP: 4000 }
];