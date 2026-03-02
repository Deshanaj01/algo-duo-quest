const matchmakingService = require('../services/matchmaking.service');
const combatService = require('../services/combat.service');
const { executeCode } = require('../services/codeExecution.service');
const { estimateComplexity } = require('../services/complexity.service');
const { recordTabSwitch, checkViolations } = require('../services/antiCheat.service');
const { COMBAT, MATCH_STATUS, ANTI_CHEAT } = require('../utils/constants');

// Active match timers: matchId -> { interval, startTime, duration }
const activeTimers = new Map();

// Track submission counts per match per player: matchId -> { userId: count }
const submissionCounts = new Map();

/**
 * Initialize Socket.IO combat handlers.
 */
const initCombatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`⚔️ Combat socket connected: ${socket.id}`);

    // --- JOIN QUEUE ---
    // --- JOIN QUEUE ---
socket.on('combat:join-queue', async (data) => {
  try {
    const { userId, displayName, xp, photoURL } = data;

    const player = {
      userId,
      displayName,
      xp: xp || 0,
      photoURL: photoURL || null,
      socketId: socket.id,
    };

    const opponent = matchmakingService.joinQueue(player);

    if (opponent) {
      // 🛑 CRITICAL FIX:
      // Remove both players from queue & clear bot timeouts
      matchmakingService.leaveQueue(player.userId);
      matchmakingService.leaveQueue(opponent.userId);

      await startMatch(io, player, opponent);
    } else {
      // Player added to queue
      socket.emit('combat:queue-joined', {
        position: matchmakingService.getQueueSize(),
      });

      // 🔥 Setup bot fallback correctly
      matchmakingService.setupBotFallback(player, async (queuedPlayer) => {
        // Make sure timeout is cleared before starting bot match
        matchmakingService.leaveQueue(queuedPlayer.userId);

        await startBotMatch(io, queuedPlayer);
      });
    }
  } catch (err) {
    console.error('Join queue error:', err);
    socket.emit('combat:error', { message: 'Failed to join queue' });
  }
});
    // socket.on('combat:join-queue', async (data) => {
    //   try {
    //     const { userId, displayName, xp, photoURL } = data;

    //     const player = {
    //       userId,
    //       displayName,
    //       xp: xp || 0,
    //       photoURL: photoURL || null,
    //       socketId: socket.id,
    //     };

    //     const opponent = matchmakingService.joinQueue(player);

    //     if (opponent) {
    //       // Match found! Create the match
    //       await startMatch(io, player, opponent);
    //     } else {
    //       // Added to queue, set up bot fallback
    //       socket.emit('combat:queue-joined', {
    //         position: matchmakingService.getQueueSize(),
    //       });

    //       matchmakingService.setupBotFallback(player, async (p) => {
    //         // Bot match fallback
    //         await startBotMatch(io, p);
    //       });
    //     }
    //   } catch (err) {
    //     console.error('Join queue error:', err);
    //     socket.emit('combat:error', { message: 'Failed to join queue' });
    //   }
    // });

    // --- LEAVE QUEUE ---
    socket.on('combat:leave-queue', (data) => {
      const { userId } = data;
      matchmakingService.leaveQueue(userId);
      socket.emit('combat:queue-left');
    });

    // --- SUBMIT CODE ---
    socket.on('combat:submit-code', async (data) => {
      try {
        const { matchId, userId, code, language } = data;

        // Check submission count
        const counts = submissionCounts.get(matchId) || {};
        const playerCount = counts[userId] || 0;

        if (playerCount >= COMBAT.MAX_SUBMISSIONS_PER_MATCH) {
          socket.emit('combat:submission-result', {
            error: 'Maximum submissions reached',
            submissionsLeft: 0,
          });
          return;
        }

        // Get match and problem data
        const match = await combatService.getMatch(matchId);
        if (!match || match.status !== MATCH_STATUS.IN_PROGRESS) {
          socket.emit('combat:error', { message: 'Match not active' });
          return;
        }

        const problem = await combatService.getRandomProblem(); // Will be fetched by problemId
        const problemDoc = await require('../config/firebase').adminDb
          .collection('combat_problems')
          .doc(match.problemId)
          .get();

        if (!problemDoc.exists) {
          socket.emit('combat:error', { message: 'Problem not found' });
          return;
        }

        const problemData = problemDoc.data();
        const allTestCases = [
          ...problemData.sampleTestCases,
          ...problemData.hiddenTestCases,
        ];

        // Execute code against test cases
        socket.emit('combat:submission-status', { status: 'running' });
        const execResult = await executeCode(code, language, allTestCases);

        // Estimate complexity if benchmarks available
        let complexity = { timeComplexity: 'N/A', spaceComplexity: 'N/A' };
        if (problemData.benchmarkInputs) {
          complexity = await estimateComplexity(code, language, problemData.benchmarkInputs);
        }

        // Build submission data
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

        // Save submission
        await combatService.saveSubmission(matchId, userId, submissionData);

        // Update submission count
        counts[userId] = playerCount + 1;
        submissionCounts.set(matchId, counts);

        // Send result to submitter
        socket.emit('combat:submission-result', {
          ...submissionData,
          results: execResult.results.map(r => ({
            input: r.input,
            passed: r.passed,
            timeMs: r.timeMs,
            // Don't expose expected output for hidden test cases
          })),
          submissionsLeft: COMBAT.MAX_SUBMISSIONS_PER_MATCH - (playerCount + 1),
        });

        // Notify opponent of progress
        socket.to(matchId).emit('combat:opponent-progress', {
          testCasesPassed: execResult.passed,
          totalTestCases: execResult.total,
          submissionCount: playerCount + 1,
        });

        // Check if all tests passed → could trigger early win
        if (execResult.verdict === 'accepted') {
          // Check if both players have accepted submissions
          const updatedMatch = await combatService.getMatch(matchId);
          if (updatedMatch.player1Result?.verdict === 'accepted' &&
              (updatedMatch.player2Result?.verdict === 'accepted' || !updatedMatch.player2)) {
            await endMatchAndNotify(io, matchId);
          }
        }
      } catch (err) {
        console.error('Submit code error:', err);
        socket.emit('combat:error', { message: 'Submission failed' });
      }
    });

    // --- TAB SWITCH ---
    socket.on('combat:tab-switch', async (data) => {
      try {
        const { matchId, userId } = data;

        const count = await recordTabSwitch(matchId, userId);
        const violations = await checkViolations(matchId, userId);

        if (violations.exceeded) {
          socket.emit('combat:violation-warning', {
            type: 'disqualification',
            message: 'Too many tab switches. You may be disqualified.',
            count,
          });
        } else {
          socket.emit('combat:violation-warning', {
            type: 'warning',
            message: `Tab switch detected (${count}/${ANTI_CHEAT.MAX_TAB_SWITCHES})`,
            count,
          });
        }
      } catch (err) {
        console.error('Tab switch error:', err);
      }
    });

    // --- JOIN MATCH ROOM ---
    socket.on('combat:join-match', (data) => {
      const { matchId } = data;
      socket.join(matchId);
    });

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
      console.log(`⚔️ Combat socket disconnected: ${socket.id}`);
      // Could handle cleanup here if needed
    });
  });
};

/**
 * Start a match between two real players.
 */
const startMatch = async (io, player1, player2) => {
  // Get a random problem
  const problem = await combatService.getRandomProblem();
  if (!problem) {
    const p1Socket = io.sockets.sockets.get(player1.socketId);
    const p2Socket = io.sockets.sockets.get(player2.socketId);
    if (p1Socket) p1Socket.emit('combat:error', { message: 'No problems available' });
    if (p2Socket) p2Socket.emit('combat:error', { message: 'No problems available' });
    return;
  }

  // Create match in Firestore
  const match = await combatService.createMatch(player1, player2, problem.problemId);

  // Join both players to match room
  const p1Socket = io.sockets.sockets.get(player1.socketId);
  const p2Socket = io.sockets.sockets.get(player2.socketId);

  if (p1Socket) {
    p1Socket.join(match.matchId);
    p1Socket.emit('combat:match-found', {
      matchId: match.matchId,
      opponent: {
        displayName: player2.displayName,
        xp: player2.xp,
        photoURL: player2.photoURL,
      },
      problem: {
        problemId: problem.problemId,
        title: problem.title,
        description: problem.description,
        constraints: problem.constraints,
        sampleTestCases: problem.sampleTestCases,
        difficulty: problem.difficulty,
      },
    });
  }

  if (p2Socket) {
    p2Socket.join(match.matchId);
    p2Socket.emit('combat:match-found', {
      matchId: match.matchId,
      opponent: {
        displayName: player1.displayName,
        xp: player1.xp,
        photoURL: player1.photoURL,
      },
      problem: {
        problemId: problem.problemId,
        title: problem.title,
        description: problem.description,
        constraints: problem.constraints,
        sampleTestCases: problem.sampleTestCases,
        difficulty: problem.difficulty,
      },
    });
  }

  // Start timer
  startMatchTimer(io, match.matchId, COMBAT.MATCH_DURATION_SECONDS);
};

/**
 * Start a bot match for a single player.
 */
// 
const startBotMatch = async (io, player) => {
  try {
    console.log("🤖 Bot fallback triggered for:", player.userId);

    const problem = await combatService.getRandomProblem();
    console.log("📚 Problem found:", !!problem);

    if (!problem) {
      console.log("❌ No problem available in Firestore");

      const playerSocket = io.sockets.sockets.get(player.socketId);
      if (playerSocket) {
        playerSocket.emit('combat:error', { 
          message: 'No problems available' 
        });
      }

      return;
    }

    const match = await combatService.createMatch(
      player,
      null,
      problem.problemId
    );

    console.log("✅ Bot match created:", match.matchId);

    const playerSocket = io.sockets.sockets.get(player.socketId);

    if (!playerSocket) {
      console.log("❌ Player socket not found:", player.socketId);
      return;
    }

    playerSocket.join(match.matchId);

    playerSocket.emit('combat:match-found', {
      matchId: match.matchId,
      opponent: {
        displayName: 'CodeBot',
        xp: player.xp,
        photoURL: null,
        isBot: true,
      },
      problem: {
        problemId: problem.problemId,
        title: problem.title,
        description: problem.description,
        constraints: problem.constraints,
        sampleTestCases: problem.sampleTestCases,
        difficulty: problem.difficulty,
      },
    });

    console.log("📡 combat:match-found emitted to:", player.socketId);

    startMatchTimer(io, match.matchId, COMBAT.MATCH_DURATION_SECONDS);

  } catch (error) {
    console.error("🔥 startBotMatch crashed:", error);
  }
};

/**
 * Start a countdown timer for a match.
 */
const startMatchTimer = (io, matchId, durationSeconds) => {
  let remaining = durationSeconds;

  const interval = setInterval(async () => {
    remaining--;

    io.to(matchId).emit('combat:timer-sync', {
      remainingSeconds: remaining,
    });

    if (remaining <= 0) {
      clearInterval(interval);
      activeTimers.delete(matchId);
      await endMatchAndNotify(io, matchId);
    }
  }, COMBAT.TIMER_SYNC_INTERVAL_MS);

  activeTimers.set(matchId, { interval, startTime: Date.now(), duration: durationSeconds });
};

/**
 * End a match and notify all players.
 */
const endMatchAndNotify = async (io, matchId) => {
  // Clear timer if still running
  const timer = activeTimers.get(matchId);
  if (timer) {
    clearInterval(timer.interval);
    activeTimers.delete(matchId);
  }

  // Clean up submission counts
  submissionCounts.delete(matchId);

  // Determine winner and end match
  const result = await combatService.endMatch(matchId);

  if (result) {
    io.to(matchId).emit('combat:match-end', {
      matchId,
      winnerId: result.winnerId,
      winReason: result.winReason,
      player1Result: result.match?.player1Result,
      player2Result: result.match?.player2Result,
    });
  }
};

module.exports = { initCombatSocket };
