import { useCallback, useRef, useState } from 'react';
import { startAttempt, logWrongSubmission, completeAttempt } from '../services/tutorService.ts';
import { selectNextProblem } from '../services/selectionService.ts';
import { getAdaptiveHint } from '../services/hintService.ts';
import type { AdaptiveHintResponse, DifficultyBand } from '../types/tutor.ts';

export function useAdaptiveTutor(userId: string) {
  const [currentAttemptId, setAttemptId] = useState<string | null>(null);
  const attemptCountRef = useRef<number>(0);

  const beginAttempt = useCallback(async (q: { id: string; topic: string; difficulty: DifficultyBand; language?: string }) => {
    const id = await startAttempt({ userId, questionId: q.id, topic: q.topic, difficulty: q.difficulty, language: q.language });
    setAttemptId(id);
    attemptCountRef.current = 0;
    return id;
  }, [userId]);

  const wrongSubmission = useCallback(async (opts: { errorTypes?: string[]; code?: string; hintTierUsed?: number }) => {
    if (!currentAttemptId) return;
    attemptCountRef.current += 1;
    await logWrongSubmission({ attemptId: currentAttemptId, ...opts });
  }, [currentAttemptId]);

  const finishAttempt = useCallback(async (opts: { finalCorrect: boolean; wasSkipped?: boolean }) => {
    if (!currentAttemptId) return null;
    const done = await completeAttempt({ attemptId: currentAttemptId, finalCorrect: opts.finalCorrect, wasSkipped: opts.wasSkipped });
    setAttemptId(null);
    attemptCountRef.current = 0;
    return done;
  }, [currentAttemptId]);

  const requestHint = useCallback(async (q: { id: string; language?: string }, errorTypes?: string[]): Promise<AdaptiveHintResponse> => {
    const attemptNum = Math.max(1, attemptCountRef.current + 1);
    return getAdaptiveHint({ questionId: q.id, userId, attemptId: currentAttemptId || 'na', attemptNumber: attemptNum, errorTypes, language: q.language });
  }, [userId, currentAttemptId]);

  const nextProblem = useCallback(async (topicPreference?: string) => {
    return selectNextProblem(userId, topicPreference);
  }, [userId]);

  return {
    beginAttempt,
    wrongSubmission,
    finishAttempt,
    requestHint,
    nextProblem,
    currentAttemptId,
  } as const;
}