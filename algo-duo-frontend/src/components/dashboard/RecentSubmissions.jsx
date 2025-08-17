import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { formatRelativeTime } from '../../utils/helpers';

const RecentSubmissions = ({ submissions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h2>
      
      {submissions.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No submissions yet</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => (
            <Link
              key={submission._id}
              to={`/problem/${submission.problemId}`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {submission.status === 'accepted' ? (
                      <FiCheckCircle className="text-green-500" />
                    ) : (
                      <FiXCircle className="text-red-500" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{submission.problemTitle}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{submission.language}</span>
                        <div className="flex items-center">
                          <FiClock className="mr-1" size={12} />
                          <span>{formatRelativeTime(submission.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold ${
                    submission.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {submission.status === 'accepted' ? `+${submission.xpEarned} XP` : 'Try Again'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <Link 
        to="/submissions"
        className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
      >
        View All Submissions
      </Link>
    </div>
  );
};

export default RecentSubmissions;