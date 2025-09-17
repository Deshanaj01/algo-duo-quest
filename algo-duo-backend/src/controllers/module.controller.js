const Module = require('../models/Module');
const Problem = require('../models/Problem');
const User = require('../models/User');

// Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    const modules = await Module.find(query)
      .sort('order')
      .populate('prerequisites', 'name slug');
    
    // Get user progress if authenticated
    if (req.user) {
      const user = await User.findById(req.user.id);
      
      // Add user progress to each module
      const modulesWithProgress = modules.map(module => {
        const moduleObj = module.toObject();
        const userXP = user.xp.byModule.get(module._id.toString()) || 0;
        const progress = module.totalXP > 0 ? (userXP / module.totalXP) * 100 : 0;
        
        return {
          ...moduleObj,
          userProgress: {
            xpEarned: userXP,
            percentComplete: Math.min(100, progress.toFixed(2))
          }
        };
      });
      
      return res.status(200).json({
        success: true,
        count: modulesWithProgress.length,
        data: modulesWithProgress
      });
    }
    
    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modules',
      error: error.message
    });
  }
};

// Get single module with problems
exports.getModule = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const module = await Module.findOne({ slug, isActive: true })
      .populate('prerequisites', 'name slug');
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    // Get problems for this module
    const problems = await Problem.find({ module: module._id, isActive: true })
      .sort('order')
      .select('-solution');
    
    // Get user progress if authenticated
    let userProgress = null;
    if (req.user) {
      const user = await User.findById(req.user.id);
      const submissions = await Submission.find({
        user: req.user.id,
        module: module._id,
        status: 'accepted'
      }).distinct('problem');
      
      userProgress = {
        xpEarned: user.xp.byModule.get(module._id.toString()) || 0,
        problemsSolved: submissions.length,
        totalProblems: problems.length,
        percentComplete: problems.length > 0 
          ? ((submissions.length / problems.length) * 100).toFixed(2)
          : 0
      };
    }
    
    res.status(200).json({
      success: true,
      data: {
        module,
        problems,
        userProgress
      }
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch module',
      error: error.message
    });
  }
};

// Create new module (Admin only)
exports.createModule = async (req, res) => {
  try {
    const moduleData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const module = await Module.create(moduleData);
    
    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: module
    });
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create module',
      error: error.message
    });
  }
};

// Update module (Admin only)
exports.updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const module = await Module.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Module updated successfully',
      data: module
    });
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update module',
      error: error.message
    });
  }
};

// Delete module (Admin only)
exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Soft delete
    const module = await Module.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete module',
      error: error.message
    });
  }
};

// Get module recommendations for user
exports.getRecommendedModules = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const progressionService = require('../services/progression.service');
    
    const recommendations = await progressionService.getModuleRecommendations(user);
    
    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: error.message
    });
  }
};