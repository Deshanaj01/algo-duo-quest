import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useGame } from '../context/GameContext.tsx';
import CombatTimer from '../components/combat/CombatTimer.tsx';
import CombatProblemPanel from '../components/combat/CombatProblemPanel.tsx';
import CombatEditor from '../components/combat/CombatEditor.tsx';
import OpponentProgress from '../components/combat/OpponentProgress.tsx';
import {
  CombatMatch,
  CombatMatchEndPayload,
  CombatMatchFoundPayload,
  CombatOpponentProgressPayload,
  CombatProblem,
  CombatSubmissionResultPayload,
  CombatTimerSyncPayload,
} from '../types/combat';
import {
  getCombatSocket,
  notifyCombatTabSwitch,
  submitCombatCode,
} from '../services/combatService.ts';

interface LocationState {
  initialMatch?: CombatMatchFoundPayload;
}

const MAX_SUBMISSIONS = 5;

const CombatArenaPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { earnXP } = useGame();

  const state = (location.state || {}) as LocationState;

  const [problem, setProblem] = useState<CombatProblem | null>(
    state.initialMatch?.problem || null,
  );
  const [opponentName, setOpponentName] = useState<string>(
    state.initialMatch?.opponent.displayName || 'Opponent',
  );
  const [remainingSeconds, setRemainingSeconds] = useState<number>(600);
  const [code, setCode] = useState<string>('// Write your solution here');
  const [language] = useState<'javascript' | 'python'>('javascript');
  const [remainingSubmissions, setRemainingSubmissions] =
    useState<number>(MAX_SUBMISSIONS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testSummary, setTestSummary] = useState<{
    verdict: string;
    passed: number;
    total: number;
    timeMs: number;
    timeComplexity: string;
    spaceComplexity: string;
    error?: string;
  } | null>(null);
  const [opponentProgress, setOpponentProgress] =
    useState<CombatOpponentProgressPayload>({
      testCasesPassed: 0,
      totalTestCases: 0,
      submissionCount: 0,
    });

  useEffect(() => {
    const socket = getCombatSocket();

    // Join match room so we receive timer + opponent events
    if (matchId) {
      socket.emit('combat:join-match', { matchId });
    }

    const handleTimer = (payload: CombatTimerSyncPayload) => {
      setRemainingSeconds(payload.remainingSeconds);
    };

    const handleOpponentProgress = (payload: CombatOpponentProgressPayload) => {
      setOpponentProgress(payload);
    };

    const handleSubmissionResult = (
      payload: CombatSubmissionResultPayload & { error?: string },
    ) => {
      if (payload.error) {
        setTestSummary({
          verdict: 'error',
          passed: 0,
          total: 0,
          timeMs: 0,
          timeComplexity: 'N/A',
          spaceComplexity: 'N/A',
          error: payload.error,
        });
        return;
      }
      setTestSummary({
        verdict: payload.verdict,
        passed: payload.testCasesPassed,
        total: payload.totalTestCases,
        timeMs: payload.executionTimeMs,
        timeComplexity: payload.estimatedTimeComplexity,
        spaceComplexity: payload.estimatedSpaceComplexity,
      });
      setRemainingSubmissions(payload.submissionsLeft);
    };

    const handleMatchEnd = (payload: CombatMatchEndPayload) => {
      if (!user || !matchId) return;

      const isWinner = payload.winnerId === user.uid;
      const isDraw = payload.winnerId == null;
      const appliedXP = isWinner ? 25 : isDraw ? 5 : -10;

      // #region agent log
      fetch('http://127.0.0.1:7636/ingest/eb9226df-3a87-4a4d-b980-a9535ec6387b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ddd24' },
        body: JSON.stringify({
          sessionId: '1ddd24',
          runId: 'initial',
          hypothesisId: 'H2',
          location: 'CombatArenaPage.tsx:handleMatchEnd',
          message: 'Socket match-end XP decision',
          data: {
            matchId,
            winnerId: payload.winnerId,
            userId: user.uid,
            isWinner,
            isDraw,
            appliedXP,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      navigate(`/combat/${matchId}/results`, {
        state: { matchEnd: payload },
      });
    };

    socket.on('combat:timer-sync', handleTimer);
    socket.on('combat:opponent-progress', handleOpponentProgress);
    socket.on('combat:submission-result', handleSubmissionResult);
    socket.on('combat:match-end', handleMatchEnd);

    return () => {
      socket.off('combat:timer-sync', handleTimer);
      socket.off('combat:opponent-progress', handleOpponentProgress);
      socket.off('combat:submission-result', handleSubmissionResult);
      socket.off('combat:match-end', handleMatchEnd);
    };
  }, [earnXP, matchId, navigate, user]);

  const handleSubmit = async () => {
    if (!user || !matchId) return;
    if (remainingSubmissions <= 0) return;
    setIsSubmitting(true);
    try {
      // Use REST submit so we get full structured response immediately
      const res = await submitCombatCode({
        matchId,
        code,
        language,
      });
      setTestSummary({
        verdict: res.verdict,
        passed: res.testCasesPassed,
        total: res.totalTestCases,
        timeMs: res.executionTimeMs,
        timeComplexity: res.estimatedTimeComplexity,
        spaceComplexity: res.estimatedSpaceComplexity,
      });
      setRemainingSubmissions(res.submissionsLeft);

      if (res.matchEnded && res.matchResult) {
        const payload = res.matchResult;
        const isWinner = payload.winnerId === user.uid;
        const isDraw = payload.winnerId == null;
        const appliedXP = isWinner ? 25 : isDraw ? 5 : -10;

        // #region agent log
        fetch('http://127.0.0.1:7636/ingest/eb9226df-3a87-4a4d-b980-a9535ec6387b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '1ddd24' },
          body: JSON.stringify({
            sessionId: '1ddd24',
            runId: 'initial',
            hypothesisId: 'H3',
            location: 'CombatArenaPage.tsx:handleSubmit',
            message: 'REST match-end XP decision',
            data: {
              matchId,
              winnerId: payload.winnerId,
              userId: user.uid,
              isWinner,
              isDraw,
              appliedXP,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion

        navigate(`/combat/${matchId}/results`, {
          state: { matchEnd: payload },
        });
      }
    } catch (error: any) {
      setTestSummary({
        verdict: 'error',
        passed: 0,
        total: 0,
        timeMs: 0,
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A',
        error: error?.message || 'Submission failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabSwitch = () => {
    if (user && matchId) {
      notifyCombatTabSwitch(matchId, user.uid);
    }
  };

  // 
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <CombatTimer remainingSeconds={remainingSeconds} />
  
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-4">
        {/* 🔥 3 COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-96px)]">
  
          {/* ---------------- LEFT: PROBLEM ---------------- */}
          <div className="flex flex-col gap-3 h-full">
            <CombatProblemPanel problem={problem} />
          </div>
  
          {/* ---------------- CENTER: EDITOR ---------------- */}
          <div className="flex flex-col min-h-0 h-full">
            <div className="flex-1 min-h-0">
              <CombatEditor
                code={code}
                language={language}
                onChange={setCode}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                remainingSubmissions={remainingSubmissions}
                onTabSwitchDetected={handleTabSwitch}
              />
            </div>
  
            {/* Console */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 h-32 text-xs text-gray-300 overflow-y-auto mt-3">
              <div className="font-semibold mb-1">Console</div>
              {testSummary ? (
                <div className="space-y-1">
                  <div>
                    Verdict:{' '}
                    <span className="font-semibold text-emerald-300">
                      {testSummary.verdict}
                    </span>
                  </div>
                  <div>
                    Tests:{' '}
                    <span className="font-semibold">
                      {testSummary.passed}/{testSummary.total}
                    </span>
                  </div>
                  <div>
                    Time:{' '}
                    <span className="font-semibold">
                      {testSummary.timeMs} ms
                    </span>
                  </div>
                  <div>
                    Complexity:{' '}
                    <span className="font-semibold">
                      {testSummary.timeComplexity} /{' '}
                      {testSummary.spaceComplexity}
                    </span>
                  </div>
                  {testSummary.error && (
                    <div className="text-red-400">
                      Error: {testSummary.error}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500">
                  Submit your code to see results.
                </div>
              )}
            </div>
          </div>
  
          {/* ---------------- RIGHT: OPPONENT ---------------- */}
          <div className="flex flex-col gap-3 h-full">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-white mb-1">
                Opponent
              </h2>
              <div className="text-xs text-gray-300 mb-2">
                {opponentName}
              </div>
              <div className="text-[11px] text-gray-500">
                We&apos;ll show limited information about your opponent to keep
                things fair.
              </div>
            </div>
  
            <OpponentProgress
              testCasesPassed={opponentProgress.testCasesPassed}
              totalTestCases={opponentProgress.totalTestCases}
              submissionCount={opponentProgress.submissionCount}
            />
  
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 text-xs text-gray-300">
              <h2 className="text-sm font-semibold text-white mb-2">
                Rules
              </h2>
              <ul className="list-disc pl-4 space-y-1">
                <li>No pasting code into the editor.</li>
                <li>Tab switches are monitored and may trigger warnings.</li>
                <li>You have up to 5 submissions to get the best solution.</li>
                <li>
                  Winner is decided by correctness, complexity, and total
                  runtime.
                </li>
              </ul>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default CombatArenaPage;

