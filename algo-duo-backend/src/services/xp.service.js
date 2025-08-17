const User = require('../models/User');

class XPService {
  // Calculate XP based on various factors
  calculateXP({ baseXP, difficulty, hintsUsed = 0, attempts = 1, timeBonus = false }) {
    let xp = baseXP;
    
    // Difficulty multiplier
    const difficultyMultipliers = {
      'easy': 1,
      'medium': 1.5,
      'hard': 2
    };
    xp *= difficultyMultipliers[difficulty] || 1;
    
    // Deduct for hints used
    xp -= hintsUsed * 5;
    
    // Deduct for multiple attempts
    if (attempts > 1) {
      xp *= Math.max(0.5, 1 - (attempts - 1) * 0.1);
    }
    
    // Time bonus for quick solutions
    if (timeBonus) {
      xp *= 1.2;
    }
    
    // Ensure XP doesn't go below minimum
    return Math.max(5, Math.round(xp));
  }
  
  // Award XP to user
  async awardXP(user, xpAmount, moduleId = null) {
    // Update total XP
    user.xp.total += xpAmount;
    
    // Update module-specific XP
    if (moduleId) {
      const currentModuleXP = user.xp.byModule.get(moduleId.toString()) || 0;
      user.xp.byModule.set(moduleId.toString(), currentModuleXP + xpAmount);
    }
    
    // Calculate and update level
    const newLevel = user.calculateLevel();
    const leveledUp = newLevel > user.level;
    user.level = newLevel;
    
    // Update statistics
    user.statistics.totalProblemsSolved += 1;
    
    await user.save();
    
    return {
      xpAwarded: xpAmount,
      totalXP: user.xp.total,
      newLevel: user.level,
      leveledUp
    };
  }
  
  // Get XP leaderboard
  async getLeaderboard(limit = 10, timeframe = 'all') {
    let dateFilter = {};
    
    if (timeframe === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (timeframe === 'monthly') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { createdAt: { $gte: monthAgo } };
    }
    
    const users = await User.find({ ...dateFilter, isActive: true })
      .sort('-xp.total')
      .limit(limit)
      .select('username profile.avatar xp.total level streak.current');
    
    return users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      avatar: user.profile?.avatar,
      xp: user.xp.total,
      level: user.level,
      streak: user.streak.current
    }));
  }
  
  // Get user rank
  async getUserRank(userId) {
    const user = await User.findById(userId);
    if (!user) return null;
    
    const higherRankedUsers = await User.countDocuments({
      'xp.total': { $gt: user.xp.total },
      isActive: true
    });
    
    return higherRankedUsers + 1;
  }
  
  // Calculate XP required for next level
  getXPForNextLevel(currentLevel) {
    const xpThresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000, 13000];
    
    if (currentLevel >= xpThresholds.length) {
      // For levels beyond defined thresholds
      return xpThresholds[xpThresholds.length - 1] + (currentLevel - xpThresholds.length + 1) * 5000;
    }
    
    return xpThresholds[currentLevel] || 0;
  }
  
  // Check and award achievements
  async checkAchievements(user) {
    const achievements = [];
    
    // First problem solved
    if (user.statistics.totalProblemsSolved === 1 && 
        !user.achievements.some(a => a.name === 'First Steps')) {
      achievements.push({
        name: 'First Steps',
        description: 'Solved your first problem',
        icon: '🎯'
      });
    }
    
    // 10 problems milestone
    if (user.statistics.totalProblemsSolved === 10 && 
        !user.achievements.some(a => a.name === 'Problem Solver')) {
      achievements.push({
        name: 'Problem Solver',
        description: 'Solved 10 problems',
        icon: '💪'
      });
    }
    
    // 7-day streak
    if (user.streak.current === 7 && 
        !user.achievements.some(a => a.name === 'Week Warrior')) {
      achievements.push({
        name: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        icon: '🔥'
      });
    }
    
    // 30-day streak
    if (user.streak.current === 30 && 
        !user.achievements.some(a => a.name === 'Consistency King')) {
      achievements.push({
        name: 'Consistency King',
        description: 'Maintained a 30-day streak',
        icon: '👑'
      });
    }
    
    // Level milestones
    if (user.level === 5 && 
        !user.achievements.some(a => a.name === 'Rising Star')) {
      achievements.push({
        name: 'Rising Star',
        description: 'Reached Level 5',
        icon: '⭐'
      });
    }
    
    if (user.level === 10 && 
        !user.achievements.some(a => a.name === 'Expert Coder')) {
      achievements.push({
        name: 'Expert Coder',
        description: 'Reached Level 10',
        icon: '🏆'
      });
    }
    
    // Add achievements to user
    if (achievements.length > 0) {
      user.achievements.push(...achievements);
      await user.save();
    }
    
    return achievements;
  }
}

module.exports = new XPService();