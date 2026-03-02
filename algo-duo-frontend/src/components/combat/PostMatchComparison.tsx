import React from 'react';
import { SubmissionResult, CombatMatch } from '../../types/combat';

interface Props {
  match: CombatMatch | null;
}

const renderResult = (label: string, value: string | number | null | undefined) => (
  <div className="flex justify-between text-xs text-gray-300">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-white">{value ?? '—'}</span>
  </div>
);

const PostMatchComparison: React.FC<Props> = ({ match }) => {
  if (!match) {
    return null;
  }

  const p1 = match.player1;
  const p2 = match.player2;
  const r1 = match.player1Result as SubmissionResult | null;
  const r2 = match.player2Result as SubmissionResult | null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-white mb-4">
        Match Summary
      </h2>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="mb-2">
            <div className="text-gray-400 mb-1">You</div>
            <div className="font-semibold text-emerald-300">
              {p1.displayName}
            </div>
            <div className="text-gray-500 text-[11px]">XP {p1.xp}</div>
          </div>
          <div className="space-y-1">
            {renderResult(
              'Tests passed',
              r1 ? `${r1.testCasesPassed}/${r1.totalTestCases}` : null,
            )}
            {renderResult('Time complexity', r1?.estimatedTimeComplexity)}
            {renderResult('Space complexity', r1?.estimatedSpaceComplexity)}
            {renderResult('Exec time (ms)', r1?.executionTimeMs)}
            {renderResult('Verdict', r1?.verdict)}
          </div>
        </div>
        <div>
          <div className="mb-2 text-right">
            <div className="text-gray-400 mb-1">Opponent</div>
            <div className="font-semibold text-sky-300">
              {p2 ? p2.displayName : 'CodeBot'}
            </div>
            <div className="text-gray-500 text-[11px]">
              XP {p2 ? p2.xp : p1.xp}
            </div>
          </div>
          <div className="space-y-1">
            {renderResult(
              'Tests passed',
              r2 ? `${r2.testCasesPassed}/${r2.totalTestCases}` : null,
            )}
            {renderResult('Time complexity', r2?.estimatedTimeComplexity)}
            {renderResult('Space complexity', r2?.estimatedSpaceComplexity)}
            {renderResult('Exec time (ms)', r2?.executionTimeMs)}
            {renderResult('Verdict', r2?.verdict)}
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Outcome:{' '}
        <span className="text-white font-semibold">
          {match.winnerId
            ? match.winnerId === p1.uid
              ? 'You won'
              : 'You lost'
            : 'Draw'}
        </span>{' '}
        — {match.winReason || 'No reason recorded'}
      </div>
    </div>
  );
};

export default PostMatchComparison;

