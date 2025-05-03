
import React from "react";
import { userProfile } from "@/data/lessonData";
import { CalendarDays } from "lucide-react";

const StreakCounter = () => {
  const { streakDays } = userProfile.user.profile;

  // Generate flame elements based on streak days
  const renderFlames = () => {
    const flames = [];
    const flameCount = Math.min(streakDays, 7); // Cap at 7 flames max
    
    for (let i = 0; i < flameCount; i++) {
      flames.push(
        <div key={i} className={`streak-flame text-2xl animate-bounce-subtle`} style={{ 
          animationDelay: `${i * 0.1}s`,
          opacity: 1 - (i * 0.1)
        }}>
          🔥
        </div>
      );
    }
    
    return flames;
  };

  return (
    <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-700/30 rounded-xl p-4 shadow-inner">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-medium text-sm text-orange-200 flex items-center">
            <CalendarDays className="h-4 w-4 mr-1 text-orange-300" />
            Current Streak
          </h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white mr-1">{streakDays}</span>
            <span className="text-sm text-orange-200">day{streakDays !== 1 ? 's' : ''}</span>
          </div>
          <p className="text-xs text-orange-200/70 mt-1">Keep it going!</p>
        </div>
        
        <div className="flex">
          {renderFlames()}
        </div>
      </div>
      
      <div className="mt-3 bg-orange-900/30 rounded-lg p-2 flex justify-between items-center">
        <span className="text-xs text-orange-200">Next reward at 7 days</span>
        <span className="text-xs font-medium bg-orange-900/50 px-2 py-0.5 rounded-md text-orange-200">
          {streakDays}/7
        </span>
      </div>
    </div>
  );
};

export default StreakCounter;
