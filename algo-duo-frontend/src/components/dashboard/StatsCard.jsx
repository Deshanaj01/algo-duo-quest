import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, suffix = '', color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50',
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50',
    indigo: 'bg-indigo-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">
        {value}{suffix}
      </p>
    </motion.div>
  );
};

export default StatsCard;