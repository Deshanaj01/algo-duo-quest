import { Award } from 'react-feather';
import React, { useEffect, useState } from 'react';
import { analyticsService } from '../services/analytics.service';
import ProgressChart from '../components/analytics/ProgressChart';
import TopicChart from '../components/analytics/TopicChart';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiTrendingUp, FiTarget, FiClock, FiCheckCircle } from 'react-icons/fi';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [generalAnalytics, progress, topics] = await Promise.all([
        analyticsService.getUserAnalytics(),
        analyticsService.getProgressAnalytics(period),
        analyticsService.getTopicAnalytics()
      ]);
      
      setAnalytics(generalAnalytics.data);
      setProgressData(progress.data);
      setTopicData(topics.data);
    } catch (error) {
      setError('Failed to load analytics');
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAnalytics} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Track your progress and identify areas for improvement</p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-end mb-6">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field w-40"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <FiTrendingUp className="text-3xl text-blue-500" />
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                +{analytics?.xpGrowth || 0}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total XP Earned</h3>
            <p className="text-2xl font-bold text-gray-900">{analytics?.totalXP || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <FiTarget className="text-3xl text-green-500" />
              <span className="text-sm text-gray-600">
                {analytics?.problemsSolvedThisPeriod || 0} this period
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Problems Solved</h3>
            <p className="text-2xl font-bold text-gray-900">{analytics?.problemsSolved || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <FiCheckCircle className="text-3xl text-purple-500" />
              <span className="text-sm text-gray-600">
                {analytics?.accuracyChange > 0 ? '+' : ''}{analytics?.accuracyChange || 0}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Success Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{analytics?.accuracy || 0}%</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <FiClock className="text-3xl text-orange-500" />
              <span className="text-sm text-gray-600">hours</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Time Spent</h3>
            <p className="text-2xl font-bold text-gray-900">{analytics?.timeSpent || 0}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h2>
            <ProgressChart data={progressData} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Topic Performance</h2>
            <TopicChart data={topicData} />
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Difficulty Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Easy</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${analytics?.easyPercentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{analytics?.easySolved || 0}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${analytics?.mediumPercentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{analytics?.mediumSolved || 0}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hard</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${analytics?.hardPercentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{analytics?.hardSolved || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Language Usage</h3>
              <div className="space-y-2">
                {analytics?.languageStats?.map((lang) => (
                  <div key={lang.language} className="flex justify-between items-center">
                    <span className="text-sm">{lang.language}</span>
                    <span className="text-sm font-semibold">{lang.count} submissions</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Recent Achievements</h3>
              <div className="space-y-2">
                {analytics?.recentAchievements?.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="text-yellow-500" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;