/**
 * Comprehensive Arrays Curriculum
 * Structured into Beginner, Intermediate, and Advanced levels
 * Complete coverage of all essential array patterns and techniques
 */

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  learningObjective: string;
  tags: string[];
  hasVideo?: boolean;
  hasArticle?: boolean;
}

export interface Subtopic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  learningObjective: string;
  questionCount: number;
  problems: Problem[];
  estimatedTime: number; // in minutes
}

export interface Level {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  subtopics: Subtopic[];
  totalProblems: number;
  estimatedHours: number;
}

// ==================== BEGINNER LEVEL ====================
export const arraysBeginner: Level = {
  id: 'arrays-beginner',
  name: 'Arrays - Level 1: Beginner',
  description: 'Master array fundamentals, basic operations, and simple problem-solving patterns',
  difficulty: 'Beginner',
  totalProblems: 13,
  estimatedHours: 8,
  subtopics: [
    {
      id: 'basics-easy',
      name: 'Array Basics & Easy Operations',
      difficulty: 'Easy',
      learningObjective: 'Learn basic array traversal, finding elements, and simple operations',
      questionCount: 6,
      estimatedTime: 120,
      problems: [
        {
          id: 'largest-element',
          title: 'Find the Largest Element in an Array',
          difficulty: 'Easy',
          learningObjective: 'Learn basic array traversal and comparison',
          tags: ['array', 'basics', 'traversal'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'second-largest',
          title: 'Find Second Smallest and Second Largest Element',
          difficulty: 'Easy',
          learningObjective: 'Handle multiple comparisons in a single pass',
          tags: ['array', 'traversal', 'optimization'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'check-sorted',
          title: 'Check if Array is Sorted',
          difficulty: 'Easy',
          learningObjective: 'Validate array properties through sequential checking',
          tags: ['array', 'sorted', 'validation'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'remove-duplicates-sorted',
          title: 'Remove Duplicates from Sorted Array',
          difficulty: 'Easy',
          learningObjective: 'Master in-place array manipulation with two pointers',
          tags: ['array', 'two-pointers', 'in-place', 'sorted'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'left-rotate-by-one',
          title: 'Left Rotate Array by One Place',
          difficulty: 'Easy',
          learningObjective: 'Understand array rotation mechanics',
          tags: ['array', 'rotation', 'shifting'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'left-rotate-by-d',
          title: 'Left Rotate Array by D Places',
          difficulty: 'Easy',
          learningObjective: 'Apply rotation algorithms with modular arithmetic',
          tags: ['array', 'rotation', 'algorithm'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'manipulation-easy',
      name: 'Array Manipulation & Arrangement',
      difficulty: 'Easy',
      learningObjective: 'Practice moving, arranging, and organizing array elements',
      questionCount: 4,
      estimatedTime: 100,
      problems: [
        {
          id: 'move-zeros',
          title: 'Move All Zeros to End',
          difficulty: 'Easy',
          learningObjective: 'Efficiently rearrange elements while maintaining order',
          tags: ['array', 'two-pointers', 'arrangement'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'linear-search',
          title: 'Linear Search',
          difficulty: 'Easy',
          learningObjective: 'Implement basic search algorithm',
          tags: ['array', 'search', 'basics'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'union-sorted-arrays',
          title: 'Union of Two Sorted Arrays',
          difficulty: 'Easy',
          learningObjective: 'Merge arrays while handling duplicates',
          tags: ['array', 'merge', 'sorted', 'two-pointers'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'intersection-sorted-arrays',
          title: 'Intersection of Two Sorted Arrays',
          difficulty: 'Easy',
          learningObjective: 'Find common elements using two-pointer technique',
          tags: ['array', 'two-pointers', 'sorted'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'problem-solving-easy',
      name: 'Basic Problem Solving',
      difficulty: 'Easy',
      learningObjective: 'Apply array knowledge to solve simple real-world problems',
      questionCount: 3,
      estimatedTime: 90,
      problems: [
        {
          id: 'missing-number',
          title: 'Find the Missing Number',
          difficulty: 'Easy',
          learningObjective: 'Use mathematical properties to solve array problems',
          tags: ['array', 'math', 'sum'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'max-consecutive-ones',
          title: 'Maximum Consecutive Ones',
          difficulty: 'Easy',
          learningObjective: 'Track sequences in arrays',
          tags: ['array', 'sequence', 'counting'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'single-number',
          title: 'Find the Number that Appears Once',
          difficulty: 'Easy',
          learningObjective: 'Learn XOR properties for array problems',
          tags: ['array', 'xor', 'bit-manipulation'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    }
  ]
};

// ==================== INTERMEDIATE LEVEL ====================
export const arraysIntermediate: Level = {
  id: 'arrays-intermediate',
  name: 'Arrays - Level 2: Intermediate',
  description: 'Master two-pointers, sliding window, and important array patterns',
  difficulty: 'Intermediate',
  totalProblems: 16,
  estimatedHours: 15,
  subtopics: [
    {
      id: 'two-pointers-medium',
      name: 'Two Pointers & Pair Problems',
      difficulty: 'Medium',
      learningObjective: 'Master two-pointer technique for pair and triplet problems',
      questionCount: 5,
      estimatedTime: 180,
      problems: [
        {
          id: 'two-sum',
          title: 'Two Sum Problem',
          difficulty: 'Medium',
          learningObjective: 'Use hash maps for O(n) pair finding',
          tags: ['array', 'hash-map', 'two-pointers', 'pairs'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'sort-012',
          title: 'Sort Array of 0s, 1s and 2s (Dutch National Flag)',
          difficulty: 'Medium',
          learningObjective: 'Apply three-way partitioning algorithm',
          tags: ['array', 'sorting', 'three-pointers', 'partitioning'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'majority-element',
          title: 'Majority Element (>n/2 times)',
          difficulty: 'Medium',
          learningObjective: 'Learn Moore\'s Voting Algorithm',
          tags: ['array', 'voting-algorithm', 'frequency'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'kadanes-algorithm',
          title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
          difficulty: 'Medium',
          learningObjective: 'Master dynamic programming approach for subarrays',
          tags: ['array', 'dp', 'kadanes', 'subarray'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'best-time-stock',
          title: 'Best Time to Buy and Sell Stock',
          difficulty: 'Medium',
          learningObjective: 'Track running minimum for optimization problems',
          tags: ['array', 'greedy', 'profit', 'optimization'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'rearrangement-medium',
      name: 'Rearrangement & Permutations',
      difficulty: 'Medium',
      learningObjective: 'Handle complex array rearrangement patterns',
      questionCount: 4,
      estimatedTime: 150,
      problems: [
        {
          id: 'rearrange-sign',
          title: 'Rearrange Array Elements by Sign',
          difficulty: 'Medium',
          learningObjective: 'Maintain relative order while rearranging',
          tags: ['array', 'arrangement', 'two-pointers'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'next-permutation',
          title: 'Next Permutation',
          difficulty: 'Medium',
          learningObjective: 'Find lexicographically next arrangement',
          tags: ['array', 'permutation', 'algorithm'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'leaders-array',
          title: 'Leaders in an Array',
          difficulty: 'Medium',
          learningObjective: 'Scan array from right to find leaders',
          tags: ['array', 'traversal', 'optimization'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'longest-consecutive',
          title: 'Longest Consecutive Sequence',
          difficulty: 'Medium',
          learningObjective: 'Use hash sets for O(n) sequence finding',
          tags: ['array', 'hash-set', 'sequence'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'matrix-medium',
      name: 'Matrix & 2D Arrays',
      difficulty: 'Medium',
      learningObjective: 'Navigate and manipulate 2D arrays efficiently',
      questionCount: 4,
      estimatedTime: 180,
      problems: [
        {
          id: 'set-matrix-zeros',
          title: 'Set Matrix Zeros',
          difficulty: 'Medium',
          learningObjective: 'Optimize space using matrix itself as markers',
          tags: ['matrix', '2d-array', 'in-place'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'rotate-matrix-90',
          title: 'Rotate Matrix by 90 Degrees',
          difficulty: 'Medium',
          learningObjective: 'Transform matrix using transpose and reverse',
          tags: ['matrix', 'rotation', 'transformation'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'spiral-traversal',
          title: 'Print Matrix in Spiral Form',
          difficulty: 'Medium',
          learningObjective: 'Master boundary-based matrix traversal',
          tags: ['matrix', 'traversal', 'simulation'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'pascals-triangle',
          title: 'Pascal\'s Triangle',
          difficulty: 'Medium',
          learningObjective: 'Generate patterns using combinatorics',
          tags: ['matrix', 'math', 'pattern'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'subarray-medium',
      name: 'Subarray Problems',
      difficulty: 'Medium',
      learningObjective: 'Work with contiguous subarrays and their properties',
      questionCount: 3,
      estimatedTime: 120,
      problems: [
        {
          id: 'count-subarrays-sum-k',
          title: 'Count Subarrays with Sum K',
          difficulty: 'Medium',
          learningObjective: 'Use prefix sum with hash maps',
          tags: ['array', 'subarray', 'prefix-sum', 'hash-map'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'longest-subarray-sum-k',
          title: 'Longest Subarray with Sum K',
          difficulty: 'Medium',
          learningObjective: 'Apply sliding window for positives, prefix sum for negatives',
          tags: ['array', 'subarray', 'sliding-window'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'subarray-xor-k',
          title: 'Count Subarrays with XOR K',
          difficulty: 'Medium',
          learningObjective: 'Extend prefix sum concept to XOR',
          tags: ['array', 'xor', 'prefix-xor', 'hash-map'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    }
  ]
};

// ==================== ADVANCED LEVEL ====================
export const arraysAdvanced: Level = {
  id: 'arrays-advanced',
  name: 'Arrays - Level 3: Advanced',
  description: 'Tackle hard problems involving multiple pointers, merging, and complex patterns',
  difficulty: 'Advanced',
  totalProblems: 15,
  estimatedHours: 20,
  subtopics: [
    {
      id: 'three-four-sum',
      name: 'Multiple Pointers & K-Sum Problems',
      difficulty: 'Hard',
      learningObjective: 'Extend two-pointer technique to 3-sum and 4-sum problems',
      questionCount: 3,
      estimatedTime: 180,
      problems: [
        {
          id: 'three-sum',
          title: '3 Sum Problem',
          difficulty: 'Hard',
          learningObjective: 'Find all unique triplets that sum to zero',
          tags: ['array', 'three-pointers', 'triplets', 'sorting'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'four-sum',
          title: '4 Sum Problem',
          difficulty: 'Hard',
          learningObjective: 'Extend to quadruplets with efficient pruning',
          tags: ['array', 'four-pointers', 'quadruplets', 'sorting'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'largest-subarray-zero-sum',
          title: 'Largest Subarray with Zero Sum',
          difficulty: 'Hard',
          learningObjective: 'Use prefix sum for zero-sum detection',
          tags: ['array', 'prefix-sum', 'hash-map', 'subarray'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'merge-intervals',
      name: 'Merging & Overlapping Intervals',
      difficulty: 'Hard',
      learningObjective: 'Handle interval merging and overlapping logic',
      questionCount: 3,
      estimatedTime: 150,
      problems: [
        {
          id: 'merge-overlapping-intervals',
          title: 'Merge Overlapping Intervals',
          difficulty: 'Hard',
          learningObjective: 'Sort and merge intervals efficiently',
          tags: ['array', 'intervals', 'sorting', 'merging'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'merge-sorted-arrays',
          title: 'Merge Two Sorted Arrays Without Extra Space',
          difficulty: 'Hard',
          learningObjective: 'Use gap method or two-pointer from end',
          tags: ['array', 'merge', 'in-place', 'sorting'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'find-missing-repeating',
          title: 'Find Missing and Repeating Numbers',
          difficulty: 'Hard',
          learningObjective: 'Apply mathematical equations or XOR',
          tags: ['array', 'math', 'xor', 'equations'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'advanced-patterns',
      name: 'Advanced Problem Patterns',
      difficulty: 'Hard',
      learningObjective: 'Master complex algorithmic patterns on arrays',
      questionCount: 5,
      estimatedTime: 240,
      problems: [
        {
          id: 'inversion-count',
          title: 'Count Inversions',
          difficulty: 'Hard',
          learningObjective: 'Use merge sort to count inversions in O(n log n)',
          tags: ['array', 'merge-sort', 'divide-conquer', 'inversions'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'reverse-pairs',
          title: 'Count Reverse Pairs',
          difficulty: 'Hard',
          learningObjective: 'Modify merge sort for pair counting',
          tags: ['array', 'merge-sort', 'pairs'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'max-product-subarray',
          title: 'Maximum Product Subarray',
          difficulty: 'Hard',
          learningObjective: 'Track both max and min products due to negatives',
          tags: ['array', 'dp', 'subarray', 'product'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'majority-element-n3',
          title: 'Majority Element (>n/3 times)',
          difficulty: 'Hard',
          learningObjective: 'Extend Boyer-Moore to find two majority elements',
          tags: ['array', 'voting-algorithm', 'frequency'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'longest-substring-without-repeat',
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Hard',
          learningObjective: 'Use sliding window with hash set',
          tags: ['array', 'sliding-window', 'hash-set', 'string'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    },
    {
      id: 'hard-optimizations',
      name: 'Hard Optimization Problems',
      difficulty: 'Hard',
      learningObjective: 'Solve challenging problems requiring creative optimizations',
      questionCount: 4,
      estimatedTime: 200,
      problems: [
        {
          id: 'trapping-rain-water',
          title: 'Trapping Rain Water',
          difficulty: 'Hard',
          learningObjective: 'Use two pointers to calculate trapped water',
          tags: ['array', 'two-pointers', 'water', 'optimization'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'container-most-water',
          title: 'Container With Most Water',
          difficulty: 'Hard',
          learningObjective: 'Apply greedy two-pointer approach',
          tags: ['array', 'two-pointers', 'greedy', 'area'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'find-duplicate',
          title: 'Find the Duplicate Number',
          difficulty: 'Hard',
          learningObjective: 'Use Floyd\'s cycle detection on array',
          tags: ['array', 'cycle-detection', 'linked-list-in-array'],
          hasVideo: true,
          hasArticle: true
        },
        {
          id: 'repeat-missing',
          title: 'Repeat and Missing Number',
          difficulty: 'Hard',
          learningObjective: 'Solve using sum and sum of squares',
          tags: ['array', 'math', 'equations'],
          hasVideo: true,
          hasArticle: true
        }
      ]
    }
  ]
};

// ==================== COMPLETE ARRAYS CURRICULUM ====================
export const arraysCompleteCurriculum = {
  topic: 'Arrays',
  totalLevels: 3,
  totalProblems: 44,
  estimatedHours: 43,
  levels: [
    arraysBeginner,
    arraysIntermediate,
    arraysAdvanced
  ]
};

// Helper function to get all problems across all levels
export const getAllArraysProblems = (): Problem[] => {
  const allProblems: Problem[] = [];
  
  arraysCompleteCurriculum.levels.forEach(level => {
    level.subtopics.forEach(subtopic => {
      allProblems.push(...subtopic.problems);
    });
  });
  
  return allProblems;
};

// Helper function to get problems by difficulty
export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] => {
  return getAllArraysProblems().filter(p => p.difficulty === difficulty);
};

// Helper function to get subtopics by level
export const getSubtopicsByLevel = (levelId: string): Subtopic[] => {
  const level = arraysCompleteCurriculum.levels.find(l => l.id === levelId);
  return level?.subtopics || [];
};

export default arraysCompleteCurriculum;
