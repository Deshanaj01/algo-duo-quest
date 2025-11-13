/**
 * COMPLETE RESTRUCTURED ARRAYS CURRICULUM
 * 
 * ✅ All 48 problems from your database (44 + 4 practice)
 * ✅ Organized by pedagogical progression (Beginner → Intermediate → Advanced)
 * ✅ Each problem includes: concept, objective, tags
 * ✅ Maintains Learn → Understand → Code flow
 * ✅ Follows proper teaching progression
 */

export interface RestructuredProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  concept: string; // Main technique/pattern (e.g., "Two Pointers", "Hash Map")
  objective: string; // One-line learning goal
  tags: string[];
  hasVideo?: boolean;
  hasArticle?: boolean;
  estimatedTime?: number; // in minutes
}

export interface RestructuredTopic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  concept: string; // Overall concept for this topic
  learningObjective: string;
  problems: RestructuredProblem[];
  estimatedTime: number; // total time for all problems
}

export interface RestructuredLevel {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  name: string;
  description: string;
  icon: string;
  topics: RestructuredTopic[];
  totalProblems: number;
  estimatedHours: number;
}

// ========================================
// 🟢 BEGINNER LEVEL
// ========================================
export const restructuredBeginner: RestructuredLevel = {
  id: 'beginner',
  level: 'Beginner',
  name: 'Beginner - Fundamentals & Basics',
  description: 'Master array fundamentals, basic operations, and build strong foundations',
  icon: '🟢',
  totalProblems: 17,
  estimatedHours: 10,
  topics: [
    {
      id: 'array-introduction',
      name: '1. Introduction to Arrays',
      difficulty: 'Easy',
      concept: 'Array Basics & Structure',
      learningObjective: 'Understand what arrays are, how they work, and basic traversal',
      estimatedTime: 90,
      problems: [
        {
          id: 'array-max',
          title: 'Find Maximum Value',
          difficulty: 'Easy',
          concept: 'Array Traversal',
          objective: 'Learn to scan an array and track a value',
          tags: ['arrays', 'traversal', 'basics'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 15
        },
        {
          id: 'largest-element',
          title: 'Find the Largest Element in an Array',
          difficulty: 'Easy',
          concept: 'Single Pass Iteration',
          objective: 'Master basic array traversal and comparison logic',
          tags: ['array', 'basics', 'traversal', 'iteration'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 20
        },
        {
          id: 'second-largest',
          title: 'Find Second Smallest and Second Largest Element',
          difficulty: 'Easy',
          concept: 'Multiple Comparisons',
          objective: 'Handle multiple values in a single pass efficiently',
          tags: ['array', 'traversal', 'optimization', 'comparison'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'array-reverse',
          title: 'Reverse an Array',
          difficulty: 'Easy',
          concept: 'Two Pointer Basics',
          objective: 'Learn fundamental two-pointer technique for reversing',
          tags: ['arrays', 'two-pointers', 'reversal', 'basics'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 15
        },
        {
          id: 'check-sorted',
          title: 'Check if Array is Sorted',
          difficulty: 'Easy',
          concept: 'Sequential Validation',
          objective: 'Validate array properties through pairwise checking',
          tags: ['array', 'sorted', 'validation', 'logic'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 15
        }
      ]
    },
    {
      id: 'basic-operations',
      name: '2. Basic Array Operations',
      difficulty: 'Easy',
      concept: 'Insertion, Deletion, and Rotation',
      learningObjective: 'Learn how to modify arrays: add, remove, and rearrange elements',
      estimatedTime: 120,
      problems: [
        {
          id: 'left-rotate-by-one',
          title: 'Left Rotate Array by One Place',
          difficulty: 'Easy',
          concept: 'Array Rotation',
          objective: 'Understand basic rotation mechanics and shifting',
          tags: ['array', 'rotation', 'shifting', 'basics'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 20
        },
        {
          id: 'left-rotate-by-d',
          title: 'Left Rotate Array by D Places',
          difficulty: 'Easy',
          concept: 'Rotation Algorithm',
          objective: 'Apply rotation with modular arithmetic and reversal trick',
          tags: ['array', 'rotation', 'algorithm', 'modulo'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        },
        {
          id: 'array-rotation',
          title: 'Rotate Array to Right by K Steps',
          difficulty: 'Easy',
          concept: 'Reversal Algorithm',
          objective: 'Master efficient in-place rotation using three reversals',
          tags: ['arrays', 'rotation', 'in-place', 'algorithm'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'move-zeros',
          title: 'Move All Zeros to End',
          difficulty: 'Easy',
          concept: 'In-Place Rearrangement',
          objective: 'Efficiently rearrange elements while maintaining relative order',
          tags: ['array', 'two-pointers', 'arrangement', 'in-place'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'remove-duplicates-sorted',
          title: 'Remove Duplicates from Sorted Array',
          difficulty: 'Easy',
          concept: 'Two Pointers on Sorted Array',
          objective: 'Master in-place array manipulation with two pointers',
          tags: ['array', 'two-pointers', 'in-place', 'sorted'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 20
        }
      ]
    },
    {
      id: 'searching-basics',
      name: '3. Basic Searching Techniques',
      difficulty: 'Easy',
      concept: 'Linear Search & Finding Elements',
      learningObjective: 'Learn fundamental search algorithms and element detection',
      estimatedTime: 90,
      problems: [
        {
          id: 'linear-search',
          title: 'Linear Search',
          difficulty: 'Easy',
          concept: 'Sequential Search',
          objective: 'Implement the most basic search algorithm',
          tags: ['array', 'search', 'basics', 'linear'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 15
        },
        {
          id: 'missing-number',
          title: 'Find the Missing Number',
          difficulty: 'Easy',
          concept: 'Mathematical Properties',
          objective: 'Use sum formula to detect missing elements efficiently',
          tags: ['array', 'math', 'sum', 'missing'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 20
        },
        {
          id: 'max-consecutive-ones',
          title: 'Maximum Consecutive Ones',
          difficulty: 'Easy',
          concept: 'Sequence Tracking',
          objective: 'Track and count consecutive sequences in arrays',
          tags: ['array', 'sequence', 'counting', 'iteration'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 20
        },
        {
          id: 'single-number',
          title: 'Find the Number that Appears Once',
          difficulty: 'Easy',
          concept: 'XOR Properties',
          objective: 'Learn bit manipulation technique for finding unique elements',
          tags: ['array', 'xor', 'bit-manipulation', 'unique'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        }
      ]
    },
    {
      id: 'array-merging-basics',
      name: '4. Array Merging & Combining',
      difficulty: 'Easy',
      concept: 'Merging Sorted Arrays',
      learningObjective: 'Combine arrays efficiently using two-pointer technique',
      estimatedTime: 90,
      problems: [
        {
          id: 'union-sorted-arrays',
          title: 'Union of Two Sorted Arrays',
          difficulty: 'Easy',
          concept: 'Merge with Duplicates',
          objective: 'Merge arrays while handling duplicates using two pointers',
          tags: ['array', 'merge', 'sorted', 'two-pointers', 'union'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'intersection-sorted-arrays',
          title: 'Intersection of Two Sorted Arrays',
          difficulty: 'Easy',
          concept: 'Finding Common Elements',
          objective: 'Find common elements efficiently with two-pointer scan',
          tags: ['array', 'two-pointers', 'sorted', 'intersection'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        }
      ]
    }
  ]
};

// ========================================
// 🟡 INTERMEDIATE LEVEL
// ========================================
export const restructuredIntermediate: RestructuredLevel = {
  id: 'intermediate',
  level: 'Intermediate',
  name: 'Intermediate - Algorithmic Thinking',
  description: 'Master two pointers, sliding window, prefix sum, hashing, and key algorithmic patterns',
  icon: '🟡',
  totalProblems: 19,
  estimatedHours: 16,
  topics: [
    {
      id: 'two-pointers-pairs',
      name: '1. Two Pointer Technique - Pairs & Sums',
      difficulty: 'Medium',
      concept: 'Two Pointers for Pair Problems',
      learningObjective: 'Master two-pointer technique for finding pairs and triplets',
      estimatedTime: 150,
      problems: [
        {
          id: 'array-twosum',
          title: 'Two Sum - Array Indices',
          difficulty: 'Easy',
          concept: 'Hash Map for Pairs',
          objective: 'Learn O(n) pair finding using hash map complement technique',
          tags: ['arrays', 'hash-map', 'pairs', 'complement'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'two-sum',
          title: 'Two Sum Problem',
          difficulty: 'Medium',
          concept: 'Hash Map Optimization',
          objective: 'Use hash maps for O(n) time complexity in pair finding',
          tags: ['array', 'hash-map', 'two-pointers', 'pairs', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        },
        {
          id: 'sort-012',
          title: 'Sort Array of 0s, 1s and 2s (Dutch National Flag)',
          difficulty: 'Medium',
          concept: 'Three-Way Partitioning',
          objective: 'Apply three-pointer partitioning algorithm in one pass',
          tags: ['array', 'sorting', 'three-pointers', 'partitioning', 'dnf'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 35
        },
        {
          id: 'majority-element',
          title: 'Majority Element (>n/2 times)',
          difficulty: 'Medium',
          concept: 'Boyer-Moore Voting Algorithm',
          objective: 'Learn efficient majority element detection in O(n) time',
          tags: ['array', 'voting-algorithm', 'frequency', 'boyer-moore'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        }
      ]
    },
    {
      id: 'subarray-problems',
      name: '2. Prefix Sum & Kadane\'s Algorithm',
      difficulty: 'Medium',
      concept: 'Subarray Optimization Techniques',
      learningObjective: 'Master dynamic programming and prefix sum for subarray problems',
      estimatedTime: 180,
      problems: [
        {
          id: 'kadanes-algorithm',
          title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
          difficulty: 'Medium',
          concept: 'Dynamic Programming on Arrays',
          objective: 'Master the famous Kadane\'s algorithm for max subarray',
          tags: ['array', 'dp', 'kadanes', 'subarray', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 35
        },
        {
          id: 'best-time-stock',
          title: 'Best Time to Buy and Sell Stock',
          difficulty: 'Medium',
          concept: 'Running Minimum Tracking',
          objective: 'Track running minimum for profit optimization problems',
          tags: ['array', 'greedy', 'profit', 'optimization', 'kadane-variant'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        },
        {
          id: 'count-subarrays-sum-k',
          title: 'Count Subarrays with Sum K',
          difficulty: 'Medium',
          concept: 'Prefix Sum with Hash Map',
          objective: 'Use prefix sum technique with hash map for O(n) counting',
          tags: ['array', 'subarray', 'prefix-sum', 'hash-map', 'cumulative'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        },
        {
          id: 'longest-subarray-sum-k',
          title: 'Longest Subarray with Sum K',
          difficulty: 'Medium',
          concept: 'Sliding Window + Prefix Sum',
          objective: 'Apply sliding window for positives, prefix sum for all integers',
          tags: ['array', 'subarray', 'sliding-window', 'prefix-sum'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        },
        {
          id: 'subarray-xor-k',
          title: 'Count Subarrays with XOR K',
          difficulty: 'Medium',
          concept: 'Prefix XOR Technique',
          objective: 'Extend prefix sum concept to XOR operations',
          tags: ['array', 'xor', 'prefix-xor', 'hash-map', 'subarray'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 35
        }
      ]
    },
    {
      id: 'rearrangement-patterns',
      name: '3. Rearrangement & Permutation Patterns',
      difficulty: 'Medium',
      concept: 'Array Rearrangement Algorithms',
      learningObjective: 'Handle complex rearrangement, permutations, and leader detection',
      estimatedTime: 150,
      problems: [
        {
          id: 'rearrange-sign',
          title: 'Rearrange Array Elements by Sign',
          difficulty: 'Medium',
          concept: 'Alternate Arrangement',
          objective: 'Maintain relative order while rearranging by property',
          tags: ['array', 'arrangement', 'two-pointers', 'sign'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        },
        {
          id: 'next-permutation',
          title: 'Next Permutation',
          difficulty: 'Medium',
          concept: 'Lexicographic Ordering',
          objective: 'Find next lexicographically greater arrangement',
          tags: ['array', 'permutation', 'algorithm', 'lexicographic'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        },
        {
          id: 'leaders-array',
          title: 'Leaders in an Array',
          difficulty: 'Medium',
          concept: 'Right-to-Left Scanning',
          objective: 'Efficiently scan from right to find leader elements',
          tags: ['array', 'traversal', 'optimization', 'leaders'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 25
        },
        {
          id: 'longest-consecutive',
          title: 'Longest Consecutive Sequence',
          difficulty: 'Medium',
          concept: 'Hash Set for Sequences',
          objective: 'Use hash sets to achieve O(n) sequence finding',
          tags: ['array', 'hash-set', 'sequence', 'consecutive'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 35
        }
      ]
    },
    {
      id: 'matrix-2d',
      name: '4. Matrix & 2D Arrays',
      difficulty: 'Medium',
      concept: '2D Array Navigation',
      learningObjective: 'Navigate, transform, and manipulate 2D arrays efficiently',
      estimatedTime: 180,
      problems: [
        {
          id: 'set-matrix-zeros',
          title: 'Set Matrix Zeros',
          difficulty: 'Medium',
          concept: 'In-Place Matrix Marking',
          objective: 'Optimize space by using matrix itself as marker storage',
          tags: ['matrix', '2d-array', 'in-place', 'marking'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        },
        {
          id: 'rotate-matrix-90',
          title: 'Rotate Matrix by 90 Degrees',
          difficulty: 'Medium',
          concept: 'Matrix Transformation',
          objective: 'Transform matrix using transpose and reverse operations',
          tags: ['matrix', 'rotation', 'transformation', 'transpose'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        },
        {
          id: 'spiral-traversal',
          title: 'Print Matrix in Spiral Form',
          difficulty: 'Medium',
          concept: 'Boundary-Based Traversal',
          objective: 'Master complex matrix traversal with boundary tracking',
          tags: ['matrix', 'traversal', 'simulation', 'spiral'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'pascals-triangle',
          title: 'Pascal\'s Triangle',
          difficulty: 'Medium',
          concept: 'Combinatorics & Patterns',
          objective: 'Generate mathematical patterns using array techniques',
          tags: ['matrix', 'math', 'pattern', 'combinatorics'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 30
        }
      ]
    }
  ]
};

// ========================================
// 🔴 ADVANCED LEVEL
// ========================================
export const restructuredAdvanced: RestructuredLevel = {
  id: 'advanced',
  level: 'Advanced',
  name: 'Advanced - LeetCode & Competitive Level',
  description: 'Tackle hard problems with advanced techniques: binary search on answer, merge sort applications, and complex optimizations',
  icon: '🔴',
  totalProblems: 15,
  estimatedHours: 20,
  topics: [
    {
      id: 'k-sum-problems',
      name: '1. Multiple Pointers - 3Sum & 4Sum',
      difficulty: 'Hard',
      concept: 'K-Sum Problems',
      learningObjective: 'Extend two-pointer to solve 3-sum and 4-sum efficiently',
      estimatedTime: 180,
      problems: [
        {
          id: 'three-sum',
          title: '3 Sum Problem',
          difficulty: 'Hard',
          concept: 'Three Pointers with Sorting',
          objective: 'Find all unique triplets that sum to target/zero',
          tags: ['array', 'three-pointers', 'triplets', 'sorting', 'deduplication'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'four-sum',
          title: '4 Sum Problem',
          difficulty: 'Hard',
          concept: 'Four Pointers with Pruning',
          objective: 'Extend to quadruplets with efficient early termination',
          tags: ['array', 'four-pointers', 'quadruplets', 'sorting', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 60
        },
        {
          id: 'largest-subarray-zero-sum',
          title: 'Largest Subarray with Zero Sum',
          difficulty: 'Hard',
          concept: 'Prefix Sum for Zero Detection',
          objective: 'Use hash map of prefix sums to find zero-sum subarrays',
          tags: ['array', 'prefix-sum', 'hash-map', 'subarray', 'zero-sum'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        }
      ]
    },
    {
      id: 'merge-sort-applications',
      name: '2. Merge Sort Applications',
      difficulty: 'Hard',
      concept: 'Divide and Conquer Counting',
      learningObjective: 'Use merge sort for counting inversions and pairs',
      estimatedTime: 150,
      problems: [
        {
          id: 'inversion-count',
          title: 'Count Inversions',
          difficulty: 'Hard',
          concept: 'Modified Merge Sort',
          objective: 'Count inversions in O(n log n) using merge sort',
          tags: ['array', 'merge-sort', 'divide-conquer', 'inversions', 'counting'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'reverse-pairs',
          title: 'Count Reverse Pairs',
          difficulty: 'Hard',
          concept: 'Merge Sort Variant',
          objective: 'Modify merge sort to count special pair conditions',
          tags: ['array', 'merge-sort', 'pairs', 'counting', 'divide-conquer'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        }
      ]
    },
    {
      id: 'intervals-merging',
      name: '3. Merging & Overlapping Intervals',
      difficulty: 'Hard',
      concept: 'Interval Algorithms',
      learningObjective: 'Master interval merging, overlapping detection, and in-place merge',
      estimatedTime: 150,
      problems: [
        {
          id: 'merge-overlapping-intervals',
          title: 'Merge Overlapping Intervals',
          difficulty: 'Hard',
          concept: 'Sort and Merge Pattern',
          objective: 'Sort intervals and merge overlapping ranges efficiently',
          tags: ['array', 'intervals', 'sorting', 'merging', 'overlapping'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 45
        },
        {
          id: 'merge-sorted-arrays',
          title: 'Merge Two Sorted Arrays Without Extra Space',
          difficulty: 'Hard',
          concept: 'Gap Method / Two Pointer from End',
          objective: 'Use gap method or backward two pointers for in-place merge',
          tags: ['array', 'merge', 'in-place', 'sorting', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'find-missing-repeating',
          title: 'Find Missing and Repeating Numbers',
          difficulty: 'Hard',
          concept: 'Mathematical Equations + XOR',
          objective: 'Apply sum/sum-of-squares or XOR to find both numbers',
          tags: ['array', 'math', 'xor', 'equations', 'missing-repeating'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 45
        }
      ]
    },
    {
      id: 'advanced-dp-patterns',
      name: '4. Advanced Subarray & DP Patterns',
      difficulty: 'Hard',
      concept: 'Complex DP and Voting Algorithms',
      learningObjective: 'Solve hard subarray problems with advanced dynamic programming',
      estimatedTime: 200,
      problems: [
        {
          id: 'max-product-subarray',
          title: 'Maximum Product Subarray',
          difficulty: 'Hard',
          concept: 'Track Both Max and Min',
          objective: 'Handle negatives by tracking both maximum and minimum products',
          tags: ['array', 'dp', 'subarray', 'product', 'negatives'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'majority-element-n3',
          title: 'Majority Element (>n/3 times)',
          difficulty: 'Hard',
          concept: 'Extended Boyer-Moore',
          objective: 'Find up to two majority elements using extended voting',
          tags: ['array', 'voting-algorithm', 'frequency', 'boyer-moore', 'majority'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 45
        },
        {
          id: 'longest-substring-without-repeat',
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Hard',
          concept: 'Sliding Window with Hash Set',
          objective: 'Use variable-size sliding window for longest unique substring',
          tags: ['array', 'sliding-window', 'hash-set', 'string', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 45
        }
      ]
    },
    {
      id: 'hard-optimizations',
      name: '5. Hard Optimization Challenges',
      difficulty: 'Hard',
      concept: 'Creative Two Pointer & Cycle Detection',
      learningObjective: 'Master the hardest array optimization problems from LeetCode',
      estimatedTime: 200,
      problems: [
        {
          id: 'trapping-rain-water',
          title: 'Trapping Rain Water',
          difficulty: 'Hard',
          concept: 'Two Pointers with Height Tracking',
          objective: 'Calculate trapped water using two-pointer optimization',
          tags: ['array', 'two-pointers', 'water', 'optimization', 'greedy'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 60
        },
        {
          id: 'container-most-water',
          title: 'Container With Most Water',
          difficulty: 'Hard',
          concept: 'Greedy Two Pointer',
          objective: 'Apply greedy two-pointer for maximum area calculation',
          tags: ['array', 'two-pointers', 'greedy', 'area', 'optimization'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 45
        },
        {
          id: 'find-duplicate',
          title: 'Find the Duplicate Number',
          difficulty: 'Hard',
          concept: 'Floyd\'s Cycle Detection',
          objective: 'Use linked-list cycle detection on array indices',
          tags: ['array', 'cycle-detection', 'linked-list-in-array', 'floyd', 'tortoise-hare'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 50
        },
        {
          id: 'repeat-missing',
          title: 'Repeat and Missing Number',
          difficulty: 'Hard',
          concept: 'Sum of Squares Method',
          objective: 'Solve using mathematical equations (sum and sum²)',
          tags: ['array', 'math', 'equations', 'missing-repeating', 'algebra'],
          hasVideo: true,
          hasArticle: true,
          estimatedTime: 40
        }
      ]
    }
  ]
};

// ========================================
// COMPLETE CURRICULUM EXPORT
// ========================================
export const completeRestructuredCurriculum = {
  title: 'Complete Arrays Mastery Course',
  subtitle: 'From Zero to Hero - Master Arrays with Perfect Pedagogical Progression',
  totalProblems: 51,
  totalLevels: 3,
  estimatedTotalHours: 46,
  levels: [
    restructuredBeginner,
    restructuredIntermediate,
    restructuredAdvanced
  ]
};

// ========================================
// HELPER FUNCTIONS
// ========================================

export const getAllRestructuredProblems = (): RestructuredProblem[] => {
  const allProblems: RestructuredProblem[] = [];
  
  completeRestructuredCurriculum.levels.forEach(level => {
    level.topics.forEach(topic => {
      allProblems.push(...topic.problems);
    });
  });
  
  return allProblems;
};

export const getProblemById = (problemId: string): RestructuredProblem | undefined => {
  return getAllRestructuredProblems().find(p => p.id === problemId);
};

export const getTopicsByLevel = (levelId: string): RestructuredTopic[] => {
  const level = completeRestructuredCurriculum.levels.find(l => l.id === levelId);
  return level?.topics || [];
};

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): RestructuredProblem[] => {
  return getAllRestructuredProblems().filter(p => p.difficulty === difficulty);
};

export const getProblemsByConcept = (concept: string): RestructuredProblem[] => {
  return getAllRestructuredProblems().filter(p => 
    p.concept.toLowerCase().includes(concept.toLowerCase())
  );
};

export const getProgressionPath = (): string[] => {
  const path: string[] = [];
  
  completeRestructuredCurriculum.levels.forEach(level => {
    level.topics.forEach(topic => {
      topic.problems.forEach(problem => {
        path.push(problem.id);
      });
    });
  });
  
  return path;
};

export default completeRestructuredCurriculum;
