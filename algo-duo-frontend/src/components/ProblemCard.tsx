import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, CheckCircle, Clock, Tag, Lightbulb, Target } from 'lucide-react';

// Support both old and new problem formats
interface BaseProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  learningObjective?: string;
  tags: string[];
  hasVideo?: boolean;
  hasArticle?: boolean;
}

interface RestructuredProblem extends BaseProblem {
  concept?: string;
  objective?: string;
  estimatedTime?: number;
}

interface ProblemCardProps {
  problem: RestructuredProblem;
  index: number;
  isCompleted?: boolean;
  onStart?: () => void;
}

const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, index, isCompleted = false, onStart }) => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      // Default: navigate to learn-first page
      navigate(`/learn-problem/${problem.id}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-800/40 rounded-xl border border-gray-700/60 p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-400 text-sm font-mono">#{index + 1}</span>
            <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
            {isCompleted && (
              <CheckCircle className="w-5 h-5 text-green-400" />
            )}
          </div>
          
          {/* Show concept if available */}
          {problem.concept && (
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-xs font-medium">Concept: {problem.concept}</span>
            </div>
          )}
          
          {/* Show objective or learning objective */}
          <div className="flex items-start gap-2 mb-3">
            <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">{problem.objective || problem.learningObjective}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {problem.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20 flex items-center gap-1"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          {problem.estimatedTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {problem.estimatedTime} min
            </span>
          )}
          {problem.hasVideo && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Video
            </span>
          )}
          {problem.hasArticle && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Article
            </span>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md"
        >
          <Code className="w-4 h-4" />
          {isCompleted ? 'Review' : 'Start Learning'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
