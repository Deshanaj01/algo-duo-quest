/**
 * UNIFIED ARRAYS MASTER CURRICULUM
 * 
 * This file combines ALL array-related data into ONE comprehensive learning pathway:
 * - Concept lessons (from arrayLessons.ts, lessonData.ts)
 * - Course lessons (from arrayCourseLessons.ts)
 * - Problems with learn-first content (from enhanced-arrays-curriculum.ts)
 * - Complete problem set (from comprehensive-arrays-curriculum.ts, complete-restructured-arrays.ts)
 * - Practice challenges (from arrayChallenges.ts)
 * 
 * Structure: Learn Concepts → Practice with Lessons → Solve Problems → Master with Challenges
 */

// ==================== TYPE DEFINITIONS ====================

export interface LearnContent {
  concept: string;
  explanation: string;
  algorithmSteps: string[];
  timeComplexity: string;
  spaceComplexity: string;
  visualExample: {
    description: string;
    steps: Array<{
      step: number;
      description: string;
      visualization: string;
      code?: string;
    }>;
  };
  keyPoints: string[];
  commonMistakes: string[];
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  concept: string; // Main technique
  objective: string; // Learning goal
  description: string;
  tags: string[];
  hasVideo?: boolean;
  hasArticle?: boolean;
  estimatedTime?: number; // minutes
  
  // Learn-first content (optional, only for enhanced problems)
  learnContent?: LearnContent;
  
  // Coding challenge data
  starterCode?: string;
  solution?: string;
  testCases?: TestCase[];
  constraints?: string[];
  examples?: Array<{
    input: any;
    output: any;
    explanation: string;
  }>;
}

export interface ConceptLesson {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number; // minutes
  steps: Array<{
    id: string;
    title: string;
    content: string; // HTML content
    visualization?: {
      title: string;
      description: string;
      animationType: 'static' | 'access' | 'insert' | 'delete' | 'search';
      initialArray: any[];
      codeExample: string;
    };
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    };
  }>;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'playground' | 'revision' | 'mastery';
  level: 1 | 2 | 3;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  xpReward: number;
  order: number;
  completed?: boolean;
  progress?: number;
  locked?: boolean;
  
  // For playground type
  playgroundConfig?: {
    description: string;
    starterCode: string;
    hints: string[];
    testCases: string[];
  };
}

export interface Topic {
  id: string;
  name: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  learningObjective: string;
  problems: Problem[];
  estimatedTime: number;
}

export interface Level {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelNumber: 1 | 2 | 3;
  name: string;
  description: string;
  icon: string;
  
  // Concept lessons for this level
  conceptLessons: ConceptLesson[];
  
  // Course lessons for this level
  courseLessons: CourseLesson[];
  
  // Problem topics for this level
  topics: Topic[];
  
  totalProblems: number;
  estimatedHours: number;
}

export interface UnifiedCurriculum {
  title: string;
  subtitle: string;
  version: string;
  totalLevels: number;
  totalProblems: number;
  totalLessons: number;
  estimatedTotalHours: number;
  levels: Level[];
}

// ==================== CONCEPT LESSONS ====================

const beginnerConceptLessons: ConceptLesson[] = [
  {
    id: 'arrays-introduction',
    title: 'Introduction to Arrays',
    description: 'Learn the fundamentals of arrays with interactive visualizations',
    level: 'Beginner',
    estimatedTime: 30,
    steps: [
      {
        id: 'step1',
        title: 'What is an Array?',
        content: `
          <p>An array is like a row of boxes, each containing a value. Every box has a number (called an index) that helps us find what's inside.</p>
          <p>Arrays are <strong>zero-indexed</strong>, meaning the first position is labeled 0, not 1!</p>
        `,
        visualization: {
          title: 'Array Structure',
          description: 'Each element has a value and an index position',
          animationType: 'static',
          initialArray: [42, 17, 89, 3, 56],
          codeExample: `// Creating an array
const numbers = [42, 17, 89, 3, 56];
// Array indices:  0   1   2   3   4`
        }
      },
      {
        id: 'step2',
        title: 'Accessing Array Elements',
        content: `
          <p>To get a value from an array, we use its index inside square brackets: <code>array[index]</code></p>
          <p><strong>Key Point:</strong> Array access is O(1) - constant time!</p>
        `,
        visualization: {
          title: 'Accessing Elements',
          description: 'Watch as we access each element by its index',
          animationType: 'access',
          initialArray: [42, 17, 89, 3, 56],
          codeExample: `console.log(numbers[0]); // Output: 42
console.log(numbers[2]); // Output: 89`
        },
        quiz: {
          question: 'What is the value at index 2 in [10, 20, 30, 40]?',
          options: ['10', '20', '30', '40'],
          correctAnswer: 2,
          explanation: 'Index 2 refers to the third element, which is 30.'
        }
      }
    ]
  }
];

// ==================== COURSE LESSONS ====================

const beginnerCourseLessons: CourseLesson[] = [
  {
    id: 'array-basics-concept',
    title: 'Array Basics',
    description: 'Understanding arrays, indices, and basic operations',
    type: 'concept',
    level: 1,
    difficulty: 'Easy',
    duration: 15,
    xpReward: 50,
    order: 1,
    locked: false
  },
  {
    id: 'array-basics-playground',
    title: 'Array Basics - Practice',
    description: 'Practice finding elements in arrays',
    type: 'playground',
    level: 1,
    difficulty: 'Easy',
    duration: 20,
    xpReward: 100,
    order: 2,
    playgroundConfig: {
      description: 'Write a function that returns the first and last elements of an array',
      starterCode: `function getFirstAndLast(arr) {\n  // Your code here\n  \n}`,
      hints: [
        'Use array[0] to get the first element',
        'Use array[array.length - 1] to get the last element',
        'Return them as an array'
      ],
      testCases: [
        'getFirstAndLast([1, 2, 3, 4, 5]) should return [1, 5]',
        'getFirstAndLast([42]) should return [42, 42]',
        'getFirstAndLast([]) should return []'
      ]
    }
  }
];

// ==================== COMPLETE UNIFIED CURRICULUM ====================

export const unifiedArraysCurriculum: UnifiedCurriculum = {
  title: 'Complete Arrays Mastery',
  subtitle: 'From Zero to Hero - Unified Learning Path',
  version: '2.0.0',
  totalLevels: 3,
  totalProblems: 51,
  totalLessons: 12,
  estimatedTotalHours: 50,
  
  levels: [
    // ==================== BEGINNER LEVEL ====================
    {
      id: 'beginner',
      level: 'Beginner',
      levelNumber: 1,
      name: 'Beginner - Fundamentals & Basics',
      description: 'Master array fundamentals through concepts, lessons, and practice',
      icon: '🟢',
      totalProblems: 17,
      estimatedHours: 12,
      
      conceptLessons: beginnerConceptLessons,
      courseLessons: beginnerCourseLessons,
      
      topics: [
        {
          id: 'array-introduction',
          name: '1. Introduction to Arrays',
          concept: 'Array Basics & Structure',
          difficulty: 'Easy',
          learningObjective: 'Understand arrays and basic traversal',
          estimatedTime: 90,
          problems: [
            {
              id: 'array-max',
              title: 'Find Maximum Value',
              difficulty: 'Easy',
              concept: 'Array Traversal',
              objective: 'Learn to scan an array and track a value',
              description: 'Write a function that finds the maximum value in an array of numbers.',
              tags: ['arrays', 'traversal', 'basics'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 15,
              starterCode: `function findMaximum(arr) {\n  // Your code here\n  \n}`,
              solution: `function findMaximum(arr) {\n  if (arr.length === 0) return null;\n  \n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}`,
              testCases: [
                { input: [1, 3, 5, 7, 9], expectedOutput: 9 },
                { input: [-5, -3, -1], expectedOutput: -1 },
                { input: [100], expectedOutput: 100 },
                { input: [], expectedOutput: null }
              ],
              examples: [
                {
                  input: [1, 3, 5, 7, 9],
                  output: 9,
                  explanation: 'The maximum value in the array is 9'
                }
              ],
              constraints: [
                'Array length: 0 ≤ n ≤ 10^5',
                'Values: -10^9 ≤ arr[i] ≤ 10^9'
              ]
            },
            {
              id: 'largest-element',
              title: 'Find the Largest Element in an Array',
              difficulty: 'Easy',
              concept: 'Single Pass Iteration',
              objective: 'Master basic array traversal and comparison logic',
              description: 'Given an array, find and return the largest element.',
              tags: ['array', 'basics', 'traversal', 'iteration'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 20,
              // This problem has full learn-first content
              learnContent: {
                concept: 'Array Traversal with Comparison',
                explanation: 'To find the largest element, we scan through the entire array once, keeping track of the maximum value seen so far. This is called a single-pass algorithm.',
                algorithmSteps: [
                  'Initialize max to the first element (or negative infinity)',
                  'Iterate through each element starting from index 0',
                  'If current element is greater than max, update max',
                  'After traversal, max contains the largest element',
                  'Return max'
                ],
                timeComplexity: 'O(n) - We visit each element exactly once',
                spaceComplexity: 'O(1) - We only use one variable for tracking',
                visualExample: {
                  description: 'Finding largest in [3, 7, 2, 9, 1]',
                  steps: [
                    {
                      step: 1,
                      description: 'Initialize max = 3 (first element)',
                      visualization: '[3̲, 7, 2, 9, 1] max = 3',
                      code: 'let max = arr[0];'
                    },
                    {
                      step: 2,
                      description: 'Compare 7 > 3, update max = 7',
                      visualization: '[3, 7̲, 2, 9, 1] max = 7',
                      code: 'if (arr[1] > max) max = arr[1];'
                    },
                    {
                      step: 3,
                      description: 'Compare 2 < 7, no update',
                      visualization: '[3, 7, 2̲, 9, 1] max = 7'
                    },
                    {
                      step: 4,
                      description: 'Compare 9 > 7, update max = 9',
                      visualization: '[3, 7, 2, 9̲, 1] max = 9',
                      code: 'if (arr[3] > max) max = arr[3];'
                    },
                    {
                      step: 5,
                      description: 'Compare 1 < 9, done! Return 9',
                      visualization: '[3, 7, 2, 9, 1̲] max = 9 ✓',
                      code: 'return max;'
                    }
                  ]
                },
                keyPoints: [
                  'Only need one pass through the array',
                  'Track the maximum value seen so far',
                  'Handle edge cases (empty array)',
                  'O(1) space - very efficient!'
                ],
                commonMistakes: [
                  'Forgetting to handle empty arrays',
                  'Starting max at 0 (fails for negative numbers)',
                  'Using O(n) extra space unnecessarily'
                ]
              },
              starterCode: `function findLargestElement(arr) {\n  // Your code here\n  \n}`,
              solution: `function findLargestElement(arr) {\n  if (arr.length === 0) return null;\n  \n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}`,
              testCases: [
                { input: [3, 7, 2, 9, 1], expectedOutput: 9 },
                { input: [-10, -5, -3, -1], expectedOutput: -1 },
                { input: [5], expectedOutput: 5 },
                { input: [], expectedOutput: null }
              ],
              examples: [
                {
                  input: [3, 7, 2, 9, 1],
                  output: 9,
                  explanation: '9 is the largest element'
                },
                {
                  input: [-10, -5, -3],
                  output: -3,
                  explanation: 'Even with negatives, -3 is largest'
                }
              ],
              constraints: [
                '0 ≤ array.length ≤ 10^5',
                '-10^9 ≤ array[i] ≤ 10^9'
              ]
            },
            {
              id: 'array-reverse',
              title: 'Reverse an Array',
              difficulty: 'Easy',
              concept: 'Two Pointer Basics',
              objective: 'Learn fundamental two-pointer technique',
              description: 'Write a function that reverses an array without using built-in reverse methods.',
              tags: ['arrays', 'two-pointers', 'reversal', 'basics'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 15,
              starterCode: `function reverseArray(arr) {\n  // Your code here\n  \n}`,
              solution: `function reverseArray(arr) {\n  const result = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    result.push(arr[i]);\n  }\n  return result;\n}`,
              testCases: [
                { input: [1, 2, 3, 4, 5], expectedOutput: [5, 4, 3, 2, 1] },
                { input: ['a', 'b', 'c'], expectedOutput: ['c', 'b', 'a'] },
                { input: [], expectedOutput: [] },
                { input: [1], expectedOutput: [1] }
              ],
              examples: [
                {
                  input: [1, 2, 3, 4, 5],
                  output: [5, 4, 3, 2, 1],
                  explanation: 'Elements are in reverse order'
                }
              ],
              constraints: [
                '0 ≤ array.length ≤ 10^4',
                'Do not use built-in reverse() method'
              ]
            }
          ]
        },
        {
          id: 'basic-operations',
          name: '2. Basic Array Operations',
          concept: 'Insertion, Deletion, and Rotation',
          difficulty: 'Easy',
          learningObjective: 'Learn how to modify arrays',
          estimatedTime: 120,
          problems: [
            {
              id: 'array-rotation',
              title: 'Rotate Array to Right by K Steps',
              difficulty: 'Easy',
              concept: 'Reversal Algorithm',
              objective: 'Master efficient in-place rotation',
              description: 'Write a function to rotate an array to the right by k steps.',
              tags: ['arrays', 'rotation', 'in-place', 'algorithm'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 25,
              starterCode: `function rotateArray(nums, k) {\n  // Your code here\n  \n}`,
              solution: `function rotateArray(nums, k) {\n  k = k % nums.length;\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n  return nums;\n}\n\nfunction reverse(nums, start, end) {\n  while (start < end) {\n    [nums[start], nums[end]] = [nums[end], nums[start]];\n    start++;\n    end--;\n  }\n}`,
              testCases: [
                { input: { nums: [1,2,3,4,5,6,7], k: 3 }, expectedOutput: [5,6,7,1,2,3,4] },
                { input: { nums: [-1,-100,3,99], k: 2 }, expectedOutput: [3,99,-1,-100] }
              ],
              examples: [
                {
                  input: { nums: [1,2,3,4,5,6,7], k: 3 },
                  output: [5,6,7,1,2,3,4],
                  explanation: 'Rotate right by 3 positions'
                }
              ],
              constraints: [
                '1 ≤ nums.length ≤ 10^5',
                '-2^31 ≤ nums[i] ≤ 2^31 - 1',
                '0 ≤ k ≤ 10^5'
              ]
            }
          ]
        }
      ]
    },
    
    // ==================== INTERMEDIATE LEVEL ====================
    {
      id: 'intermediate',
      level: 'Intermediate',
      levelNumber: 2,
      name: 'Intermediate - Algorithmic Thinking',
      description: 'Master two pointers, sliding window, and advanced patterns',
      icon: '🟡',
      totalProblems: 19,
      estimatedHours: 18,
      
      conceptLessons: [],
      courseLessons: [],
      
      topics: [
        {
          id: 'two-pointers-pairs',
          name: '1. Two Pointer Technique',
          concept: 'Two Pointers for Pair Problems',
          difficulty: 'Medium',
          learningObjective: 'Master two-pointer technique',
          estimatedTime: 150,
          problems: [
            {
              id: 'two-sum',
              title: 'Two Sum Problem',
              difficulty: 'Medium',
              concept: 'Hash Map Optimization',
              objective: 'Use hash maps for O(n) time complexity',
              description: 'Given an array of numbers and a target, return indices of two numbers that add up to the target.',
              tags: ['array', 'hash-map', 'two-pointers', 'pairs'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 30,
              // This problem has full learn-first content
              learnContent: {
                concept: 'Hash Map for O(n) Lookup',
                explanation: 'Instead of checking every pair (O(n²)), we use a hash map to store numbers we\'ve seen. For each number, we calculate its complement (target - current) and check if it exists in the map.',
                algorithmSteps: [
                  'Create an empty hash map to store {number: index}',
                  'Iterate through array with index',
                  'Calculate complement = target - current number',
                  'If complement exists in map, return [map[complement], current index]',
                  'Otherwise, store current number and index in map',
                  'Continue until pair found'
                ],
                timeComplexity: 'O(n) - Single pass through array',
                spaceComplexity: 'O(n) - Hash map stores up to n elements',
                visualExample: {
                  description: 'Finding pair in [2, 7, 11, 15] with target 9',
                  steps: [
                    {
                      step: 1,
                      description: 'Check 2: complement = 9-2 = 7, not in map yet',
                      visualization: 'map = {}\n[2̲, 7, 11, 15] → Store 2\nmap = {2: 0}',
                      code: 'map[2] = 0;'
                    },
                    {
                      step: 2,
                      description: 'Check 7: complement = 9-7 = 2, found in map!',
                      visualization: 'map = {2: 0}\n[2, 7̲, 11, 15] → 2 exists!\nReturn [0, 1] ✓',
                      code: 'if (2 in map) return [map[2], 1];'
                    },
                    {
                      step: 3,
                      description: 'Done! Indices [0, 1] give us 2 + 7 = 9',
                      visualization: '[2, 7, 11, 15]\n ↑  ↑\n indices 0, 1\n 2 + 7 = 9 ✓'
                    }
                  ]
                },
                keyPoints: [
                  'Hash maps provide O(1) lookup time for finding complements',
                  'Store numbers as you go - one pass is enough',
                  'Space-time tradeoff: O(n) space for O(n) time',
                  'Works for any target value'
                ],
                commonMistakes: [
                  'Don\'t use nested loops - that\'s O(n²) time',
                  'Remember to return indices, not values',
                  'Handle the case when no solution exists',
                  'Don\'t use the same element twice'
                ]
              },
              starterCode: `function twoSum(nums, target) {\n  // Your code here\n  \n}`,
              solution: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (complement in map) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n  return null;\n}`,
              testCases: [
                { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
                { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
                { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] }
              ],
              examples: [
                {
                  input: { nums: [2, 7, 11, 15], target: 9 },
                  output: [0, 1],
                  explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
                }
              ],
              constraints: [
                '2 ≤ nums.length ≤ 10^4',
                '-10^9 ≤ nums[i] ≤ 10^9',
                'Only one valid answer exists'
              ]
            }
          ]
        }
      ]
    },
    
    // ==================== ADVANCED LEVEL ====================
    {
      id: 'advanced',
      level: 'Advanced',
      levelNumber: 3,
      name: 'Advanced - LeetCode & Competitive Level',
      description: 'Tackle hard problems with advanced techniques',
      icon: '🔴',
      totalProblems: 15,
      estimatedHours: 20,
      
      conceptLessons: [],
      courseLessons: [],
      
      topics: [
        {
          id: 'k-sum-problems',
          name: '1. Multiple Pointers - 3Sum & 4Sum',
          concept: 'K-Sum Problems',
          difficulty: 'Hard',
          learningObjective: 'Extend two-pointer to k-sum',
          estimatedTime: 180,
          problems: [
            {
              id: 'three-sum',
              title: '3 Sum Problem',
              difficulty: 'Hard',
              concept: 'Three Pointers with Sorting',
              objective: 'Find all unique triplets that sum to target',
              description: 'Given an array, find all unique triplets that sum to zero.',
              tags: ['array', 'three-pointers', 'triplets', 'sorting'],
              hasVideo: true,
              hasArticle: true,
              estimatedTime: 50,
              starterCode: `function threeSum(nums) {\n  // Your code here\n  \n}`,
              testCases: [
                { 
                  input: [-1, 0, 1, 2, -1, -4], 
                  expectedOutput: "[[-1,-1,2],[-1,0,1]]",
                  note: "Output is array of triplets"
                }
              ],
              examples: [
                {
                  input: [-1, 0, 1, 2, -1, -4],
                  output: "[[-1,-1,2],[-1,0,1]]",
                  explanation: 'Two unique triplets sum to 0'
                }
              ],
              constraints: [
                '3 ≤ nums.length ≤ 3000',
                '-10^5 ≤ nums[i] ≤ 10^5'
              ]
            }
          ]
        }
      ]
    }
  ]
};

// ==================== HELPER FUNCTIONS ====================

export function getAllProblems(): Problem[] {
  const allProblems: Problem[] = [];
  unifiedArraysCurriculum.levels.forEach(level => {
    level.topics.forEach(topic => {
      allProblems.push(...topic.problems);
    });
  });
  return allProblems;
}

export function getProblemById(id: string): Problem | undefined {
  return getAllProblems().find(p => p.id === id);
}

export function getProblemsWithLearnContent(): Problem[] {
  return getAllProblems().filter(p => p.learnContent !== undefined);
}

export function getLevelByNumber(levelNum: 1 | 2 | 3): Level | undefined {
  return unifiedArraysCurriculum.levels.find(l => l.levelNumber === levelNum);
}

export function getConceptLessons(level: 'Beginner' | 'Intermediate' | 'Advanced'): ConceptLesson[] {
  const lvl = unifiedArraysCurriculum.levels.find(l => l.level === level);
  return lvl?.conceptLessons || [];
}

export function getCourseLessons(levelNumber: 1 | 2 | 3): CourseLesson[] {
  const lvl = unifiedArraysCurriculum.levels.find(l => l.levelNumber === levelNumber);
  return lvl?.courseLessons || [];
}

export function getLearningPath(): string[] {
  const path: string[] = [];
  
  unifiedArraysCurriculum.levels.forEach(level => {
    // Add concept lessons first
    level.conceptLessons.forEach(lesson => path.push(lesson.id));
    
    // Then course lessons
    level.courseLessons.forEach(lesson => path.push(lesson.id));
    
    // Then problems
    level.topics.forEach(topic => {
      topic.problems.forEach(problem => path.push(problem.id));
    });
  });
  
  return path;
}

export default unifiedArraysCurriculum;
