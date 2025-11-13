import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdaptiveTutor } from '../hooks/useAdaptiveTutor.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import Editor from '@monaco-editor/react';
import { Lightbulb, Play, SkipForward, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { AdaptiveHintResponse } from '../types/tutor.ts';

interface QuestionDoc {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints?: string[];
  tags?: string[];
  testCases?: { input: any; expectedOutput: any; explanation?: string }[];
  starterCode?: string;
}

const defaultStarter = `function solve(input) {\n  // TODO: implement\n  return null;\n}`;

export default function TutorDevPage() {
  const { user } = useAuth();
  const userId = user?.uid;
  const { beginAttempt, wrongSubmission, finishAttempt, requestHint, nextProblem, currentAttemptId } = useAdaptiveTutor(userId || 'anon');

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<QuestionDoc | null>(null);
  const [code, setCode] = useState<string>(defaultStarter);
  const [results, setResults] = useState<{ name: string; passed: boolean; expected: any; received: any; error?: string }[]>([]);
  const [hint, setHint] = useState<AdaptiveHintResponse | null>(null);
  const [errorTypes, setErrorTypes] = useState<string[]>([]);

  const loadNext = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setResults([]);
    setHint(null);
    setErrorTypes([]);
    try {
      const np = await nextProblem();
      if (!np) {
        setQuestion(null);
        return;
      }
      const docSnap = await getDoc(doc(db, 'questions', np.questionId));
      const data = docSnap.data() as any;
      const q: QuestionDoc = { id: np.questionId, ...data };
      setQuestion(q);
      setCode(q.starterCode || defaultStarter);
      await beginAttempt({ id: np.questionId, topic: q.topic, difficulty: q.difficulty, language: 'javascript' });
    } finally {
      setLoading(false);
    }
  }, [userId, nextProblem, beginAttempt]);

  useEffect(() => {
    // initial load
    loadNext();
  }, [userId, loadNext]);

  const runCode = useCallback(() => {
    if (!question) return;
    const tests = question.testCases || [];
    const wrapped = `"use strict";\n${code}\nreturn (typeof solve !== 'undefined') ? solve : undefined;`;
    let fn: any;
    try {
      // eslint-disable-next-line no-new-func
      fn = new Function(wrapped)();
      if (typeof fn !== 'function') throw new Error('Define function solve(input) in your code.');
    } catch (e: any) {
      setResults([{ name: 'Compile', passed: false, expected: 'No error', received: 'Error', error: e?.message || String(e) }]);
      setErrorTypes(inferErrorTypes(e?.message || ''));
      return;
    }

    const out: typeof results = [];
    let inferred: string[] = [];
    for (let i = 0; i < tests.length; i++) {
      const t = tests[i];
      try {
        const received = fn(t.input);
        const passed = JSON.stringify(received) === JSON.stringify(t.expectedOutput);
        out.push({ name: `Test ${i + 1}`, passed, expected: t.expectedOutput, received });
        if (!passed) inferred = inferred.concat(inferErrorTypes('mismatch'));
      } catch (e: any) {
        out.push({ name: `Test ${i + 1}`, passed: false, expected: t.expectedOutput, received: undefined, error: e?.message || String(e) });
        inferred = inferred.concat(inferErrorTypes(e?.message || ''));
      }
    }
    setResults(out);
    setErrorTypes(Array.from(new Set(inferred)));
  }, [question, code]);

  const getHint = useCallback(async () => {
    if (!question) return;
    const h = await requestHint({ id: question.id, language: 'javascript' }, errorTypes);
    setHint(h);
    // track that a hint tier was used in wrongSubmission (optional)
    await wrongSubmission({ errorTypes, hintTierUsed: h.tier });
  }, [question, errorTypes, requestHint, wrongSubmission]);

  const markCorrect = useCallback(async () => {
    await finishAttempt({ finalCorrect: true });
    await loadNext();
  }, [finishAttempt, loadNext]);

  const markWrong = useCallback(async () => {
    await wrongSubmission({ errorTypes });
  }, [wrongSubmission, errorTypes]);

  const skip = useCallback(async () => {
    await finishAttempt({ finalCorrect: false, wasSkipped: true });
    await loadNext();
  }, [finishAttempt, loadNext]);

  if (!userId) {
    return (
      <div className="p-6 text-red-300">Sign in required to demo Tutor.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-6">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tutor Dev</h1>
          <button onClick={loadNext} disabled={loading} className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm">{loading ? 'Loading...' : 'Next Problem'}</button>
        </div>

        {question ? (
          <div className="space-y-4">
            <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
              <div className="text-sm text-gray-400 mb-1">{question.topic} • {question.difficulty}</div>
              <div className="text-xl font-semibold">{question.title}</div>
              <p className="text-gray-300 mt-2">{question.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/60 rounded-xl border border-gray-700/60">
                <div className="flex items-center justify-between p-3 border-b border-gray-700/60">
                  <span className="text-sm text-gray-300">Editor (define solve(input))</span>
                  <div className="flex gap-2">
                    <button onClick={runCode} className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-sm flex items-center gap-1"><Play className="w-4 h-4"/>Run</button>
                    <button onClick={markWrong} className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-sm flex items-center gap-1"><AlertTriangle className="w-4 h-4"/>Wrong</button>
                    <button onClick={markCorrect} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/>Mark Correct</button>
                    <button onClick={skip} className="px-3 py-1.5 rounded bg-gray-600 hover:bg-gray-500 text-sm flex items-center gap-1"><SkipForward className="w-4 h-4"/>Skip</button>
                  </div>
                </div>
                <div className="h-[400px]">
                  <Editor height="100%" defaultLanguage="javascript" theme="vs-dark" value={code} onChange={(v)=>setCode(v||'')} options={{ fontSize: 14, minimap: { enabled: false } }} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
                  <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-5 h-5 text-yellow-400"/><span className="font-medium">Hint</span></div>
                  {hint ? (
                    <div className="text-sm text-gray-200">
                      <div className="mb-1 text-gray-400">Tier {hint.tier}{hint.isLastHint ? ' • last' : ''}</div>
                      <div className="mb-2">{hint.hint}</div>
                      {hint.encouragement && <div className="text-gray-400">{hint.encouragement}</div>}
                    </div>
                  ) : (
                    <button onClick={getHint} className="px-3 py-1.5 rounded bg-yellow-600 hover:bg-yellow-700 text-sm">Get Hint</button>
                  )}
                </div>

                <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
                  <div className="font-medium mb-2">Results</div>
                  <div className="space-y-2 text-sm">
                    {results.length === 0 && <div className="text-gray-400">No runs yet.</div>}
                    {results.map((r, i) => (
                      <div key={i} className={`p-2 rounded ${r.passed ? 'bg-emerald-900/30 border border-emerald-700/40' : 'bg-red-900/30 border border-red-700/40'}`}>
                        <div className="flex justify-between"><span>{r.name}</span><span>{r.passed ? '✅' : '❌'}</span></div>
                        {!r.passed && (
                          <div className="mt-1 text-gray-300">
                            {r.error ? <div>Error: {r.error}</div> : <div>Expected: {JSON.stringify(r.expected)} • Received: {JSON.stringify(r.received)}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errorTypes.length > 0 && (
                    <div className="text-xs text-gray-400 mt-3">Detected errors: {errorTypes.join(', ')}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">No suitable question found. Seed questions and try again.</div>
        )}
      </div>
    </div>
  );
}

function inferErrorTypes(message: string): string[] {
  const out: string[] = [];
  const msg = (message || '').toLowerCase();
  if (msg.includes('out of bounds') || msg.includes('length') && msg.includes('index')) out.push('index_out_of_bounds');
  if (msg.includes('undefined') || msg.includes('null')) out.push('null_ref');
  if (msg.includes('rangeerror')) out.push('infinite_loop');
  if (msg.includes('mismatch')) out.push('wrong_answer');
  // Heuristic OBOE
  if (msg.includes('off by one') || msg.includes('boundary')) out.push('off_by_one');
  return Array.from(new Set(out));
}