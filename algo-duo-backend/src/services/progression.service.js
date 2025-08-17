const Module = require('../models/Module');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

class ProgressionService {
  // Get next problem for user based on skill level
  async getNextProblem(userId, moduleId) {
    const user = await User.findById(userId);
    const moduleSkill = user.skillLevels.get(moduleId.toString()) || { level: 1 };
    
    // Get problems user hasn't solved
    const solvedProblems = await Submission.find({
      user: userId,
      module: moduleId,
      status: 'accepted'
    }).distinct('problem');
    
    // Find appropriate difficulty based on skill level
    let difficulty;
    if (moduleSkill.level <= 3) {
      difficulty = 'easy';
    } else if (moduleSkill.level <= 6) {
      difficulty = 'medium';
    } else {
      difficulty = 'hard';
    }
    
    // Get unsolved problems at appropriate difficulty
    const problem = await Problem.findOne({
      module: moduleId,
      _id: { $nin: solvedProblems },
      difficulty,
      isActive: true
    }).sort('order');
    
    // If no problems at current difficulty, try other difficulties
    if (!problem) {
      const allProblems = await Problem.findOne({
        module: moduleId,
        _id: { $nin: solvedProblems },
        isActive: true
      }).sort('order');
      
      return allProblems;
    }
    
    return problem;
  }
  
  // Update user skill level for a module
  async updateSkillLevel(userId, moduleId, submission) {
    const user = await User.findById(userId);
    const moduleSkill = user.skillLevels.get(moduleId.toString()) || {
      level: 1,
      problemsSolved: 0,
      accuracy: 0
    };
    
    // Update problems solved
    if (submission.status === 'accepted') {
      moduleSkill.problemsSolved += 1;
      
      // Calculate new accuracy
      const totalSubmissions = await Submission.countDocuments({
        user: userId,
        module: moduleId
      });
      const acceptedSubmissions = await Submission.countDocuments({
        user: userId,
        module: moduleId,
        status: 'accepted'
      });
      
      moduleSkill.accuracy = (acceptedSubmissions / totalSubmissions) * 100;
      
      // Update skill level based on problems solved and accuracy
      if (moduleSkill.problemsSolved >= 5 && moduleSkill.accuracy >= 80) {
        moduleSkill.level = Math.min(10, moduleSkill.level + 1);
      }
    }
    
    user.skillLevels.set(moduleId.toString(), moduleSkill);
    await user.save();
    
    return moduleSkill;
  }
  
  // Get module recommendations for user
  async getModuleRecommendations(user) {
    const recommendations = [];
    
    // Get all modules
    const modules = await Module.find({ isActive: true }).sort('order');
    
    for (const module of modules) {
      const moduleId = module._id.toString();
      const userXP = user.xp.byModule.get(moduleId) || 0;
      const progress = module.totalXP > 0 ? (userXP / module.totalXP) * 100 : 0;
      
      // Check prerequisites
      let prerequisitesMet = true;
      if (module.prerequisites && module.prerequisites.length > 0) {
        for (const prereqId of module.prerequisites) {
          const prereqXP = user.xp.byModule.get(prereqId.toString()) || 0;
          const prereqModule = await Module.findById(prereqId);
          const prereqProgress = prereqModule.totalXP > 0 
            ? (prereqXP / prereqModule.totalXP) * 100 
            : 0;
          
          if (prereqProgress < 70) {
            prerequisitesMet = false;
            break;
          }
        }
      }
      
      // Categorize recommendation
      if (!prerequisitesMet) {
        continue; // Skip modules with unmet prerequisites
      } else if (progress === 0) {
        recommendations.push({
          module,
          reason: 'New module to explore',
          priority: 'high',
          progress
        });
      } else if (progress < 50) {
        recommendations.push({
          module,
          reason: 'Continue your progress',
          priority: 'high',
          progress
        });
      } else if (progress < 100) {
        recommendations.push({
          module,
          reason: 'Almost complete!',
          priority: 'medium',
          progress
        });
      }
    }
    
    // Sort by priority and progress
    recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.progress - a.progress;
    });
    
    return recommendations.slice(0, 5); // Return top 5 recommendations
  }
  
  // Get learning path for user
  async getLearningPath(userId) {
    const user = await User.findById(userId);
    const modules = await Module.find({ isActive: true }).sort('order');
    
    const path = [];
    
    for (const module of modules) {
      const moduleId = module._id.toString();
      const userXP = user.xp.byModule.get(moduleId) || 0;
      const progress = module.totalXP > 0 ? (userXP / module.totalXP) * 100 : 0;
      
      const problemsSolved = await Submission.countDocuments({
        user: userId,
        module: moduleId,
        status: 'accepted'
      });
      
      const totalProblems = await Problem.countDocuments({
        module: moduleId,
        isActive: true
      });
      
      path.push({
        module: {
          id: module._id,
          name: module.name,
          slug: module.slug,
          description: module.description,
          difficulty: module.difficulty
        },
        progress: {
          percentComplete: progress.toFixed(2),
          problemsSolved,
          totalProblems,
          xpEarned: userXP,
          totalXP: module.totalXP
        },
        status: progress === 0 ? 'locked' : progress === 100 ? 'completed' : 'in-progress'
      });
    }
    
    return path;
  }
}

module.exports = new ProgressionService();