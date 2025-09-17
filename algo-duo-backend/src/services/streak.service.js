const Streak = require('../models/Streak');
const User = require('../models/User');

class StreakService {
  // Update user's streak
  async updateUserStreak(userId) {
    let streak = await Streak.findOne({ user: userId });
    
    if (!streak) {
      streak = await Streak.create({ user: userId });
    }
    
    // Update streak
    streak.updateStreak();
    await streak.save();
    
    // Update user's streak data
    const user = await User.findById(userId);
    user.streak.current = streak.currentStreak;
    user.streak.longest = streak.longestStreak;
    user.streak.lastActiveDate = streak.lastActiveDate;
    await user.save();
    
    return streak;
  }
  
  // Get streak calendar for user
  async getStreakCalendar(userId, year, month) {
    const streak = await Streak.findOne({ user: userId });
    
    if (!streak) {
      return [];
    }
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const calendar = [];
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayActivity = streak.streakHistory.find(h => 
        h.date.toDateString() === date.toDateString()
      );
      
      calendar.push({
        date: new Date(date),
        active: !!dayActivity,
        problemsSolved: dayActivity?.problemsSolved || 0,
        xpEarned: dayActivity?.xpEarned || 0
      });
    }
    
    return calendar;
  }
  
  // Check and repair broken streaks (run daily)
  async checkAndRepairStreaks() {
    const users = await User.find({ isActive: true });
    
    for (const user of users) {
      const streak = await Streak.findOne({ user: user._id });
      
      if (!streak) continue;
      
      const today = new Date().toDateString();
      const lastActive = streak.lastActiveDate ? 
        new Date(streak.lastActiveDate).toDateString() : null;
      
      if (lastActive && lastActive !== today) {
        const daysDiff = Math.floor(
          (new Date(today) - new Date(lastActive)) / (1000 * 60 * 60 * 24)
        );
        
        if (daysDiff > 1) {
          // Streak is broken
          streak.currentStreak = 0;
          await streak.save();
          
          user.streak.current = 0;
          await user.save();
        }
      }
    }
  }
  
  // Get streak leaderboard
  async getStreakLeaderboard(limit = 10) {
    const users = await User.find({ isActive: true })
      .sort('-streak.current')
      .limit(limit)
      .select('username profile.avatar streak.current streak.longest');
    
    return users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      avatar: user.profile?.avatar,
      currentStreak: user.streak.current,
      longestStreak: user.streak.longest
    }));
  }
}

module.exports = new StreakService();