import React from 'react';
import { CombatProblem } from '../../types/combat';

interface Props {
  problem: CombatProblem | null;
}

const CombatProblemPanel: React.FC<Props> = ({ problem }) => {
  if (!problem) {
    return (
      <div className="h-full bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 text-sm">
        Waiting for problem...
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white">{problem.title}</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-700/40 text-emerald-300 uppercase tracking-wide">
          {problem.difficulty}
        </span>
      </div>
      <p className="text-sm text-gray-300 whitespace-pre-line mb-3">
        {problem.description}
      </p>
      {problem.constraints && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-gray-300 mb-1">
            Constraints
          </h3>
          <p className="text-xs text-gray-400 whitespace-pre-line">
            {problem.constraints}
          </p>
        </div>
      )}
      {problem.sampleTestCases?.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-300 mb-2">
            Sample Test Cases
          </h3>
          <div className="space-y-2">
            {problem.sampleTestCases.map((tc, idx) => (
              <div
                key={idx}
                className="bg-gray-800/60 border border-gray-700/60 rounded-md p-2 text-xs text-gray-200"
              >
                <div className="font-semibold mb-1">Example {idx + 1}</div>
                <div>
                  <span className="text-gray-400">Input:</span>{' '}
                  <code className="text-emerald-300">{tc.input}</code>
                </div>
                <div>
                  <span className="text-gray-400">Output:</span>{' '}
                  <code className="text-blue-300">{tc.expectedOutput}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CombatProblemPanel;

