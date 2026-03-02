import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Zap,
  Trophy,
  Flame,
  Target,
  BookOpen,
  Code,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useGame } from '../context/GameContext.tsx';
import { useFirestoreUser } from '../hooks/useFirestoreUser.ts';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userStats, achievements, badges, getLevelInfo } = useGame();
  const { profile } = useFirestoreUser(user);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const levelInfo = getLevelInfo(userStats.level);
  const progressPercent = userStats.xpToNextLevel > 0 
    ? Math.round((userStats.currentLevelXP / (userStats.currentLevelXP + userStats.xpToNextLevel)) * 100)
    : 100;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const statCards = [
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Total XP',
      value: userStats.totalXP.toLocaleString(),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: 'Current Streak',
      value: `${userStats.streakDays} days`,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'Lessons',
      value: userStats.lessonsCompleted.toString(),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: 'Challenges',
      value: userStats.challengesCompleted.toString(),
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Avg Score',
      value: `${userStats.averageScore}%`,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Best Streak',
      value: `${userStats.longestStreak} days`,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="mb-6 p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg shadow-purple-500/30">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <User className="w-16 h-16 text-white/80" />
                  </div>
                )}
              </div>
              <div 
                className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                style={{ backgroundColor: levelInfo.color }}
              >
                {levelInfo.icon} Lvl {userStats.level}
              </div>
            </motion.div>

            {/* User Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-3xl font-bold mb-1">
                {user?.displayName || profile?.name || 'Anonymous Coder'}
              </h1>
              <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2 mb-3">
                <Mail className="w-4 h-4" />
                {user?.email || 'No email'}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span 
                  className="px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: levelInfo.color + '33', color: levelInfo.color }}
                >
                  {levelInfo.icon} {levelInfo.title}
                </span>
                <span className="px-4 py-1.5 bg-gray-700/50 rounded-full text-sm text-gray-300 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profile?.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}
                </span>
              </div>

              {/* Level Progress */}
              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-300">Level {userStats.level} Progress</span>
                  <span className="text-gray-400">{userStats.currentLevelXP} / {userStats.currentLevelXP + userStats.xpToNextLevel} XP</span>
                </div>
                <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: levelInfo.color }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {userStats.xpToNextLevel} XP to Level {userStats.level + 1}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Your Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 text-center`}
              >
                <div className={`${stat.color} flex justify-center mb-2`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        {badges.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              Badges Earned
            </h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{ backgroundColor: badge.color + '33', borderColor: badge.color, borderWidth: 1 }}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="font-medium">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements
            <span className="text-sm font-normal text-gray-400">
              ({unlockedAchievements.length}/{achievements.length})
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Unlocked Achievements */}
            {unlockedAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 border border-yellow-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-yellow-300">{achievement.title}</h3>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-400">+{achievement.xpReward} XP</span>
                      <span className="text-gray-500">•</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                        achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                        achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Locked Achievements */}
            {lockedAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-400">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{achievement.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full transition-all"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.progress} / {achievement.maxProgress}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Quick Actions
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/progress')}
              className="w-full bg-gray-800/60 hover:bg-gray-700/60 rounded-xl p-4 border border-gray-700/50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>View Detailed Progress</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={() => navigate('/achievements')}
              className="w-full bg-gray-800/60 hover:bg-gray-700/60 rounded-xl p-4 border border-gray-700/50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>All Achievements</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full bg-gray-800/60 hover:bg-gray-700/60 rounded-xl p-4 border border-gray-700/50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-purple-400" />
                <span>View Leaderboard</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full bg-red-900/20 hover:bg-red-900/40 rounded-xl p-4 border border-red-500/30 flex items-center justify-between transition-colors text-red-400"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-sm w-full border border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">Sign Out?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to sign out? Your progress is saved to your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
