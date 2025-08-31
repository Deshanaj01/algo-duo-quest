import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AlgoVisualNavbar from '../components/common/AlgoVisualNavbar';

const AlgoVisualHome = () => {
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);

  // Mock user data
  const userStats = {
    level: 2,
    totalXP: 45,
    streakDays: 3,
    lessonsCompleted: 2,
    nextLevelXP: 100
  };


  const DailyChallenge = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDailyChallenge(false)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-algo-dark-bg-secondary rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="bg-algo-dark-accent-blue rounded-xl p-4 inline-block mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <h2 className="text-2xl font-bold text-algo-dark-text-primary mb-2">Daily Challenge</h2>
          <h3 className="text-xl font-semibold text-algo-dark-accent-purple mb-4">Array Sorting Puzzle</h3>
          <p className="text-algo-dark-text-secondary mb-6">
            Can you identify which sorting algorithm has the worst time complexity for nearly-sorted arrays?
          </p>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-lg">⭐</span>
            <span className="text-algo-dark-text-primary font-semibold">25 points</span>
          </div>
          <p className="text-sm text-algo-dark-text-muted mb-6">Resets in 14:32:45</p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowDailyChallenge(false)}
              className="flex-1 bg-algo-dark-bg-tertiary text-algo-dark-text-secondary py-3 px-6 rounded-xl font-semibold hover:bg-algo-dark-border-primary transition-colors"
            >
              Maybe Later
            </button>
            <button className="flex-1 bg-algo-dark-accent-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              Start Challenge
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-algo-dark-bg-primary text-algo-dark-text-primary">
      <AlgoVisualNavbar userStats={{ ...userStats, username: 'a' }} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Lesson Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-algo-dark-text-primary mb-8">Featured Lesson</h1>
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-8 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-algo-dark-accent-green text-white text-sm px-3 py-1 rounded-full font-semibold">
                    beginner
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-algo-dark-text-primary mb-3">
                  Introduction to Arrays
                </h2>
                <p className="text-algo-dark-text-secondary mb-6 leading-relaxed">
                  Learn the fundamentals of arrays with interactive exercises. Perfect for beginners!
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-algo-dark-text-secondary font-semibold">70 XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-algo-dark-text-secondary">⏱️</span>
                    <span className="text-algo-dark-text-secondary font-semibold">15 mins</span>
                  </div>
                </div>
                <Link to="/arrays">
                  <button className="bg-algo-dark-accent-purple text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center space-x-2">
                    <span>Start Lesson</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>
              <div className="hidden lg:block ml-8">
                <div className="bg-algo-dark-bg-tertiary rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold text-algo-dark-text-primary mb-4">Why Learn Arrays?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <span className="text-algo-dark-accent-green mt-1">✓</span>
                      <span className="text-algo-dark-text-secondary text-sm">Store and organize collections of data efficiently</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-algo-dark-accent-green mt-1">✓</span>
                      <span className="text-algo-dark-text-secondary text-sm">Solve common programming problems and algorithms</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-algo-dark-accent-green mt-1">✓</span>
                      <span className="text-algo-dark-text-secondary text-sm">Build a foundation for advanced data structures</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Pathway Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-algo-dark-text-primary">Learning Pathway</h2>
            <Link to="/topics" className="text-algo-dark-accent-blue hover:text-blue-400 transition-colors font-semibold">
              View All
            </Link>
          </div>

          {/* Current Progress */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary mb-6">
            <h3 className="text-xl font-bold text-algo-dark-text-primary mb-4">Your Learning Pathway</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-algo-dark-accent-purple p-3 rounded-xl">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-algo-dark-text-primary">Arrays</h4>
                    <span className="bg-algo-dark-accent-yellow text-algo-dark-bg-primary text-xs px-2 py-1 rounded-full font-bold">
                      In Progress
                    </span>
                    <span className="bg-algo-dark-bg-tertiary text-algo-dark-text-secondary text-xs px-2 py-1 rounded-full font-semibold">
                      Unit 1-1
                    </span>
                  </div>
                  <p className="text-algo-dark-text-secondary">Learn about arrays, the most basic data structure.</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-algo-dark-text-muted">2 of 7 lessons completed</span>
                    <div className="text-sm text-algo-dark-text-muted">•</div>
                    <span className="text-sm text-algo-dark-text-muted">29% complete</span>
                  </div>
                </div>
              </div>
              <Link to="/arrays">
                <button className="bg-algo-dark-accent-blue text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                  Continue →
                </button>
              </Link>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 bg-algo-dark-bg-tertiary rounded-full h-2">
              <div className="bg-algo-dark-accent-blue h-2 rounded-full transition-all duration-500" style={{ width: '29%' }}></div>
            </div>
          </div>

          {/* Next Topic */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-algo-dark-accent-green p-3 rounded-xl">
                  <span className="text-2xl">🔗</span>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-algo-dark-text-primary">Strings</h4>
                    <span className="bg-algo-dark-bg-tertiary text-algo-dark-text-secondary text-xs px-2 py-1 rounded-full font-semibold">
                      Unit 1-2
                    </span>
                  </div>
                  <p className="text-algo-dark-text-secondary">Master string manipulation and common operations.</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-algo-dark-text-muted">0 of 4 lessons completed</span>
                    <div className="text-sm text-algo-dark-text-muted">•</div>
                    <span className="text-sm text-algo-dark-text-muted">0% complete</span>
                  </div>
                </div>
              </div>
              <div className="text-algo-dark-text-muted">
                <span className="text-3xl">🔒</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-algo-dark-text-primary mb-8">Daily Challenge</h2>
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-algo-dark-accent-orange p-3 rounded-xl">
                  <span className="text-2xl">🧩</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-algo-dark-text-primary mb-2">Array Sorting Puzzle</h3>
                  <p className="text-algo-dark-text-secondary mb-2">
                    Can you identify which sorting algorithm has the worst time complexity for nearly-sorted arrays?
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-algo-dark-text-secondary font-semibold">25 points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-algo-dark-text-secondary">⏳</span>
                      <span className="text-algo-dark-text-muted text-sm">Resets in 14:32:45</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowDailyChallenge(true)}
                className="bg-algo-dark-accent-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-algo-dark-text-primary mb-1">Current Streak</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-400">{userStats.streakDays}</span>
                    <span className="text-algo-dark-text-secondary">days</span>
                    <div className="flex space-x-1 ml-4">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className="text-xl animate-pulse">🔥</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-algo-dark-text-muted text-sm mt-1">Keep it going!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-algo-dark-text-secondary text-sm">Next reward at 7 days</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-algo-dark-text-muted text-sm">3/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge Button (Always Visible) */}
        <div className="fixed bottom-6 left-6 z-40">
          <button 
            onClick={() => setShowDailyChallenge(true)}
            className="bg-algo-dark-accent-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span className="text-xl">📅</span>
            <span>Daily Challenge</span>
          </button>
        </div>
      </div>

      {/* Daily Challenge Modal */}
      {showDailyChallenge && <DailyChallenge />}
    </div>
  );
};

export default AlgoVisualHome;
