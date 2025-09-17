const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: function() { return !this.firebaseUid; },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  firebaseUid: {
    type: String,
    sparse: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    preferredLanguage: {
      type: String,
      enum: ['python', 'javascript', 'cpp', 'java'],
      default: 'python'
    }
  },
  xp: {
    total: { type: Number, default: 0 },
    byModule: {
      type: Map,
      of: Number,
      default: new Map()
    }
  },
  level: {
    type: Number,
    default: 1
  },
  skillLevels: {
    type: Map,
    of: {
      level: { type: Number, default: 1 },
      problemsSolved: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 }
    },
    default: new Map()
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActiveDate: Date
  },
  statistics: {
    totalProblemsSolved: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 }, // in minutes
    favoriteTopics: [String]
  },
  achievements: [{
    name: String,
    description: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'xp.total': -1 }); // For leaderboard queries
userSchema.index({ firebaseUid: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamps
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate level based on XP
userSchema.methods.calculateLevel = function() {
  const xpThresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000, 13000];
  let level = 1;
  for (let i = 0; i < xpThresholds.length; i++) {
    if (this.xp.total >= xpThresholds[i]) {
      level = i + 1;
    }
  }
  return level;
};

// Get public profile
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    username: this.username,
    profile: this.profile,
    xp: this.xp,
    level: this.level,
    streak: this.streak,
    achievements: this.achievements
  };
};

module.exports = mongoose.model('User', userSchema);