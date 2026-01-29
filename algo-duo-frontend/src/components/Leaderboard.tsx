import React, { useEffect, useState } from 'react';
import { getLeaderboard, getLeaderboardByLevel, getLeaderboardByStreak } from '../services/firestoreService.ts';
import { auth } from '../firebase.ts';

interface Leader {
  userId: string;
  name: string;
  photoURL?: string;
  xp: number;
  level: number;
  streak: number;
}

type LeaderboardFilter = 'xp' | 'level' | 'streak';

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeaderboardFilter>('xp');
  const [limit, setLimit] = useState(25);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user?.uid || null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, limit]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Leader[];
      switch (filter) {
        case 'level':
          data = await getLeaderboardByLevel(limit);
          break;
        case 'streak':
          data = await getLeaderboardByStreak(limit);
          break;
        case 'xp':
        default:
          data = await getLeaderboard(limit);
          break;
      }
      setLeaders(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRankEmoji = (rank: number): string => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getFilterLabel = (filterType: LeaderboardFilter): string => {
    switch (filterType) {
      case 'xp': return 'XP';
      case 'level': return 'Level';
      case 'streak': return 'Streak';
    }
  };

  const getFilterValue = (leader: Leader): number => {
    switch (filter) {
      case 'level': return leader.level;
      case 'streak': return leader.streak;
      case 'xp':
      default: return leader.xp;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-center">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span>🏆</span>
            <span>Leaderboard</span>
            <span>🏆</span>
          </h1>
          <p className="text-gray-300">Compete with fellow learners and climb the ranks!</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('xp')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'xp'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                By XP ⚡
              </button>
              <button
                onClick={() => setFilter('level')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'level'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                By Level 📊
              </button>
              <button
                onClick={() => setFilter('streak')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'streak'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                By Streak 🔥
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-gray-300 text-sm">Show:</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={10}>Top 10</option>
                <option value={25}>Top 25</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
          {leaders.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-lg">No data available yet.</p>
              <p className="text-sm mt-2">Be the first to earn some XP!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/70">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">XP</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Streak</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">{getFilterLabel(filter)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaders.map((leader, index) => {
                    const rank = index + 1;
                    const isCurrentUser = leader.userId === currentUserId;
                    return (
                      <tr 
                        key={leader.userId} 
                        className={`transition hover:bg-gray-700/50 ${
                          isCurrentUser ? 'bg-purple-900/30 border-l-4 border-purple-500' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getRankEmoji(rank)}</span>
                            <span className="text-lg font-bold text-white">{rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img 
                              src={leader.photoURL || 'https://via.placeholder.com/40'} 
                              alt={leader.name}
                              className="w-10 h-10 rounded-full border-2 border-purple-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40';
                              }}
                            />
                            <div>
                              <p className="text-white font-semibold">
                                {leader.name || 'Anonymous'}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded-full">You</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white">
                            Lvl {leader.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-yellow-400 font-bold">{leader.xp.toLocaleString()} ⚡</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-orange-400 font-bold">{leader.streak} 🔥</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-purple-400 font-bold text-lg">
                            {getFilterValue(leader).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {leaders.length > 0 && (
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Showing top {leaders.length} learners</p>
            {currentUserId && !leaders.find(l => l.userId === currentUserId) && (
              <p className="mt-2 text-purple-400">Keep learning to make it to the leaderboard! 💪</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
