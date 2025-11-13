import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Zap, 
  Target, 
  BookOpen, 
  Code, 
  Flame,
  ArrowRight,
  Database,
  Settings
} from 'lucide-react';
import CourseLessonCard from '../components/CourseLessonCard.tsx';
import SubtopicSection from '../components/SubtopicSection.tsx';
import RestructuredTopicSection from '../components/RestructuredTopicSection.tsx';
import FirebaseProblemSection from '../components/FirebaseProblemSection.tsx';
import { useCourseProgress } from '../context/CourseProgressContext.tsx';
import { useGame } from '../context/GameContext.tsx';
import arraysCompleteCurriculum from '../data/comprehensive-arrays-curriculum.ts';
import { unifiedArraysCurriculum } from '../data/unified-arrays-master.ts';
import {
  BookSticker,
  TrophySticker,
  GridSticker,
  RocketSticker,
  CodeSticker,
  CpuSticker,
  StickerGroup,
  AnimatedBadge
} from '../components/AnimatedStickers.tsx';

const ArrayCoursePage = () => {
  const navigate = useNavigate();
  const { userStats } = useGame();
  const { lessons, getProgressByLevel, getTotalProgress, getNextAvailableLesson } = useCourseProgress();
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  // Course statistics
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => l.completed);
  const overallProgress = getTotalProgress();
  const totalXP = completedLessons.reduce((total, lesson) => total + lesson.xpReward, 0);
  const nextLesson = getNextAvailableLesson();

  const levelData = {
    1: {
      title: 'Beginner',
      subtitle: 'Array Fundamentals',
      description: 'Master the basics of arrays, indexing, and simple operations',
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-900/20 via-emerald-900/10 to-teal-900/20',
      borderColor: 'border-green-500/30',
      icon: <BookSticker size={32} animation="float" delay={0} />,
      lessons: lessons.filter(l => l.level === 1),
      progress: getProgressByLevel(1),
      badge: '🌱 Novice'
    },
    2: {
      title: 'Intermediate',
      subtitle: 'Algorithms & Techniques',
      description: 'Learn advanced search algorithms and optimization techniques',
      color: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-900/20 via-orange-900/10 to-red-900/20',
      borderColor: 'border-yellow-500/30',
      icon: <CodeSticker size={32} animation="wobble" delay={0} />,
      lessons: lessons.filter(l => l.level === 2),
      progress: getProgressByLevel(2),
      badge: '⚡ Explorer'
    },
    3: {
      title: 'Advanced',
      subtitle: '2D Arrays & Complex Problems',
      description: 'Master matrices, complex algorithms, and optimization challenges',
      color: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-900/20 via-pink-900/10 to-purple-900/20',
      borderColor: 'border-red-500/30',
      icon: <CpuSticker size={32} animation="pulse" delay={0} />,
      lessons: lessons.filter(l => l.level === 3),
      progress: getProgressByLevel(3),
      badge: '👑 Master'
    }
  };

  const currentLevel = levelData[activeLevel];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Gamification */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzMzM2VkMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <StickerGroup animation="slideIn" delay={0} className="flex items-center justify-center mb-6 space-x-4">
              <GridSticker size={48} animation="float" delay={0} />
              <div className="text-left">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Array Mastery Quest
                </h1>
                <p className="text-gray-300 text-lg mt-2">Master Data Structures Through Interactive Learning</p>
              </div>
            </StickerGroup>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-center mb-2">
                  <TrophySticker size={24} animation="bounce" />
                </div>
                <div className="text-2xl font-bold text-white">{completedLessons.length}</div>
                <div className="text-gray-300 text-sm">Completed</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">{totalXP}</div>
                <div className="text-gray-300 text-sm">XP Earned</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400">{Math.round(overallProgress)}%</div>
                <div className="text-gray-300 text-sm">Progress</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-orange-400">{userStats.streakDays}</div>
                <div className="text-gray-300 text-sm">Day Streak</div>
              </motion.div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Course Progress</span>
                <span className="text-white font-medium">{completedLessons.length} / {totalLessons}</span>
              </div>
              <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
          <div className="flex space-x-2">
            {Object.entries(levelData).map(([level, data]) => {
              const levelNum = parseInt(level) as 1 | 2 | 3;
              const isActive = activeLevel === levelNum;
              // Levels 1 and 2 are unlocked by default, level 3 requires 80% progress on level 2
              const isUnlocked = levelNum === 1 || levelNum === 2 || getProgressByLevel(2) >= 80;
              
              return (
                <motion.button
                  key={level}
                  whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                  whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
                  onClick={() => isUnlocked && setActiveLevel(levelNum)}
                  className={`
                    flex-1 px-6 py-4 rounded-lg transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? `bg-gradient-to-r ${data.color} text-white shadow-lg` 
                      : isUnlocked 
                        ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 hover:text-white'
                        : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  disabled={!isUnlocked}
                >
                  <div className="flex items-center justify-center space-x-3">
                    {data.icon}
                    <div className="text-left">
                      <div className="font-semibold">{data.title}</div>
                      <div className="text-sm opacity-80">{data.badge}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-80">{Math.round(data.progress)}%</div>
                      <div className="w-16 bg-white/20 rounded-full h-1 mt-1">
                        <div 
                          className="bg-white h-1 rounded-full transition-all duration-300" 
                          style={{ width: `${data.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Level Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Level Header */}
            <div className={`bg-gradient-to-r ${currentLevel.bgGradient} rounded-xl p-8 border ${currentLevel.borderColor} mb-8`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {currentLevel.icon}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Level {activeLevel}: {currentLevel.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-2">{currentLevel.subtitle}</p>
                    <p className="text-gray-400">{currentLevel.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">{Math.round(currentLevel.progress)}%</div>
                  <div className="text-gray-300 text-sm mb-3">Complete</div>
                  <AnimatedBadge color="white" bgColor={currentLevel.color.split(' ')[1].replace('to-', '')}>
                    {currentLevel.badge}
                  </AnimatedBadge>
                </div>
              </div>
            </div>

            {/* Lessons by Type */}
            <div className="space-y-8">
              {/* Concept Lessons */}
              {currentLevel.lessons.filter(lesson => lesson.type === 'concept').length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <h3 className="text-2xl font-bold">Concept Lessons</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
                  </div>
                  <div className="grid gap-6">
                    {currentLevel.lessons
                      .filter(lesson => lesson.type === 'concept')
                      .map((lesson, index) => (
                        <CourseLessonCard key={lesson.id} lesson={lesson} index={index} />
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Playground Problems */}
              {currentLevel.lessons.filter(lesson => lesson.type === 'playground').length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Code className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-2xl font-bold">Practice Problems</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
                  </div>
                  <div className="grid gap-6">
                    {currentLevel.lessons
                      .filter(lesson => lesson.type === 'playground')
                      .map((lesson, index) => (
                        <CourseLessonCard key={lesson.id} lesson={lesson} index={index} />
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Revision & Mastery Tests */}
              {currentLevel.lessons.filter(lesson => lesson.type === 'revision' || lesson.type === 'mastery').length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Trophy className="w-6 h-6 text-orange-400" />
                    <h3 className="text-2xl font-bold">Assessments</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-orange-400/50 to-transparent" />
                  </div>
                  <div className="grid gap-6">
                    {currentLevel.lessons
                      .filter(lesson => lesson.type === 'revision' || lesson.type === 'mastery')
                      .map((lesson, index) => (
                        <CourseLessonCard key={lesson.id} lesson={lesson} index={index} />
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Firebase Problems Section */}
              <div className="mt-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-purple-500/30 mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {currentLevel.title} - All Problems
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          Complete problems loaded from Firebase with XP rewards
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden md:block">
                      <div className="text-sm text-gray-400 mb-1">Learn → Understand → Code</div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Firebase Problems */}
                <FirebaseProblemSection
                  levelDifficulty={currentLevel.title as 'Beginner' | 'Intermediate' | 'Advanced'}
                  completedProblems={new Set()} // TODO: Track completed problems from Firebase
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue Learning CTA */}
      {nextLesson && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 border border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <RocketSticker size={40} animation="bounce" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Continue Your Journey</h3>
                  <p className="text-gray-300">Next up: {nextLesson.title}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  switch (nextLesson.type) {
                    case 'concept':
                      navigate(`/lesson/${nextLesson.id}`);
                      break;
                    case 'playground':
                      navigate(`/playground/${nextLesson.id}`);
                      break;
                    case 'revision':
                      navigate(`/revision/${nextLesson.level}`);
                      break;
                    case 'mastery':
                      navigate('/mastery-test');
                      break;
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-3"
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Firebase Data Management CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  Firebase Data Management
                  <Settings className="w-4 h-4 text-gray-400" />
                </h3>
                <p className="text-gray-400 text-sm">Populate or migrate your problem database</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/migrate-problems')}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 border border-gray-600/50"
            >
              <Database className="w-4 h-4" />
              <span>Manage Data</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArrayCoursePage;
