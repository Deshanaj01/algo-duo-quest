import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { fetchCombatMatch } from '../services/combatService.ts';
import { CombatMatch, CombatMatchEndPayload } from '../types/combat';
import PostMatchComparison from '../components/combat/PostMatchComparison.tsx';

interface LocationState {
  matchEnd?: CombatMatchEndPayload;
}

const CombatResultsPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [match, setMatch] = useState<CombatMatch | null>(null);
  const [loading, setLoading] = useState(true);

  const state = (location.state || {}) as LocationState;

  useEffect(() => {
    const load = async () => {
      if (!matchId) return;
      try {
        const fullMatch = await fetchCombatMatch(matchId);
        setMatch(fullMatch);
      } catch {
        setMatch(null);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [matchId]);

  const winnerId = state.matchEnd?.winnerId ?? match?.winnerId ?? null;
  const winReason =
    state.matchEnd?.winReason ?? match?.winReason ?? 'Match complete';

  const isWinner = user && winnerId === user.uid;
  const isDraw = winnerId == null;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4 text-center">
          <div className="text-xs text-gray-500 mb-1">
            Match {matchId}
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isDraw ? 'Draw' : isWinner ? 'Victory!' : 'Defeat'}
          </h1>
          <p className="text-sm text-gray-300 mb-3">{winReason}</p>
          <div className="text-xs text-gray-400 mb-4">
            XP has already been updated based on the result.
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/combat')}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold"
            >
              Play Again
            </button>
            <button
              type="button"
              onClick={() => navigate('/playground')}
              className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-xs font-semibold"
            >
              Back to Playground
            </button>
          </div>
        </div>
        {loading ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center text-sm text-gray-400">
            Loading match details...
          </div>
        ) : (
          <PostMatchComparison match={match} />
        )}
      </div>
    </div>
  );
};

export default CombatResultsPage;

