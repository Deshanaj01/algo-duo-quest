import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiClock } from 'react-icons/fi';
import { DIFFICULTY_COLORS } from '../../utils/constants';

const ModuleCard = ({ module }) => {
  const progressPercentage = module.totalProblems > 0 
    ? (module.completedProblems / module.totalProblems) * 100 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{module.description}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${DIFFICULTY_COLORS[module.difficulty]}`}>
          {module.difficulty}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiBook className="mr-2" />
          <span>{module.totalProblems} Problems</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="mr-2" />
          <span>~{module.estimatedTime || 30} mins</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{module.completedProblems}/{module.totalProblems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <Link 
        to={`/modules/${module._id}/problems`}
        className="flex items-center justify-center w-full btn-primary"
      >
        {progressPercentage > 0 ? 'Continue' : 'Start'} Module
        <FiArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

export default ModuleCard;