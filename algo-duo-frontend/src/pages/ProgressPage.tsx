import React from 'react';
import { useGame } from '../context/GameContext.tsx';
import ProgressBar from '../components/ProgressBar.tsx';

const ProgressPage = () => {
  const { userStats, getXPForLevel } = useGame();
  const currentLevelStart = getXPForLevel(userStats.level);
  const nextLevelStart = getXPForLevel(userStats.level + 1);
  const levelSpan = Math.max(1, nextLevelStart - currentLevelStart);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-1">Your Progress</h1>
        <p className="text-gray-400 mb-8">Track your XP, levels, and milestones</p>

        <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-gray-400 text-sm">Level</div>
              <div className="text-2xl font-semibold">{userStats.level}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-sm">Total XP</div>
              <div className="text-2xl font-semibold">{userStats.totalXP}</div>
            </div>
          </div>

          <ProgressBar value={userStats.currentLevelXP} max={levelSpan} className="my-4" />

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{userStats.currentLevelXP} / {levelSpan} XP this level</span>
            <span>{userStats.xpToNextLevel} XP to Level {userStats.level + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
