import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Star, 
  CheckCircle, 
  Lock, 
  Play, 
  BookOpen, 
  Code, 
  Trophy,
  Crown,
  Zap,
  Target,
  Brain,
  Cpu
} from 'lucide-react';
import { 
  BookSticker, 
  CodeSticker, 
  TrophySticker, 
  StarSticker,
  BrainSticker,
  TargetSticker,
  RocketSticker,
  ZapSticker,
  StickerGroup,
  AnimatedBadge
} from './AnimatedStickers.tsx';
import { CourseLesson, LessonType } from '../data/arrayCourseLessons';
import { useCourseProgress } from '../context/CourseProgressContext';

interface CourseLessonCardProps {
  lesson: CourseLesson;
  index: number;
}

const CourseLessonCard: React.FC<CourseLessonCardProps> = ({ lesson, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!lesson.unlocked) return;

    // Route based on lesson type
    switch (lesson.type) {
      case 'concept':
        navigate(`/lesson/${lesson.id}`);
        break;
      case 'playground':
        navigate(`/playground/${lesson.id}`);
        break;
      case 'revision':
        navigate(`/revision/${lesson.level}`);
        break;
      case 'mastery':
        navigate(`/mastery-test`);
        break;
      default:
        navigate(`/lesson/${lesson.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-400 bg-green-400/10 border border-green-400/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20';
      case 'advanced':
        return 'text-red-400 bg-red-400/10 border border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border border-gray-400/20';
    }
  };

  const getTypeConfig = (type: LessonType) => {
    switch (type) {
      case 'concept':
        return {
          icon: <BookOpen className="w-5 h-5" />,
          sticker: <BookSticker size={20} animation="float" />,
          bgGradient: 'from-blue-900/30 via-indigo-900/20 to-purple-900/30',
          borderColor: 'border-blue-500/30',
          hoverBorder: 'hover:border-blue-400/50',
          glowColor: 'hover:shadow-blue-500/20',
          typeLabel: 'Concept',
          typeBg: 'bg-blue-500/20 text-blue-300'
        };
      case 'playground':
        return {
          icon: <Code className="w-5 h-5" />,
          sticker: <CodeSticker size={20} animation="wobble" />,
          bgGradient: 'from-emerald-900/30 via-teal-900/20 to-cyan-900/30',
          borderColor: 'border-emerald-500/30',
          hoverBorder: 'hover:border-emerald-400/50',
          glowColor: 'hover:shadow-emerald-500/20',
          typeLabel: 'Practice',
          typeBg: 'bg-emerald-500/20 text-emerald-300'
        };
      case 'revision':
        return {
          icon: <Trophy className="w-5 h-5" />,
          sticker: <TrophySticker size={20} animation="bounce" />,
          bgGradient: 'from-orange-900/30 via-amber-900/20 to-yellow-900/30',
          borderColor: 'border-orange-500/30',
          hoverBorder: 'hover:border-orange-400/50',
          glowColor: 'hover:shadow-orange-500/20',
          typeLabel: 'Quiz',
          typeBg: 'bg-orange-500/20 text-orange-300'
        };
      case 'mastery':
        return {
          icon: <Crown className="w-5 h-5" />,
          sticker: <StarSticker size={20} animation="glow" />,
          bgGradient: 'from-purple-900/40 via-pink-900/30 to-rose-900/40',
          borderColor: 'border-purple-500/40',
          hoverBorder: 'hover:border-purple-400/60',
          glowColor: 'hover:shadow-purple-500/30',
          typeLabel: 'Mastery',
          typeBg: 'bg-purple-500/20 text-purple-300'
        };
    }
  };

  const typeConfig = getTypeConfig(lesson.type);

  // Locked state
  if (!lesson.unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
      >
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 grayscale opacity-60 cursor-not-allowed">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {typeConfig.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-400">{lesson.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
              </div>
            </div>
            <Lock className="w-5 h-5 text-gray-500" />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} min</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>{lesson.xpReward} XP</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      className="relative group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className={`
        relative bg-gradient-to-br ${typeConfig.bgGradient} 
        rounded-xl p-6 border ${typeConfig.borderColor} ${typeConfig.hoverBorder} 
        transition-all duration-300 hover:shadow-xl ${typeConfig.glowColor}
        ${lesson.completed ? 'ring-2 ring-green-500/30' : ''}
      `}>
        
        {/* Completion Badge */}
        {lesson.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2"
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center space-x-2">
              {typeConfig.sticker}
              {typeConfig.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`text-lg font-semibold ${lesson.completed ? 'text-green-300' : 'text-white'} group-hover:text-white`}>
                  {lesson.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.typeBg}`}>
                  {typeConfig.typeLabel}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {lesson.description}
              </p>
            </div>
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
              ${lesson.completed 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }
              transition-all duration-200
            `}
          >
            {lesson.completed ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Review</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration} min</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
              {lesson.difficulty}
            </span>
            
            {/* Special indicators for revision/mastery */}
            {lesson.type === 'revision' && (
              <div className="flex items-center space-x-1 text-orange-400">
                <Target className="w-4 h-4" />
                <span>Level Test</span>
              </div>
            )}
            
            {lesson.type === 'mastery' && (
              <div className="flex items-center space-x-1 text-purple-400">
                <Crown className="w-4 h-4" />
                <span>Final Challenge</span>
              </div>
            )}
          </div>

          <StickerGroup animation="fadeIn" className="flex items-center space-x-2 text-gray-300">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">{lesson.xpReward} XP</span>
            </div>
          </StickerGroup>
        </div>

        {/* Prerequisites indicator */}
        {lesson.prerequisite && lesson.prerequisite.length > 0 && !lesson.completed && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Brain className="w-3 h-3" />
              <span>Requires: {lesson.prerequisite.length} previous lesson{lesson.prerequisite.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        )}

        {/* Hover overlay for special lesson types */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default CourseLessonCard;
