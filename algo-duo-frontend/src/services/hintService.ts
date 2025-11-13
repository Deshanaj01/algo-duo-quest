import { db } from '../firebase.ts';
import { doc, getDoc } from 'firebase/firestore';
import { AdaptiveHintRequest, AdaptiveHintResponse } from '../types/tutor.ts';

// Optional: call a backend function if configured (to avoid exposing LLM keys)
async function maybeCallLLMBackend(payload: any): Promise<string | null> {
  const url = (import.meta as any)?.env?.VITE_HINTS_FUNCTION_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.hint || null;
  } catch {
    return null;
  }
}

function encouragement(attempt: number): string {
  const msgs = [
    "You're on the right track!",
    'Great effort! Try a smaller example.',
    'Each attempt builds intuition—keep going.',
    'Almost there! Check edge cases.',
  ];
  return msgs[Math.min(attempt - 1, msgs.length - 1)];
}

function ruleBasedHint(opts: { hints: string[]; attemptNumber: number; errorTypes?: string[]; language?: string }): string {
  // Targeted micro-hints for common errors
  const { errorTypes = [], language } = opts;
  if (errorTypes.includes('index_out_of_bounds')) {
    if (language?.toLowerCase() === 'java') return 'Remember: arrays are 0-indexed in Java; the last valid index is length-1.';
    return 'Check your indices: arrays are 0-indexed; avoid accessing negative or length index.';
  }
  if (errorTypes.includes('off_by_one')) {
    return 'Check loop bounds and inclusive/exclusive conditions; try printing for a 2-3 element input.';
  }
  // Progressive disclosure from question-provided hints
  const i = Math.max(0, Math.min(opts.attemptNumber - 1, opts.hints.length - 1));
  return opts.hints[i] || 'Break the problem into smaller subproblems and verify each with a tiny test.';
}

export async function getAdaptiveHint(req: AdaptiveHintRequest): Promise<AdaptiveHintResponse> {
  const qSnap = await getDoc(doc(db, 'questions', req.questionId));
  if (!qSnap.exists()) throw new Error('Question not found');
  const q = qSnap.data() as any;
  const tier = Math.min(Math.max(req.attemptNumber, 1), 4);

  // Try backend LLM if available for tier >= 2
  if (tier >= 2) {
    const llmHint = await maybeCallLLMBackend({
      question: { title: q.title, statement: q.description, hints: q.hints },
      userContext: { language: req.language, errorTypes: req.errorTypes },
      tier,
    });
    if (llmHint) {
      return { hint: llmHint, tier, isLastHint: tier >= 4, encouragement: encouragement(req.attemptNumber) };
    }
  }

  const hint = ruleBasedHint({ hints: q.hints || [], attemptNumber: req.attemptNumber, errorTypes: req.errorTypes, language: req.language });
  return { hint, tier, isLastHint: tier >= (q.hints?.length || 3), encouragement: encouragement(req.attemptNumber) };
}