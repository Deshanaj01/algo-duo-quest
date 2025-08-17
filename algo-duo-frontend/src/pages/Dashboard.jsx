import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyticsService } from '../services/analytics.service';
import { submissionService } from '../services/submission.service';
import Loader from '../components/common/Loader';
import { HiOutlineFire, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiTarget, FiAward, FiTrendingUp } from 'react-icons/fi';
import { GiOwl, GiTrophy } from 'react-icons/gi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const analyticsData = await analyticsService.getUserAnalytics();
      setStats(analyticsData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const dailyGoal = {
    current: stats?.todayXP || 0,
    target: 50,
    percentage: Math.min(((stats?.todayXP || 0) / 50) * 100, 100)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-duo-green-50 via-white to-gray-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-primary py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section with Owl */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-duo-green-400 p-4 rounded-3xl shadow-duo-lg animate-float">
              <GiOwl className="text-white text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-800 dark:text-dark-text-primary">
                Hi {user?.username}! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary font-semibold mt-2">
                Ready to code today?
              </p>
            </div>
          </div>
          
          <Link to="/modules" className="btn-duo-gold text-xl px-8 py-4 hidden md:flex">
            Start Learning
            <HiOutlineLightningBolt className="ml-2 text-2xl" />
          </Link>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Streak Card */}
          <div className="card-duo bg-gradient-to-br from-orange-50 to-white dark:from-dark-bg-tertiary dark:to-dark-bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <HiOutlineFire className="text-5xl text-orange-500 dark:text-dark-accent-orange animate-pulse-slow" />
              <span className="text-4xl font-black text-orange-600 dark:text-dark-accent-orange">{stats?.streak || 0}</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary font-bold">Day Streak</p>
            <div className="mt-2 flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${
                    i < (stats?.streak || 0) ? 'bg-orange-400 dark:bg-dark-accent-orange' : 'bg-gray-200 dark:bg-dark-border-primary'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* XP Card */}
          <div className="card-duo bg-gradient-to-br from-duo-blue-50 to-white dark:from-dark-bg-tertiary dark:to-dark-bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">⚡</span>
              <span className="text-4xl font-black text-duo-blue-500 dark:text-dark-accent-blue">{stats?.totalXP || 0}</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary font-bold">Total XP</p>
            <div className="mt-2 bg-gray-200 dark:bg-dark-border-primary rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-duo-blue-400 to-duo-blue-500 dark:from-dark-accent-blue dark:to-dark-accent-purple h-3 rounded-full"
                style={{ width: `${Math.min((stats?.totalXP || 0) / 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Level Card */}
          <div className="card-duo bg-gradient-to-br from-duo-purple-50 to-white dark:from-dark-bg-tertiary dark:to-dark-bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <GiTrophy className="text-5xl text-duo-purple-400 dark:text-dark-accent-purple" />
              <span className="text-4xl font-black text-duo-purple-500 dark:text-dark-accent-purple">{stats?.level || 1}</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary font-bold">Current Level</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-2">
              {100 - (stats?.xpToNextLevel || 0)} XP to next level
            </p>
          </div>

          {/* Problems Solved Card */}
          <div className="card-duo bg-gradient-to-br from-duo-green-50 to-white dark:from-dark-bg-tertiary dark:to-dark-bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <FiTarget className="text-5xl text-duo-green-500 dark:text-dark-accent-green" />
              <span className="text-4xl font-black text-duo-green-600 dark:text-dark-accent-green">{stats?.problemsSolved || 0}</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary font-bold">Problems Solved</p>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-2">
              {stats?.accuracy || 0}% accuracy
            </p>
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="card-duo mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-gray-800 dark:text-dark-text-primary">Daily Goal</h2>
            <span className="text-lg font-bold text-duo-green-500 dark:text-dark-accent-green">
              {dailyGoal.current}/{dailyGoal.target} XP
            </span>
          </div>
          <div className="bg-gray-200 dark:bg-dark-border-primary rounded-full h-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-duo-green-400 to-duo-green-500 dark:from-dark-accent-green dark:to-dark-accent-blue h-full rounded-full flex items-center justify-center transition-all duration-500"
              style={{ width: `${dailyGoal.percentage}%` }}
            >
              {dailyGoal.percentage >= 50 && (
                <span className="text-white font-bold text-sm">
                  {Math.round(dailyGoal.percentage)}%
                </span>
              )}
            </div>
          </div>
          {dailyGoal.percentage >= 100 ? (
            <p className="mt-3 text-center text-duo-green-500 dark:text-dark-accent-green font-bold animate-bounce">
              🎉 Goal Complete! Great job!
            </p>
          ) : (
            <p className="mt-3 text-center text-gray-600 dark:text-dark-text-secondary font-semibold">
              Keep going! You're doing great!
            </p>
          )}
        </div>

        {/* Achievement Badges */}
        <div className="card-duo">
          <h2 className="text-2xl font-black text-gray-800 dark:text-dark-text-primary mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔥', name: 'Streak Master', desc: '7 day streak' },
              { icon: '⚡', name: 'XP Hunter', desc: '1000 XP earned' },
              { icon: '🎯', name: 'Sharpshooter', desc: '90% accuracy' },
              { icon: '🏆', name: 'Problem Solver', desc: '50 problems' },
            ].map((badge, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform">
                  {badge.icon}
                </div>
                <p className="font-bold text-gray-800 dark:text-dark-text-primary">{badge.name}</p>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/modules" className="btn-duo-gold text-xl px-8 py-4 inline-flex items-center">
            Start Learning
            <HiOutlineLightningBolt className="ml-2 text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;