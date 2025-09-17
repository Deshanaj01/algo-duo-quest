export type LessonType = 'concept' | 'playground' | 'revision' | 'mastery';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: string[];
  points: number;
  difficulty: DifficultyLevel;
}

export interface RevisionTestConfig {
  id: string;
  level: DifficultyLevel;
  mcqQuestions: MCQQuestion[];
  codingChallenges: CodingChallenge[];
  passingScore: number;
  timeLimit?: number; // in minutes
  xpReward: number;
}

export interface PlaygroundConfig {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: string[];
  difficulty: DifficultyLevel;
  xpReward: number;
}

export interface ConceptLesson {
  id: string;
  title: string;
  description: string;
  steps: any[]; // Using existing lesson structure
  xpReward: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  xpReward: number;
  completed: boolean;
  unlocked: boolean;
  prerequisite?: string[];
  level: 1 | 2 | 3; // Beginner, Intermediate, Advanced
  
  // Type-specific configs
  conceptConfig?: ConceptLesson;
  playgroundConfig?: PlaygroundConfig;
  revisionConfig?: RevisionTestConfig;
}

// Beginner Level (Level 1) - Array Fundamentals
export const beginnerLessons: CourseLesson[] = [
  {
    id: 'arrays-introduction',
    title: 'What Are Arrays?',
    description: 'Learn the fundamentals of arrays with interactive visualizations',
    type: 'concept',
    difficulty: 'beginner',
    duration: 15,
    xpReward: 100,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'arrays-introduction',
      title: 'Introduction to Arrays',
      description: 'Learn the fundamentals of arrays with interactive visualizations',
      steps: [
        {
          id: 'step1',
          title: 'What is an Array?',
          content: `
            <p>An array is like a row of boxes, each containing a value. Every box has a number (called an index) that helps us find what's inside.</p>
            <p>Think of it like:</p>
            <ul>
              <li>A street with numbered houses</li>
              <li>A bookshelf with numbered slots</li>
              <li>A line of performers, each with a position</li>
            </ul>
            <p>Arrays are <strong>zero-indexed</strong>, meaning the first position is labeled 0, not 1!</p>
          `
        },
        {
          id: 'step2',
          title: 'Accessing Array Elements',
          content: `
            <p>To get a value from an array, we use its index inside square brackets: <code>array[index]</code></p>
            <p>Watch as we access different elements in the array below. Notice how the yellow highlight shows which element we're accessing!</p>
            <p><strong>Key Point:</strong> Array access is super fast - it takes the same amount of time regardless of the array size! This is called O(1) time complexity.</p>
          `,
          quiz: {
            question: 'What is the value at index 2 in the array [10, 20, 30, 40, 50]?',
            options: ['10', '20', '30', '40'],
            correctAnswer: 2,
            explanation: 'Since arrays are zero-indexed, index 2 refers to the third element, which is 30.'
          }
        }
      ],
      xpReward: 100
    }
  },
  {
    id: 'array-access',
    title: 'Accessing Elements',
    description: 'Master array indexing and element access patterns',
    type: 'concept',
    difficulty: 'beginner',
    duration: 12,
    xpReward: 80,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'array-access',
      title: 'Accessing Array Elements',
      description: 'Learn how to access and modify array elements',
      steps: [
        {
          id: 'step1',
          title: 'Reading Array Elements',
          content: `
            <p>Accessing array elements is one of the most fundamental operations in programming!</p>
            <p>Remember: arrays use <strong>zero-based indexing</strong>, so the first element is at index 0.</p>
            <p>The syntax is simple: <code>arrayName[index]</code></p>
          `
        },
        {
          id: 'step2', 
          title: 'Modifying Array Elements',
          content: `
            <p>You can also change array elements by assigning new values:</p>
            <p><code>arrayName[index] = newValue</code></p>
            <p>This is called <strong>mutation</strong> - you're changing the original array.</p>
          `,
          quiz: {
            question: 'After executing "arr[1] = 99" on array [10, 20, 30], what is arr[1]?',
            options: ['10', '99', '20', '30'],
            correctAnswer: 1,
            explanation: 'The assignment arr[1] = 99 changes the element at index 1 from 20 to 99.'
          }
        }
      ],
      xpReward: 80
    }
  },
  {
    id: 'array-basics-playground',
    title: 'Array Basics Practice',
    description: 'Practice creating and manipulating simple arrays',
    type: 'playground',
    difficulty: 'beginner',
    duration: 20,
    xpReward: 150,
    completed: false,
    unlocked: false,
    prerequisite: ['arrays-introduction', 'array-access'],
    level: 1,
    playgroundConfig: {
      id: 'array-basics-playground',
      title: 'Array Basics Practice',
      description: 'Create a function that returns the first and last elements of an array',
      starterCode: `function getFirstAndLast(arr) {
  // Your code here
  // Return an array with first and last elements
  
}

// Test your function
console.log(getFirstAndLast([1, 2, 3, 4, 5])); // Should return [1, 5]`,
      solution: `function getFirstAndLast(arr) {
  if (arr.length === 0) return [];
  if (arr.length === 1) return [arr[0]];
  return [arr[0], arr[arr.length - 1]];
}`,
      hints: [
        'Remember arrays are zero-indexed',
        'Handle edge cases like empty arrays',
        'Use arr.length - 1 to get the last index'
      ],
      testCases: [
        'getFirstAndLast([1, 2, 3, 4, 5]) should return [1, 5]',
        'getFirstAndLast([42]) should return [42]',
        'getFirstAndLast([]) should return []'
      ],
      difficulty: 'beginner',
      xpReward: 150
    }
  },
  {
    id: 'beginner-revision',
    title: 'Level 1 Assessment',
    description: 'Test your understanding of basic array concepts',
    type: 'revision',
    difficulty: 'beginner',
    duration: 25,
    xpReward: 200,
    completed: false,
    unlocked: false,
    prerequisite: ['array-basics-playground'],
    level: 1,
    revisionConfig: {
      id: 'beginner-revision',
      level: 'beginner',
      passingScore: 70,
      timeLimit: 25,
      xpReward: 200,
      mcqQuestions: [
        {
          id: 'mcq-1',
          question: 'What is the index of the first element in an array?',
          options: ['1', '0', '-1', 'undefined'],
          correctAnswer: 1,
          explanation: 'Arrays in JavaScript are zero-indexed, meaning the first element is at index 0.',
          points: 20
        },
        {
          id: 'mcq-2',
          question: 'How do you get the length of an array called "myArray"?',
          options: ['myArray.size', 'myArray.length', 'myArray.count()', 'length(myArray)'],
          correctAnswer: 1,
          explanation: 'The length property returns the number of elements in an array.',
          points: 20
        },
        {
          id: 'mcq-3',
          question: 'What happens when you access an array index that doesn\'t exist?',
          options: ['Error is thrown', 'Returns null', 'Returns undefined', 'Returns 0'],
          correctAnswer: 2,
          explanation: 'Accessing a non-existent index returns undefined in JavaScript.',
          points: 20
        },
        {
          id: 'mcq-4',
          question: 'Which is the correct way to create an empty array?',
          options: ['const arr = [];', 'const arr = {};', 'const arr = new Array[];', 'const arr = array();'],
          correctAnswer: 0,
          explanation: 'Square brackets [] create an empty array literal.',
          points: 20
        },
        {
          id: 'mcq-5',
          question: 'What is the last index of an array with length 5?',
          options: ['5', '4', '6', '3'],
          correctAnswer: 1,
          explanation: 'Since arrays are zero-indexed, the last index is length - 1 = 5 - 1 = 4.',
          points: 20
        }
      ],
      codingChallenges: [
        {
          id: 'coding-1',
          title: 'Array Sum',
          description: 'Calculate the sum of all numbers in an array',
          starterCode: `function sumArray(numbers) {
  // Your code here
  
}`,
          solution: `function sumArray(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
          testCases: [
            'sumArray([1, 2, 3, 4, 5]) === 15',
            'sumArray([]) === 0',
            'sumArray([-1, 1, -2, 2]) === 0'
          ],
          points: 40,
          difficulty: 'beginner'
        }
      ]
    }
  }
];

// Intermediate Level (Level 2) - Array Operations & Algorithms
export const intermediateLessons: CourseLesson[] = [
  {
    id: 'array-operations',
    title: 'Array Operations',
    description: 'Learn to add, remove, and modify array elements efficiently',
    type: 'concept',
    difficulty: 'intermediate',
    duration: 18,
    xpReward: 120,
    completed: false,
    unlocked: false,
    prerequisite: ['beginner-revision'],
    level: 2,
    conceptConfig: {
      id: 'array-operations',
      title: 'Array Operations',
      description: 'Learn how to add, remove, and modify array elements',
      steps: [],
      xpReward: 120
    }
  },
  {
    id: 'array-search',
    title: 'Searching in Arrays',
    description: 'Master linear search and understand binary search concepts',
    type: 'concept',
    difficulty: 'intermediate',
    duration: 22,
    xpReward: 140,
    completed: false,
    unlocked: false,
    prerequisite: ['array-operations'],
    level: 2
  },
  {
    id: 'two-pointer-playground',
    title: 'Two Pointer Technique',
    description: 'Solve array problems using the two-pointer approach',
    type: 'playground',
    difficulty: 'intermediate',
    duration: 30,
    xpReward: 200,
    completed: false,
    unlocked: false,
    prerequisite: ['array-search'],
    level: 2,
    playgroundConfig: {
      id: 'two-pointer-playground',
      title: 'Two Sum Problem',
      description: 'Find two numbers in a sorted array that add up to a target sum',
      starterCode: `function twoSum(sortedArray, target) {
  // Use two pointers: left starts at 0, right starts at end
  // Move pointers based on current sum vs target
  
}`,
      solution: `function twoSum(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return null; // No solution found
}`,
      hints: [
        'Use two pointers: one at start, one at end',
        'If sum is too small, move left pointer right',
        'If sum is too large, move right pointer left'
      ],
      testCases: [
        'twoSum([1, 3, 6, 8, 11, 15], 9) should return [1, 2]',
        'twoSum([2, 7, 11, 15], 9) should return [0, 1]',
        'twoSum([1, 2, 3], 7) should return null'
      ],
      difficulty: 'intermediate',
      xpReward: 200
    }
  },
  {
    id: 'sliding-window-playground',
    title: 'Sliding Window Problems',
    description: 'Master the sliding window technique for subarray problems',
    type: 'playground',
    difficulty: 'intermediate',
    duration: 35,
    xpReward: 220,
    completed: false,
    unlocked: false,
    prerequisite: ['two-pointer-playground'],
    level: 2
  },
  {
    id: 'intermediate-revision',
    title: 'Level 2 Assessment',
    description: 'Advanced array operations and algorithm challenges',
    type: 'revision',
    difficulty: 'intermediate',
    duration: 35,
    xpReward: 300,
    completed: false,
    unlocked: false,
    prerequisite: ['sliding-window-playground'],
    level: 2,
    revisionConfig: {
      id: 'intermediate-revision',
      level: 'intermediate',
      passingScore: 75,
      timeLimit: 35,
      xpReward: 300,
      mcqQuestions: [
        {
          id: 'mcq-int-1',
          question: 'What is the time complexity of the two-pointer technique for sorted arrays?',
          options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
          correctAnswer: 1,
          explanation: 'Two-pointer technique processes each element at most once, giving O(n) time complexity.',
          points: 25
        },
        {
          id: 'mcq-int-2',
          question: 'Which approach is best for finding a subarray with maximum sum?',
          options: ['Brute force O(n³)', 'Sliding window always', 'Kadane\'s algorithm', 'Binary search'],
          correctAnswer: 2,
          explanation: 'Kadane\'s algorithm solves maximum subarray sum in O(n) time and O(1) space.',
          points: 25
        },
        {
          id: 'mcq-int-3',
          question: 'What makes binary search work on arrays?',
          options: ['Array must be large', 'Array must be sorted', 'Array must have unique elements', 'Array must be numeric'],
          correctAnswer: 1,
          explanation: 'Binary search requires a sorted array to eliminate half of the search space each iteration.',
          points: 25
        },
        {
          id: 'mcq-int-4',
          question: 'In sliding window problems, when do we expand the window?',
          options: ['When condition is violated', 'When condition is satisfied', 'At regular intervals', 'Only at the end'],
          correctAnswer: 1,
          explanation: 'We expand the window when the current condition is satisfied and we want to include more elements.',
          points: 25
        }
      ],
      codingChallenges: [
        {
          id: 'coding-int-1',
          title: 'Remove Duplicates',
          description: 'Remove duplicates from a sorted array in-place',
          starterCode: `function removeDuplicates(nums) {
  // Your code here
  
}`,
          solution: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let writeIndex = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }
  
  return writeIndex;
}`,
          testCases: [
            'removeDuplicates([1,1,2]) should return 2',
            'removeDuplicates([0,0,1,1,1,2,2,3,3,4]) should return 5',
            'removeDuplicates([1]) should return 1'
          ],
          points: 50,
          difficulty: 'intermediate'
        }
      ]
    }
  }
];

// Advanced Level (Level 3) - Complex Algorithms & 2D Arrays
export const advancedLessons: CourseLesson[] = [
  {
    id: 'array-2d',
    title: 'Two-Dimensional Arrays',
    description: 'Work with matrices and grid-like data structures',
    type: 'concept',
    difficulty: 'advanced',
    duration: 25,
    xpReward: 160,
    completed: false,
    unlocked: false,
    prerequisite: ['intermediate-revision'],
    level: 3
  },
  {
    id: 'array-traversal',
    title: 'Advanced Traversal',
    description: 'Master different iteration patterns and functional methods',
    type: 'concept',
    difficulty: 'advanced',
    duration: 20,
    xpReward: 150,
    completed: false,
    unlocked: false,
    prerequisite: ['array-2d'],
    level: 3
  },
  {
    id: 'matrix-playground',
    title: 'Matrix Operations',
    description: 'Implement complex matrix algorithms and transformations',
    type: 'playground',
    difficulty: 'advanced',
    duration: 40,
    xpReward: 280,
    completed: false,
    unlocked: false,
    prerequisite: ['array-traversal'],
    level: 3
  },
  {
    id: 'advanced-revision',
    title: 'Level 3 Assessment',
    description: 'Complex array algorithms and 2D array challenges',
    type: 'revision',
    difficulty: 'advanced',
    duration: 45,
    xpReward: 400,
    completed: false,
    unlocked: false,
    prerequisite: ['matrix-playground'],
    level: 3,
    revisionConfig: {
      id: 'advanced-revision',
      level: 'advanced',
      passingScore: 80,
      timeLimit: 45,
      xpReward: 400,
      mcqQuestions: [
        {
          id: 'mcq-adv-1',
          question: 'What is the space complexity of in-place matrix rotation?',
          options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
          correctAnswer: 0,
          explanation: 'In-place rotation uses only constant extra space regardless of matrix size.',
          points: 20
        },
        {
          id: 'mcq-adv-2',
          question: 'How do you traverse a matrix in spiral order?',
          options: ['Row by row then column by column', 'Use four boundaries and adjust them', 'Diagonal traversal', 'Random access'],
          correctAnswer: 1,
          explanation: 'Spiral traversal maintains four boundaries (top, bottom, left, right) and shrinks them as we traverse.',
          points: 20
        },
        {
          id: 'mcq-adv-3',
          question: 'What is the time complexity of matrix multiplication?',
          options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(n)'],
          correctAnswer: 1,
          explanation: 'Standard matrix multiplication has O(n³) time complexity for n×n matrices.',
          points: 20
        },
        {
          id: 'mcq-adv-4',
          question: 'In dynamic programming with 2D arrays, what do we typically optimize?',
          options: ['Time complexity only', 'Space complexity only', 'Both time and space', 'Memory access patterns'],
          correctAnswer: 2,
          explanation: 'DP with 2D arrays often optimizes both time (avoiding recalculation) and space (using rolling arrays).',
          points: 20
        },
        {
          id: 'mcq-adv-5',
          question: 'What is the key insight in the "Set Matrix Zeroes" problem?',
          options: ['Use extra matrix', 'Use first row/column as markers', 'Sort the matrix', 'Use recursion'],
          correctAnswer: 1,
          explanation: 'The optimal solution uses the first row and column as markers to achieve O(1) space complexity.',
          points: 20
        }
      ],
      codingChallenges: [
        {
          id: 'coding-adv-1',
          title: 'Rotate Matrix 90 Degrees',
          description: 'Rotate an n×n matrix 90 degrees clockwise in-place',
          starterCode: `function rotate(matrix) {
  // Your code here
  // Rotate the matrix in-place
  
}`,
          solution: `function rotate(matrix) {
  const n = matrix.length;
  
  // Step 1: Transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  
  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`,
          testCases: [
            'rotate([[1,2,3],[4,5,6],[7,8,9]]) should result in [[7,4,1],[8,5,2],[9,6,3]]',
            'rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]) should work correctly',
            'rotate([[1]]) should result in [[1]]'
          ],
          points: 60,
          difficulty: 'advanced'
        }
      ]
    }
  },
  {
    id: 'final-mastery',
    title: 'Array Mastery Test',
    description: 'Comprehensive final assessment covering all array concepts',
    type: 'mastery',
    difficulty: 'advanced',
    duration: 60,
    xpReward: 500,
    completed: false,
    unlocked: false,
    prerequisite: ['advanced-revision'],
    level: 3
  }
];

export const allArrayCourseLessons: CourseLesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons
];

// Helper functions
export const getLessonsByLevel = (level: 1 | 2 | 3): CourseLesson[] => {
  return allArrayCourseLessons.filter(lesson => lesson.level === level);
};

export const getLessonsByType = (type: LessonType): CourseLesson[] => {
  return allArrayCourseLessons.filter(lesson => lesson.type === type);
};

export const getUnlockedLessons = (): CourseLesson[] => {
  return allArrayCourseLessons.filter(lesson => lesson.unlocked);
};

export const getCompletedLessons = (): CourseLesson[] => {
  return allArrayCourseLessons.filter(lesson => lesson.completed);
};

export const calculateProgressByLevel = (level: 1 | 2 | 3): number => {
  const levelLessons = getLessonsByLevel(level);
  const completedCount = levelLessons.filter(lesson => lesson.completed).length;
  return levelLessons.length > 0 ? (completedCount / levelLessons.length) * 100 : 0;
};

export const getTotalXPEarned = (): number => {
  return allArrayCourseLessons
    .filter(lesson => lesson.completed)
    .reduce((total, lesson) => total + lesson.xpReward, 0);
};

export const getNextLesson = (): CourseLesson | null => {
  return allArrayCourseLessons.find(lesson => lesson.unlocked && !lesson.completed) || null;
};
