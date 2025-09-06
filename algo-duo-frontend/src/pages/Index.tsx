import React from "react";
import { Book, Award, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Simple Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Algo Duo Quest</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-purple-900/40 rounded-full px-3 py-1">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>120 pts</span>
            </div>
            <div className="flex items-center bg-orange-900/40 rounded-full px-3 py-1">
              <span className="mr-1">🔥</span>
              <span>3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Learn DSA the Fun Way!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master data structures and algorithms with bite-sized lessons, interactive visualizations, and daily challenges.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Book className="h-8 w-8 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold">Interactive Lessons</h3>
            </div>
            <p className="text-gray-300">
              Learn step-by-step with hands-on examples and visual explanations.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-yellow-400 mr-3" />
              <h3 className="text-xl font-semibold">Gamified Learning</h3>
            </div>
            <p className="text-gray-300">
              Earn points, unlock achievements, and maintain your learning streak.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold">Daily Challenges</h3>
            </div>
            <p className="text-gray-300">
              Test your skills with daily coding challenges and problems.
            </p>
          </div>
        </div>

        {/* Learning Topics */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Start Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Array Topic */}
            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Arrays</h3>
              <p className="text-gray-300 text-sm mb-3">
                Learn the fundamentals of arrays and basic operations.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm">✓ Unlocked</span>
                <span className="text-gray-400 text-sm">5 lessons</span>
              </div>
            </div>

            {/* Linked Lists Topic */}
            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Linked Lists</h3>
              <p className="text-gray-300 text-sm mb-3">
                Master dynamic data structures and pointer manipulation.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm">✓ Unlocked</span>
                <span className="text-gray-400 text-sm">4 lessons</span>
              </div>
            </div>

            {/* Stacks Topic */}
            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">Stacks & Queues</h3>
              <p className="text-gray-300 text-sm mb-3">
                Understand LIFO and FIFO data structures.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 text-sm">🔒 Complete Arrays first</span>
                <span className="text-gray-400 text-sm">3 lessons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
