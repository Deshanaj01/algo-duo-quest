import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Zap, 
  Search, 
  RotateCcw, 
  Grid3x3, 
  Brain, 
  Target, 
  Trophy, 
  Play, 
  Star, 
  Code,
  Layers,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Rocket,
  Award,
  Clock,
  Users,
  TrendingUp,
  Cpu,
  Database,
  Activity
} from 'lucide-react';

interface AnimatedStickerProps {
  size?: number;
  color?: string;
  animation?: 'bounce' | 'pulse' | 'rotate' | 'scale' | 'float' | 'wobble' | 'glow';
  delay?: number;
}

const animationVariants = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  rotate: {
    rotate: [0, 360],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  },
  scale: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  wobble: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  glow: {
    filter: [
      "drop-shadow(0 0 0px currentColor)",
      "drop-shadow(0 0 8px currentColor)",
      "drop-shadow(0 0 0px currentColor)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Book/Learning Stickers
export const BookSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#3B82F6", 
  animation = "float",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <BookOpen size={size} color={color} />
  </motion.div>
);

export const BrainSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#8B5CF6", 
  animation = "pulse",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Brain size={size} color={color} />
  </motion.div>
);

export const LightbulbSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#F59E0B", 
  animation = "glow",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Lightbulb size={size} color={color} />
  </motion.div>
);

// Action Stickers
export const RocketSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#EF4444", 
  animation = "bounce",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Rocket size={size} color={color} />
  </motion.div>
);

export const ZapSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#10B981", 
  animation = "scale",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Zap size={size} color={color} />
  </motion.div>
);

export const TargetSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#DC2626", 
  animation = "pulse",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Target size={size} color={color} />
  </motion.div>
);

// Achievement Stickers
export const TrophySticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#F59E0B", 
  animation = "bounce",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Trophy size={size} color={color} />
  </motion.div>
);

export const AwardSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#8B5CF6", 
  animation = "rotate",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Award size={size} color={color} />
  </motion.div>
);

export const StarSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#F59E0B", 
  animation = "glow",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Star size={size} color={color} fill={color} />
  </motion.div>
);

// Technical Stickers
export const CodeSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#06B6D4", 
  animation = "wobble",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Code size={size} color={color} />
  </motion.div>
);

export const DatabaseSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#059669", 
  animation = "float",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Database size={size} color={color} />
  </motion.div>
);

export const CpuSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#7C3AED", 
  animation = "pulse",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Cpu size={size} color={color} />
  </motion.div>
);

// Progress Stickers
export const CheckSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#10B981", 
  animation = "scale",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <CheckCircle size={size} color={color} />
  </motion.div>
);

export const ActivitySticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#EF4444", 
  animation = "pulse",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Activity size={size} color={color} />
  </motion.div>
);

export const TrendingSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#10B981", 
  animation = "bounce",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <TrendingUp size={size} color={color} />
  </motion.div>
);

// Array Specific Stickers
export const GridSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#3B82F6", 
  animation = "float",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Grid3x3 size={size} color={color} />
  </motion.div>
);

export const LayersSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#8B5CF6", 
  animation = "wobble",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Layers size={size} color={color} />
  </motion.div>
);

export const SearchSticker: React.FC<AnimatedStickerProps> = ({ 
  size = 24, 
  color = "#06B6D4", 
  animation = "scale",
  delay = 0 
}) => (
  <motion.div
    animate={animationVariants[animation]}
    transition={{ ...animationVariants[animation].transition, delay }}
    className="inline-block"
  >
    <Search size={size} color={color} />
  </motion.div>
);

// Animated Badge Component
interface AnimatedBadgeProps {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
  animation?: 'bounce' | 'pulse' | 'glow';
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  color = "#FFFFFF",
  bgColor = "#3B82F6",
  animation = "pulse"
}) => (
  <motion.span
    animate={animationVariants[animation]}
    className="inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm"
    style={{ backgroundColor: bgColor, color }}
  >
    {children}
  </motion.span>
);

// Animated Container for grouping stickers
interface StickerGroupProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slideIn' | 'fadeIn' | 'scaleIn';
  delay?: number;
}

export const StickerGroup: React.FC<StickerGroupProps> = ({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0
}) => {
  const groupAnimations = {
    slideIn: {
      initial: { x: -30, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.5, delay }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay }
    },
    scaleIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5, delay }
    }
  };

  return (
    <motion.div
      initial={groupAnimations[animation].initial}
      animate={groupAnimations[animation].animate}
      transition={groupAnimations[animation].transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};
