import React from 'react';

interface Props {
  testCasesPassed: number;
  totalTestCases: number;
  submissionCount: number;
}

const OpponentProgress: React.FC<Props> = ({
  testCasesPassed,
  totalTestCases,
  submissionCount,
}) => {
  const progress =
    totalTestCases > 0 ? (testCasesPassed / totalTestCases) * 100 : 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 h-full">
      <h2 className="text-sm font-semibold text-white mb-3">
        Opponent Progress
      </h2>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Tests passed</span>
          <span>
            {testCasesPassed}/{totalTestCases || '?'}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
      <div className="text-xs text-gray-300">
        Submissions:{' '}
        <span className="font-semibold text-emerald-300">
          {submissionCount}
        </span>
      </div>
    </div>
  );
};

export default OpponentProgress;

