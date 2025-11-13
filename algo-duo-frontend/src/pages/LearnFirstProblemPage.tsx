import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  AlertCircle,
  Clock,
  Zap,
  Play,
  Sparkles
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import sampleEnhancedProblems from '../data/enhanced-arrays-curriculum.ts';
import { getAllArraysProblems } from '../data/comprehensive-arrays-curriculum.ts';
import type { EnhancedProblem } from '../data/enhanced-arrays-curriculum.ts';

type Stage = 'learn' | 'understand' | 'code';

const LearnFirstProblemPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>('learn');
  const [code, setCode] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  // First try to find in enhanced problems
  let problem = sampleEnhancedProblems.find(p => p.id === problemId);
  
  // If not found, check if there's a basic problem and show a placeholder message
  const basicProblem = !problem ? getAllArraysProblems().find(p => p.id === problemId) : null;

  // Show message for problems without learn content yet
  if (!problem && basicProblem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">{basicProblem.title}</h1>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <p className="text-yellow-400 font-semibold mb-2">Learn-First Content Coming Soon!</p>
            <p className="text-gray-300">This problem is available in the curriculum, but detailed learn-first content is being prepared.</p>
            <p className="text-gray-400 text-sm mt-3">Currently available with full learn content:</p>
            <ul className="text-sm text-gray-400 mt-2 space-y-1">
              <li>• Find the Largest Element</li>
              <li>• Two Sum</li>
            </ul>
          </div>
          <button
            onClick={() => navigate('/arrays')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  if (!problem && !basicProblem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <button
            onClick={() => navigate('/arrays')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    setCode(problem.starterCode);
  }, [problem]);

  // Generate progressive hints based on problem and test results
  const getProgressiveHints = () => {
    const hints: string[] = [];
    
    // Base hints from learn content
    if (problem.learnContent.keyPoints.length > 0) {
      hints.push(`💡 Remember: ${problem.learnContent.keyPoints[0]}`);
    }
    
    // Add algorithm step hints
    problem.learnContent.algorithmSteps.forEach((step, idx) => {
      if (idx < 3) { // First 3 steps
        hints.push(`Step ${idx + 1}: ${step}`);
      }
    });
    
    // Context-based hints from test results
    if (results.length > 0 && !results.every(r => r.passed)) {
      const failedTests = results.filter(r => !r.passed);
      if (failedTests.length > 0) {
        hints.push('🔍 Some tests are failing. Double-check your logic for edge cases.');
        hints.push(`⚡ Expected complexity: ${problem.learnContent.timeComplexity.split('-')[0]} - are you using the right approach?`);
      }
    }
    
    // Add common mistakes as hints
    if (problem.learnContent.commonMistakes.length > 0) {
      hints.push(`⚠️ Common mistake to avoid: ${problem.learnContent.commonMistakes[0]}`);
    }
    
    // Pattern-based hint
    hints.push(`🎯 This problem uses the "${problem.learnContent.concept}" pattern`);
    
    return hints;
  };
  
  const hints = getProgressiveHints();
  
  const getNextHint = () => {
    if (!showHints) {
      setShowHints(true);
      setCurrentHintIndex(0);
    } else if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const runTests = () => {
    try {
      // Extract function name from starter code
      const fnMatch = code.match(/function\s+(\w+)/);
      const fnName = fnMatch ? fnMatch[1] : 'solve';
      
      const wrapped = `${code}\nreturn ${fnName};`;
      // eslint-disable-next-line no-new-func
      const userFn = new Function(wrapped)();

      const testResults = problem.testCases.map((test, idx) => {
        try {
          const result = Array.isArray(test.input) 
            ? userFn(...test.input)
            : userFn(test.input);
          const passed = JSON.stringify(result) === JSON.stringify(test.expectedOutput);
          return {
            name: `Test ${idx + 1}`,
            passed,
            expected: test.expectedOutput,
            received: result
          };
        } catch (e: any) {
          return {
            name: `Test ${idx + 1}`,
            passed: false,
            expected: test.expectedOutput,
            received: null,
            error: e.message
          };
        }
      });

      setResults(testResults);
    } catch (e: any) {
      setResults([{
        name: 'Runtime Error',
        passed: false,
        error: e.message
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Progress */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/arrays')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Course</span>
            </button>

            {/* Stage Progress */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                stage === 'learn' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Learn</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                stage === 'understand' ? 'bg-purple-600' : 'bg-gray-700'
              }`}>
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm">Understand</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                stage === 'code' ? 'bg-green-600' : 'bg-gray-700'
              }`}>
                <Code className="w-4 h-4" />
                <span className="text-sm">Code</span>
              </div>
            </div>

            <div className={`px-3 py-1 rounded text-sm ${
              problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {problem.difficulty}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
        <p className="text-gray-400 mb-8">{problem.category}</p>

        <AnimatePresence mode="wait">
          {/* STAGE 1: LEARN */}
          {stage === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Concept Header */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold">Concept: {problem.learnContent.concept}</h2>
                </div>
                <p className="text-gray-300 whitespace-pre-line">{problem.learnContent.explanation}</p>
              </div>

              {/* Algorithm Steps */}
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Algorithm Steps
                </h3>
                <ol className="space-y-3">
                  {problem.learnContent.algorithmSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Visual Example */}
              {problem.learnContent.visualExample && (
                <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4">Visual Walkthrough</h3>
                  <p className="text-gray-400 mb-6">{problem.learnContent.visualExample.description}</p>

                  {/* Step Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <span className="text-gray-400">
                      Step {currentStep + 1} of {problem.learnContent.visualExample.steps.length}
                    </span>
                    <button
                      onClick={() => setCurrentStep(Math.min(problem.learnContent.visualExample!.steps.length - 1, currentStep + 1))}
                      disabled={currentStep === problem.learnContent.visualExample.steps.length - 1}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Current Step */}
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <div className="mb-4">
                      <span className="text-blue-400 font-semibold">Step {problem.learnContent.visualExample.steps[currentStep].step}</span>
                      <p className="text-gray-300 mt-2">{problem.learnContent.visualExample.steps[currentStep].description}</p>
                    </div>
                    
                    {problem.learnContent.visualExample.steps[currentStep].visualization && (
                      <pre className="bg-gray-800 p-4 rounded-lg text-green-400 font-mono text-sm overflow-x-auto mb-4">
                        {problem.learnContent.visualExample.steps[currentStep].visualization}
                      </pre>
                    )}

                    {problem.learnContent.visualExample.steps[currentStep].code && (
                      <pre className="bg-gray-800 p-4 rounded-lg text-blue-300 font-mono text-sm overflow-x-auto">
                        {problem.learnContent.visualExample.steps[currentStep].code}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {/* Complexity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <h4 className="font-semibold">Time Complexity</h4>
                  </div>
                  <p className="text-gray-300">{problem.learnContent.timeComplexity}</p>
                </div>
                <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-semibold">Space Complexity</h4>
                  </div>
                  <p className="text-gray-300">{problem.learnContent.spaceComplexity}</p>
                </div>
              </div>

              {/* Key Points */}
              <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-green-400" />
                  Key Points to Remember
                </h3>
                <ul className="space-y-2">
                  {problem.learnContent.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              {problem.learnContent.commonMistakes && problem.learnContent.commonMistakes.length > 0 && (
                <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {problem.learnContent.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-red-400">❌</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStage('understand')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
                >
                  Next: See the Problem
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: UNDERSTAND */}
          {stage === 'understand' && (
            <motion.div
              key="understand"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Problem Statement */}
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
                <p className="text-gray-300 whitespace-pre-line">{problem.problemStatement}</p>
              </div>

              {/* Examples */}
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Examples</h3>
                <div className="space-y-4">
                  {problem.examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-900/50 rounded-lg p-4">
                      <div className="mb-2">
                        <span className="text-blue-400 font-semibold">Example {idx + 1}:</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Input:</span>
                          <code className="ml-2 text-green-400">{example.input}</code>
                        </div>
                        <div>
                          <span className="text-gray-400">Output:</span>
                          <code className="ml-2 text-orange-400">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-gray-400">Explanation:</span>
                            <span className="ml-2 text-gray-300">{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Constraints</h3>
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, idx) => (
                    <li key={idx} className="text-gray-300 flex gap-2">
                      <span className="text-blue-400">•</span>
                      <code className="text-sm">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStage('learn')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Learn
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStage('code')}
                  className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
                >
                  Start Coding
                  <Code className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: CODE */}
          {stage === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Editor */}
                <div className="bg-gray-800/60 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between p-3 border-b border-gray-700">
                    <span className="text-sm text-gray-300">Code Editor</span>
                    <button
                      onClick={runTests}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Run Tests
                    </button>
                  </div>
                  <div className="h-[500px]">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      theme="vs-dark"
                      value={code}
                      onChange={(v) => setCode(v || '')}
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        automaticLayout: true
                      }}
                    />
                  </div>
                </div>

                {/* Test Results */}
                <div className="space-y-4">
                  <div className="bg-gray-800/60 rounded-xl p-4 border border-gray-700">
                    <h3 className="font-semibold mb-4">Test Results</h3>
                    {results.length === 0 ? (
                      <p className="text-gray-400 text-sm">Run tests to see results</p>
                    ) : (
                      <div className="space-y-3">
                        {results.map((result, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg ${
                              result.passed
                                ? 'bg-green-900/30 border border-green-500/30'
                                : 'bg-red-900/30 border border-red-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{result.name}</span>
                              {result.passed ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            {!result.passed && (
                              <div className="text-sm space-y-1">
                                {result.error ? (
                                  <div className="text-red-300">Error: {result.error}</div>
                                ) : (
                                  <>
                                    <div className="text-gray-300">
                                      Expected: <code>{JSON.stringify(result.expected)}</code>
                                    </div>
                                    <div className="text-gray-300">
                                      Got: <code>{JSON.stringify(result.received)}</code>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Reference */}
                  <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                      Quick Reference
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Time: {problem.learnContent.timeComplexity.split('-')[0]}</li>
                      <li>• Space: {problem.learnContent.spaceComplexity.split('-')[0]}</li>
                      <li>• Pattern: {problem.learnContent.concept}</li>
                    </ul>
                  </div>

                  {/* Progressive Hints */}
                  <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-purple-400" />
                        Hints {showHints && `(${currentHintIndex + 1}/${hints.length})`}
                      </h4>
                      {currentHintIndex < hints.length - 1 && (
                        <button
                          onClick={getNextHint}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          {!showHints ? 'Show Hint' : 'Next Hint'}
                        </button>
                      )}
                    </div>
                    
                    {showHints ? (
                      <div className="space-y-2">
                        {hints.slice(0, currentHintIndex + 1).map((hint, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3 border border-purple-500/20"
                          >
                            {hint}
                          </motion.div>
                        ))}
                        {currentHintIndex === hints.length - 1 && (
                          <p className="text-xs text-gray-500 italic mt-2">No more hints available. Review the Learn section if needed!</p>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        <p className="mb-2">Stuck? Get progressive hints to guide you through the solution.</p>
                        <p className="text-xs text-gray-500">💡 {hints.length} hints available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStage('understand')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Problem
                </button>
                {results.length > 0 && results.every(r => r.passed) && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/arrays')}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-4 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Complete & Continue
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnFirstProblemPage;
