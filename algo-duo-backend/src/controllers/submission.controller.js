const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');
const Streak = require('../models/Streak');
const xpService = require('../services/xp.service');
const codeExecutionService = require('../services/codeExecution.service');
const streakService = require('../services/streak.service');

// Submit solution
exports.submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.id;
    
    // Get problem details
    const problem = await Problem.findById(problemId).populate('module');
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Create submission record
    const submission = await Submission.create({
      user: userId,
      problem: problemId,
      module: problem.module._id,
      code,
      language,
      status: 'pending'
    });
    
    // Execute code
    const executionResult = await codeExecutionService.executeCode({
      code,
      language,
      testCases: problem.testCases
    });
    
    // Update submission with results
    submission.status = executionResult.status;
    submission.testResults = executionResult.testResults;
    submission.totalTestCases = problem.testCases.length;
    submission.passedTestCases = executionResult.passedCount;
    submission.executionTime = executionResult.executionTime;
    submission.memory = executionResult.memory;
    
    // Calculate XP if accepted
    if (submission.status === 'accepted') {
      const xpEarned = await xpService.calculateXP({
        baseXP: problem.xpReward,
        difficulty: problem.difficulty,
        hintsUsed: submission.hintsUsed,
        attempts: submission.attempts
      });
      
      submission.xpEarned = xpEarned;
      
      // Update user XP and stats
      const user = await User.findById(userId);
      await xpService.awardXP(user, xpEarned, problem.module._id);
      
      // Update streak
      await streakService.updateUserStreak(userId);
      
      // Update problem statistics
      problem.submissions.total += 1;
      problem.submissions.accepted += 1;
      await problem.save();
    } else {
      // Update problem statistics for failed attempt
      problem.submissions.total += 1;
      await problem.save();
    }
    
    await submission.save();
    
    // Populate submission for response
    await submission.populate(['problem', 'module']);
    
    res.status(200).json({
      success: true,
      message: submission.status === 'accepted' 
        ? `Congratulations! You earned ${submission.xpEarned} XP!`
        : 'Solution submitted',
      data: submission
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit solution',
      error: error.message
    });
  }
};

// Get user submissions
exports.getUserSubmissions = async (req, res) => {
  try {
    const { problemId, status, limit = 20, page = 1 } = req.query;
    const userId = req.user.id;
    
    // Build query
    const query = { user: userId };
    if (problemId) query.problem = problemId;
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    
    const submissions = await Submission.find(query)
      .populate('problem', 'title slug difficulty')
      .populate('module', 'name slug')
      .sort('-submittedAt')
      .limit(limit * 1)
      .skip(skip);
    
    const total = await Submission.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        submissions,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};

// Get submission details
exports.getSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const submission = await Submission.findOne({ _id: id, user: userId })
      .populate('problem')
      .populate('module');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission',
      error: error.message
    });
  }
};

// Run code without submitting
exports.runCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    
    // Get problem details
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Only run against visible test cases
    const visibleTestCases = problem.testCases.filter(tc => !tc.isHidden);
    
    // Execute code
    const executionResult = await codeExecutionService.executeCode({
      code,
      language,
      testCases: visibleTestCases
    });
    
    res.status(200).json({
      success: true,
      data: executionResult
    });
  } catch (error) {
    console.error('Run code error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to run code',
      error: error.message
    });
  }
};