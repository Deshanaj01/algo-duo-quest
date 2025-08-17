import React, { useEffect, useState } from 'react';
import { leaderboardService } from '../services/leaderboard.service';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiTrendingUp, FiAward, FiUser } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFrame, setTimeFrame] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFrame]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const [leaderboardResponse, rankResponse] = await Promise.all([
        timeFrame === 'weekly' 
          ? leaderboardService.getWeeklyLeaderboard()
          : leaderboardService.getGlobalLeaderboard(),
        leaderboardService.getUserRank()
      ]);
      
      setLeaderboard(leaderboardResponse.data);
      setUserRank(rankResponse.data);
    } catch (error) {
      setError('Failed to load leaderboard');
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLeaderboard} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">Compete with fellow learners and climb the ranks!</p>
        </div>

        {/* User Rank Card */}
        {userRank && (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 mb-2">Your Current Rank</p>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold">#{userRank.rank}</span>
                  <div>
                    <p className="font-semibold">{user?.username}</p>
                    <p className="text-primary-100">{userRank.totalXP} XP</p>
                  </div>
                </div>
              </div>
              <FiAward className="text-6xl text-primary-300" />
            </div>
          </div>
        )}

        {/* Time Frame Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setTimeFrame('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                timeFrame === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                timeFrame === 'weekly' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    XP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Problems
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry._id}
                    className={`hover:bg-gray-50 ${
                      entry.userId === user?._id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900">
                          {getRankIcon(index + 1) || `#${index + 1}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center mr-3">
                          {entry.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {entry.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        Level {entry.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {entry.totalXP}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <HiOutlineFire className="text-orange-500 mr-1" />
                        <span className="text-sm text-gray-900">{entry.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.problemsSolved}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;