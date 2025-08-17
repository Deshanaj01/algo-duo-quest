import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problemService } from '../services/problem.service';
import { moduleService } from '../services/module.service';
import ProblemCard from '../components/problems/ProblemCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';

const Problems = () => {
  const { moduleId } = useParams();
  const [problems, setProblems] = useState([]);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProblems, setFilteredProblems] = useState([]);

  useEffect(() => {
    fetchModuleAndProblems();
  }, [moduleId]);

  useEffect(() => {
    filterProblems();
  }, [searchTerm, problems]);

  const fetchModuleAndProblems = async () => {
    try {
      setLoading(true);
      const [moduleResponse, problemsResponse] = await Promise.all([
        moduleService.getModule(moduleId),
        problemService.getModuleProblems(moduleId)
      ]);
      
      setModule(moduleResponse.data);
      setProblems(problemsResponse.data);
      setFilteredProblems(problemsResponse.data);
    } catch (error) {
      setError('Failed to load problems');
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProblems = () => {
    if (!searchTerm) {
      setFilteredProblems(problems);
      return;
    }

    const filtered = problems.filter(problem =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchModuleAndProblems} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/modules" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <FiArrowLeft className="mr-2" />
            Back to Modules
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{module?.name}</h1>
          <p className="text-gray-600">{module?.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
              {problems.length} Problems
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {module?.completedProblems || 0} Completed
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Problems List */}
        {filteredProblems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No problems found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem, index) => (
              <ProblemCard key={problem._id} problem={problem} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;