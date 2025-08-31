import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AlgoVisualDailyChallenge = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Mock user data
  const userStats = {
    totalXP: 45,
    streakDays: 3
  };

  const challenge = {
    title: 'Array Sorting Puzzle',
    question: 'Can you identify which sorting algorithm has the worst time complexity for nearly-sorted arrays?',
    points: 25,
    timeLeft: '14:32:45',
    difficulty: 'Medium',
    options: [
      { id: 'A', text: 'Bubble Sort', isCorrect: true },
      { id: 'B', text: 'Quick Sort', isCorrect: false },
      { id: 'C', text: 'Merge Sort', isCorrect: false },
      { id: 'D', text: 'Insertion Sort', isCorrect: false }
    ],
    explanation: 'Bubble Sort has O(n²) time complexity even for nearly-sorted arrays because it always performs all comparisons, unlike algorithms like Insertion Sort which can perform better on nearly-sorted data.'
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const isCorrect = selectedAnswer && challenge.options.find(opt => opt.id === selectedAnswer)?.isCorrect;

  return (
    <div className="min-h-screen bg-algo-dark-bg-primary text-algo-dark-text-primary">
      {/* Navigation */}
      <nav className="bg-algo-dark-bg-secondary border-b border-algo-dark-border-primary">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-algo-dark-text-primary">AlgoVisual</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-algo-dark-text-secondary hover:text-algo-dark-text-primary transition-colors">Home</Link>
              <Link to="/topics" className="text-algo-dark-text-secondary hover:text-algo-dark-text-primary transition-colors">Topics</Link>
              <Link to="/progress" className="text-algo-dark-text-secondary hover:text-algo-dark-text-primary transition-colors">Progress</Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-algo-dark-bg-tertiary px-4 py-2 rounded-full">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold">{userStats.totalXP} XP</span>
              </div>
              <div className="w-10 h-10 bg-algo-dark-accent-purple rounded-full flex items-center justify-center text-white font-bold">
                a
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/" className="text-algo-dark-accent-blue hover:text-blue-400 transition-colors flex items-center space-x-2">
            <span>←</span>
            <span>Back to home</span>
          </Link>
        </div>

        {/* Challenge Header */}
        <div className="text-center mb-8">
          <div className="bg-algo-dark-accent-blue rounded-xl p-4 inline-block mb-4">
            <span className="text-4xl">📅</span>
          </div>
          <h1 className="text-3xl font-bold text-algo-dark-text-primary mb-2">Daily Challenge</h1>
          <div className="flex items-center justify-center space-x-6 text-algo-dark-text-secondary">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">{challenge.points} points</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⏳</span>
              <span className="font-semibold">Resets in {challenge.timeLeft}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span className="font-semibold">{challenge.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="bg-algo-dark-bg-secondary rounded-2xl p-8 border border-algo-dark-border-primary mb-8">
          <h2 className="text-2xl font-bold text-algo-dark-text-primary mb-6">{challenge.title}</h2>
          
          <div className="bg-algo-dark-bg-tertiary rounded-xl p-6 mb-8">
            <p className="text-lg text-algo-dark-text-primary leading-relaxed">
              {challenge.question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {challenge.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showResult && setSelectedAnswer(option.id)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showResult
                    ? option.isCorrect
                      ? 'border-algo-dark-accent-green bg-green-900/20'
                      : selectedAnswer === option.id
                        ? 'border-algo-dark-accent-red bg-red-900/20'
                        : 'border-algo-dark-border-primary bg-algo-dark-bg-tertiary'
                    : selectedAnswer === option.id
                      ? 'border-algo-dark-accent-blue bg-blue-900/20'
                      : 'border-algo-dark-border-primary bg-algo-dark-bg-tertiary hover:border-algo-dark-accent-blue hover:bg-blue-900/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                    showResult
                      ? option.isCorrect
                        ? 'border-algo-dark-accent-green text-algo-dark-accent-green'
                        : selectedAnswer === option.id
                          ? 'border-algo-dark-accent-red text-algo-dark-accent-red'
                          : 'border-algo-dark-border-primary text-algo-dark-text-muted'
                      : selectedAnswer === option.id
                        ? 'border-algo-dark-accent-blue text-algo-dark-accent-blue bg-blue-900/20'
                        : 'border-algo-dark-border-primary text-algo-dark-text-secondary'
                  }`}>
                    {option.id}
                  </div>
                  <span className="text-algo-dark-text-primary font-medium">{option.text}</span>
                  {showResult && option.isCorrect && (
                    <span className="ml-auto text-algo-dark-accent-green">✓</span>
                  )}
                  {showResult && !option.isCorrect && selectedAnswer === option.id && (
                    <span className="ml-auto text-algo-dark-accent-red">✗</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Submit Button */}
          {!showResult && (
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  selectedAnswer
                    ? 'bg-algo-dark-accent-blue text-white hover:bg-blue-600'
                    : 'bg-algo-dark-bg-tertiary text-algo-dark-text-muted cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className={`rounded-xl p-6 mb-6 ${
                isCorrect 
                  ? 'bg-green-900/20 border border-algo-dark-accent-green' 
                  : 'bg-red-900/20 border border-algo-dark-accent-red'
              }`}>
                <div className="text-4xl mb-4">
                  {isCorrect ? '🎉' : '😅'}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isCorrect ? 'text-algo-dark-accent-green' : 'text-algo-dark-accent-red'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </h3>
                <p className="text-algo-dark-text-secondary mb-4">
                  {isCorrect 
                    ? `Great job! You earned ${challenge.points} XP!` 
                    : "Don't worry, you'll get it next time!"}
                </p>
                
                {/* Explanation */}
                <div className="bg-algo-dark-bg-tertiary rounded-xl p-4 text-left">
                  <h4 className="font-semibold text-algo-dark-text-primary mb-2">Explanation:</h4>
                  <p className="text-algo-dark-text-secondary text-sm leading-relaxed">
                    {challenge.explanation}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Link to="/">
                  <button className="bg-algo-dark-bg-tertiary text-algo-dark-text-primary px-6 py-3 rounded-xl font-semibold hover:bg-algo-dark-border-primary transition-colors">
                    Back to Home
                  </button>
                </Link>
                <Link to="/topics">
                  <button className="bg-algo-dark-accent-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                    Continue Learning
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-algo-dark-text-primary mb-1">Daily Streak</h3>
            <p className="text-2xl font-bold text-algo-dark-accent-orange">{userStats.streakDays} days</p>
          </div>
          
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary text-center">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-bold text-algo-dark-text-primary mb-1">Points Today</h3>
            <p className="text-2xl font-bold text-algo-dark-accent-yellow">0 / 50</p>
          </div>
          
          <div className="bg-algo-dark-bg-secondary rounded-2xl p-6 border border-algo-dark-border-primary text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-algo-dark-text-primary mb-1">Challenges Won</h3>
            <p className="text-2xl font-bold text-algo-dark-accent-green">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoVisualDailyChallenge;
