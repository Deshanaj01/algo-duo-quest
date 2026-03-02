const { adminDb } = require('../config/firebase');
const { admin } = require('../config/firebase');
const { stringSimilarity, normalizeCode } = require('../utils/helpers');
const { ANTI_CHEAT } = require('../utils/constants');

/**
 * Check plagiarism between two code submissions.
 * Returns { isPlagiarized, similarity }
 */
const checkPlagiarism = (code1, code2) => {
  const normalized1 = normalizeCode(code1);
  const normalized2 = normalizeCode(code2);

  const similarity = stringSimilarity(normalized1, normalized2);

  return {
    isPlagiarized: similarity >= ANTI_CHEAT.PLAGIARISM_THRESHOLD,
    similarity: Math.round(similarity * 100),
  };
};

/**
 * Record a tab switch for a player in a match.
 * Returns the updated tab switch count.
 */
const recordTabSwitch = async (matchId, userId) => {
  const matchRef = adminDb.collection('combat_matches').doc(matchId);
  const matchDoc = await matchRef.get();

  if (!matchDoc.exists) return 0;

  const currentSwitches = matchDoc.data().tabSwitches || {};
  const count = (currentSwitches[userId] || 0) + 1;

  await matchRef.update({
    [`tabSwitches.${userId}`]: count,
  });

  return count;
};

/**
 * Check violation count for a player in a match.
 */
const checkViolations = async (matchId, userId) => {
  const matchDoc = await adminDb.collection('combat_matches').doc(matchId).get();

  if (!matchDoc.exists) return { count: 0, exceeded: false };

  const tabSwitches = matchDoc.data().tabSwitches || {};
  const count = tabSwitches[userId] || 0;

  return {
    count,
    exceeded: count >= ANTI_CHEAT.MAX_TAB_SWITCHES,
  };
};

module.exports = { checkPlagiarism, recordTabSwitch, checkViolations };
