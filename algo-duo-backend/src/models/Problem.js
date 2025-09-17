const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  isHidden: { type: Boolean, default: false },
  explanation: String
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Problem title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Problem description is required']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  xpReward: {
    type: Number,
    default: function() {
      const xpMap = { easy: 10, medium: 25, hard: 50 };
      return xpMap[this.difficulty] || 10;
    }
  },
  tags: [String],
  constraints: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  testCases: [testCaseSchema],
  starterCode: {
    python: String,
    javascript: String,
    cpp: String,
    java: String
  },
  solution: {
    python: { type: String, select: false },
    javascript: { type: String, select: false },
    cpp: { type: String, select: false },
    java: { type: String, select: false }
  },
  hints: [{
    text: String,
    xpCost: { type: Number, default: 5 }
  }],
  expectedComplexity: {
    time: String,
    space: String
  },
  order: {
    type: Number,
    default: 0
  },
  submissions: {
    total: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 }
  },
  averageSolveTime: {
    type: Number, // in minutes
    default: 0
  },
  relatedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Indexes
problemSchema.index({ module: 1, order: 1 });
problemSchema.index({ difficulty: 1 });
problemSchema.index({ tags: 1 });
problemSchema.index({ slug: 1 });

// Generate slug
problemSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

// Calculate acceptance rate
problemSchema.methods.getAcceptanceRate = function() {
  if (this.submissions.total === 0) return 0;
  return ((this.submissions.accepted / this.submissions.total) * 100).toFixed(2);
};

module.exports = mongoose.model('Problem', problemSchema);