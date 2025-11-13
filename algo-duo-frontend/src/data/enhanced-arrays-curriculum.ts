/**
 * Enhanced Arrays Curriculum with Learn-First Approach
 * Each problem includes comprehensive learning content before coding
 */

export interface LearnContent {
  concept: string; // Main algorithm/concept name
  explanation: string; // Detailed explanation of the concept
  algorithmSteps: string[]; // Step-by-step breakdown
  timeComplexity: string;
  spaceComplexity: string;
  visualExample?: {
    description: string;
    steps: Array<{
      step: number;
      description: string;
      visualization?: string; // ASCII art or description
      code?: string; // Code snippet for this step
    }>;
  };
  keyPoints: string[];
  commonMistakes?: string[];
}

export interface EnhancedProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string; // e.g., "Array Basics", "Two Pointers", etc.
  
  // Learn Section (shown first)
  learnContent: LearnContent;
  
  // Problem Section (shown after learn)
  problemStatement: string;
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  
  // Coding Section
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: any;
    expectedOutput: any;
  }>;
  
  // Metadata
  tags: string[];
  relatedProblems?: string[];
  resources?: {
    videoUrl?: string;
    articleUrl?: string;
  };
}

// ========== BEGINNER LEVEL - SAMPLE PROBLEMS WITH FULL LEARN CONTENT ==========

export const sampleEnhancedProblems: EnhancedProblem[] = [
  {
    id: 'largest-element',
    title: 'Find the Largest Element in an Array',
    difficulty: 'Easy',
    category: 'Array Basics',
    
    learnContent: {
      concept: 'Array Traversal & Maximum Finding',
      explanation: `
        Finding the largest element in an array is one of the most fundamental operations. 
        The key idea is to traverse through all elements once while keeping track of the 
        maximum value seen so far. This is called a "linear scan" or "single-pass traversal".
        
        Think of it like looking through a stack of papers to find the one with the highest score - 
        you need to look at each paper once, remembering the highest score as you go.
      `,
      algorithmSteps: [
        'Initialize a variable to store the maximum value (start with the first element or negative infinity)',
        'Iterate through each element in the array',
        'For each element, compare it with the current maximum',
        'If the current element is greater than the maximum, update the maximum',
        'After checking all elements, return the maximum value'
      ],
      timeComplexity: 'O(n) - We visit each element exactly once',
      spaceComplexity: 'O(1) - We only use one variable to track the maximum',
      visualExample: {
        description: 'Let\'s find the largest element in [3, 7, 2, 9, 1]',
        steps: [
          {
            step: 1,
            description: 'Initialize max with first element',
            visualization: `
Array: [3, 7, 2, 9, 1]
        ↑
      max = 3
            `,
            code: 'let max = arr[0]; // max = 3'
          },
          {
            step: 2,
            description: 'Check second element (7)',
            visualization: `
Array: [3, 7, 2, 9, 1]
           ↑
7 > 3? YES → max = 7
            `,
            code: 'if (arr[1] > max) max = arr[1]; // max = 7'
          },
          {
            step: 3,
            description: 'Check third element (2)',
            visualization: `
Array: [3, 7, 2, 9, 1]
              ↑
2 > 7? NO → max stays 7
            `,
            code: 'if (arr[2] > max) max = arr[2]; // max stays 7'
          },
          {
            step: 4,
            description: 'Check fourth element (9)',
            visualization: `
Array: [3, 7, 2, 9, 1]
                 ↑
9 > 7? YES → max = 9
            `,
            code: 'if (arr[3] > max) max = arr[3]; // max = 9'
          },
          {
            step: 5,
            description: 'Check last element (1)',
            visualization: `
Array: [3, 7, 2, 9, 1]
                    ↑
1 > 9? NO → max stays 9

Final Answer: 9
            `,
            code: 'if (arr[4] > max) max = arr[4]; // max stays 9'
          }
        ]
      },
      keyPoints: [
        'Always initialize your maximum before the loop',
        'Use a single pass through the array for efficiency',
        'No need to sort the array - that would be slower',
        'Handle edge case: empty array'
      ],
      commonMistakes: [
        'Forgetting to initialize the maximum value',
        'Using arr.sort() which is O(n log n) when O(n) is possible',
        'Not handling empty arrays'
      ]
    },
    
    problemStatement: `
      Given an array of integers, find and return the largest element.
      
      Your task is to implement a function that finds the maximum value in the array
      using the single-pass traversal technique you just learned.
    `,
    constraints: [
      '1 ≤ array.length ≤ 10^5',
      '-10^9 ≤ array[i] ≤ 10^9'
    ],
    examples: [
      {
        input: '[3, 7, 2, 9, 1]',
        output: '9',
        explanation: '9 is the largest element in the array'
      },
      {
        input: '[-5, -2, -10, -1]',
        output: '-1',
        explanation: 'Among negative numbers, -1 is the largest'
      },
      {
        input: '[42]',
        output: '42',
        explanation: 'Single element array returns that element'
      }
    ],
    
    starterCode: `function findLargest(arr) {
  // Your code here
  // Remember: Single pass, keep track of max
  
}`,
    solution: `function findLargest(arr) {
  if (arr.length === 0) return null;
  
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return max;
}`,
    testCases: [
      { input: [3, 7, 2, 9, 1], expectedOutput: 9 },
      { input: [-5, -2, -10, -1], expectedOutput: -1 },
      { input: [42], expectedOutput: 42 },
      { input: [1, 1, 1, 1], expectedOutput: 1 }
    ],
    
    tags: ['array', 'basics', 'traversal', 'beginner-friendly'],
    relatedProblems: ['second-largest', 'find-minimum']
  },
  
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Medium',
    category: 'Hash Map & Arrays',
    
    learnContent: {
      concept: 'Hash Map for O(n) Lookups',
      explanation: `
        The Two Sum problem asks us to find two numbers that add up to a target.
        The naive approach is to check every pair (nested loops) - that's O(n²).
        
        But we can do better! Using a hash map, we can solve it in O(n) time.
        
        The key insight: For each number X, we need to find if (target - X) exists.
        Instead of searching the array repeatedly, we store each number in a hash map
        as we go, so lookups become O(1).
        
        Think of it like keeping a phonebook - instead of calling everyone to find a number,
        you just look it up instantly.
      `,
      algorithmSteps: [
        'Create an empty hash map to store {number: index}',
        'For each element in the array:',
        '  - Calculate complement = target - current element',
        '  - Check if complement exists in hash map',
        '  - If yes: return [map[complement], current index]',
        '  - If no: add current element to hash map',
        'If no pair found, return empty or null'
      ],
      timeComplexity: 'O(n) - Single pass through the array',
      spaceComplexity: 'O(n) - Hash map can store up to n elements',
      visualExample: {
        description: 'Find two numbers that sum to 9 in [2, 7, 11, 15]',
        steps: [
          {
            step: 1,
            description: 'Initialize empty hash map',
            visualization: `
Array:  [2, 7, 11, 15]    Target: 9
         ↑
Map: {}
            `,
            code: 'const map = new Map();'
          },
          {
            step: 2,
            description: 'Check first element (2)',
            visualization: `
Element: 2
Complement: 9 - 2 = 7
Is 7 in map? NO

Add 2 to map:
Map: {2: 0}
            `,
            code: `
const complement = 9 - 2; // 7
if (map.has(7)) return [map.get(7), 0];
map.set(2, 0);
            `
          },
          {
            step: 3,
            description: 'Check second element (7)',
            visualization: `
Element: 7
Complement: 9 - 7 = 2
Is 2 in map? YES! ✓

Found at index 0
Current index: 1

Answer: [0, 1]
            `,
            code: `
const complement = 9 - 7; // 2
if (map.has(2)) return [map.get(2), 1]; // Found!
// Returns [0, 1]
            `
          }
        ]
      },
      keyPoints: [
        'Hash map provides O(1) lookup time',
        'We only need one pass through the array',
        'Store number→index mapping for returning indices',
        'Check for complement BEFORE adding to map to avoid using same element twice'
      ],
      commonMistakes: [
        'Using nested loops (O(n²)) instead of hash map',
        'Adding to map before checking for complement',
        'Not handling the case where same element can\'t be used twice',
        'Forgetting to return indices instead of values'
      ]
    },
    
    problemStatement: `
      Given an array of integers nums and an integer target, return indices of the 
      two numbers such that they add up to target.
      
      You may assume that each input would have exactly one solution, and you may 
      not use the same element twice.
      
      Implement this using the hash map technique you just learned for O(n) time complexity.
    `,
    constraints: [
      '2 ≤ nums.length ≤ 10^4',
      '-10^9 ≤ nums[i] ≤ 10^9',
      '-10^9 ≤ target ≤ 10^9',
      'Only one valid answer exists'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Two different elements (both happen to be 3)'
      }
    ],
    
    starterCode: `function twoSum(nums, target) {
  // Your code here
  // Remember: Use hash map for O(1) lookups
  
}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return []; // No solution found
}`,
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expectedOutput: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expectedOutput: [1,2] },
      { input: { nums: [3,3], target: 6 }, expectedOutput: [0,1] }
    ],
    
    tags: ['array', 'hash-map', 'two-pointers', 'optimization'],
    relatedProblems: ['three-sum', 'four-sum'],
    resources: {
      videoUrl: 'https://youtube.com/watch?v=example',
      articleUrl: 'https://example.com/two-sum'
    }
  }
];

// Export the enhanced structure
export default sampleEnhancedProblems;
