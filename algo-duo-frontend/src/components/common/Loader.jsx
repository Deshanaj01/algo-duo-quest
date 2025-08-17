import React from 'react';

const Loader = ({ size = 'default', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className={`${sizeClasses.large} border-4 border-primary-600 border-t-transparent rounded-full animate-spin`}></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-3 border-primary-600 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;