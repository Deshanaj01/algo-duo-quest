import React from 'react';
import ModuleCard from './ModuleCard';

const ModuleList = ({ modules }) => {
  if (modules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No modules available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard key={module._id} module={module} />
      ))}
    </div>
  );
};

export default ModuleList;