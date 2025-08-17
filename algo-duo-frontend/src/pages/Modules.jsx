import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { moduleService } from '../services/module.service';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiLock, FiCheckCircle } from 'react-icons/fi';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await moduleService.getAllModules();
      setModules(response.data);
    } catch (error) {
      setError('Failed to load modules');
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchModules} />;

  const moduleIcons = ['🚀', '🎯', '🌟', '💡', '🔥', '⚡', '🎨', '🏆'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-duo-green-50 via-white to-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-800 mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-600 font-semibold">
            Master coding skills one step at a time
          </p>
        </div>

        {/* Learning Path */}
        <div className="relative">
          {/* Path Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block" />
          
          {/* Modules */}
          <div className="space-y-8">
            {modules.map((module, index) => {
              const isCompleted = module.completedProblems === module.totalProblems;
              const isLocked = index > 0 && modules[index - 1]?.completedProblems < modules[index - 1]?.totalProblems / 2;
              const progress = (module.completedProblems / module.totalProblems) * 100;
              
              return (
                <div
                  key={module._id}
                  className={`relative flex ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center justify-center`}
                >
                  {/* Module Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div
                      className={`card-duo ${
                        isLocked ? 'opacity-60 grayscale' : ''
                      } transform hover:scale-105 transition-all duration-200`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-4xl">{moduleIcons[index % moduleIcons.length]}</span>
                          <div>
                            <h3 className="text-xl font-black text-gray-800">{module.name}</h3>
                            <p className="text-sm text-gray-600 font-semibold">
                              {module.totalProblems} lessons
                            </p>
                          </div>
                        </div>
                        {isCompleted && (
                          <FiCheckCircle className="text-duo-green-500 text-2xl" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-duo-green-500">
                            {module.completedProblems}/{module.totalProblems}
                          </span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-duo-green-400 to-duo-green-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      {isLocked ? (
                        <button disabled className="w-full btn-duo-secondary opacity-50 cursor-not-allowed">
                          <FiLock className="mr-2" />
                          Locked
                        </button>
                      ) : (
                        <Link
                          to={`/modules/${module._id}/problems`}
                          className="w-full btn-duo text-center"
                        >
                          {isCompleted ? 'Practice Again' : progress > 0 ? 'Continue' : 'Start'}
                          <HiOutlineLightningBolt className="inline-block ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Circle Node */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                    <div
                      className={`w-16 h-16 rounded-full border-4 ${
                        isCompleted
                          ? 'bg-duo-green-500 border-duo-green-500'
                          : progress > 0
                          ? 'bg-duo-yellow-400 border-duo-yellow-400'
                          : isLocked
                          ? 'bg-gray-300 border-gray-300'
                          : 'bg-white border-duo-green-400'
                      } flex items-center justify-center shadow-duo`}
                    >
                      {isCompleted ? (
                        <FiCheckCircle className="text-white text-2xl" />
                      ) : isLocked ? (
                        <FiLock className="text-white text-xl" />
                      ) : (
                        <span className="text-2xl font-black text-gray-800">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;