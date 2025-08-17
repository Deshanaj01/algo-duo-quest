import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { problemService } from '../services/problem.service';
import CodeEditor from '../components/problems/CodeEditor';
import ProblemDetails from '../components/problems/ProblemDetails';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { FiArrowLeft, FiPlay, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProblemSolve = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [testResults, setTestResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [problemId]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      const response = await problemService.getProblem(problemId);
      setProblem(response.data);
      setCode(response.data.starterCode?.[language] || '');
    } catch (error) {
      setError('Failed to load problem');
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(problem?.starterCode?.[newLanguage] || '');
  };

  const handleRunCode = async () => {
    try {
      setRunning(true);
      const response = await problemService.runCode(problemId, {
        code,
        language
      });
      
      setTestResults(response.data);
      
      if (response.data.success) {
        toast.success('Code executed successfully!');
      } else {
        toast.error('Some test cases failed');
      }
    } catch (error) {
      toast.error('Error running code');
      console.error('Error running code:', error);
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await problemService.submitSolution(problemId, {
        code,
        language
      });
      
      if (response.data.success) {
        toast.success(`Solution accepted! +${response.data.xpEarned} XP`);
        setTimeout(() => {
          navigate(`/modules/${problem.moduleId}/problems`);
        }, 2000);
      } else {
        toast.error('Solution not accepted. Try again!');
        setTestResults(response.data.testResults);
      }
    } catch (error) {
      toast.error('Error submitting solution');
      console.error('Error submitting solution:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProblem} />;
  if (!problem) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{problem.title}</h1>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              problem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {problem.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunCode}
              disabled={running}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              <FiPlay />
              <span>{running ? 'Running...' : 'Run Code'}</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <FiSend />
              <span>{submitting ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Problem Description */}
          <div className="w-1/2 border-r overflow-y-auto">
            <ProblemDetails problem={problem} testResults={testResults} />
          </div>

          {/* Code Editor */}
          <div className="w-1/2 flex flex-col">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;