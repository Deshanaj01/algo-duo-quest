import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Target, Clock, Zap, Code2, Brain, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProblemsFromFirebase } from '../services/firestoreService.ts';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  concept?: string;
  objective?: string;
  learningObjective?: string;
  tags?: string[];
  estimatedTime?: number;
}

interface FirebaseProblemSectionProps {
  levelDifficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completedProblems?: Set<string>;
}

const FirebaseProblemSection: React.FC<FirebaseProblemSectionProps> = ({ 
  levelDifficulty,
  completedProblems = new Set() 
}) => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(['topic-0']));

  useEffect(() => {
    loadProblems();
  }, [levelDifficulty]);

  const loadProblems = async () => {
    setLoading(true);
    try {
      const allProblems = await getAllProblemsFromFirebase();
      
      // Filter by difficulty
      const filteredProblems = allProblems.filter(p => {
        if (levelDifficulty === 'Beginner') return p.difficulty === 'Easy';
        if (levelDifficulty === 'Intermediate') return p.difficulty === 'Medium';
        if (levelDifficulty === 'Advanced') return p.difficulty === 'Hard';
        return false;
      });
      
      setProblems(filteredProblems);
    } catch (error) {
      console.error('Error loading problems:', error);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  // Group problems by concept
  const groupedProblems = problems.reduce((acc, problem) => {
    const concept = problem.concept || 'Other';
    if (!acc[concept]) {
      acc[concept] = [];
    }
    acc[concept].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const calculateXP = (difficulty: string): number => {
    switch (difficulty) {
      case 'Easy': return 50;
      case 'Medium': return 100;
      case 'Hard': return 200;
      default: return 50;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-8 text-center">
        <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">No problems found for this level.</p>
        <p className="text-sm text-gray-500 mt-2">Try populating Firebase from the data management page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedProblems).map(([concept, conceptProblems], topicIndex) => {
        const topicId = `topic-${topicIndex}`;
        const isExpanded = expandedTopics.has(topicId);
        const completedCount = conceptProblems.filter(p => completedProblems.has(p.id)).length;
        const progress = (completedCount / conceptProblems.length) * 100;

        return (
          <div key={topicId} className="bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden">
            {/* Topic Header */}
            <button
              onClick={() => toggleTopic(topicId)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-800/60 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Topic Number Badge */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                  {topicIndex + 1}
                </div>
                
                <div className="text-left flex-1">
                  {/* Topic Name */}
                  <h3 className="text-xl font-bold text-white mb-2">{concept}</h3>
                  
                  {/* Topic Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {conceptProblems.length} Problems
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {conceptProblems.reduce((sum, p) => sum + (p.estimatedTime || 30), 0)} min
                    </span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-400 mb-1">
                    {completedCount} / {conceptProblems.length} completed
                  </div>
                  <div className="w-32 bg-gray-700/50 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</div>
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </button>

            {/* Topic Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-gray-700/50">
                    {/* Problems Grid */}
                    <div className="grid gap-4">
                      {conceptProblems.map((problem, idx) => {
                        const isCompleted = completedProblems.has(problem.id);
                        const xpReward = calculateXP(problem.difficulty);

                        return (
                          <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`
                              relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl p-5 border
                              ${isCompleted ? 'border-green-500/30 bg-green-900/10' : 'border-gray-700/50'}
                              hover:border-blue-500/50 transition-all duration-300 group
                            `}
                          >
                            {isCompleted && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                  ✓ Completed
                                </div>
                              </div>
                            )}

                            <div className="flex items-start gap-4">
                              {/* Problem Number */}
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400">
                                {idx + 1}
                              </div>

                              {/* Problem Info */}
                              <div className="flex-1 min-w-0">
                                {/* Title & Difficulty */}
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    {problem.title}
                                  </h4>
                                  <span className={`
                                    px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0
                                    ${problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                      problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-red-500/20 text-red-400'}
                                  `}>
                                    {problem.difficulty}
                                  </span>
                                </div>

                                {/* Learning Objective */}
                                {(problem.objective || problem.learningObjective) && (
                                  <div className="flex items-start gap-2 mb-3 text-sm text-gray-300">
                                    <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>{problem.objective || problem.learningObjective}</span>
                                  </div>
                                )}

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                  {problem.estimatedTime && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {problem.estimatedTime} min
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 font-semibold">{xpReward} XP</span>
                                  </span>
                                </div>

                                {/* Learn -> Understand -> Code Flow Buttons */}
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => navigate(`/learn-problem/${problem.id}`)}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                                  >
                                    <BookOpen className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    <span>Learn</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => navigate(`/learn-problem/${problem.id}?tab=understand`)}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                                  >
                                    <Brain className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    <span>Understand</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => navigate(`/learn-problem/${problem.id}?tab=code`)}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                                  >
                                    <Code2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                    <span>Code</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FirebaseProblemSection;
