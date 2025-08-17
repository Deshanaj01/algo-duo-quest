import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FiAlertCircle className="text-red-500 text-5xl mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message || 'An unexpected error occurred'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;