import React from 'react';

interface CombatTimerProps {
  remainingSeconds: number;
}

const formatTime = (totalSeconds: number) => {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (clamped % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const CombatTimer: React.FC<CombatTimerProps> = ({ remainingSeconds }) => {
  return (
    <div className="w-full bg-gray-900 border-b border-emerald-500/40 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-emerald-300 text-sm font-semibold tracking-wide uppercase">
          Match Timer
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-mono font-bold text-emerald-400">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
};

export default CombatTimer;

