// Centralized XP thresholds and helpers
// Update xpThresholds to change the leveling curve; UI and logic will update automatically.
export const xpThresholds: number[] = [
  // Level -> Cumulative XP required to reach that level
  // Level 1 starts at 0 XP
  0,    // L1
  100,  // L2
  250,  // L3
  500,  // L4
  1000, // L5
  // You may extend further levels below to keep scaling consistent
  1600, // L6
  2300, // L7
  3200, // L8
  4300, // L9
  5600  // L10
];

export const getLevelForXP = (totalXP: number): number => {
  if (totalXP < 0) return 1;
  // Find the highest level whose threshold is <= totalXP
  let level = 1;
  for (let i = 0; i < xpThresholds.length; i++) {
    if (totalXP >= xpThresholds[i]) level = i + 1; else break;
  }
  return level;
};

export const getLevelBounds = (level: number): { startXP: number; nextXP: number | null } => {
  const idx = Math.max(0, level - 1);
  const startXP = xpThresholds[idx] ?? 0;
  const nextXP = xpThresholds[idx + 1] ?? null; // null means max level reached
  return { startXP, nextXP };
};

export const getProgressForXP = (totalXP: number): {
  level: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  levelSpan: number; // XP span for current level (next - start)
  progressPercent: number; // 0..100
} => {
  const level = getLevelForXP(totalXP);
  const { startXP, nextXP } = getLevelBounds(level);
  const currentLevelXP = Math.max(0, totalXP - startXP);
  const levelSpan = nextXP == null ? 0 : Math.max(1, nextXP - startXP);
  const xpToNextLevel = nextXP == null ? 0 : Math.max(0, nextXP - totalXP);
  const progressPercent = nextXP == null ? 100 : Math.min(100, Math.round((currentLevelXP / levelSpan) * 100));
  return { level, currentLevelXP, xpToNextLevel, levelSpan, progressPercent };
};