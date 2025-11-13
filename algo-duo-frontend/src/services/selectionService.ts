import { db } from '../firebase.ts';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { DifficultyBand, NextProblemResponse } from '../types/tutor.ts';
import { getUserTopicStats, recordRecentQuestion } from './tutorService.ts';

const neighbors: Record<DifficultyBand, DifficultyBand[]> = {
  easy: ['easy', 'medium'],
  medium: ['easy', 'medium', 'hard'],
  hard: ['medium', 'hard'],
};

export async function selectNextProblem(userId: string, topicPreference?: string): Promise<NextProblemResponse | null> {
  // If a topic is provided, use it; else pick the lowest-performing topic by EMA
  const topic = await pickTargetTopic(userId, topicPreference);
  if (!topic) return null;

  const stats = await getUserTopicStats(userId, topic);
  const targetBand: DifficultyBand = stats?.currentDifficulty || 'easy';

  // Fetch candidates
  const difficultyBands = neighbors[targetBand];
  const qs = await getDocs(query(collection(db, 'questions'), where('topic', '==', topic)));
  const all = qs.docs.map((d) => ({ id: d.id, ...(d.data() as any) })).filter((q) => difficultyBands.includes(q.difficulty));
  if (all.length === 0) return null;

  // Score by simple heuristics: prefer target band, prefer unseen recently
  const recencyMap = await getRecentMap(userId);
  const scored = all.map((q) => {
    const isTarget = q.difficulty === targetBand ? 1 : 0;
    const lastSeen = recencyMap[q.id];
    const recencyPenalty = lastSeen ? timeRecencyPenalty(lastSeen) : 0;
    const score = 1.0 * isTarget + 0.3 * (q.tags?.length || 0) - 0.5 * recencyPenalty;
    return { q, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const chosen = scored[0].q;

  await recordRecentQuestion({ userId, questionId: chosen.id });

  return {
    questionId: chosen.id,
    title: chosen.title,
    topic: chosen.topic,
    difficulty: chosen.difficulty,
  };
}

async function pickTargetTopic(userId: string, prefer?: string): Promise<string | null> {
  if (prefer) return prefer;
  // Fallback: pick topic with lowest accuracyEma among those present in stats; if none, default to 'arrays'
  // Read at most a few topic_stats docs
  const statsSnap = await getDocs(collection(db, 'users', userId, 'topic_stats'));
  const stats = statsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  if (stats.length === 0) return 'arrays';
  stats.sort((a, b) => (a.accuracyEma ?? 0) - (b.accuracyEma ?? 0));
  return stats[0].topic || stats[0].id || 'arrays';
}

async function getRecentMap(userId: string): Promise<Record<string, Date>> {
  const snap = await getDocs(collection(db, 'users', userId, 'recent_questions'));
  const out: Record<string, Date> = {};
  for (const d of snap.docs) {
    const data = d.data() as any;
    const lastSeen = data.lastSeen?.toDate?.() || data.lastSeen;
    if (lastSeen) out[d.id] = lastSeen as Date;
  }
  return out;
}

function timeRecencyPenalty(dt: Date): number {
  const now = Date.now();
  const t = new Date(dt).getTime();
  const hours = (now - t) / (1000 * 60 * 60);
  // Recent within 24h gets penalty near 1, decays with time
  return Math.max(0, 1 - Math.min(1, hours / 24));
}