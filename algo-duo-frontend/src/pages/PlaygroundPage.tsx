import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Code,
  ArrowLeft,
  Play,
  RotateCcw,
  Lightbulb,
  TestTube,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { CodeSticker } from '../components/AnimatedStickers.tsx';
import { allArrayCourseLessons } from '../data/arrayCourseLessons.ts';
import { useCourseProgress } from '../context/CourseProgressContext.tsx';
import Editor from '@monaco-editor/react';

const PlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLessonById, updateLessonProgress } = useCourseProgress();

  const lesson = allArrayCourseLessons.find((l) => l.id === id);

  const playground = lesson?.playgroundConfig;

  const [code, setCode] = useState<string>(playground?.starterCode || '');
  const [isRunning, setIsRunning] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [awardedThisSession, setAwardedThisSession] = useState(false);
  const [results, setResults] = useState<
    { name: string; passed: boolean; expected: any; received: any; error?: string }[]
  >([]);

  const tests = useMemo(() => {
    if (lesson?.id === 'array-basics-playground') {
      return [
        { name: 'Basic case', input: [1, 2, 3, 4, 5], expected: [1, 5] },
        { name: 'Single element', input: [42], expected: [42] },
        { name: 'Empty array', input: [], expected: [] }
      ];
    }
    
    // Parse test cases from playground config
    if (playground?.testCases && playground.testCases.length > 0) {
      // Try to parse test cases from strings like "solve([1,2,3]) should return 6"
      return playground.testCases.map((tc, idx) => {
        try {
          // Extract function call and expected output
          const match = tc.match(/(\w+)\((.+?)\)\s+should return\s+(.+)/);
          if (match) {
            const [, fnName, argsStr, expectedStr] = match;
            // Parse arguments
            const args = new Function(`return [${argsStr}]`)();
            // Parse expected output
            const expected = new Function(`return ${expectedStr}`)();
            return {
              name: `Test ${idx + 1}`,
              input: args.length === 1 ? args[0] : args,
              expected,
              fnName
            };
          }
        } catch (e) {
          console.error('Failed to parse test case:', tc, e);
        }
        return null;
      }).filter(Boolean);
    }
    
    return [];
  }, [lesson?.id, playground]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => navigate('/arrays')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  const runCode = async () => {
    setIsRunning(true);
    try {
      // Very simple sandbox: expose only the function under test
      const fnNameMatch = code.match(/function\s+(\w+)\s*\(/);
      const detectedFnName = tests.length > 0 && tests[0].fnName ? tests[0].fnName : null;
      const fnName = fnNameMatch?.[1] || detectedFnName || 'solve';
      const wrapped = `"use strict";\n${code}\nreturn (typeof ${fnName} !== 'undefined') ? ${fnName} : undefined;`;
      // eslint-disable-next-line no-new-func
      const fn = new Function(wrapped)();

      if (typeof fn !== 'function') {
        throw new Error(`No function exported from your code. Define a function like: function ${fnName}(...) { ... }`);
      }

      const run = tests.map((t) => {
        try {
          // Handle both single argument and multiple arguments
          const received = Array.isArray(t.input) && !Array.isArray(t.input[0]) && t.input.length > 1
            ? fn(...t.input)
            : fn(t.input);
          const passed = JSON.stringify(received) === JSON.stringify(t.expected);
          return { name: t.name, passed, expected: t.expected, received };
        } catch (e: any) {
          return { name: t.name, passed: false, expected: t.expected, received: undefined, error: e?.message || String(e) };
        }
      });
      setResults(run);

      const allPassed = run.length > 0 && run.every((r) => r.passed);
      if (lesson && allPassed) {
        const current = getLessonById(lesson.id);
        if (current && !current.completed && !awardedThisSession) {
          updateLessonProgress(lesson.id, true, 100);
          setAwardedThisSession(true);
        }
      }
    } catch (err: any) {
      setResults([
        { name: 'Runtime error', passed: false, expected: 'No error', received: 'Error', error: err?.message || String(err) }
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(playground?.starterCode || '');
    setResults([]);
    setHintIndex(0);
  };

  const passedCount = results.filter((r) => r.passed).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/arrays')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center space-x-3">
                <CodeSticker size={32} animation="wobble" />
                <div>
                  <h1 className="text-2xl font-bold">{lesson.title}</h1>
                  <p className="text-emerald-300">{lesson.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Zap className="w-5 h-5" />
                <span className="font-medium">{lesson.xpReward} XP</span>
              </div>

              <div className="text-sm text-gray-400">
                {lesson.difficulty} • {lesson.duration} min
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {playground ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-800/60 rounded-xl border border-gray-700/60">
                <div className="flex items-center justify-between p-3 border-b border-gray-700/60">
                  <span className="text-sm text-gray-300">Editor</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetCode}
                      className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button
                      onClick={runCode}
                      disabled={isRunning}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-sm flex items-center gap-1"
                    >
                      <Play className="w-4 h-4" /> {isRunning ? 'Running...' : 'Run'}
                    </button>
                  </div>
                </div>
                <div className="h-[420px]">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(v) => setCode(v || '')}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      automaticLayout: true,
                      scrollBeyondLastLine: false
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Hints</span>
                </div>
                <div className="space-y-2">
                  {playground.hints.slice(0, hintIndex + 1).map((h, i) => (
                    <div key={i} className="text-sm text-gray-300">• {h}</div>
                  ))}
                </div>
                {hintIndex < (playground.hints?.length || 0) - 1 && (
                  <button
                    onClick={() => setHintIndex((i) => i + 1)}
                    className="mt-3 px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                  >
                    Show next hint
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">Test Results</span>
                  </div>
                  <div className={`text-sm ${results.length && passedCount === results.length ? 'text-green-400' : 'text-gray-400'}`}>
                    {results.length ? `${passedCount}/${results.length} Passed` : 'Not run yet'}
                  </div>
                </div>
                {lesson && (getLessonById(lesson.id)?.completed || awardedThisSession) && (
                  <div className="mb-3 text-emerald-300 text-sm">✅ All tests passed! XP awarded and lesson marked complete.</div>
                )}
                <div className="space-y-2">
                  {results.length === 0 && (
                    <div className="text-sm text-gray-400">Click Run to execute tests.</div>
                  )}
                  {results.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-gray-900/50 rounded p-3 border border-gray-700/50">
                      {r.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                      )}
                      <div className="text-sm">
                        <div className="font-medium">{r.name}</div>
                        {r.error ? (
                          <div className="text-red-300">Error: {r.error}</div>
                        ) : (
                          <div className="text-gray-300">
                            Expected: <code className="text-blue-300">{JSON.stringify(r.expected)}</code> • Got:
                            <code className="text-yellow-300"> {JSON.stringify(r.received)}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">Instructions</span>
                </div>
                <p className="text-sm text-gray-300">{playground.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-300">This lesson is not a playground.</div>
        )}

        <div className="mt-8">
          <button
            onClick={() => navigate('/arrays')}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
