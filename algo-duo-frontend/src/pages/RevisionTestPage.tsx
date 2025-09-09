import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Target,
  Award,
  Zap,
  HelpCircle,
  Code
} from 'lucide-react';
import {
  TrophySticker,
  BrainSticker,
  StickerGroup
} from '../components/AnimatedStickers.tsx';
import { getLessonsByLevel } from '../data/arrayCourseLessons.ts';

const RevisionTestPage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  
  const levelNum = parseInt(level || '1') as 1 | 2 | 3;
  const revisionLesson = getLessonsByLevel(levelNum).find(l => l.type === 'revision');

  const levelData = {
    1: {
      title: 'Beginner Level Assessment',
      subtitle: 'Array Fundamentals Quiz',
      description: 'Test your understanding of basic array concepts and operations',
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-900/20 via-emerald-900/10 to-teal-900/20',
      borderColor: 'border-green-500/30',
    },
    2: {
      title: 'Intermediate Level Assessment', 
      subtitle: 'Algorithms & Techniques Quiz',
      description: 'Challenge yourself with search algorithms and optimization problems',
      color: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-900/20 via-orange-900/10 to-red-900/20',
      borderColor: 'border-yellow-500/30',
    },
    3: {
      title: 'Advanced Level Assessment',
      subtitle: 'Complex Algorithms Quiz', 
      description: 'Master advanced 2D array algorithms and complex problem solving',
      color: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-900/20 via-pink-900/10 to-purple-900/20',
      borderColor: 'border-red-500/30',
    }
  };

  const currentLevel = levelData[levelNum];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentLevel.bgGradient} border-b ${currentLevel.borderColor}`}>
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
                <TrophySticker size={32} animation="bounce" />
                <div>
                  <h1 className="text-2xl font-bold">{currentLevel.title}</h1>
                  <p className="text-orange-300">{currentLevel.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {revisionLesson && (
                <>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">{revisionLesson.xpReward} XP</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{revisionLesson.duration} min</span>
                  </div>
                </>
              )}
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
            <div className={`bg-gradient-to-r ${currentLevel.bgGradient} rounded-2xl p-12 border ${currentLevel.borderColor}`}>
              <TrophySticker size={64} animation="bounce" />
              <h2 className="text-4xl font-bold mt-6 mb-4">Quiz System Under Development</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {currentLevel.description}. We're building an engaging quiz platform with 
                instant feedback and detailed explanations!
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
                <HelpCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Multiple Choice Questions</h3>
              <p className="text-gray-400">
                Interactive MCQs with instant feedback and detailed explanations for each answer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <Code className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-300">Coding Challenges</h3>
              <p className="text-gray-400">
                Mini coding problems to test your practical implementation skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">Performance Tracking</h3>
              <p className="text-gray-400">
                Detailed analytics on your progress with areas for improvement.
              </p>
            </motion.div>
          </div>

          {/* Mock Quiz Preview */}
          <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/30 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Coming Soon: Interactive Assessments</h3>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-400">In Development</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Mock MCQ */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Question 1 of 5</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-orange-400">2:30 remaining</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-4">
                  What is the time complexity of accessing an element by index in an array?
                </h4>
                
                <div className="space-y-3">
                  {['O(1) - Constant time', 'O(n) - Linear time', 'O(log n) - Logarithmic time', 'O(n²) - Quadratic time'].map((option, index) => (
                    <button
                      key={index}
                      className="w-full p-3 text-left bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Coding Question */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Coding Challenge</span>
                  <div className="text-sm text-emerald-400 flex items-center space-x-1">
                    <Code className="w-4 h-4" />
                    <span>40 points</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-4">
                  Write a function to find the maximum element in an array
                </h4>
                
                <div className="bg-gray-950/50 rounded p-4 font-mono text-sm">
                  <div className="text-purple-400">function</div>
                  <div className="text-blue-400 ml-2">findMax(arr) {`{`}</div>
                  <div className="text-gray-500 ml-4">{`// Your code here...`}</div>
                  <div className="text-blue-400">{'}'}</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Progress</span>
                <div className="w-48 bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
                <span className="text-sm text-white">2/5</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">Pass: 70%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/arrays')}
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Course</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <BrainSticker size={20} animation="pulse" />
              <span>Notify Me When Ready</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevisionTestPage;
