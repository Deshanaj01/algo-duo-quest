import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const calculateLevel = (xp) => {
  const levels = [
    { level: 1, minXP: 0 },
    { level: 2, minXP: 100 },
    { level: 3, minXP: 250 },
    { level: 4, minXP: 450 },
    { level: 5, minXP: 700 },
    { level: 6, minXP: 1000 },
    { level: 7, minXP: 1400 },
    { level: 8, minXP: 1900 },
    { level: 9, minXP: 2500 },
    { level: 10, minXP: 3200 }
  ];
  
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) {
      return levels[i].level;
    }
  }
  return 1;
};

export const calculateProgress = (xp) => {
  const level = calculateLevel(xp);
  const levels = [
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
  
  const currentLevel = levels[level - 1];
  if (!currentLevel) return 0;
  
  const progress = ((xp - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;
  return Math.min(Math.max(progress, 0), 100);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};