const combatService = require('../services/combat.service');
const { adminDb } = require('../config/firebase');
const { executeCode } = require('../services/codeExecution.service');
const { estimateComplexity } = require('../services/complexity.service');
const { COMBAT, MATCH_STATUS } = require('../utils/constants');

/**
 * GET /api/combat/match/:matchId
 */
exports.getMatch = async (req, res) => {
  try {
    const match = await combatService.getMatch(req.params.matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }
    res.json({ success: true, data: match });
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({ success: false, message: 'Failed to get match' });
  }
};

/**
 * GET /api/combat/history/:userId
 */
exports.getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const matches = await combatService.getMatchHistory(req.params.userId, limit);
    res.json({ success: true, data: matches });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ success: false, message: 'Failed to get match history' });
  }
};

/**
 * GET /api/combat/problems
 */
exports.getProblems = async (req, res) => {
  try {
    const snapshot = await adminDb.collection('combat_problems').get();
    const problems = snapshot.docs.map(doc => ({
      problemId: doc.id,
      ...doc.data(),
      // Don't expose hidden test cases to clients
      hiddenTestCases: undefined,
      benchmarkInputs: undefined,
    }));
    res.json({ success: true, data: problems });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ success: false, message: 'Failed to get problems' });
  }
};

/**
 * POST /api/combat/problems
 */
exports.addProblem = async (req, res) => {
  try {
    const {
      title, description, constraints,
      sampleTestCases, hiddenTestCases, benchmarkInputs,
      difficulty, tags,
    } = req.body;

    if (!title || !description || !sampleTestCases) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and sample test cases are required',
      });
    }

    const docRef = await adminDb.collection('combat_problems').add({
      title,
      description,
      constraints: constraints || '',
      sampleTestCases: sampleTestCases || [],
      hiddenTestCases: hiddenTestCases || [],
      benchmarkInputs: benchmarkInputs || null,
      difficulty: difficulty || 'easy',
      tags: tags || [],
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { problemId: docRef.id },
    });
  } catch (error) {
    console.error('Add problem error:', error);
    res.status(500).json({ success: false, message: 'Failed to add problem' });
  }
};

/**
 * POST /api/combat/submit
 * Body: { matchId, code, language }
 * Uses the same evaluation pipeline as the Socket.IO handler.
 */
exports.submitCode = async (req, res) => {
  try {
    const { matchId, code, language } = req.body;
    const playerId = req.user?.uid;

    if (!playerId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!matchId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'matchId, code, and language are required',
      });
    }

    const match = await combatService.getMatch(matchId);
    if (!match || match.status !== MATCH_STATUS.IN_PROGRESS) {
      return res.status(400).json({
        success: false,
        message: 'Match not active',
      });
    }

    // Enforce submission limit per match per player
    const submissionsSnap = await adminDb
      .collection('combat_matches')
      .doc(matchId)
      .collection('combat_submissions')
      .where('playerId', '==', playerId)
      .get();

    if (submissionsSnap.size >= COMBAT.MAX_SUBMISSIONS_PER_MATCH) {
      return res.status(400).json({
        success: false,
        message: 'Maximum submissions reached',
        submissionsLeft: 0,
      });
    }

    // Load problem and test cases
    const problemDoc = await adminDb
      .collection('combat_problems')
      .doc(match.problemId)
      .get();

    if (!problemDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    const problemData = problemDoc.data();
    const allTestCases = [
      ...(problemData.sampleTestCases || []),
      ...(problemData.hiddenTestCases || []),
    ];

    // Execute code against all test cases
    const execResult = await executeCode(code, language, allTestCases);

    // Estimate complexity if benchmarks are defined
    let complexity = { timeComplexity: 'N/A', spaceComplexity: 'N/A' };
    if (problemData.benchmarkInputs) {
      complexity = await estimateComplexity(code, language, problemData.benchmarkInputs);
    }

    const submissionData = {
      code,
      language,
      testCasesPassed: execResult.passed,
      totalTestCases: execResult.total,
      executionTimeMs: execResult.totalTimeMs,
      estimatedTimeComplexity: complexity.timeComplexity,
      estimatedSpaceComplexity: complexity.spaceComplexity,
      verdict: execResult.verdict,
    };

    await combatService.saveSubmission(matchId, playerId, submissionData);

    const submissionsLeft =
      COMBAT.MAX_SUBMISSIONS_PER_MATCH - (submissionsSnap.size + 1);

    // Optionally end the match early if both players have accepted submissions
    let matchEnded = false;
    let matchResult = null;
    if (execResult.verdict === 'accepted') {
      const updatedMatch = await combatService.getMatch(matchId);
      if (
        updatedMatch.player1Result?.verdict === 'accepted' &&
        (updatedMatch.player2Result?.verdict === 'accepted' || !updatedMatch.player2)
      ) {
        matchResult = await combatService.endMatch(matchId);
        matchEnded = !!matchResult;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...submissionData,
        results: execResult.results || [],
        submissionsLeft,
        matchEnded,
        matchResult,
      },
    });
  } catch (error) {
    console.error('Submit code REST error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Submission failed' });
  }
};
