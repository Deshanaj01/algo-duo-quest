import React from 'react';
import { HiOutlineFire } from 'react-icons/hi';

const StreakCalendar = () => {
  // Generate calendar data for the last 30 days
  const generateCalendarData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock activity data - replace with real data
      const hasActivity = Math.random() > 0.3;
      
      data.push({
        date: date.toISOString().split('T')[0],
        hasActivity,
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    
    return data;
  };

  const calendarData = generateCalendarData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Activity Streak</h2>
        <div className="flex items-center text-orange-500">
          <HiOutlineFire className="text-xl mr-1" />
          <span className="font-bold">7 days</span>
        </div>
      </div>
      
      <div className="grid grid-cols-10 gap-1">
        {calendarData.map((day) => (
          <div
            key={day.date}
            className={`aspect-square rounded ${
              day.hasActivity 
                ? 'bg-primary-500 hover:bg-primary-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors cursor-pointer relative group`}
            title={day.date}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {day.month} {day.day}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Keep your streak alive by solving at least one problem daily!</p>
      </div>
    </div>
  );
};

export default StreakCalendar;