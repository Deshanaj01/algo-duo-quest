import React from 'react';
import { Link } from 'react-router-dom';

const AlgoVisualProgress = () => {
  // Mock user progress data
  const userStats = {
    currentLevel: 2,
    totalPoints: 45,
    lessonsCompleted: 2,
    streakDays: 3,
    nextLevelXP: 100,
    currentXP: 45,
    xpToNextLevel: 55
  };

  const learningPathProgress = [
    { name: 'Arrays & Strings', progress: 80 },
    { name: 'Linked Lists', progress: 65 },
    { name: 'Trees & Graphs', progress: 30 },
    { name: 'Sorting & Searching', progress: 45 },
    { name: 'Dynamic Programming', progress: 10 }
  ];

  return (
    <div className="min-h-screen bg-algo-dark-bg-primary text-algo-dark-text-primary">
      {/* Navigation */}
      <nav className="bg-algo-dark-bg-secondary border-b border-algo-dark-border-primary">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-algo-dark-text-primary">AlgoVisual</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-algo-dark-text-secondary hover:text-algo-dark-text-primary transition-colors">Home</Link>
              <Link to="/topics" className="text-algo-dark-text-secondary hover:text-algo-dark-text-primary transition-colors">Topics</Link>
              <Link to="/progress" className="text-algo-dark-accent-blue font-semibold">Progress</Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-algo-dark-bg-tertiary px-4 py-2 rounded-full">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold">{userStats.totalPoints} XP</span>
              </div>
              <div className="w-10 h-10 bg-algo-dark-accent-purple rounded-full flex items-center justify-center text-white font-bold">
                a
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Home Link */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="text-algo-dark-accent-blue hover:text-blue-400 transition-colors flex items-center space-x-2">
          <span>←</span>
          <span>Back to home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-algo-dark-text-primary mb-2">Your Progress</h1>
          <p className="text-algo-dark-text-secondary">Track your learning journey and growth</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Level */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-algo-dark-accent-blue p-3 rounded-xl">
                <span className="text-2xl">🎖️</span>
              </div>
              <span className="text-3xl font-bold text-algo-dark-accent-blue">{userStats.currentLevel}</span>
            </div>
            <p className="text-algo-dark-text-secondary font-semibold">Current Level</p>
          </div>

          {/* Total Points */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-algo-dark-accent-yellow p-3 rounded-xl">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-3xl font-bold text-algo-dark-accent-yellow">{userStats.totalPoints}</span>
            </div>
            <p className="text-algo-dark-text-secondary font-semibold">Total Points</p>
          </div>

          {/* Lessons Completed */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-algo-dark-accent-green p-3 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-3xl font-bold text-algo-dark-accent-green">{userStats.lessonsCompleted}</span>
            </div>
            <p className="text-algo-dark-text-secondary font-semibold">Lessons Completed</p>
          </div>

          {/* Day Streak */}
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-algo-dark-accent-orange p-3 rounded-xl">
                <span className="text-2xl">🔥</span>
              </div>
              <span className="text-3xl font-bold text-algo-dark-accent-orange">{userStats.streakDays}</span>
            </div>
            <p className="text-algo-dark-text-secondary font-semibold">Day Streak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Level Progress */}
          <div className="lg:col-span-2">
            <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary mb-6">
              <h2 className="text-2xl font-bold text-algo-dark-text-primary mb-6">Level Progress</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-algo-dark-text-primary">Level {userStats.currentLevel}</span>
                <span className="text-lg font-semibold text-algo-dark-text-primary">Level {userStats.currentLevel + 1}</span>
              </div>
              <div className="bg-algo-dark-bg-tertiary rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-algo-dark-accent-blue to-algo-dark-accent-purple h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.currentXP / userStats.nextLevelXP) * 100}%` }}
                ></div>
              </div>
              <p className="text-center text-algo-dark-text-muted text-sm">
                -{userStats.xpToNextLevel} / {userStats.nextLevelXP} XP needed for next level
              </p>
            </div>

            {/* Learning Path Progress */}
            <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
              <h2 className="text-2xl font-bold text-algo-dark-text-primary mb-6">Learning Path Progress</h2>
              <div className="space-y-4">
                {learningPathProgress.map((path, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-algo-dark-text-primary font-medium">{path.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-algo-dark-bg-tertiary rounded-full h-2">
                        <div 
                          className="bg-algo-dark-accent-purple h-2 rounded-full transition-all duration-500"
                          style={{ width: `${path.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-algo-dark-text-secondary font-semibold text-sm w-8">
                        {path.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Streak Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-2xl p-6 border border-orange-500/50">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">📅</span>
                <span className="text-lg font-bold text-algo-dark-text-primary">Current Streak</span>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-400 mb-2">{userStats.streakDays}</div>
                <div className="text-algo-dark-text-secondary mb-4">days</div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-2xl animate-pulse">🔥</span>
                  ))}
                </div>
                <p className="text-algo-dark-text-muted text-sm mb-4">Keep it going!</p>
                <div className="text-center">
                  <p className="text-algo-dark-text-secondary text-sm">Next reward at 7 days</p>
                  <p className="text-algo-dark-text-muted text-sm">3/7</p>
                </div>
              </div>
            </div>

            {/* Activity Overview */}
            <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
              <h3 className="text-lg font-bold text-algo-dark-text-primary mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-algo-dark-accent-green rounded-full"></div>
                  <span className="text-algo-dark-text-secondary text-sm">Completed Array Basics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-algo-dark-accent-blue rounded-full"></div>
                  <span className="text-algo-dark-text-secondary text-sm">Started Array Operations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-algo-dark-accent-purple rounded-full"></div>
                  <span className="text-algo-dark-text-secondary text-sm">Earned 25 XP</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary">
              <h3 className="text-lg font-bold text-algo-dark-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/daily-challenge" className="block">
                  <button className="w-full bg-algo-dark-accent-purple text-white py-2 px-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors text-sm">
                    Daily Challenge
                  </button>
                </Link>
                <Link to="/topics" className="block">
                  <button className="w-full bg-algo-dark-bg-tertiary text-algo-dark-text-primary py-2 px-4 rounded-xl font-semibold hover:bg-algo-dark-border-primary transition-colors text-sm">
                    Browse Topics
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoVisualProgress;
