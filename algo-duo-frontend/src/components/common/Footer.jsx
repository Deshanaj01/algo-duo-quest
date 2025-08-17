import React from 'react';
import { Link } from 'react-router-dom';
import { GiOwl } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-bg-secondary border-t-2 border-gray-200 dark:border-dark-border-primary mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-duo-green-400 p-2 rounded-2xl">
                <GiOwl className="text-white text-2xl" />
              </div>
              <span className="font-black text-xl text-duo-green-500 dark:text-dark-accent-green">CodePilot</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-secondary font-semibold">
              Learn to code the fun way!
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-gray-800 dark:text-dark-text-primary mb-4 text-lg">LEARN</h4>
            <ul className="space-y-2">
              <li><Link to="/modules" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Courses</Link></li>
              <li><Link to="/leaderboard" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Leaderboard</Link></li>
              <li><Link to="/analytics" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Progress</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-gray-800 dark:text-dark-text-primary mb-4 text-lg">EXPLORE</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Success Stories</a></li>
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Shop</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-gray-800 dark:text-dark-text-primary mb-4 text-lg">SUPPORT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 dark:text-dark-text-secondary hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-2 border-gray-100 dark:border-dark-border-primary mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-dark-text-muted font-semibold">&copy; 2024 CodePilot. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 dark:text-dark-text-muted hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Privacy</a>
            <a href="#" className="text-gray-500 dark:text-dark-text-muted hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Terms</a>
            <a href="#" className="text-gray-500 dark:text-dark-text-muted hover:text-duo-green-500 dark:hover:text-dark-accent-green font-semibold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;