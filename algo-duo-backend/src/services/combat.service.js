const { adminDb } = require('../config/firebase');
const { admin } = require('../config/firebase');
const { checkPlagiarism } = require('../services/antiCheat.service');
const { generateMatchId } = require('../utils/helpers');
const { COMBAT, XP_REWARDS, MATCH_STATUS } = require('../utils/constants');

/**
 * Create a new combat match in Firestore.
 */
const createMatch = async (player1, player2, problemId) => {
  const matchId = generateMatchId();
  const now = admin.firestore.FieldValue.serverTimestamp();

  const matchData = {
    matchId,
    player1: {
      uid: player1.userId,
      displayName: player1.displayName,
      xp: player1.xp,
      photoURL: player1.photoURL || null,
    },
    player2: player2 ? {
      uid: player2.userId,
      displayName: player2.displayName,
      xp: player2.xp,
      photoURL: player2.photoURL || null,
    } : null, // null = bot
    problemId,
    status: MATCH_STATUS.IN_PROGRESS,
    startedAt: now,
    endedAt: null,
    duration: COMBAT.MATCH_DURATION_SECONDS,
    player1Result: null,
    player2Result: null,
    winnerId: null,
    winReason: '',
    createdAt: now,
    tabSwitches: { [player1.userId]: 0 },
  };

  if (player2) {
    matchData.tabSwitches[player2.userId] = 0;
  }

  await adminDb.collection('combat_matches').doc(matchId).set(matchData);

  return { matchId, ...matchData };
};

/**
 * Get a match by ID.
 */
const getMatch = async (matchId) => {
  const doc = await adminDb.collection('combat_matches').doc(matchId).get();
  if (!doc.exists) return null;
  return { matchId: doc.id, ...doc.data() };
};

/**
 * Save a submission result for a player.
 */
const saveSubmission = async (matchId, playerId, submissionData) => {
  const submissionRef = adminDb
    .collection('combat_matches')
    .doc(matchId)
    .collection('combat_submissions')
    .doc();

  await submissionRef.set({
    ...submissionData,
    playerId,
    matchId,
    submittedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Update the player's result on the match document
  const match = await getMatch(matchId);
  if (!match) return;

  const playerField = match.player1.uid === playerId ? 'player1Result' : 'player2Result';

  await adminDb.collection('combat_matches').doc(matchId).update({
    [playerField]: {
      testCasesPassed: submissionData.testCasesPassed,
      totalTestCases: submissionData.totalTestCases,
      executionTimeMs: submissionData.executionTimeMs,
      memoryUsageMB: submissionData.memoryUsageMB || 0,
      estimatedTimeComplexity: submissionData.estimatedTimeComplexity || 'N/A',
      estimatedSpaceComplexity: submissionData.estimatedSpaceComplexity || 'N/A',
      verdict: submissionData.verdict,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
  });

  return submissionRef.id;
};

/**
 * Determine the winner of a match.
 * Priority: all tests passed → time complexity → space complexity → execution time → submission time
 */
const determineWinner = async (matchId) => {
  const match = await getMatch(matchId);
  if (!match) return null;

  const r1 = match.player1Result;
  const r2 = match.player2Result;

  // If no player2 (bot match) and player1 submitted
  if (!match.player2 && r1) {
    return {
      winnerId: match.player1.uid,
      winReason: 'Bot match completed',
    };
  }

  // If only one player submitted
  if (r1 && !r2) {
    return { winnerId: match.player1.uid, winReason: 'Opponent did not submit' };
  }
  if (!r1 && r2) {
    return { winnerId: match.player2.uid, winReason: 'Opponent did not submit' };
  }
  if (!r1 && !r2) {
    return { winnerId: null, winReason: 'Neither player submitted' };
  }

  // 1. All test cases passed
  const p1AllPassed = r1.testCasesPassed === r1.totalTestCases;
  const p2AllPassed = r2.testCasesPassed === r2.totalTestCases;

  if (p1AllPassed && !p2AllPassed) {
    return { winnerId: match.player1.uid, winReason: 'All test cases passed' };
  }
  if (!p1AllPassed && p2AllPassed) {
    return { winnerId: match.player2.uid, winReason: 'All test cases passed' };
  }

  // If neither passed all, compare test cases passed
  if (!p1AllPassed && !p2AllPassed) {
    if (r1.testCasesPassed > r2.testCasesPassed) {
      return { winnerId: match.player1.uid, winReason: 'More test cases passed' };
    }
    if (r2.testCasesPassed > r1.testCasesPassed) {
      return { winnerId: match.player2.uid, winReason: 'More test cases passed' };
    }
  }

  // 2. Better time complexity
  const complexityRank = { 'O(1)': 1, 'O(log n)': 2, 'O(n)': 3, 'O(n log n)': 4, 'O(n²)': 5, 'O(2^n)': 6, 'N/A': 7 };
  const tc1 = complexityRank[r1.estimatedTimeComplexity] || 7;
  const tc2 = complexityRank[r2.estimatedTimeComplexity] || 7;

  if (tc1 < tc2) return { winnerId: match.player1.uid, winReason: 'Better time complexity' };
  if (tc2 < tc1) return { winnerId: match.player2.uid, winReason: 'Better time complexity' };

  // 3. Better space complexity
  const sc1 = complexityRank[r1.estimatedSpaceComplexity] || 7;
  const sc2 = complexityRank[r2.estimatedSpaceComplexity] || 7;

  if (sc1 < sc2) return { winnerId: match.player1.uid, winReason: 'Better space complexity' };
  if (sc2 < sc1) return { winnerId: match.player2.uid, winReason: 'Better space complexity' };

  // 4. Faster execution time
  if (r1.executionTimeMs < r2.executionTimeMs) {
    return { winnerId: match.player1.uid, winReason: 'Faster execution' };
  }
  if (r2.executionTimeMs < r1.executionTimeMs) {
    return { winnerId: match.player2.uid, winReason: 'Faster execution' };
  }

  // 5. Draw
  return { winnerId: null, winReason: 'Draw' };
};

/**
 * End a match — determine winner, update Firestore, award XP.
 */
const endMatch = async (matchId) => {
  const result = await determineWinner(matchId);
  if (!result) return null;

  const now = admin.firestore.FieldValue.serverTimestamp();

  await adminDb.collection('combat_matches').doc(matchId).update({
    status: MATCH_STATUS.COMPLETED,
    endedAt: now,
    winnerId: result.winnerId,
    winReason: result.winReason,
  });

  // Reload match with latest data
  const match = await getMatch(matchId);

  // Run plagiarism check on final submissions if both sides submitted code
  await runPlagiarismCheck(matchId, match);

  // Award XP and update combat stats
  if (match && result.winnerId) {
    const loserId = match.player1.uid === result.winnerId
      ? match.player2?.uid
      : match.player1.uid;

    // Update winner stats
    await updateCombatStats(result.winnerId, 'win', matchId);

    // Update loser stats (if not a bot)
    if (loserId) {
      await updateCombatStats(loserId, 'loss', matchId);
    }
  } else if (match && !result.winnerId && result.winReason === 'Draw') {
    await updateCombatStats(match.player1.uid, 'draw', matchId);
    if (match.player2?.uid) {
      await updateCombatStats(match.player2.uid, 'draw', matchId);
    }
  }

  return { ...result, match };
};

/**
 * Run plagiarism detection on the latest submissions from both players.
 */
const runPlagiarismCheck = async (matchId, match) => {
  if (!match || !match.player1 || !match.player2) {
    return;
  }

  try {
    const submissionsRef = adminDb
      .collection('combat_matches')
      .doc(matchId)
      .collection('combat_submissions');

    const [p1Snap, p2Snap] = await Promise.all([
      submissionsRef
        .where('playerId', '==', match.player1.uid)
        .orderBy('submittedAt', 'desc')
        .limit(1)
        .get(),
      submissionsRef
        .where('playerId', '==', match.player2.uid)
        .orderBy('submittedAt', 'desc')
        .limit(1)
        .get(),
    ]);

    if (p1Snap.empty || p2Snap.empty) return;

    const p1Code = p1Snap.docs[0].data().code || '';
    const p2Code = p2Snap.docs[0].data().code || '';

    const { isPlagiarized, similarity } = checkPlagiarism(p1Code, p2Code);

    if (isPlagiarized) {
      await adminDb.collection('combat_matches').doc(matchId).update({
        plagiarism: {
          similarity,
          flaggedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
      });
    }
  } catch (err) {
    // Plagiarism checks should never break match finalization
    console.error('Plagiarism check failed for match', matchId, err.message);
  }
};

/**
 * Update combat stats on user document.
 * Also updates overall XP and maintains a rolling matchHistory (last 50 matchIds).
 */
const updateCombatStats = async (userId, outcome, matchId) => {
  const userRef = adminDb.collection('users').doc(userId);
  const userDoc = await userRef.get();

  const currentStats = userDoc.exists && userDoc.data().combatStats
    ? userDoc.data().combatStats
    : { wins: 0, losses: 0, draws: 0, winStreak: 0, bestWinStreak: 0, combatXP: 0, matchHistory: [] };

  let xpDelta = 0;
  const newStats = { ...currentStats };

  if (outcome === 'win') {
    newStats.wins += 1;
    newStats.winStreak += 1;
    newStats.bestWinStreak = Math.max(newStats.bestWinStreak, newStats.winStreak);
    xpDelta = XP_REWARDS.WIN + Math.min(newStats.winStreak * XP_REWARDS.STREAK_BONUS, XP_REWARDS.STREAK_CAP);
  } else if (outcome === 'loss') {
    newStats.losses += 1;
    newStats.winStreak = 0;
    // Don't apply negative XP for users at level 1
    const currentLevel = userDoc.exists && typeof userDoc.data().level === 'number'
      ? userDoc.data().level
      : 1;
    xpDelta = currentLevel > 1 ? XP_REWARDS.LOSE : 0;
  } else {
    newStats.draws += 1;
    newStats.winStreak = 0;
    xpDelta = XP_REWARDS.DRAW;
  }

  newStats.combatXP += xpDelta;

  // Maintain rolling match history of last 50 matches
  if (matchId) {
    const existingHistory = Array.isArray(newStats.matchHistory)
      ? newStats.matchHistory
      : [];
    const updatedHistory = [matchId, ...existingHistory.filter(id => id !== matchId)].slice(0, 50);
    newStats.matchHistory = updatedHistory;
  }

  const updatePayload = {
    combatStats: newStats,
  };

  if (xpDelta !== 0) {
    updatePayload.xp = admin.firestore.FieldValue.increment(xpDelta);
  }

  await userRef.set(updatePayload, { merge: true });

  return { xpDelta, newStats };
};

/**
 * Get a random combat problem.
 */
const getRandomProblem = async (difficulty) => {
  let q = adminDb.collection('combat_problems');
  if (difficulty) {
    q = q.where('difficulty', '==', difficulty);
  }

  const snapshot = await q.get();
  if (snapshot.empty) return null;

  const docs = snapshot.docs;
  const randomIndex = Math.floor(Math.random() * docs.length);
  return { problemId: docs[randomIndex].id, ...docs[randomIndex].data() };
};

/**
 * Get match history for a user.
 */
const getMatchHistory = async (userId, limitCount = 20) => {
  const snapshot = await adminDb.collection('combat_matches')
    .where('status', '==', MATCH_STATUS.COMPLETED)
    .orderBy('endedAt', 'desc')
    .limit(limitCount)
    .get();

  // Filter matches that include this user
  return snapshot.docs
    .map(doc => ({ matchId: doc.id, ...doc.data() }))
    .filter(match =>
      match.player1?.uid === userId || match.player2?.uid === userId
    );
};

module.exports = {
  createMatch,
  getMatch,
  saveSubmission,
  determineWinner,
  endMatch,
  getRandomProblem,
  getMatchHistory,
  updateCombatStats,
};
