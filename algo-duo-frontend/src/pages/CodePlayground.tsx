import React from 'react';
import { useNavigate } from 'react-router-dom';
import CombatCard from '../components/combat/CombatCard.tsx';

const CodePlayground: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Code Playground</h1>
            <p className="text-sm text-gray-400">
              Practice algorithms solo or jump into a real-time duel.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-gray-300 hover:text-white"
          >
            ← Back to Home
          </button>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col justify-between hover:border-blue-400 hover:-translate-y-1 transition-all cursor-pointer"
            onClick={() => navigate('/arrays')}
          > */}
            {/* <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Practice Mode
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Jump into interactive playgrounds tied to your current lessons.
                Great for focused, self-paced problem solving.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-1 rounded-full bg-blue-700/40 text-blue-200 font-semibold uppercase tracking-wide">
                Guided
              </span>
              <span className="text-gray-400">XP from lessons</span>
            </div> */}
          </div>

          <CombatCard />
        </div>
      //</div>
    //</div>
  );
};

export default CodePlayground;

