import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { allArrayLessons } from '../data/arrayLessons';
import {
  BookSticker,
  TrophySticker,
  TargetSticker,
  ZapSticker,
  SearchSticker,
  GridSticker,
  BrainSticker,
  RocketSticker,
  StickerGroup,
  AnimatedBadge
} from '../components/AnimatedStickers';
import { RotateCcw } from 'lucide-react';

const ArrayCoursePage = () => {
  const navigate = useNavigate();

  const lessons = Object.entries(allArrayLessons).map(([id, lesson], index) => ({
    id,
    ...lesson,
    order: index + 1,
    duration: `${lesson.steps.length * 3}-${lesson.steps.length * 5} min`,
    difficulty: getDifficultyFromSteps(lesson.steps.length),
    completed: false // This would come from user progress in a real app
  }));

  function getDifficultyFromSteps(stepCount: number) {
    if (stepCount <= 3) return 'Beginner';
    if (stepCount <= 5) return 'Intermediate';
    return 'Advanced';
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <BookSticker size={48} animation="float" delay={0} />
              <h1 className="text-5xl font-bold ml-4">
                Array Mastery Course
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master arrays with interactive visualizations, step-by-step explanations, 
              and hands-on practice. From basics to advanced techniques.
            </p>
            <StickerGroup animation="fadeIn" delay={0.3} className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <BookSticker size={20} color="#60A5FA" animation="pulse" />
                <span>{lessons.length} Interactive Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>2-3 Hours Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrophySticker size={20} color="#FBBF24" animation="bounce" />
                <span>Beginner Friendly</span>
              </div>
            </StickerGroup>
          </motion.div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '0%' }} // This would be dynamic based on actual progress
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <span className="text-gray-400">0 / {lessons.length} completed</span>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-8">Course Curriculum</h2>
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors group cursor-pointer"
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Lesson Number */}
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    {lesson.order}
                  </div>
                  
                  {/* Lesson Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-400 mb-3">
                      {lesson.description}
                    </p>
                    
                    {/* Lesson Metadata */}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-3 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{lesson.steps.length} steps</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex items-center space-x-4">
                  {lesson.completed ? (
                    <div className="text-green-400 font-semibold">✓ Completed</div>
                  ) : (
                    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Start</span>
                    </button>
                  )}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Benefits */}
        <div className="mt-16 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                sticker: <TargetSticker size={32} animation="pulse" delay={0} />,
                title: 'Array Fundamentals',
                description: 'Understand what arrays are and how they work in memory'
              },
              {
                sticker: <ZapSticker size={32} animation="scale" delay={0.1} />,
                title: 'Operations & Performance',
                description: 'Master insertion, deletion, and time complexity analysis'
              },
              {
                sticker: <SearchSticker size={32} animation="wobble" delay={0.2} />,
                title: 'Search Algorithms',
                description: 'Learn linear and binary search with visual demonstrations'
              },
              {
                sticker: <RotateCcw size={32} color="#8B5CF6" />,
                title: 'Traversal Techniques',
                description: 'Explore different ways to iterate through arrays efficiently'
              },
              {
                sticker: <GridSticker size={32} animation="float" delay={0.3} />,
                title: '2D Arrays & Matrices',
                description: 'Work with multi-dimensional data structures and patterns'
              },
              {
                sticker: <BrainSticker size={32} animation="pulse" delay={0.4} />,
                title: 'Problem Solving',
                description: 'Apply array concepts to solve real-world coding challenges'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="mb-3 flex justify-center">{benefit.sticker}</div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/lesson/arrays-introduction')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto space-x-3"
          >
            <RocketSticker size={24} animation="bounce" />
            <span>Start Your Array Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrayCoursePage;
