import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useGame } from '../context/GameContext.tsx';
import {
  getCombatSocket,
  joinCombatQueue,
  leaveCombatQueue,
} from '../services/combatService.ts';
import MatchmakingSpinner from '../components/combat/MatchmakingSpinner.tsx';
import { CombatMatchFoundPayload } from '../types/combat';

const CombatLobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userStats } = useGame();
  const [searching, setSearching] = useState(false);
  const [queueMessage, setQueueMessage] = useState<string | null>(null);

  useEffect(() => {
    const socket = getCombatSocket();

    const handleMatchFound = (payload: CombatMatchFoundPayload) => {
      setSearching(false);
      navigate(`/combat/${payload.matchId}`, {
        state: {
          initialMatch: payload,
        },
      });
    };

    const handleError = (data: { message?: string }) => {
      setSearching(false);
      setQueueMessage(data.message || 'Matchmaking failed. Please try again.');
    };

    const handleQueueJoined = (data: { position?: number }) => {
      const pos =
        typeof data.position === 'number'
          ? data.position
          : undefined;
      setQueueMessage(
        pos != null
          ? `You are in the queue. Position: ${pos}`
          : 'You are in the queue.',
      );
    };

    socket.on('combat:match-found', handleMatchFound);
    socket.on('combat:error', handleError);
    socket.on('combat:queue-joined', handleQueueJoined);

    return () => {
      socket.off('combat:match-found', handleMatchFound);
      socket.off('combat:error', handleError);
      socket.off('combat:queue-joined', handleQueueJoined);
    };
  }, [navigate]);

  const handleFindMatch = () => {
    if (!user) return;
    setSearching(true);
    setQueueMessage(null);
    joinCombatQueue({
      userId: user.uid,
      displayName: user.displayName || 'Anonymous',
      xp: userStats.totalXP,
      photoURL: user.photoURL,
    });
  };

  const handleCancel = () => {
    if (!user) return;
    leaveCombatQueue(user.uid);
    setSearching(false);
    setQueueMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Code Combat Lobby
            </h1>
            <p className="text-sm text-gray-400">
              Queue up for a real-time coding duel against another player or CodeBot.
            </p>
          </div>
          <div className="text-xs text-right text-gray-400">
            <div>
              Level{' '}
              <span className="text-emerald-300 font-semibold">
                {userStats.level}
              </span>
            </div>
            <div>
              XP{' '}
              <span className="text-emerald-300 font-semibold">
                {userStats.totalXP}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">
                Find a Match
              </h2>
              <p className="text-sm text-gray-300 mb-3">
                You&apos;ll be paired with someone close to your XP. If no
                opponent is found within 30 seconds, you&apos;ll face CodeBot instead.
              </p>
              <ul className="text-xs text-gray-400 list-disc pl-4 space-y-1">
                <li>10 minute time limit per match</li>
                <li>Up to 5 submissions per player</li>
                <li>XP rewards scale with your win streak</li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={searching ? handleCancel : handleFindMatch}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  searching
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {searching ? 'Cancel Search' : 'Find Match'}
              </button>
              {queueMessage && (
                <div className="text-xs text-gray-300 text-center max-w-xs">
                  {queueMessage}
                </div>
              )}
            </div>
          </div>

          {searching && <MatchmakingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default CombatLobbyPage;

