import { Topic, Lesson, Quiz, Challenge, UserProfile } from "../types";

// Topics data
export const topics: Topic[] = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Learn about arrays, the most basic data structure.",
    iconName: "layers",
    color: "bg-algo-purple-500",
    totalLessons: 5,
    completedLessons: 2,
    unlocked: true,
    unit: 1,
    section: 1,
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Master the fundamentals of singly and doubly linked lists.",
    iconName: "list",
    color: "bg-algo-blue-500",
    totalLessons: 4,
    completedLessons: 0,
    unlocked: true,
    unit: 1, 
    section: 2,
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "Understand the LIFO data structure and its applications.",
    iconName: "layers-3",
    color: "bg-algo-green-500",
    totalLessons: 3,
    completedLessons: 0,
    unlocked: true,
    unit: 1,
    section: 3,
  },
  {
    id: "queues",
    title: "Queues",
    description: "Learn about FIFO structure and its practical uses.",
    iconName: "list-check",
    color: "bg-orange-500",
    totalLessons: 3,
    completedLessons: 0,
    unlocked: false,
    unit: 2,
    section: 1,
  },
  {
    id: "recursion",
    title: "Recursion",
    description: "Master the art of functions that call themselves.",
    iconName: "timer",
    color: "bg-pink-500",
    totalLessons: 4,
    completedLessons: 0,
    unlocked: false,
    unit: 2,
    section: 2,
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Compare various approaches to sorting data.",
    iconName: "bar-chart",
    color: "bg-yellow-500",
    totalLessons: 6,
    completedLessons: 0,
    unlocked: false,
    unit: 2,
    section: 3,
  },
  {
    id: "searching",
    title: "Searching Algorithms",
    description: "Discover efficient ways to find data.",
    iconName: "search",
    color: "bg-teal-500",
    totalLessons: 3,
    completedLessons: 0,
    unlocked: false,
    unit: 3,
    section: 1,
  },
  {
    id: "trees",
    title: "Trees",
    description: "Explore hierarchical data structures and their operations.",
    iconName: "chart-pie",
    color: "bg-blue-500",
    totalLessons: 5,
    completedLessons: 0,
    unlocked: false,
    unit: 3,
    section: 2,
  }
];

// Lessons data for Arrays topic
export const lessons: Lesson[] = [
  {
    id: "arrays-intro",
    topicId: "arrays",
    title: "Introduction to Arrays",
    description: "Learn what arrays are and how they work",
    content: `
      # Introduction to Arrays
      
      An array is a collection of elements stored at contiguous memory locations. It is the simplest data structure where each element can be accessed using an index.
      
      ## Key characteristics:
      
      - Fixed size (in many languages)
      - Elements are of the same type
      - O(1) time complexity for access
      - O(n) time complexity for search (without additional structures)
      
      ## Example:
      
      \`\`\`javascript
      // Creating an array
      const numbers = [1, 2, 3, 4, 5];
      
      // Accessing elements
      console.log(numbers[0]); // Output: 1
      console.log(numbers[2]); // Output: 3
      
      // Modifying elements
      numbers[1] = 10;
      console.log(numbers); // Output: [1, 10, 3, 4, 5]
      \`\`\`
    `,
    difficulty: "beginner",
    points: 10,
    timeEstimate: 5,
    completed: true,
    unlocked: true,
  },
  {
    id: "array-operations",
    topicId: "arrays",
    title: "Basic Array Operations",
    description: "Learn how to manipulate arrays with common operations",
    content: `
      # Basic Array Operations
      
      Let's explore the most common operations performed on arrays.
      
      ## Adding Elements
      
      - **Push**: Add to the end
      - **Unshift**: Add to the beginning
      
      ## Removing Elements
      
      - **Pop**: Remove from the end
      - **Shift**: Remove from the beginning
      - **Splice**: Remove from a specific position
      
      ## Example:
      
      \`\`\`javascript
      const fruits = ['apple', 'banana'];
      
      // Adding elements
      fruits.push('orange');        // ['apple', 'banana', 'orange']
      fruits.unshift('strawberry'); // ['strawberry', 'apple', 'banana', 'orange']
      
      // Removing elements
      fruits.pop();     // ['strawberry', 'apple', 'banana']
      fruits.shift();   // ['apple', 'banana']
      
      // Removing from specific position
      fruits.splice(1, 1); // ['apple']
      \`\`\`
      
      ## Time Complexity Analysis
      
      - Push/Pop: O(1) - Constant time
      - Shift/Unshift: O(n) - Linear time (requires reindexing)
      - Access by index: O(1) - Constant time
    `,
    difficulty: "beginner",
    points: 15,
    timeEstimate: 8,
    completed: true,
    unlocked: true,
  },
  {
    id: "array-traversal",
    topicId: "arrays",
    title: "Array Traversal Techniques",
    description: "Different ways to loop through array elements",
    content: `
      # Array Traversal Techniques
      
      There are multiple ways to traverse an array in modern programming. Let's explore them.
      
      ## For Loop
      
      The classic approach.
      
      \`\`\`javascript
      const arr = [1, 2, 3, 4, 5];
      
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
      }
      \`\`\`
      
      ## For...of Loop
      
      A more modern and cleaner approach.
      
      \`\`\`javascript
      for (const element of arr) {
        console.log(element);
      }
      \`\`\`
      
      ## forEach Method
      
      Functional approach with a callback.
      
      \`\`\`javascript
      arr.forEach(element => {
        console.log(element);
      });
      \`\`\`
      
      ## Map, Filter, Reduce
      
      Advanced functional operations.
      
      \`\`\`javascript
      // Transform all elements
      const doubled = arr.map(x => x * 2);
      
      // Filter elements
      const evens = arr.filter(x => x % 2 === 0);
      
      // Reduce to a single value
      const sum = arr.reduce((total, current) => total + current, 0);
      \`\`\`
    `,
    difficulty: "beginner",
    points: 15,
    timeEstimate: 10,
    completed: false,
    unlocked: true,
  },
  {
    id: "array-search",
    topicId: "arrays",
    title: "Searching in Arrays",
    description: "Learn techniques to find elements in arrays",
    content: "Detailed content about searching algorithms in arrays",
    difficulty: "beginner",
    points: 20,
    timeEstimate: 12,
    completed: false,
    unlocked: true,
  },
  {
    id: "array-2d",
    topicId: "arrays",
    title: "Two-Dimensional Arrays",
    description: "Working with matrices and grid-like data",
    content: "Detailed content about 2D arrays and their applications",
    difficulty: "intermediate",
    points: 25,
    timeEstimate: 15,
    completed: false,
    unlocked: false,
  },
];

// Quizzes for the array lessons
export const quizzes: Quiz[] = [
  {
    id: "q-arrays-intro-1",
    question: "What is the time complexity for accessing an element in an array by index?",
    options: [
      "O(1) - Constant time",
      "O(n) - Linear time",
      "O(log n) - Logarithmic time",
      "O(n²) - Quadratic time"
    ],
    correctOptionIndex: 0,
    explanation: "Array access by index is O(1) because it uses direct memory addressing. The computation to find the memory address is simple and takes the same amount of time regardless of the array size."
  },
  {
    id: "q-arrays-intro-2",
    question: "Which of the following is NOT a characteristic of arrays?",
    options: [
      "Fixed size in languages like C/C++",
      "Dynamic insertion at any position in O(1) time",
      "Homogeneous elements (same data type)",
      "Contiguous memory allocation"
    ],
    correctOptionIndex: 1,
    explanation: "Dynamic insertion at any position in an array requires shifting elements, which takes O(n) time in the worst case, not O(1)."
  },
  {
    id: "q-array-ops-1",
    question: "What is the time complexity of adding an element to the beginning of an array?",
    options: [
      "O(1) - Constant time",
      "O(n) - Linear time",
      "O(log n) - Logarithmic time",
      "O(n log n) - Linearithmic time"
    ],
    correctOptionIndex: 1,
    explanation: "Adding an element to the beginning of an array (unshift operation) requires shifting all existing elements one position to the right, which takes O(n) time."
  }
];

// Mock user profile
export const userProfile = {
  user: {
    username: "algorithmLearner",
    profile: {
      id: "user123",
      username: "algorithmLearner",
      points: 45,
      level: 2,
      streakDays: 3,
      lastActive: new Date().toISOString(),
      completedLessons: ["arrays-intro", "array-operations"],
      completedQuizzes: ["q-arrays-intro-1", "q-arrays-intro-2"],
      completedChallenges: []
    }
  }
};
