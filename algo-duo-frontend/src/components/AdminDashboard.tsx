import React from 'react';
import { addMaxSubarrayQuestion } from '../services/questionService';

const AdminDashboard: React.FC = () => {
  const handleAddQuestion = async () => {
    try {
      await addMaxSubarrayQuestion();
      // Show success message
      console.log("Question added successfully!");
    } catch (error) {
      // Show error message
      console.error("Failed to add question:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button 
        onClick={handleAddQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Sample Question
      </button>
    </div>
  );
};

export default AdminDashboard;