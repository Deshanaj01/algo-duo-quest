const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: null
  },
  streakHistory: [{
    date: Date,
    problemsSolved: Number,
    xpEarned: Number
  }],
  totalActiveDays: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for quick user lookup
streakSchema.index({ user: 1 });
streakSchema.index({ lastActiveDate: -1 });

// Update streak
streakSchema.methods.updateStreak = function(date = new Date()) {
  const today = new Date(date.toDateString());
  const lastActive = this.lastActiveDate ? new Date(this.lastActiveDate.toDateString()) : null;
  
  if (!lastActive) {
    // First activity
    this.currentStreak = 1;
    this.longestStreak = 1;
    this.lastActiveDate = today;
    this.totalActiveDays = 1;
  } else {
    const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, no streak change
      return this;
    } else if (daysDiff === 1) {
      // Consecutive day
      this.currentStreak += 1;
      this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
    } else {
      // Streak broken
      this.currentStreak = 1;
    }
    
    this.lastActiveDate = today;
    this.totalActiveDays += 1;
  }
  
  this.updatedAt = Date.now();
  return this;
};

module.exports = mongoose.model('Streak', streakSchema);