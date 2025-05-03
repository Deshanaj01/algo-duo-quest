
import React from "react";
import { userProfile } from "@/data/lessonData";

const StreakCounter = () => {
  const { streakDays } = userProfile.user.profile;

  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-3 shadow-md">
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold">{streakDays}</span>
        <span className="text-xs">day{streakDays !== 1 ? 's' : ''}</span>
      </div>
      <div className="fire-icon text-2xl">🔥</div>
      <div className="flex flex-col">
        <span className="font-medium">Current Streak!</span>
        <span className="text-xs">Keep it going</span>
      </div>
    </div>
  );
};

export default StreakCounter;
