// const { COMBAT } = require('../utils/constants');
// const { generateMatchId } = require('../utils/helpers');
// const { adminDb } = require('../config/firebase');
// const fetch = require('node-fetch');

// // In-memory matchmaking queue
// // Each entry: { userId, displayName, xp, photoURL, socketId, joinedAt }
// const queue = [];

// // Timeout handles for bot fallback
// const timeouts = new Map();

// /**
//  * Add a player to the matchmaking queue.
//  * Returns matched opponent info if found immediately, or null.
//  */
// const joinQueue = (player) => {
//   // Don't allow duplicate entries
//   if (queue.find(p => p.userId === player.userId)) {
//     return null;
//   }

//   // Try to find a match first
//   const opponent = findMatch(player);
//   if (opponent) {
//     // Remove opponent from queue
//     removeFromQueue(opponent.userId);
//     return opponent;
//   }

//   // No match found, add to queue
//   queue.push({
//     ...player,
//     joinedAt: Date.now(),
//   });

//   // Sort by XP for efficient matching
//   queue.sort((a, b) => a.xp - b.xp);

//   return null;
// };

// /**
//  * Remove a player from the queue.
//  */
// const leaveQueue = (userId) => {
//   removeFromQueue(userId);
//   // Clear bot timeout if exists
//   if (timeouts.has(userId)) {
//     clearTimeout(timeouts.get(userId));
//     timeouts.delete(userId);
//   }
// };

// /**
//  * Find a matching opponent within XP range.
//  */
// const findMatch = (player) => {
//   const xpRange = COMBAT.MATCHMAKING_XP_RANGE;

//   for (let i = 0; i < queue.length; i++) {
//     const candidate = queue[i];
//     if (candidate.userId === player.userId) continue;

//     if (Math.abs(candidate.xp - player.xp) <= xpRange) {
//       return candidate;
//     }
//   }

//   return null;
// };

// /**
//  * Remove player from queue array.
//  */
// const removeFromQueue = (userId) => {
//   const index = queue.findIndex(p => p.userId === userId);
//   if (index !== -1) {
//     queue.splice(index, 1);
//   }
// };

// /**
//  * Set up a bot fallback timeout for a player.
//  * After MATCHMAKING_TIMEOUT_MS, creates a bot match.
//  */
// const setupBotFallback = (player, onBotMatch) => {
//   const timeout = setTimeout(() => {
//     // Check if player is still in queue
//     const inQueue = queue.find(p => p.userId === player.userId);
//     if (inQueue) {
//       // #region agent log
//       fetch('http://127.0.0.1:7636/ingest/eb9226df-3a87-4a4d-b980-a9535ec6387b', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ddd24' },
//         body: JSON.stringify({
//           sessionId: '1ddd24',
//           runId: 'initial',
//           hypothesisId: 'B1',
//           location: 'matchmaking.service.js:setupBotFallback',
//           message: 'Bot fallback firing',
//           data: { userId: player.userId, xp: player.xp },
//           timestamp: Date.now(),
//         }),
//       }).catch(() => {});
//       // #endregion

//       removeFromQueue(player.userId);
//       onBotMatch(player);
//     }
//     timeouts.delete(player.userId);
//   }, COMBAT.MATCHMAKING_TIMEOUT_MS);

//   timeouts.set(player.userId, timeout);
// };

// /**
//  * Get current queue size.
//  */
// const getQueueSize = () => queue.length;

// /**
//  * Get queue info (for debugging/admin).
//  */
// const getQueueInfo = () => {
//   return queue.map(p => ({
//     userId: p.userId,
//     xp: p.xp,
//     waitTime: Date.now() - p.joinedAt,
//   }));
// };

// module.exports = {
//   joinQueue,
//   leaveQueue,
//   findMatch,
//   setupBotFallback,
//   getQueueSize,
//   getQueueInfo,
// };
const { COMBAT } = require('../utils/constants');
const { generateMatchId } = require('../utils/helpers');
const { adminDb } = require('../config/firebase');
const fetch = require('node-fetch');

// In-memory matchmaking queue
// Each entry: { userId, displayName, xp, photoURL, socketId, joinedAt }
const queue = [];

// Timeout handles for bot fallback
const timeouts = new Map();

/**
 * Add a player to the matchmaking queue.
 * Returns matched opponent info if found immediately, or null.
 */
const joinQueue = (player) => {
  // Prevent duplicate entries
  if (queue.find(p => p.userId === player.userId)) {
    return null;
  }

  // Try to find match immediately
  const opponent = findMatch(player);

  if (opponent) {
    removeFromQueue(opponent.userId);
    return opponent;
  }

  // Add player to queue
  const queuedPlayer = {
    ...player,
    joinedAt: Date.now(),
  };

  queue.push(queuedPlayer);

  // Sort by XP
  queue.sort((a, b) => a.xp - b.xp);

  return null;
};

/**
 * Remove a player from the queue.
 */
const leaveQueue = (userId) => {
  removeFromQueue(userId);

  if (timeouts.has(userId)) {
    clearTimeout(timeouts.get(userId));
    timeouts.delete(userId);
  }
};

/**
 * Find a matching opponent within XP range.
 */
const findMatch = (player) => {
  const xpRange = COMBAT.MATCHMAKING_XP_RANGE;

  for (let i = 0; i < queue.length; i++) {
    const candidate = queue[i];

    if (candidate.userId === player.userId) continue;

    if (Math.abs(candidate.xp - player.xp) <= xpRange) {
      return candidate;
    }
  }

  return null;
};

/**
 * Remove player from queue array.
 */
const removeFromQueue = (userId) => {
  const index = queue.findIndex(p => p.userId === userId);
  if (index !== -1) {
    queue.splice(index, 1);
  }
};

/**
 * Set up bot fallback timeout.
 * After MATCHMAKING_TIMEOUT_MS, creates bot match if still waiting.
 */
const setupBotFallback = (player, onBotMatch) => {

  // Clear existing timeout if any
  if (timeouts.has(player.userId)) {
    clearTimeout(timeouts.get(player.userId));
  }

  const timeout = setTimeout(() => {

    // 🔥 IMPORTANT FIX:
    // Get the ACTUAL object stored in queue
    const index = queue.findIndex(p => p.userId === player.userId);

    if (index !== -1) {
      const queuedPlayer = queue[index];

      removeFromQueue(queuedPlayer.userId);

      // Call bot match using stored object
      onBotMatch(queuedPlayer);
    }

    timeouts.delete(player.userId);

  }, COMBAT.MATCHMAKING_TIMEOUT_MS);

  timeouts.set(player.userId, timeout);
};

/**
 * Get current queue size.
 */
const getQueueSize = () => queue.length;

/**
 * Get queue info (for debugging/admin).
 */
const getQueueInfo = () => {
  return queue.map(p => ({
    userId: p.userId,
    xp: p.xp,
    waitTime: Date.now() - p.joinedAt,
  }));
};

module.exports = {
  joinQueue,
  leaveQueue,
  findMatch,
  setupBotFallback,
  getQueueSize,
  getQueueInfo,
};