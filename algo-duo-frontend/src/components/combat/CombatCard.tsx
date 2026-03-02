import React from 'react';
import { useNavigate } from 'react-router-dom';

const CombatCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-900 border border-emerald-500/40 rounded-xl p-5 flex flex-col justify-between hover:border-emerald-400 hover:-translate-y-1 transition-all cursor-pointer"
      onClick={() => navigate('/combat')}
    >
      <div>
        <h3 className="text-lg font-semibold text-emerald-300 mb-2">
          Code Combat ⚔️
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          Jump into a real-time 1v1 coding duel. Solve the problem faster and
          smarter than your opponent to climb the ladder.
        </p>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="px-2 py-1 rounded-full bg-emerald-700/40 text-emerald-200 font-semibold uppercase tracking-wide">
          Ranked Duels
        </span>
        <span className="text-gray-400">~10 min • Live</span>
      </div>
    </div>
  );
};

export default CombatCard;

