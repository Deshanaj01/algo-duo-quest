import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AlgoVisualNavbar from '../components/common/AlgoVisualNavbar';

const AlgoVisualTopics = () => {
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);

  // Mock user data
  const userStats = {
    level: 2,
    totalXP: 45,
    streakDays: 3,
    username: 'a'
  };

  // All topics with their current status
  const topics = [
    {
      id: 'arrays',
      title: 'Arrays',
      description: 'Learn about arrays, the most basic data structure.',
      unit: 'Unit 1-1',
      lessons: { completed: 2, total: 7 },
      progress: 29,
      status: 'in-progress',
      icon: '📚',
      color: 'purple'
    },
    {
      id: 'strings',
      title: 'Strings',
      description: 'Master string manipulation and common operations.',
      unit: 'Unit 1-2', 
      lessons: { completed: 0, total: 4 },
      progress: 0,
      status: 'available',
      icon: '🔗',
      color: 'green'
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Master the fundamentals of linked data structures.',
      unit: 'Unit 1-3',
      lessons: { completed: 0, total: 4 },
      progress: 0,
      status: 'locked',
      icon: '🔗',
      color: 'gray',
      prerequisites: 'Arrays, Strings'
    },
    {
      id: 'stacks',
      title: 'Stacks',
      description: 'Understand the LIFO data structure.',
      unit: 'Unit 1-4',
      lessons: { completed: 0, total: 3 },
      progress: 0,
      status: 'locked',
      icon: '📚',
      color: 'gray',
      prerequisites: 'Linked Lists'
    },
    {
      id: 'queues',
      title: 'Queues',
      description: 'Learn about FIFO structures.',
      unit: 'Unit 2-1',
      lessons: { completed: 0, total: 4 },
      progress: 0,
      status: 'locked',
      icon: '🚶',
      color: 'brown',
      prerequisites: 'Stacks'
    },
    {
      id: 'recursion',
      title: 'Recursion',
      description: 'Master the art of functions calling themselves.',
      unit: 'Unit 2-2',
      lessons: { completed: 0, total: 5 },
      progress: 0,
      status: 'locked',
      icon: '🔄',
      color: 'purple',
      prerequisites: 'Queues'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-progress':
        return <span className="bg-algo-dark-accent-yellow text-algo-dark-bg-primary text-xs px-2 py-1 rounded-full font-bold">In Progress</span>;
      case 'available':
        return <span className="bg-algo-dark-accent-green text-white text-xs px-2 py-1 rounded-full font-bold">Available</span>;
      case 'locked':
        return <span className="bg-algo-dark-bg-tertiary text-algo-dark-text-muted text-xs px-2 py-1 rounded-full font-bold">Locked</span>;
      default:
        return null;
    }
  };

  const getTopicCard = (topic, index) => {
    const isLocked = topic.status === 'locked';
    
    return (
      <motion.div
        key={topic.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary relative ${
          isLocked ? 'opacity-75' : 'hover:border-algo-dark-accent-blue transition-all cursor-pointer'
        }`}
      >
        {isLocked && (
          <div className="absolute top-4 right-4">
            <span className="text-2xl">🔒</span>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${
              isLocked 
                ? 'bg-algo-dark-bg-tertiary' 
                : topic.color === 'purple' 
                  ? 'bg-algo-dark-accent-purple' 
                  : topic.color === 'green'
                    ? 'bg-algo-dark-accent-green'
                    : 'bg-algo-dark-accent-blue'
            }`}>
              <span className="text-2xl">{topic.icon}</span>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-algo-dark-text-primary">{topic.title}</h3>
                <span className="bg-algo-dark-bg-tertiary text-algo-dark-text-secondary text-xs px-2 py-1 rounded-full font-semibold">
                  {topic.unit}
                </span>
              </div>
              {getStatusBadge(topic.status)}
            </div>
          </div>
        </div>

        <p className="text-algo-dark-text-secondary mb-4">{topic.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-algo-dark-text-muted text-sm">
            {topic.lessons.completed} of {topic.lessons.total} lessons completed
          </span>
          <span className="text-algo-dark-text-muted text-sm font-semibold">
            {topic.progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-algo-dark-bg-tertiary rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              isLocked 
                ? 'bg-gray-500' 
                : topic.color === 'purple'
                  ? 'bg-algo-dark-accent-purple'
                  : topic.color === 'green'
                    ? 'bg-algo-dark-accent-green'
                    : 'bg-algo-dark-accent-blue'
            }`}
            style={{ width: `${topic.progress}%` }}
          ></div>
        </div>

        {isLocked && topic.prerequisites && (
          <div className="bg-algo-dark-bg-tertiary rounded-xl p-3 mb-4">
            <p className="text-algo-dark-text-muted text-sm">
              <span className="font-semibold">Prerequisites:</span> {topic.prerequisites}
            </p>
            <p className="text-algo-dark-text-muted text-xs mt-1">
              Complete prerequisite topics to unlock
            </p>
          </div>
        )}

        {!isLocked && (
          <Link to={`/${topic.id}`}>
            <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
              topic.status === 'in-progress'
                ? 'bg-algo-dark-accent-blue text-white hover:bg-blue-600'
                : 'bg-algo-dark-accent-green text-white hover:bg-green-600'
            }`}>
              {topic.status === 'in-progress' ? 'Continue' : 'Start Learning'}
            </button>
          </Link>
        )}
      </motion.div>
    );
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
      <AlgoVisualNavbar userStats={userStats} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-algo-dark-text-primary mb-2">Topics</h1>
              <p className="text-algo-dark-text-secondary">Master data structures and algorithms step by step</p>
            </div>
            <Link to="/progress" className="text-algo-dark-accent-blue hover:text-blue-400 transition-colors font-semibold">
              View All
            </Link>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => getTopicCard(topic, index))}
        </div>

        {/* Daily Challenge Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button 
            onClick={() => setShowDailyChallenge(true)}
            className="bg-algo-dark-accent-blue text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
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

export default AlgoVisualTopics;
