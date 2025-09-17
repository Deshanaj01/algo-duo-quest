import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Code, 
  ArrowLeft, 
  Play, 
  Save, 
  RotateCcw, 
  Lightbulb,
  TestTube,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import {
  CodeSticker,
  ZapSticker,
  StickerGroup
} from '../components/AnimatedStickers.tsx';
import { allArrayCourseLessons } from '../data/arrayCourseLessons.ts';

const PlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const lesson = allArrayCourseLessons.find(l => l.id === id);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
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

      {/* Under Development Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <StickerGroup animation="slideIn" className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-2xl p-12 border border-emerald-500/20">
              <CodeSticker size={64} animation="wobble" />
              <h2 className="text-4xl font-bold mt-6 mb-4">Playground Under Development</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We're building an amazing interactive coding playground where you can practice array algorithms 
                with real-time feedback, test cases, and hints!
              </p>
            </div>
          </StickerGroup>

          {/* Preview Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <Code className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">Interactive Editor</h3>
              <p className="text-gray-400">
                Code editor with syntax highlighting, auto-completion, and real-time error detection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <TestTube className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Test Cases</h3>
              <p className="text-gray-400">
                Comprehensive test suites to validate your solutions with instant feedback.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">Smart Hints</h3>
              <p className="text-gray-400">
                Progressive hints and explanations to guide you through complex problems.
              </p>
            </motion.div>
          </div>

          {/* Mock UI Preview */}
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/30 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Coming Soon: Interactive Playground</h3>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-400">In Development</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mock Editor */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Code Editor</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-700 rounded text-green-400">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded text-blue-400">
                      <Save className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded text-orange-400">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-950/50 rounded p-4 font-mono text-sm">
                  <div className="text-purple-400">function</div>
                  <div className="text-blue-400 ml-2">twoSum(arr, target) {`{`}</div>
                  <div className="text-gray-500 ml-4">{`// Your solution here...`}</div>
                  <div className="text-blue-400">{'}'}</div>
                </div>
              </div>

              {/* Mock Test Results */}
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Test Results</span>
                  <div className="text-sm text-green-400 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>2/3 Passed</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Test Case 1: [2, 7, 11, 15], 9</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Test Case 2: [3, 2, 4], 6</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm">Test Case 3: [3, 3], 6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/arrays')}
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Course</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <ZapSticker size={20} animation="bounce" />
              <span>Notify Me When Ready</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
