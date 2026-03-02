import React from 'react';

interface Props {
  message?: string;
}

const MatchmakingSpinner: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin" />
        <div className="absolute inset-1 rounded-full bg-emerald-500/5" />
      </div>
      <div className="text-sm text-gray-300 mb-1">
        {message || 'Searching for an opponent...'}
      </div>
      <div className="text-xs text-gray-500">
        Tip: Stay on this tab while we find you a match.
      </div>
    </div>
  );
};

export default MatchmakingSpinner;

