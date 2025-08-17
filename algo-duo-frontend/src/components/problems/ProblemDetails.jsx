import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ProblemDetails = ({ problem, testResults }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>{problem.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
        {problem.examples?.map((example, index) => (
          <div key={index} className="mb-4 bg-gray-50 rounded-lg p-4">
            <div className="mb-2">
              <span className="font-semibold text-sm">Input:</span>
              <pre className="mt-1 text-sm bg-gray-100 p-2 rounded">{example.input}</pre>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sm">Output:</span>
              <pre className="mt-1 text-sm bg-gray-100 p-2 rounded">{example.output}</pre>
            </div>
            {example.explanation && (
              <div>
                <span className="font-semibold text-sm">Explanation:</span>
                <p className="mt-1 text-sm text-gray-600">{example.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Constraints</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {problem.constraints?.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>

      {testResults && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results</h3>
          <div className="space-y-2">
            {testResults.testCases?.map((testCase, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-medium">Test Case {index + 1}</span>
                {testCase.passed ? (
                  <div className="flex items-center text-green-600">
                    <FiCheckCircle className="mr-1" />
                    <span className="text-sm">Passed</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <FiXCircle className="mr-1" />
                    <span className="text-sm">Failed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {testResults.message && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">{testResults.message}</p>
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {problem.topics?.map((topic, index) => (
            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;