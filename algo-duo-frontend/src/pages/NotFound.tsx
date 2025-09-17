import React from 'react';
import SimplePage from './SimplePage.tsx';

const NotFound = () => {
  return (
    <SimplePage 
      title="Page Not Found"
      emoji="🚫"
      description="Oops! The page you're looking for doesn't exist."
    />
  );
};

export default NotFound;
