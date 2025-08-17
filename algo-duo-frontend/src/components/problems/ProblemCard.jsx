import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCircle, FiCode, FiClock } from 'react-icons/fi';
import { DIFFICULTY_COLORS } from '../../utils/constants';

const ProblemCard = ({ problem, index }) => {
  return (
    <Link 
      to={`/problem/${problem._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
            {problem.completed ? (
              <FiCheckCircle className="text-green-500 text-xl" />
            ) : (
              <span className="text-gray-600 font-semibold">{index}</span>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{problem.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <div className="flex items-center">
                <FiCode className="mr-1" />
                <span>{problem.category}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>{problem.estimatedTime || 15} min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-semibold text-primary-600">+{problem.xpReward} XP</div>
          {problem.completed && (
            <div className="text-xs text-green-600 mt-1">Completed</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;