import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AlgoVisualNavbar = ({ userStats }) => {
  const location = useLocation();
  
  const defaultStats = {
    totalXP: 45,
    streakDays: 3,
    level: 2,
    username: 'a'
  };
  
  const stats = userStats || defaultStats;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-algo-dark-bg-secondary border-b border-algo-dark-border-primary">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-algo-dark-text-primary">AlgoVisual</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-algo-dark-accent-blue font-semibold' 
                  : 'text-algo-dark-text-secondary hover:text-algo-dark-text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/topics" 
              className={`transition-colors ${
                isActive('/topics') 
                  ? 'text-algo-dark-accent-blue font-semibold' 
                  : 'text-algo-dark-text-secondary hover:text-algo-dark-text-primary'
              }`}
            >
              Topics
            </Link>
            <Link 
              to="/progress" 
              className={`transition-colors ${
                isActive('/progress') 
                  ? 'text-algo-dark-accent-blue font-semibold' 
                  : 'text-algo-dark-text-secondary hover:text-algo-dark-text-primary'
              }`}
            >
              Progress
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-algo-dark-bg-tertiary px-4 py-2 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">{stats.totalXP} XP</span>
            </div>
            <div className="w-10 h-10 bg-algo-dark-accent-purple rounded-full flex items-center justify-center text-white font-bold">
              {stats.username}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AlgoVisualNavbar;
