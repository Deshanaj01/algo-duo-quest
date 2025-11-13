import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Target } from 'lucide-react';
import type { Subtopic } from '../data/comprehensive-arrays-curriculum.ts';
import ProblemCard from './ProblemCard.tsx';

interface SubtopicSectionProps {
  subtopic: Subtopic;
  index: number;
  completedProblems?: Set<string>;
}

const SubtopicSection: React.FC<SubtopicSectionProps> = ({ subtopic, index, completedProblems = new Set() }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First subtopic expanded by default

  const completedCount = subtopic.problems.filter(p => completedProblems.has(p.id)).length;
  const progress = (completedCount / subtopic.questionCount) * 100;

  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Subtopic Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/60 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
            {index + 1}
          </div>
          
          <div className="text-left flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{subtopic.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {subtopic.questionCount} Problems
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {subtopic.estimatedTime} min
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                subtopic.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                subtopic.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {subtopic.difficulty}
              </span>
            </div>
          </div>

          <div className="text-right mr-4">
            <div className="text-sm text-gray-400 mb-1">
              {completedCount} / {subtopic.questionCount} completed
            </div>
            <div className="w-32 bg-gray-700/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      {/* Subtopic Content */}
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
              {/* Learning Objective */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-blue-400 mb-1">Learning Objective</div>
                    <div className="text-gray-300 text-sm">{subtopic.learningObjective}</div>
                  </div>
                </div>
              </div>

              {/* Problems Grid */}
              <div className="grid gap-4">
                {subtopic.problems.map((problem, idx) => (
                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    index={idx}
                    isCompleted={completedProblems.has(problem.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubtopicSection;
