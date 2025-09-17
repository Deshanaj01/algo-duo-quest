import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  ArrowLeft, 
  Clock, 
  Award, 
  Target,
  Zap,
  Trophy,
  Brain,
  Code,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import {
  StarSticker,
  TrophySticker,
  RocketSticker,
  StickerGroup,
  AnimatedBadge
} from '../components/AnimatedStickers.tsx';
import { allArrayCourseLessons } from '../data/arrayCourseLessons.ts';

// Create crown sticker since it doesn't exist
const CrownSticker = ({ size = 24, animation = 'glow' as const }) => (
  <motion.div
    animate={{
      filter: [
        "drop-shadow(0 0 0px #FFD700)",
        "drop-shadow(0 0 12px #FFD700)",
        "drop-shadow(0 0 0px #FFD700)"
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="inline-block"
  >
    <Crown size={size} color="#FFD700" />
  </motion.div>
);

const MasteryTestPage = () => {
  const navigate = useNavigate();
  
  const masteryTest = allArrayCourseLessons.find(l => l.type === 'mastery');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI0ZGRDcwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/arrays')}
              className="p-3 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center space-x-4">
              {masteryTest && (
                <>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">{masteryTest.xpReward} XP</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{masteryTest.duration} min</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <StickerGroup animation="slideIn" className="flex items-center justify-center mb-8 space-x-6">
              <CrownSticker size={80} />
              <div className="text-left">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Final Mastery Test
                </h1>
                <p className="text-2xl text-gray-300 mt-4">The Ultimate Array Challenge</p>
                <AnimatedBadge color="white" bgColor="#FFD700" animation="glow">
                  🏆 Certification Level
                </AnimatedBadge>
              </div>
            </StickerGroup>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Prove your mastery of arrays with our comprehensive final assessment. 
              This challenging test covers everything from basic operations to advanced algorithms.
            </p>

            {/* Test Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-center mb-3">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white">15-20</div>
                <div className="text-gray-300">Questions</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-center mb-3">
                  <Code className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-400">5-7</div>
                <div className="text-gray-300">Coding</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-center mb-3">
                  <Target className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-3xl font-bold text-orange-400">80%</div>
                <div className="text-gray-300">Pass Rate</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400">Certificate</div>
                <div className="text-gray-300">Reward</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Under Development Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <StickerGroup animation="slideIn" className="flex justify-center mb-12">
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-3xl p-16 border border-purple-500/30">
              <div className="flex items-center justify-center space-x-4 mb-8">
                <RocketSticker size={48} animation="bounce" />
                <Sparkles className="w-12 h-12 text-pink-400" />
                <TrophySticker size={48} animation="glow" />
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Coming Soon!
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're crafting the ultimate array mastery test that will challenge every aspect of your knowledge. 
                From algorithmic thinking to optimization techniques, this comprehensive assessment will certify 
                your expertise in array data structures.
              </p>
            </div>
          </StickerGroup>

          {/* What to Expect */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50"
            >
              <div className="flex justify-center mb-6">
                <Brain className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">Conceptual Mastery</h3>
              <p className="text-gray-400 leading-relaxed">
                Deep understanding questions covering time complexity, space optimization, 
                and algorithmic strategies for various array operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50"
            >
              <div className="flex justify-center mb-6">
                <Code className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-emerald-300">Practical Implementation</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced coding challenges including two-pointer techniques, sliding windows, 
                matrix manipulations, and complex algorithmic patterns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50"
            >
              <div className="flex justify-center mb-6">
                <Trophy className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Certification Ready</h3>
              <p className="text-gray-400 leading-relaxed">
                Industry-standard assessment that validates your array expertise for 
                technical interviews and professional development.
              </p>
            </motion.div>
          </div>

          {/* Certification Preview */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-12 border border-yellow-500/30 mb-12">
            <div className="flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-20 h-20 text-yellow-400" />
              </motion.div>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-yellow-300">Array Mastery Certificate</h3>
            <p className="text-xl text-gray-300 mb-8">
              Upon successful completion, you'll receive a verified certificate demonstrating 
              your proficiency in array data structures and algorithms.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Comprehensive Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Industry Recognition</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Portfolio Ready</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/arrays')}
              className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-lg font-semibold text-lg flex items-center space-x-3 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back to Course</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-10 py-4 rounded-lg font-semibold text-lg flex items-center space-x-3 transition-colors"
            >
              <StarSticker size={24} animation="glow" />
              <span>Notify Me When Ready</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MasteryTestPage;
