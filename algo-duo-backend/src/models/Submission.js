const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['python', 'javascript', 'cpp', 'java'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'accepted', 'wrong_answer', 'time_limit_exceeded', 
           'memory_limit_exceeded', 'runtime_error', 'compilation_error'],
    default: 'pending'
  },
  testResults: [{
    testCase: Number,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    executionTime: Number, // in ms
    memory: Number // in MB
  }],
  totalTestCases: Number,
  passedTestCases: {
    type: Number,
    default: 0
  },
  executionTime: {
    type: Number, // in ms
    default: 0
  },
  memory: {
    type: Number, // in MB
    default: 0
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  hintsUsed: {
    type: Number,
    default: 0
  },
  attempts: {
    type: Number,
    default: 1
  },
  solveTime: {
    type: Number, // in minutes
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
submissionSchema.index({ user: 1, problem: 1 });
submissionSchema.index({ user: 1, status: 1 });
submissionSchema.index({ problem: 1, status: 1 });
submissionSchema.index({ submittedAt: -1 });

// Calculate score based on performance
submissionSchema.methods.calculateScore = function() {
  if (this.status !== 'accepted') return 0;
  
  let score = 100;
  
  // Deduct points for hints used
  score -= this.hintsUsed * 5;
  
  // Deduct points for multiple attempts
  score -= (this.attempts - 1) * 10;
  
  // Bonus for fast execution
  if (this.executionTime < 100) score += 10;
  
  // Ensure score doesn't go below 0
  return Math.max(0, score);
};

module.exports = mongoose.model('Submission', submissionSchema);