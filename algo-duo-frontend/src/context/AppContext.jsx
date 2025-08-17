import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState({
    totalXP: 0,
    level: 1,
    streak: 0,
    problemsSolved: 0,
    accuracy: 0
  });

  const updateUserStats = (stats) => {
    setUserStats(prev => ({ ...prev, ...stats }));
  };

  const value = {
    modules,
    setModules,
    currentModule,
    setCurrentModule,
    problems,
    setProblems,
    currentProblem,
    setCurrentProblem,
    leaderboard,
    setLeaderboard,
    userStats,
    updateUserStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};