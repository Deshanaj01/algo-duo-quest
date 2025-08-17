import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiHome, FiAward, FiUser, FiLogOut, FiBarChart, FiMoon, FiSun } from 'react-icons/fi';
import { HiOutlineFire, HiOutlineSparkles } from 'react-icons/hi';
import { GiOwl } from 'react-icons/gi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Learn', icon: <FiHome className="text-xl" /> },
    { path: '/modules', label: 'Paths', icon: <HiOutlineSparkles className="text-xl" /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <FiAward className="text-xl" /> },
    { path: '/analytics', label: 'Progress', icon: <FiBarChart className="text-xl" /> },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="bg-white dark:bg-dark-bg-secondary border-b-2 border-gray-200 dark:border-dark-border-primary sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-duo-green-400 p-2 rounded-2xl group-hover:animate-wiggle">
                <GiOwl className="text-white text-3xl" />
              </div>
              <span className="font-black text-2xl text-duo-green-500 dark:text-dark-accent-green">CodePilot</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2 ml-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex flex-col items-center px-4 py-2 rounded-2xl transition-all duration-200
                      ${isActive(link.path) 
                        ? 'text-duo-green-500 dark:text-dark-accent-green bg-duo-green-50 dark:bg-dark-bg-tertiary' 
                        : 'text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'
                      }`}
                  >
                    {link.icon}
                    <span className="text-xs font-bold mt-1">{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green transition-all duration-200 hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="text-xl" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button>
            
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  {/* Streak Counter */}
                  <div className="flex items-center space-x-2 bg-orange-50 dark:bg-dark-bg-tertiary px-4 py-2 rounded-full">
                    <HiOutlineFire className="text-orange-500 dark:text-dark-accent-orange text-2xl animate-pulse-slow" />
                    <span className="font-black text-orange-600 dark:text-dark-accent-orange text-lg">{user?.streak || 0}</span>
                  </div>
                  
                  {/* XP Counter */}
                  <div className="flex items-center space-x-2 bg-duo-blue-50 dark:bg-dark-bg-tertiary px-4 py-2 rounded-full">
                    <span className="text-2xl">⚡</span>
                    <span className="font-black text-duo-blue-600 dark:text-dark-accent-blue">{user?.totalXP || 0}</span>
                  </div>
                  
                  {/* Hearts/Lives */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">❤️</span>
                    ))}
                  </div>
                </div>
                
                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-duo-green-400 to-duo-green-500 dark:from-dark-accent-green dark:to-dark-accent-blue text-white rounded-full flex items-center justify-center font-black text-lg shadow-duo">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-bg-tertiary rounded-2xl shadow-xl border-2 border-gray-100 dark:border-dark-border-primary py-2 hidden group-hover:block animate-slide-up">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border-primary">
                      <p className="font-bold text-gray-800 dark:text-dark-text-primary">{user?.username}</p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Level {user?.level || 1}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-secondary transition-colors"
                    >
                      <FiUser className="text-xl" />
                      <span className="font-semibold">Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-bg-secondary w-full text-left transition-colors"
                    >
                      <FiLogOut className="text-xl" />
                      <span className="font-semibold">Log out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login" className="btn-duo-secondary">
                  Sign in
                </Link>
                <Link to="/register" className="btn-duo">
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;