import { db } from '../firebase.ts';
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { AttemptDoc, TopicStatsDoc, DifficultyBand } from '../types/tutor';

// Utility: clamp difficulty band shifts
const upshift: Record<DifficultyBand, DifficultyBand> = { easy: 'medium', medium: 'hard', hard: 'hard' };
const downshift: Record<DifficultyBand, DifficultyBand> = { easy: 'easy', medium: 'easy', hard: 'medium' };

// Compute EMA
function ema(prev: number | undefined, value: number, alpha = 0.3): number {
  if (prev == null || Number.isNaN(prev)) return value;
  return alpha * value + (1 - alpha) * prev;
}

export async function startAttempt(params: {
  userId: string;
  questionId: string;
  topic: string;
  difficulty: DifficultyBand;
  language?: string;
}): Promise<string> {
  const attemptsCol = collection(db, 'attempts');
  const now = new Date();
  const docRef = await addDoc(attemptsCol, {
    userId: params.userId,
    questionId: params.questionId,
    topic: params.topic,
    difficulty: params.difficulty,
    language: params.language || null,
    startedAt: now,
    endedAt: null,
    timeTakenSec: null,
    wrongAttempts: 0,
    finalCorrect: false,
    wasSkipped: false,
    errorTypes: [],
    hintTiersUsed: [],
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  return docRef.id;
}

export async function logWrongSubmission(params: {
  attemptId: string;
  errorTypes?: string[];
  code?: string;
  hintTierUsed?: number;
}): Promise<void> {
  const ref = doc(db, 'attempts', params.attemptId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Attempt not found');
  const data = snap.data() as any;
  const wrongAttempts = (data.wrongAttempts || 0) + 1;
  const errorTypes = Array.from(new Set([...(data.errorTypes || []), ...(params.errorTypes || [])]));
  const hintTiersUsed = [...(data.hintTiersUsed || []), ...(params.hintTierUsed ? [params.hintTierUsed] : [])];
  await updateDoc(ref, {
    wrongAttempts,
    errorTypes,
    code: params.code ?? data.code ?? null,
    hintTiersUsed,
    updated_at: serverTimestamp(),
  });
}

export async function completeAttempt(params: {
  attemptId: string;
  finalCorrect: boolean;
  wasSkipped?: boolean;
}): Promise<AttemptDoc> {
  const ref = doc(db, 'attempts', params.attemptId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Attempt not found');
  const now = new Date();
  const d = snap.data() as any;

  const startedAt = (d.startedAt?.toDate?.() || d.startedAt || now) as Date;
  const timeTakenSec = Math.max(0, Math.round((now.getTime() - new Date(startedAt).getTime()) / 1000));

  await updateDoc(ref, {
    endedAt: now,
    timeTakenSec,
    finalCorrect: params.finalCorrect,
    wasSkipped: !!params.wasSkipped,
    updated_at: serverTimestamp(),
  });

  // Update topic stats for the user
  await updateTopicStats({
    userId: d.userId,
    topic: d.topic,
    currentDifficulty: d.difficulty as DifficultyBand,
    finalCorrect: params.finalCorrect,
    timeTakenSec,
    wasSkipped: !!params.wasSkipped,
  });

  const updatedSnap = await getDoc(ref);
  const out = updatedSnap.data() as any;
  return normalizeAttempt({ id: params.attemptId, ...out });
}

function normalizeAttempt(data: any): AttemptDoc {
  return {
    id: data.id,
    userId: data.userId,
    questionId: data.questionId,
    topic: data.topic,
    difficulty: data.difficulty,
    language: data.language ?? undefined,
    startedAt: data.startedAt?.toDate?.() || data.startedAt,
    endedAt: data.endedAt?.toDate?.() || data.endedAt || null,
    timeTakenSec: data.timeTakenSec ?? undefined,
    wrongAttempts: data.wrongAttempts ?? 0,
    finalCorrect: !!data.finalCorrect,
    wasSkipped: !!data.wasSkipped,
    errorTypes: data.errorTypes || [],
    code: data.code ?? undefined,
    hintTiersUsed: data.hintTiersUsed || [],
  } as AttemptDoc;
}

export async function getUserTopicStats(userId: string, topic: string): Promise<TopicStatsDoc | null> {
  const ref = doc(db, 'users', userId, 'topic_stats', topic);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const d = snap.data() as any;
  return {
    id: topic,
    userId,
    topic,
    accuracyEma: d.accuracyEma ?? 0,
    avgTimeSecEma: d.avgTimeSecEma ?? 0,
    attempts: d.attempts ?? 0,
    correct: d.correct ?? 0,
    recentFailures: d.recentFailures ?? 0,
    currentDifficulty: (d.currentDifficulty as DifficultyBand) || 'easy',
    lastUpdated: d.lastUpdated?.toDate?.() || d.lastUpdated || new Date(),
  };
}

export async function updateTopicStats(params: {
  userId: string;
  topic: string;
  currentDifficulty: DifficultyBand;
  finalCorrect: boolean;
  timeTakenSec: number;
  wasSkipped: boolean;
}): Promise<TopicStatsDoc> {
  const ref = doc(db, 'users', params.userId, 'topic_stats', params.topic);
  const snap = await getDoc(ref);
  const prev = snap.exists() ? (snap.data() as any) : null;

  const attempts = (prev?.attempts ?? 0) + 1;
  const correct = (prev?.correct ?? 0) + (params.finalCorrect ? 1 : 0);
  const accuracy = attempts > 0 ? correct / attempts : 0;

  const newAccuracyEma = ema(prev?.accuracyEma, params.finalCorrect ? 1 : 0, 0.3);
  const newAvgTimeEma = ema(prev?.avgTimeSecEma, params.timeTakenSec, 0.3);
  const newRecentFailures = params.finalCorrect ? 0 : Math.min(10, (prev?.recentFailures ?? 0) + 1);

  // Simple band adaptation
  let newBand: DifficultyBand = prev?.currentDifficulty || params.currentDifficulty || 'easy';
  if (newRecentFailures >= 3) newBand = downshift[newBand];
  else if (newAccuracyEma >= 0.8 && newAvgTimeEma <= (prev?.avgTimeSecEma ?? params.timeTakenSec)) newBand = upshift[newBand];

  await setDoc(ref, {
    userId: params.userId,
    topic: params.topic,
    accuracyEma: newAccuracyEma,
    avgTimeSecEma: newAvgTimeEma,
    attempts,
    correct,
    recentFailures: newRecentFailures,
    currentDifficulty: newBand,
    lastUpdated: serverTimestamp(),
  }, { merge: true });

  return {
    id: params.topic,
    userId: params.userId,
    topic: params.topic,
    accuracyEma: newAccuracyEma,
    avgTimeSecEma: newAvgTimeEma,
    attempts,
    correct,
    recentFailures: newRecentFailures,
    currentDifficulty: newBand,
    lastUpdated: new Date(),
  };
}

export async function recordRecentQuestion(params: { userId: string; questionId: string }): Promise<void> {
  const ref = doc(db, 'users', params.userId, 'recent_questions', params.questionId);
  await setDoc(ref, {
    lastSeen: serverTimestamp(),
  }, { merge: true });
}