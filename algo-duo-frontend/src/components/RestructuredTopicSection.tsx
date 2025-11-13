import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Target, Clock, Lightbulb } from 'lucide-react';
import { Topic } from '../data/unified-arrays-master.ts';
import ProblemCard from './ProblemCard.tsx';

interface RestructuredTopicSectionProps {
  topic: Topic;
  index: number;
  completedProblems?: Set<string>;
}

const RestructuredTopicSection: React.FC<RestructuredTopicSectionProps> = ({ 
  topic, 
  index, 
  completedProblems = new Set() 
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First topic expanded by default

  const completedCount = topic.problems.filter(p => completedProblems.has(p.id)).length;
  const progress = (completedCount / topic.problems.length) * 100;

  return (
    <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Topic Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-800/60 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Topic Number Badge */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
            {index + 1}
          </div>
          
          <div className="text-left flex-1">
            {/* Topic Name */}
            <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
            
            {/* Concept Badge */}
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">{topic.concept}</span>
            </div>
            
            {/* Topic Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {topic.problems.length} Problems
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {topic.estimatedTime} min
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                topic.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                topic.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {topic.difficulty}
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="text-right mr-4">
            <div className="text-sm text-gray-400 mb-1">
              {completedCount} / {topic.problems.length} completed
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
              {/* Learning Objective */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-blue-400 mb-1">Learning Objective</div>
                    <div className="text-gray-300 text-sm">{topic.learningObjective}</div>
                  </div>
                </div>
              </div>

              {/* Problems Grid */}
              <div className="grid gap-4">
                {topic.problems.map((problem, idx) => (
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

export default RestructuredTopicSection;
