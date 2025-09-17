const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Module name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Module description is required']
  },
  icon: String,
  category: {
    type: String,
    enum: ['fundamentals', 'data-structures', 'algorithms', 'advanced'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  order: {
    type: Number,
    default: 0
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  topics: [{
    name: String,
    description: String,
    order: Number
  }],
  totalProblems: {
    type: Number,
    default: 0
  },
  totalXP: {
    type: Number,
    default: 0
  },
  estimatedTime: {
    type: Number, // in hours
    default: 0
  },
  resources: [{
    title: String,
    type: { type: String, enum: ['video', 'article', 'documentation'] },
    url: String
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
moduleSchema.index({ slug: 1 });
moduleSchema.index({ category: 1 });
moduleSchema.index({ order: 1 });

// Generate slug from name
moduleSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Module', moduleSchema);