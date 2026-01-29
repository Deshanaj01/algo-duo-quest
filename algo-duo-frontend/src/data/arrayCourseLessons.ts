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

// 🟢 BEGINNER LEVEL (Level 1) - Array Fundamentals
// Story: Welcome to Array Island! Master the basics and become an Array Explorer
// Badge Reward: 🥉 Array Explorer
export const beginnerLessons: CourseLesson[] = [
  // ═══════════════════════════════════════════════════════════════════
  // MODULE 1: Introduction to Arrays
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'arrays-introduction',
    title: '🎯 What Are Arrays?',
    description: '📚 Begin your journey! Discover what arrays are and why they\'re the most fundamental data structure',
    type: 'concept',
    difficulty: 'beginner',
    duration: 12,
    xpReward: 100,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'arrays-introduction',
      title: 'Introduction to Arrays - Your First Data Structure',
      description: 'Learn what arrays are through real-world analogies and visual examples',
      steps: [
        {
          id: 'step1',
          title: '🏠 What is an Array? (The Story Begins)',
          content: `
            <h3>Welcome to Array Island! 🏝️</h3>
            <p>Imagine you're organizing a treasure hunt, and you need to keep track of all the treasures in order. An array is like a <strong>row of numbered boxes</strong>, each holding a treasure (value)!</p>
            
            <h4>Real-World Analogies:</h4>
            <ul>
              <li>🏘️ <strong>A street with numbered houses</strong> - Each house has an address (index) and people living inside (values)</li>
              <li>📚 <strong>A bookshelf with slots</strong> - Each slot is numbered, making it easy to find your favorite book</li>
              <li>🎬 <strong>A movie theater row</strong> - Seats numbered 0, 1, 2, 3... (yes, starting from 0!)</li>
              <li>🚂 <strong>Train cars</strong> - Lined up in order, each with a number</li>
            </ul>
            
            <h4>🔑 Key Insight:</h4>
            <p>Arrays are <strong>zero-indexed</strong>, meaning the first position is labeled <code>0</code>, not 1! This might seem weird at first, but it's used in most programming languages.</p>
            
            <div class="callout info">
              <strong>Think of it this way:</strong> If you're counting floors in a building, some countries start with "Ground Floor (0)" before "First Floor (1)". Arrays work the same way!
            </div>
          `
        },
        {
          id: 'step2',
          title: '📦 How Arrays Store Data',
          content: `
            <h3>Memory Magic ✨</h3>
            <p>Arrays store elements in <strong>contiguous memory locations</strong>. Think of it like parking cars in numbered parking spots - all in a row, side by side.</p>
            
            <h4>Why This Matters:</h4>
            <ul>
              <li>⚡ <strong>Super Fast Access</strong> - You can jump to any element instantly using its index</li>
              <li>💾 <strong>Efficient Storage</strong> - No wasted space between elements</li>
              <li>📍 <strong>Predictable Structure</strong> - You always know where everything is</li>
            </ul>
            
            <h4>Visual Example:</h4>
            <pre><code>Array: ["Apple", "Banana", "Cherry", "Date"]
Index:    0        1         2         3
</code></pre>
            
            <p>See how each fruit has its own spot? That's an array!</p>
          `
        },
        {
          id: 'step3',
          title: '🎓 Array Declaration & Creation',
          content: `
            <h3>Creating Your First Array</h3>
            <p>In JavaScript, there are multiple ways to create arrays. Let's explore them:</p>
            
            <h4>Method 1: Array Literal (Most Common) ✅</h4>
            <pre><code>const fruits = ["Apple", "Banana", "Cherry"];
const numbers = [10, 20, 30, 40, 50];
const mixed = [1, "Hello", true, 3.14];
const empty = [];
</code></pre>
            
            <h4>Method 2: Array Constructor</h4>
            <pre><code>const arr1 = new Array(5);        // Creates array of length 5
const arr2 = new Array(1, 2, 3);  // Creates [1, 2, 3]
</code></pre>
            
            <h4>Method 3: Array.of() and Array.from()</h4>
            <pre><code>const arr3 = Array.of(7);          // [7]
const arr4 = Array.from("Hello");  // ["H", "e", "l", "l", "o"]
</code></pre>
            
            <div class="callout tip">
              <strong>Pro Tip:</strong> Use array literals <code>[]</code> for clarity and simplicity. It's the most readable and common approach!
            </div>
          `,
          quiz: {
            question: '📝 Which method is the recommended way to create an array in JavaScript?',
            options: [
              'new Array(1, 2, 3)',
              'const arr = [1, 2, 3]',
              'Array.constructor(1, 2, 3)',
              'createArray(1, 2, 3)'
            ],
            correctAnswer: 1,
            explanation: 'Array literals using square brackets [] are the most common, readable, and recommended way to create arrays in JavaScript.'
          }
        }
      ],
      xpReward: 100
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 2: Accessing Array Elements
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-access',
    title: '🔍 Accessing & Reading Elements',
    description: '🎯 Master array indexing and learn the secret of O(1) access time',
    type: 'concept',
    difficulty: 'beginner',
    duration: 10,
    xpReward: 80,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'array-access',
      title: 'Array Access - The Power of Indexing',
      description: 'Learn how to read and access elements using zero-based indexing',
      steps: [
        {
          id: 'step1',
          title: '📍 Reading Array Elements',
          content: `
            <h3>Accessing Elements by Index 🎯</h3>
            <p>To retrieve a value from an array, use this simple syntax:</p>
            
            <pre><code>const scores = [95, 87, 92, 78, 100];

console.log(scores[0]);  // 95  (first element)
console.log(scores[2]);  // 92  (third element)
console.log(scores[4]);  // 100 (last element)
</code></pre>
            
            <h4>🔑 The Golden Rule: Index = Position - 1</h4>
            <ul>
              <li>First element → Index 0</li>
              <li>Second element → Index 1</li>
              <li>Third element → Index 2</li>
              <li>Last element → Index (length - 1)</li>
            </ul>
            
            <h4>⚡ Why is Array Access So Fast?</h4>
            <p>Array access is <strong>O(1)</strong> - constant time! The computer calculates the exact memory address using: <code>base_address + (index × element_size)</code></p>
            
            <p>It's like knowing someone's house is exactly 5 doors down - you don't need to knock on doors 1, 2, 3, 4 first!</p>
          `
        },
        {
          id: 'step2',
          title: '🔧 Accessing First & Last Elements',
          content: `
            <h3>Common Access Patterns</h3>
            
            <h4>Getting the First Element</h4>
            <pre><code>const arr = [10, 20, 30, 40, 50];
const first = arr[0];  // 10
</code></pre>
            
            <h4>Getting the Last Element</h4>
            <pre><code>const arr = [10, 20, 30, 40, 50];
const last = arr[arr.length - 1];  // 50

// Modern JavaScript (ES2022+):
const last = arr.at(-1);  // 50 (negative index!)
</code></pre>
            
            <h4>What About Invalid Indices?</h4>
            <pre><code>const arr = [10, 20, 30];
console.log(arr[5]);   // undefined (no error!)
console.log(arr[-1]);  // undefined (except with .at())
</code></pre>
            
            <div class="callout warning">
              <strong>Watch Out!</strong> JavaScript doesn't throw errors for out-of-bounds access - it returns <code>undefined</code>. Always check array length!
            </div>
          `,
          quiz: {
            question: 'What is the value at index 2 in the array [10, 20, 30, 40, 50]?',
            options: ['10', '20', '30', '40'],
            correctAnswer: 2,
            explanation: 'Since arrays are zero-indexed, index 2 refers to the third element, which is 30.'
          }
        }
      ],
      xpReward: 80
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 3: Modifying Arrays
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-modification',
    title: '✏️ Updating Array Elements',
    description: '🔄 Learn how to modify, update, and change array values',
    type: 'concept',
    difficulty: 'beginner',
    duration: 10,
    xpReward: 80,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'array-modification',
      title: 'Modifying Arrays - Change and Update',
      description: 'Learn how to change array elements and understand mutation',
      steps: [
        {
          id: 'step1',
          title: '✏️ Updating Elements',
          content: `
            <h3>Changing Array Values</h3>
            <p>Arrays are <strong>mutable</strong> - you can change their contents after creation!</p>
            
            <pre><code>let scores = [75, 85, 90];

// Update second element
scores[1] = 95;

console.log(scores);  // [75, 95, 90]
</code></pre>
            
            <h4>Multiple Updates</h4>
            <pre><code>let items = ["a", "b", "c", "d"];

items[0] = "A";  // Change first
items[3] = "D";  // Change last

console.log(items);  // ["A", "b", "c", "D"]
</code></pre>
            
            <div class="callout info">
              <strong>Mutation vs Reassignment:</strong><br>
              • Mutation: Changing array contents (elements)<br>
              • Reassignment: Changing what variable points to<br>
            </div>
          `,
          quiz: {
            question: 'After executing "arr[1] = 99" on array [10, 20, 30], what is arr[1]?',
            options: ['10', '99', '20', '30'],
            correctAnswer: 1,
            explanation: 'The assignment arr[1] = 99 changes the element at index 1 from 20 to 99.'
          }
        },
        {
          id: 'step2',
          title: '🔒 const vs let with Arrays',
          content: `
            <h3>Understanding const with Arrays</h3>
            
            <pre><code>const arr = [1, 2, 3];

// ✅ This works - modifying contents
arr[0] = 99;
arr.push(4);
console.log(arr);  // [99, 2, 3, 4]

// ❌ This fails - reassigning variable
arr = [5, 6, 7];  // Error!
</code></pre>
            
            <h4>Why?</h4>
            <p><code>const</code> prevents <strong>reassignment</strong> of the variable, but the array contents can still change!</p>
            
            <div class="callout tip">
              <strong>Best Practice:</strong> Use <code>const</code> for arrays unless you need to reassign the entire array.
            </div>
          `
        }
      ],
      xpReward: 80
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 4: Array Properties & Length
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-length-properties',
    title: '📏 Array Length & Properties',
    description: '📊 Understand array.length and how to work with array size',
    type: 'concept',
    difficulty: 'beginner',
    duration: 8,
    xpReward: 70,
    completed: false,
    unlocked: true,
    level: 1,
    conceptConfig: {
      id: 'array-length-properties',
      title: 'Array Length - Counting Elements',
      description: 'Master the length property and array size manipulation',
      steps: [
        {
          id: 'step1',
          title: '📏 The length Property',
          content: `
            <h3>Understanding array.length</h3>
            
            <pre><code>const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits.length);  // 3

const numbers = [10, 20, 30, 40, 50];
console.log(numbers.length);  // 5

const empty = [];
console.log(empty.length);  // 0
</code></pre>
            
            <h4>🔑 Key Points:</h4>
            <ul>
              <li>Length = number of elements</li>
              <li>Last index = length - 1</li>
              <li>Length is automatically updated</li>
            </ul>
            
            <h4>Dynamic Length</h4>
            <pre><code>const arr = [1, 2, 3];
console.log(arr.length);  // 3

arr.push(4);
console.log(arr.length);  // 4

arr.pop();
console.log(arr.length);  // 3
</code></pre>
          `,
          quiz: {
            question: 'If an array has length 10, what is the index of the last element?',
            options: ['10', '9', '11', '8'],
            correctAnswer: 1,
            explanation: 'Since arrays are zero-indexed, the last index is always length - 1. So 10 - 1 = 9.'
          }
        },
        {
          id: 'step2',
          title: '🎯 Practical Use Cases',
          content: `
            <h3>Using Length in Real Code</h3>
            
            <h4>Checking if Empty</h4>
            <pre><code>if (arr.length === 0) {
  console.log("Array is empty!");
}
</code></pre>
            
            <h4>Accessing Last Element</h4>
            <pre><code>const last = arr[arr.length - 1];
</code></pre>
            
            <h4>Looping Through Array</h4>
            <pre><code>for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
</code></pre>
            
            <h4>⚠️ You Can Modify Length!</h4>
            <pre><code>const arr = [1, 2, 3, 4, 5];
arr.length = 3;  // Truncates array
console.log(arr);  // [1, 2, 3]

arr.length = 5;  // Expands with undefined
console.log(arr);  // [1, 2, 3, undefined, undefined]
</code></pre>
          `
        }
      ],
      xpReward: 70
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 5: Traversing Arrays (Iteration)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-traversal',
    title: '🔄 Looping Through Arrays',
    description: '🚀 Learn different ways to iterate and traverse arrays',
    type: 'concept',
    difficulty: 'beginner',
    duration: 15,
    xpReward: 90,
    completed: false,
    unlocked: false,
    prerequisite: ['array-length-properties'],
    level: 1,
    conceptConfig: {
      id: 'array-traversal',
      title: 'Array Traversal - Visiting Every Element',
      description: 'Master different iteration techniques for arrays',
      steps: [
        {
          id: 'step1',
          title: '🔄 For Loop - Classic Approach',
          content: `
            <h3>The Traditional For Loop</h3>
            <p>The most common way to traverse an array:</p>
            
            <pre><code>const numbers = [10, 20, 30, 40, 50];

// Print each element
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Calculate sum
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum);  // 150
</code></pre>
            
            <h4>🎯 When to Use:</h4>
            <ul>
              <li>✅ Need index position</li>
              <li>✅ Want to skip elements</li>
              <li>✅ Reverse iteration</li>
              <li>✅ Breaking out early</li>
            </ul>
          `
        },
        {
          id: 'step2',
          title: '✨ Modern Iteration Methods',
          content: `
            <h3>forEach - Functional Approach</h3>
            <pre><code>const fruits = ["Apple", "Banana", "Cherry"];

fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});
// 0: Apple
// 1: Banana
// 2: Cherry
</code></pre>
            
            <h3>for...of - Clean and Simple</h3>
            <pre><code>const numbers = [1, 2, 3, 4, 5];

for (const num of numbers) {
  console.log(num);
}
</code></pre>
            
            <h3>map - Transform Elements</h3>
            <pre><code>const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]
</code></pre>
            
            <h3>while Loop</h3>
            <pre><code>const arr = [10, 20, 30];
let i = 0;

while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
</code></pre>
          `,
          quiz: {
            question: 'Which loop method gives you both the element AND its index easily?',
            options: ['for...of', 'while', 'forEach', 'map'],
            correctAnswer: 2,
            explanation: 'forEach provides both value and index as parameters: arr.forEach((value, index) => {...})'
          }
        }
      ],
      xpReward: 90
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 6: Insertion Operations
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-insertion',
    title: '➕ Adding Elements to Arrays',
    description: '📝 Learn push, unshift, and splice for inserting elements',
    type: 'concept',
    difficulty: 'beginner',
    duration: 12,
    xpReward: 85,
    completed: false,
    unlocked: false,
    prerequisite: ['array-traversal'],
    level: 1,
    conceptConfig: {
      id: 'array-insertion',
      title: 'Insertion - Adding Elements',
      description: 'Learn all the ways to add elements to arrays',
      steps: [
        {
          id: 'step1',
          title: '📤 push() - Add to End',
          content: `
            <h3>Adding Elements at the End</h3>
            <p>The <code>push()</code> method adds one or more elements to the end of an array.</p>
            
            <pre><code>const fruits = ["Apple", "Banana"];

fruits.push("Cherry");
console.log(fruits);  // ["Apple", "Banana", "Cherry"]

fruits.push("Date", "Elderberry");
console.log(fruits);  // ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

// Returns new length
const newLength = fruits.push("Fig");
console.log(newLength);  // 6
</code></pre>
            
            <h4>⚡ Time Complexity: O(1)</h4>
            <p>Adding to the end is super fast - constant time!</p>
            
            <div class="callout tip">
              <strong>Use Case:</strong> Building a list, stacking items, appending data
            </div>
          `
        },
        {
          id: 'step2',
          title: '📥 unshift() - Add to Beginning',
          content: `
            <h3>Adding Elements at the Start</h3>
            <p>The <code>unshift()</code> method adds elements to the beginning of an array.</p>
            
            <pre><code>const numbers = [3, 4, 5];

numbers.unshift(2);
console.log(numbers);  // [2, 3, 4, 5]

numbers.unshift(0, 1);
console.log(numbers);  // [0, 1, 2, 3, 4, 5]
</code></pre>
            
            <h4>⚠️ Time Complexity: O(n)</h4>
            <p>Adding to the beginning is slower because all existing elements must shift right!</p>
            
            <pre><code>// What happens internally:
[3, 4, 5]  →  [_, 3, 4, 5]  →  [2, 3, 4, 5]
               Shift all         Insert new
</code></pre>
          `
        },
        {
          id: 'step3',
          title: '✂️ splice() - Insert Anywhere',
          content: `
            <h3>Inserting at Any Position</h3>
            <p>The <code>splice()</code> method can insert elements at any index.</p>
            
            <h4>Syntax:</h4>
            <pre><code>array.splice(startIndex, deleteCount, item1, item2, ...)
</code></pre>
            
            <h4>Insert Without Deleting:</h4>
            <pre><code>const arr = [1, 2, 5, 6];

// Insert 3 and 4 at index 2
arr.splice(2, 0, 3, 4);
console.log(arr);  // [1, 2, 3, 4, 5, 6]
</code></pre>
            
            <h4>More Examples:</h4>
            <pre><code>const colors = ["Red", "Blue"];

// Insert at index 1
colors.splice(1, 0, "Green");
console.log(colors);  // ["Red", "Green", "Blue"]

// Insert multiple at beginning
colors.splice(0, 0, "Yellow", "Orange");
console.log(colors);  // ["Yellow", "Orange", "Red", "Green", "Blue"]
</code></pre>
            
            <h4>⏱️ Time Complexity: O(n)</h4>
            <p>Elements after insertion point must shift right.</p>
          `,
          quiz: {
            question: 'Which method is FASTEST for adding elements to an array?',
            options: ['unshift()', 'splice()', 'push()', 'They are all the same'],
            correctAnswer: 2,
            explanation: 'push() is O(1) - fastest! It adds to the end without shifting other elements. unshift() and splice() are O(n) because they require shifting.'
          }
        }
      ],
      xpReward: 85
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 7: Deletion Operations
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-deletion',
    title: '🗑️ Removing Elements from Arrays',
    description: '❌ Master pop, shift, and splice for deleting elements',
    type: 'concept',
    difficulty: 'beginner',
    duration: 12,
    xpReward: 85,
    completed: false,
    unlocked: false,
    prerequisite: ['array-insertion'],
    level: 1,
    conceptConfig: {
      id: 'array-deletion',
      title: 'Deletion - Removing Elements',
      description: 'Learn all the ways to remove elements from arrays',
      steps: [
        {
          id: 'step1',
          title: '📤 pop() - Remove from End',
          content: `
            <h3>Removing the Last Element</h3>
            <p>The <code>pop()</code> method removes the last element and returns it.</p>
            
            <pre><code>const fruits = ["Apple", "Banana", "Cherry"];

const last = fruits.pop();
console.log(last);    // "Cherry"
console.log(fruits);  // ["Apple", "Banana"]

fruits.pop();
console.log(fruits);  // ["Apple"]

fruits.pop();
console.log(fruits);  // []

fruits.pop();         // undefined (empty array)
</code></pre>
            
            <h4>⚡ Time Complexity: O(1)</h4>
            <p>Removing from the end is super fast!</p>
            
            <div class="callout tip">
              <strong>Use Case:</strong> Stack operations, undo functionality, removing most recent item
            </div>
          `
        },
        {
          id: 'step2',
          title: '📥 shift() - Remove from Beginning',
          content: `
            <h3>Removing the First Element</h3>
            <p>The <code>shift()</code> method removes the first element and returns it.</p>
            
            <pre><code>const numbers = [10, 20, 30, 40];

const first = numbers.shift();
console.log(first);     // 10
console.log(numbers);   // [20, 30, 40]

numbers.shift();
console.log(numbers);   // [30, 40]
</code></pre>
            
            <h4>⚠️ Time Complexity: O(n)</h4>
            <p>All remaining elements must shift left:</p>
            
            <pre><code>// What happens internally:
[10, 20, 30, 40]  →  [20, 30, 40, _]  →  [20, 30, 40]
 Remove first         Shift all left      Resize
</code></pre>
            
            <div class="callout warning">
              <strong>Performance:</strong> Avoid shift() in loops with large arrays - it's slow!
            </div>
          `
        },
        {
          id: 'step3',
          title: '✂️ splice() - Remove from Anywhere',
          content: `
            <h3>Removing Elements at Any Position</h3>
            
            <h4>Remove Single Element:</h4>
            <pre><code>const arr = [1, 2, 3, 4, 5];

// Remove element at index 2
arr.splice(2, 1);
console.log(arr);  // [1, 2, 4, 5]
</code></pre>
            
            <h4>Remove Multiple Elements:</h4>
            <pre><code>const colors = ["Red", "Green", "Blue", "Yellow", "Orange"];

// Remove 2 elements starting at index 1
const removed = colors.splice(1, 2);
console.log(removed);  // ["Green", "Blue"]
console.log(colors);   // ["Red", "Yellow", "Orange"]
</code></pre>
            
            <h4>Remove from End:</h4>
            <pre><code>const nums = [1, 2, 3, 4, 5];

// Remove last 2 elements
nums.splice(-2, 2);
console.log(nums);  // [1, 2, 3]
</code></pre>
            
            <h4>Clear Entire Array:</h4>
            <pre><code>arr.splice(0, arr.length);  // Removes all
// or simply:
arr.length = 0;
</code></pre>
          `,
          quiz: {
            question: 'After calling arr.pop() on [1,2,3], what does arr.pop() return?',
            options: ['1', '2', '3', 'undefined'],
            correctAnswer: 1,
            explanation: 'First pop() removes 3, leaving [1,2]. Second pop() removes and returns 2.'
          }
        },
        {
          id: 'step4',
          title: '🎯 delete Operator (Avoid!)',
          content: `
            <h3>Why NOT to Use the delete Operator</h3>
            
            <pre><code>const arr = [1, 2, 3, 4, 5];

delete arr[2];
console.log(arr);         // [1, 2, <empty>, 4, 5]
console.log(arr.length);  // 5 (unchanged!)
console.log(arr[2]);      // undefined
</code></pre>
            
            <h4>Problems with delete:</h4>
            <ul>
              <li>❌ Leaves "holes" in the array</li>
              <li>❌ Doesn't change array length</li>
              <li>❌ Creates sparse array (bad performance)</li>
              <li>❌ Confusing behavior</li>
            </ul>
            
            <div class="callout danger">
              <strong>Best Practice:</strong> Use splice(), pop(), or shift() instead of delete!
            </div>
          `
        }
      ],
      xpReward: 85
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 8: Searching in Arrays
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-searching',
    title: '🔍 Searching in Arrays',
    description: '🎯 Learn linear search, indexOf, includes, and find methods',
    type: 'concept',
    difficulty: 'beginner',
    duration: 15,
    xpReward: 95,
    completed: false,
    unlocked: false,
    prerequisite: ['array-deletion'],
    level: 1,
    conceptConfig: {
      id: 'array-searching',
      title: 'Searching - Finding Elements',
      description: 'Master different search techniques and methods',
      steps: [
        {
          id: 'step1',
          title: '🔍 Linear Search - The Basic Approach',
          content: `
            <h3>What is Linear Search?</h3>
            <p>Linear search checks each element one by one until it finds the target or reaches the end.</p>
            
            <h4>Manual Implementation:</h4>
            <pre><code>function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // Found! Return index
    }
  }
  return -1;  // Not found
}

const numbers = [10, 25, 30, 45, 50];
console.log(linearSearch(numbers, 30));  // 2
console.log(linearSearch(numbers, 99));  // -1
</code></pre>
            
            <h4>⏱️ Time Complexity: O(n)</h4>
            <ul>
              <li>Best case: O(1) - element is first</li>
              <li>Average case: O(n/2) ≈ O(n)</li>
              <li>Worst case: O(n) - element is last or not found</li>
            </ul>
            
            <div class="callout info">
              <strong>When to Use:</strong> Unsorted arrays, small arrays, or when you need custom comparison logic
            </div>
          `
        },
        {
          id: 'step2',
          title: '📍 indexOf() & lastIndexOf()',
          content: `
            <h3>Built-in Search Methods</h3>
            
            <h4>indexOf() - Find First Occurrence</h4>
            <pre><code>const fruits = ["Apple", "Banana", "Cherry", "Banana"];

console.log(fruits.indexOf("Banana"));      // 1
console.log(fruits.indexOf("Mango"));       // -1 (not found)
console.log(fruits.indexOf("Cherry"));      // 2

// Start searching from index 2
console.log(fruits.indexOf("Banana", 2));   // 3
</code></pre>
            
            <h4>lastIndexOf() - Find Last Occurrence</h4>
            <pre><code>const numbers = [1, 2, 3, 2, 5, 2];

console.log(numbers.lastIndexOf(2));        // 5 (last occurrence)
console.log(numbers.lastIndexOf(2, 4));     // 3 (search backwards from index 4)
</code></pre>
            
            <h4>Key Points:</h4>
            <ul>
              <li>Returns index of element (first/last match)</li>
              <li>Returns -1 if not found</li>
              <li>Uses strict equality (===)</li>
              <li>Can specify starting position</li>
            </ul>
          `
        },
        {
          id: 'step3',
          title: '✅ includes() - Check Existence',
          content: `
            <h3>Check if Element Exists</h3>
            <p>The <code>includes()</code> method returns true/false instead of index.</p>
            
            <pre><code>const colors = ["Red", "Green", "Blue"];

console.log(colors.includes("Green"));   // true
console.log(colors.includes("Yellow"));  // false

// Case sensitive!
console.log(colors.includes("red"));     // false

// Start position
const nums = [1, 2, 3, 4, 5];
console.log(nums.includes(3, 2));        // true (search from index 2)
console.log(nums.includes(2, 2));        // false (2 is before index 2)
</code></pre>
            
            <h4>includes() vs indexOf():</h4>
            <pre><code>// When you just need to check existence:
if (arr.includes(5)) { }     // ✅ Clearer
if (arr.indexOf(5) !== -1) { } // ❌ More verbose

// When you need the position:
const index = arr.indexOf(5);  // ✅ Use indexOf
</code></pre>
          `,
          quiz: {
            question: 'What does arr.indexOf("x") return if "x" is not found?',
            options: ['0', 'undefined', '-1', 'null'],
            correctAnswer: 2,
            explanation: 'indexOf() returns -1 when the element is not found in the array.'
          }
        },
        {
          id: 'step4',
          title: '🎯 find() & findIndex() - Custom Searches',
          content: `
            <h3>Advanced Search with Conditions</h3>
            
            <h4>find() - Get First Matching Element</h4>
            <pre><code>const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 }
];

// Find first user over 28
const user = users.find(u => u.age > 28);
console.log(user);  // { id: 2, name: "Bob", age: 30 }

// Find by id
const alice = users.find(u => u.id === 1);
console.log(alice.name);  // "Alice"

// Not found returns undefined
const notFound = users.find(u => u.age > 100);
console.log(notFound);  // undefined
</code></pre>
            
            <h4>findIndex() - Get Index of Match</h4>
            <pre><code>const numbers = [5, 12, 8, 130, 44];

// Find index of first number > 10
const index = numbers.findIndex(n => n > 10);
console.log(index);  // 1

// Not found returns -1
const notFound = numbers.findIndex(n => n > 200);
console.log(notFound);  // -1
</code></pre>
            
            <div class="callout tip">
              <strong>Use find/findIndex when:</strong> You need custom logic, working with objects, or complex conditions
            </div>
          `
        }
      ],
      xpReward: 95
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PRACTICE: Array Basics Mission
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-basics-playground',
    title: '🎮 Mission 1: Array Basics Quest',
    description: '💪 Put your skills to the test! Solve array manipulation challenges',
    type: 'playground',
    difficulty: 'beginner',
    duration: 25,
    xpReward: 150,
    completed: false,
    unlocked: false,
    prerequisite: ['array-searching'],
    level: 1,
    playgroundConfig: {
      id: 'array-basics-playground',
      title: 'Array Basics Challenge',
      description: 'Create a function that returns the maximum element in an array',
      starterCode: `function findMaximum(arr) {
  // Your code here
  // Return the largest number in the array
  // Example: [3, 7, 2, 9, 1] should return 9
  
}

// Test your function
console.log(findMaximum([3, 7, 2, 9, 1]));  // Should return 9
console.log(findMaximum([10]));             // Should return 10
console.log(findMaximum([-5, -2, -10]));    // Should return -2`,
      solution: `function findMaximum(arr) {
  if (arr.length === 0) return undefined;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
  
  // Or using Math.max:
  // return Math.max(...arr);
}`,
      hints: [
        'Start by assuming the first element is the maximum',
        'Loop through the array and compare each element',
        'Update max whenever you find a larger element',
        'Edge case: What if the array is empty?'
      ],
      testCases: [
        'findMaximum([3, 7, 2, 9, 1]) should return 9',
        'findMaximum([10]) should return 10',
        'findMaximum([-5, -2, -10]) should return -2',
        'findMaximum([]) should return undefined'
      ],
      difficulty: 'beginner',
      xpReward: 150
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 9: Simple Sorting Introduction
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'array-sorting-intro',
    title: '📊 Introduction to Sorting',
    description: '🔄 Learn the basics of array sorting with Bubble Sort',
    type: 'concept',
    difficulty: 'beginner',
    duration: 18,
    xpReward: 100,
    completed: false,
    unlocked: false,
    prerequisite: ['array-basics-playground'],
    level: 1,
    conceptConfig: {
      id: 'array-sorting-intro',
      title: 'Sorting Basics - Organizing Data',
      description: 'Understand why sorting matters and learn Bubble Sort',
      steps: [
        {
          id: 'step1',
          title: '📊 Why Sorting Matters',
          content: `
            <h3>The Power of Organization 📚</h3>
            <p>Sorting is one of the most fundamental operations in computer science!</p>
            
            <h4>Real-World Uses:</h4>
            <ul>
              <li>📧 Email inbox by date/sender</li>
              <li>🛒 Products by price/rating</li>
              <li>📞 Contacts alphabetically</li>
              <li>📊 Leaderboards by score</li>
              <li>🔍 Faster searching (binary search needs sorted data!)</li>
            </ul>
            
            <h4>Sorting Orders:</h4>
            <pre><code>// Ascending (smallest to largest)
[1, 2, 3, 4, 5]
["Alice", "Bob", "Charlie"]

// Descending (largest to smallest)
[5, 4, 3, 2, 1]
["Charlie", "Bob", "Alice"]
</code></pre>
            
            <div class="callout info">
              <strong>Fun Fact:</strong> About 25% of all computer time is spent on sorting!
            </div>
          `
        },
        {
          id: 'step2',
          title: '🫧 Bubble Sort - The Simplest Algorithm',
          content: `
            <h3>How Bubble Sort Works</h3>
            <p>Bubble Sort repeatedly "bubbles" the largest element to the end by comparing adjacent pairs.</p>
            
            <h4>Visual Example:</h4>
            <pre><code>Start: [5, 2, 8, 1, 9]

Pass 1:
[5, 2, 8, 1, 9] → [2, 5, 8, 1, 9] (swap 5 and 2)
[2, 5, 8, 1, 9] → [2, 5, 8, 1, 9] (no swap)
[2, 5, 8, 1, 9] → [2, 5, 1, 8, 9] (swap 8 and 1)
[2, 5, 1, 8, 9] → [2, 5, 1, 8, 9] (no swap)

Result after Pass 1: [2, 5, 1, 8, 9] (9 is in place!)

Pass 2:
[2, 5, 1, 8, 9] → [2, 1, 5, 8, 9] (swap 5 and 1)
[2, 1, 5, 8, 9] → [2, 1, 5, 8, 9] (no swap)

Continue until sorted: [1, 2, 5, 8, 9]
</code></pre>
            
            <h4>The Algorithm:</h4>
            <ol>
              <li>Compare each pair of adjacent elements</li>
              <li>Swap them if they're in wrong order</li>
              <li>Repeat for all elements</li>
              <li>After each pass, one more element is in correct position</li>
            </ol>
          `
        },
        {
          id: 'step3',
          title: '💻 Bubble Sort Code',
          content: `
            <h3>Implementation</h3>
            
            <pre><code>function bubbleSort(arr) {
  const n = arr.length;
  
  // Outer loop: number of passes
  for (let i = 0; i < n - 1; i++) {
    // Inner loop: compare adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      // Swap if left > right
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  
  return arr;
}

// Test it!
const numbers = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(numbers);
console.log(numbers);  // [11, 12, 22, 25, 34, 64, 90]
</code></pre>
            
            <h4>Optimized Version (with Early Exit):</h4>
            <pre><code>function bubbleSortOptimized(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // ES6 swap
        swapped = true;
      }
    }
    
    // If no swaps, array is sorted!
    if (!swapped) break;
  }
  
  return arr;
}
</code></pre>
            
            <h4>⏱️ Time Complexity:</h4>
            <ul>
              <li>Best Case: O(n) - already sorted</li>
              <li>Average Case: O(n²)</li>
              <li>Worst Case: O(n²) - reverse sorted</li>
            </ul>
          `,
          quiz: {
            question: 'How many passes does Bubble Sort need for an array of 5 elements in worst case?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1,
            explanation: 'Bubble Sort needs n-1 passes for n elements. So for 5 elements, it needs 4 passes.'
          }
        }
      ],
      xpReward: 100
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // PRACTICE: Sorting Challenge
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'sorting-playground',
    title: '🎮 Mission 2: Sorting Quest',
    description: '🔄 Implement your own sorting algorithm!',
    type: 'playground',
    difficulty: 'beginner',
    duration: 30,
    xpReward: 175,
    completed: false,
    unlocked: false,
    prerequisite: ['array-sorting-intro'],
    level: 1,
    playgroundConfig: {
      id: 'sorting-playground',
      title: 'Implement Bubble Sort',
      description: 'Write a function that sorts an array using bubble sort algorithm',
      starterCode: `function bubbleSort(arr) {
  // Your code here
  // Sort the array in ascending order
  // Hint: Use nested loops and swap adjacent elements
  
  return arr;
}

// Test your function
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// Should return [11, 12, 22, 25, 34, 64, 90]`,
      solution: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    
    // Optimization: stop if no swaps occurred
    if (!swapped) break;
  }
  
  return arr;
}`,
      hints: [
        'Use two nested loops - outer for passes, inner for comparisons',
        'Compare each element with the next one: arr[j] > arr[j+1]',
        'Swap if they are in wrong order',
        'Each pass places one element in its final position',
        'Optimization: stop if no swaps occur in a pass'
      ],
      testCases: [
        'bubbleSort([64, 34, 25, 12, 22, 11, 90]) should return [11, 12, 22, 25, 34, 64, 90]',
        'bubbleSort([5, 1, 4, 2, 8]) should return [1, 2, 4, 5, 8]',
        'bubbleSort([1, 2, 3]) should return [1, 2, 3]',
        'bubbleSort([3, 2, 1]) should return [1, 2, 3]'
      ],
      difficulty: 'beginner',
      xpReward: 175
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // FINAL ASSESSMENT: Level 1 Complete Test
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'beginner-revision',
    title: '🏆 Level 1 Assessment: Array Explorer Exam',
    description: '🎓 Final test! Prove your mastery of array fundamentals and earn your badge',
    type: 'revision',
    difficulty: 'beginner',
    duration: 30,
    xpReward: 250,
    completed: false,
    unlocked: false,
    prerequisite: ['sorting-playground'],
    level: 1,
    revisionConfig: {
      id: 'beginner-revision',
      level: 'beginner',
      passingScore: 70,
      timeLimit: 30,
      xpReward: 250,
      mcqQuestions: [
        {
          id: 'mcq-1',
          question: 'What is the index of the first element in an array?',
          options: ['1', '0', '-1', 'undefined'],
          correctAnswer: 1,
          explanation: 'Arrays in JavaScript are zero-indexed, meaning the first element is at index 0.',
          points: 10
        },
        {
          id: 'mcq-2',
          question: 'How do you get the length of an array called "myArray"?',
          options: ['myArray.size', 'myArray.length', 'myArray.count()', 'length(myArray)'],
          correctAnswer: 1,
          explanation: 'The length property returns the number of elements in an array.',
          points: 10
        },
        {
          id: 'mcq-3',
          question: 'What happens when you access an array index that doesn\'t exist?',
          options: ['Error is thrown', 'Returns null', 'Returns undefined', 'Returns 0'],
          correctAnswer: 2,
          explanation: 'Accessing a non-existent index returns undefined in JavaScript.',
          points: 10
        },
        {
          id: 'mcq-4',
          question: 'Which method is FASTEST for adding elements to the END of an array?',
          options: ['unshift()', 'splice()', 'push()', 'concat()'],
          correctAnswer: 2,
          explanation: 'push() is O(1) constant time - fastest way to add to the end!',
          points: 10
        },
        {
          id: 'mcq-5',
          question: 'What is the time complexity of linear search?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctAnswer: 2,
          explanation: 'Linear search checks each element one by one, giving O(n) time complexity.',
          points: 10
        },
        {
          id: 'mcq-6',
          question: 'If an array has length 10, what is the index of the last element?',
          options: ['10', '9', '11', 'undefined'],
          correctAnswer: 1,
          explanation: 'Last index is always length - 1. So 10 - 1 = 9.',
          points: 10
        },
        {
          id: 'mcq-7',
          question: 'What does arr.pop() return?',
          options: ['The first element', 'The last element', 'The array length', 'undefined'],
          correctAnswer: 1,
          explanation: 'pop() removes and returns the last element of the array.',
          points: 10
        },
        {
          id: 'mcq-8',
          question: 'Which is the correct way to create an empty array?',
          options: ['const arr = [];', 'const arr = {};', 'const arr = new Array[];', 'const arr = array();'],
          correctAnswer: 0,
          explanation: 'Square brackets [] create an empty array literal - the recommended way!',
          points: 10
        },
        {
          id: 'mcq-9',
          question: 'What is the time complexity of Bubble Sort in worst case?',
          options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
          correctAnswer: 3,
          explanation: 'Bubble Sort has O(n²) time complexity due to nested loops.',
          points: 10
        },
        {
          id: 'mcq-10',
          question: 'What does arr.indexOf("x") return if "x" is not found?',
          options: ['0', 'undefined', '-1', 'null'],
          correctAnswer: 2,
          explanation: 'indexOf() returns -1 when the element is not found.',
          points: 10
        }
      ],
      codingChallenges: [
        {
          id: 'coding-1',
          title: 'Find Maximum Element',
          description: 'Write a function that finds and returns the maximum element in an array',
          starterCode: `function findMax(arr) {
  // Your code here
  
}`,
          solution: `function findMax(arr) {
  if (arr.length === 0) return undefined;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
          testCases: [
            'findMax([1, 5, 3, 9, 2]) === 9',
            'findMax([-1, -5, -3]) === -1',
            'findMax([42]) === 42'
          ],
          points: 30,
          difficulty: 'beginner'
        },
        {
          id: 'coding-2',
          title: 'Remove Duplicates',
          description: 'Create a function that removes duplicate elements from an array',
          starterCode: `function removeDuplicates(arr) {
  // Return array with unique elements only
  
}`,
          solution: `function removeDuplicates(arr) {
  const unique = [];
  for (let i = 0; i < arr.length; i++) {
    if (!unique.includes(arr[i])) {
      unique.push(arr[i]);
    }
  }
  return unique;
  // Or using Set: return [...new Set(arr)];
}`,
          testCases: [
            'removeDuplicates([1, 2, 2, 3, 3, 4]) returns [1, 2, 3, 4]',
            'removeDuplicates([1, 1, 1, 1]) returns [1]',
            'removeDuplicates([]) returns []'
          ],
          points: 40,
          difficulty: 'beginner'
        },
        {
          id: 'coding-3',
          title: 'Reverse Array In-Place',
          description: 'Reverse an array without using built-in reverse() method',
          starterCode: `function reverseArray(arr) {
  // Reverse the array in-place
  // Don't use arr.reverse()!
  
}`,
          solution: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    // Swap elements
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    
    left++;
    right--;
  }
  
  return arr;
}`,
          testCases: [
            'reverseArray([1, 2, 3, 4, 5]) returns [5, 4, 3, 2, 1]',
            'reverseArray(["a", "b", "c"]) returns ["c", "b", "a"]',
            'reverseArray([42]) returns [42]'
          ],
          points: 30,
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

// Advanced Level (Level 3) - 2D Arrays & Complex Algorithms
export const advancedLessons: CourseLesson[] = [
  {
    id: 'two-sum-challenge',
    title: 'Two Sum Challenge',
    description: 'Find two numbers that add up to a target using hash maps',
    type: 'playground',
    difficulty: 'beginner',
    duration: 25,
    xpReward: 100,
    completed: false,
    unlocked: true,
    level: 3,
    playgroundConfig: {
      id: 'two-sum-challenge',
      title: 'Two Sum',
      description: 'Given an array of integers and a target, return indices of two numbers that add up to the target',
      starterCode: `function solve({ nums, target }) {
  // Return array of two indices [i, j]
  // Example: nums = [2,7,11,15], target = 9
  // Output: [0,1] because nums[0] + nums[1] = 9
  
  return null;
}`,
      solution: `function solve({ nums, target }) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`,
      hints: [
        'Think about what information you need to store as you iterate.',
        'Use a hash map to store values and their indices.',
        'For each number, check if its complement exists in the map.',
      ],
      testCases: [
        'solve({ nums: [2,7,11,15], target: 9 }) should return [0,1]',
        'solve({ nums: [3,2,4], target: 6 }) should return [1,2]',
        'solve({ nums: [3,3], target: 6 }) should return [0,1]',
      ],
      difficulty: 'beginner',
      xpReward: 100
    }
  },
  {
    id: 'kadanes-algorithm',
    title: "Maximum Subarray (Kadane's Algorithm)",
    description: 'Find the contiguous subarray with the largest sum',
    type: 'playground',
    difficulty: 'intermediate',
    duration: 30,
    xpReward: 120,
    completed: false,
    unlocked: true,
    prerequisite: ['two-sum-challenge'],
    level: 3,
    playgroundConfig: {
      id: 'kadanes-algorithm',
      title: "Maximum Subarray (Kadane's Algorithm)",
      description: 'Find the contiguous subarray with the largest sum using dynamic programming',
      starterCode: `function solve(nums) {
  // Return the maximum sum
  // Example: [-2,1,-3,4,-1,2,1,-5,4]
  // Output: 6 (subarray [4,-1,2,1])
  
  return 0;
}`,
      solution: `function solve(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
      hints: [
        'Track the maximum sum ending at the current position.',
        'At each element, decide: extend the existing subarray or start fresh?',
        'Keep a global maximum as you iterate.',
      ],
      testCases: [
        'solve([-2,1,-3,4,-1,2,1,-5,4]) should return 6',
        'solve([1]) should return 1',
        'solve([5,4,-1,7,8]) should return 23',
      ],
      difficulty: 'intermediate',
      xpReward: 120
    }
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    description: 'Calculate how much rainwater can be trapped between elevation bars',
    type: 'playground',
    difficulty: 'advanced',
    duration: 40,
    xpReward: 150,
    completed: false,
    unlocked: true,
    prerequisite: ['kadanes-algorithm'],
    level: 3,
    playgroundConfig: {
      id: 'trapping-rain-water',
      title: 'Trapping Rain Water',
      description: 'Calculate how much rainwater can be trapped between elevation bars',
      starterCode: `function solve(height) {
  // Return total trapped water
  // Example: [0,1,0,2,1,0,1,3,2,1,2,1]
  // Output: 6 units of water trapped
  
  return 0;
}`,
      solution: `function solve(height) {
  if (height.length === 0) return 0;
  
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}`,
      hints: [
        'Water level at each position depends on min(leftMax, rightMax) - height.',
        'Use two pointers moving from both ends.',
        'Track the maximum heights seen from left and right.',
      ],
      testCases: [
        'solve([0,1,0,2,1,0,1,3,2,1,2,1]) should return 6',
        'solve([4,2,0,3,2,5]) should return 9',
      ],
      difficulty: 'advanced',
      xpReward: 150
    }
  },
  {
    id: 'container-most-water',
    title: 'Container With Most Water',
    description: 'Find two lines that form a container holding the most water',
    type: 'playground',
    difficulty: 'intermediate',
    duration: 30,
    xpReward: 120,
    completed: false,
    unlocked: true,
    prerequisite: ['trapping-rain-water'],
    level: 3,
    playgroundConfig: {
      id: 'container-most-water',
      title: 'Container With Most Water',
      description: 'Find two lines that together with the x-axis form a container holding the most water',
      starterCode: `function solve(height) {
  // Return maximum area
  // Example: [1,8,6,2,5,4,8,3,7]
  // Output: 49
  
  return 0;
}`,
      solution: `function solve(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;
  
  while (left < right) {
    const width = right - left;
    const area = Math.min(height[left], height[right]) * width;
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}`,
      hints: [
        'Area = min(height[left], height[right]) * (right - left).',
        'Use two pointers at both ends.',
        'Move the pointer with the smaller height inward.',
      ],
      testCases: [
        'solve([1,8,6,2,5,4,8,3,7]) should return 49',
        'solve([1,1]) should return 1',
      ],
      difficulty: 'intermediate',
      xpReward: 120
    }
  },
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

// Expert Level (Level 4) - Advanced Algorithms & Optimization
export const expertLessons: CourseLesson[] = [
  {
    id: 'dynamic-programming-arrays',
    title: 'Dynamic Programming with Arrays',
    description: 'Master DP problems using arrays for memoization and optimization',
    type: 'concept',
    difficulty: 'advanced',
    duration: 30,
    xpReward: 200,
    completed: false,
    unlocked: false,
    prerequisite: ['advanced-revision'],
    level: 4,
    conceptConfig: {
      id: 'dynamic-programming-arrays',
      title: 'Dynamic Programming with Arrays',
      description: 'Learn how to use arrays for dynamic programming solutions',
      steps: [
        {
          id: 'step1',
          title: 'Introduction to DP with Arrays',
          content: `
            <p>Dynamic Programming (DP) uses arrays to store previously computed results, avoiding redundant calculations.</p>
            <p><strong>Key Concepts:</strong></p>
            <ul>
              <li>Memoization: Store results in an array</li>
              <li>Bottom-up approach: Build solutions from smaller subproblems</li>
              <li>Optimal substructure: Larger problems built from optimal smaller solutions</li>
            </ul>
            <p>Common DP array patterns include 1D arrays for sequence problems and 2D arrays for grid-based problems.</p>
          `
        },
        {
          id: 'step2',
          title: 'Classic DP Problems',
          content: `
            <p>Let's explore classic DP problems that use arrays:</p>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #10B981;">🔢 Fibonacci with Memoization:</h4>
              <p>Instead of recalculating F(n-1) and F(n-2) repeatedly, store results in an array.</p>
            </div>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #3B82F6;">💰 Coin Change Problem:</h4>
              <p>Find minimum coins needed for a target amount using DP array.</p>
            </div>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #F59E0B;">🏠 House Robber:</h4>
              <p>Maximum money that can be robbed without robbing adjacent houses.</p>
            </div>
          `,
          quiz: {
            question: 'In DP with arrays, what does memoization help us avoid?',
            options: ['Memory usage', 'Redundant calculations', 'Array bounds errors', 'Infinite loops'],
            correctAnswer: 1,
            explanation: 'Memoization stores previously computed results to avoid recalculating the same subproblems multiple times.'
          }
        }
      ],
      xpReward: 200
    }
  },
  {
    id: 'advanced-sliding-window',
    title: 'Advanced Sliding Window Techniques',
    description: 'Master complex sliding window patterns and optimization problems',
    type: 'concept',
    difficulty: 'advanced',
    duration: 25,
    xpReward: 180,
    completed: false,
    unlocked: false,
    prerequisite: ['dynamic-programming-arrays'],
    level: 4,
    conceptConfig: {
      id: 'advanced-sliding-window',
      title: 'Advanced Sliding Window',
      description: 'Complex sliding window patterns for optimization',
      steps: [
        {
          id: 'step1',
          title: 'Variable-Size Sliding Window',
          content: `
            <p>Unlike fixed-size windows, variable-size windows expand and contract based on conditions.</p>
            <p><strong>Common Patterns:</strong></p>
            <ul>
              <li>Longest substring with at most K distinct characters</li>
              <li>Minimum window substring</li>
              <li>Maximum sum subarray with at most K negatives</li>
            </ul>
            <p>The key is knowing when to expand (add to right) vs contract (move left pointer).</p>
          `
        },
        {
          id: 'step2',
          title: 'Multi-Pointer Techniques',
          content: `
            <p>Advanced problems may require multiple pointers working together:</p>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #10B981;">🎯 Three Sum Problem:</h4>
              <p>Fix one pointer, use two-pointer technique on the rest</p>
            </div>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #3B82F6;">🏃 Fast & Slow Pointers:</h4>
              <p>Detect cycles, find middle elements, check palindromes</p>
            </div>
          `,
          quiz: {
            question: 'In a variable-size sliding window, when do we typically contract the window?',
            options: ['When we find the target', 'When the condition is violated', 'At regular intervals', 'When the window is too large'],
            correctAnswer: 1,
            explanation: 'We contract the window by moving the left pointer when the current window violates our condition (e.g., too many distinct characters).'
          }
        }
      ],
      xpReward: 180
    }
  },
  {
    id: 'optimization-playground',
    title: 'Array Optimization Challenges',
    description: 'Solve complex optimization problems using advanced array techniques',
    type: 'playground',
    difficulty: 'advanced',
    duration: 45,
    xpReward: 300,
    completed: false,
    unlocked: false,
    prerequisite: ['advanced-sliding-window'],
    level: 4,
    playgroundConfig: {
      id: 'optimization-playground',
      title: 'Longest Substring Without Repeating Characters',
      description: 'Find the length of the longest substring without repeating characters',
      starterCode: `function lengthOfLongestSubstring(s) {
  // Use sliding window with hash map
  // Track characters and their positions
  
}`,
      solution: `function lengthOfLongestSubstring(s) {
  if (s.length === 0) return 0;
  
  let left = 0;
  let maxLength = 0;
  const charMap = new Map();
  
  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
      left = charMap.get(s[right]) + 1;
    }
    
    charMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
      hints: [
        'Use a sliding window approach with two pointers',
        'Track character positions in a hash map',
        'When you find a duplicate, move the left pointer',
        'Update the maximum length at each step'
      ],
      testCases: [
        'lengthOfLongestSubstring("abcabcbb") should return 3',
        'lengthOfLongestSubstring("bbbbb") should return 1',
        'lengthOfLongestSubstring("pwwkew") should return 3',
        'lengthOfLongestSubstring("") should return 0'
      ],
      difficulty: 'advanced',
      xpReward: 300
    }
  },
  {
    id: 'expert-revision',
    title: 'Level 4 Assessment',
    description: 'Advanced algorithms and optimization challenges',
    type: 'revision',
    difficulty: 'advanced',
    duration: 50,
    xpReward: 500,
    completed: false,
    unlocked: false,
    prerequisite: ['optimization-playground'],
    level: 4,
    revisionConfig: {
      id: 'expert-revision',
      level: 'advanced',
      passingScore: 85,
      timeLimit: 50,
      xpReward: 500,
      mcqQuestions: [
        {
          id: 'mcq-exp-1',
          question: 'What is the key advantage of using dynamic programming with arrays?',
          options: ['Reduces space complexity', 'Avoids redundant calculations', 'Improves code readability', 'Enables parallel processing'],
          correctAnswer: 1,
          explanation: 'DP with arrays stores intermediate results to avoid recalculating the same subproblems, significantly improving time complexity.',
          points: 20
        },
        {
          id: 'mcq-exp-2',
          question: 'In Kadane\'s algorithm for maximum subarray, what does the variable represent at each position?',
          options: ['Global maximum so far', 'Maximum ending at current position', 'Current element value', 'Minimum possible sum'],
          correctAnswer: 1,
          explanation: 'Kadane\'s algorithm maintains a variable representing the maximum sum of a subarray ending at the current position.',
          points: 20
        },
        {
          id: 'mcq-exp-3',
          question: 'What makes the sliding window technique efficient for substring problems?',
          options: ['It sorts the array first', 'It avoids checking all possible subarrays', 'It uses recursion', 'It requires extra space'],
          correctAnswer: 1,
          explanation: 'Sliding window avoids the O(n³) brute force approach by efficiently expanding and contracting a window, achieving O(n) or O(n²) complexity.',
          points: 20
        },
        {
          id: 'mcq-exp-4',
          question: 'In the longest substring without repeating characters problem, why do we use a hash map?',
          options: ['To sort characters', 'To track character frequencies', 'To store character positions for quick lookups', 'To reverse the string'],
          correctAnswer: 2,
          explanation: 'The hash map stores the most recent position of each character, allowing us to quickly jump the left pointer when we encounter a duplicate.',
          points: 20
        },
        {
          id: 'mcq-exp-5',
          question: 'What is the space complexity of the coin change DP solution?',
          options: ['O(1)', 'O(amount)', 'O(coins)', 'O(amount × coins)'],
          correctAnswer: 1,
          explanation: 'The coin change DP solution uses an array of size (amount + 1) to store the minimum coins needed for each amount.',
          points: 20
        }
      ],
      codingChallenges: [
        {
          id: 'coding-exp-1',
          title: 'Trapping Rain Water',
          description: 'Calculate how much water can be trapped after raining given an elevation map',
          starterCode: `function trap(height) {
  // Your solution here
  // Use two pointers or DP approach
  
}`,
          solution: `function trap(height) {
  if (height.length === 0) return 0;
  
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let waterTrapped = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        waterTrapped += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        waterTrapped += rightMax - height[right];
      }
      right--;
    }
  }
  
  return waterTrapped;
}`,
          testCases: [
            'trap([0,1,0,2,1,0,1,3,2,1,2,1]) should return 6',
            'trap([4,2,0,3,2,5]) should return 9',
            'trap([]) should return 0'
          ],
          points: 80,
          difficulty: 'advanced'
        }
      ]
    }
  }
];

// Master Level (Level 5) - Interview & Competition Problems
export const masterLessons: CourseLesson[] = [
  {
    id: 'interview-patterns',
    title: 'Array Interview Patterns',
    description: 'Master the most common array patterns asked in technical interviews',
    type: 'concept',
    difficulty: 'advanced',
    duration: 35,
    xpReward: 250,
    completed: false,
    unlocked: false,
    prerequisite: ['expert-revision'],
    level: 5,
    conceptConfig: {
      id: 'interview-patterns',
      title: 'Array Interview Patterns',
      description: 'Common patterns and approaches for technical interviews',
      steps: [
        {
          id: 'step1',
          title: 'Pattern Recognition',
          content: `
            <p>Successful interview candidates quickly recognize which pattern to apply:</p>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #10B981;">🎯 Two Pointers Pattern:</h4>
              <ul>
                <li>Sorted array + target sum</li>
                <li>Palindrome checking</li>
                <li>Container with most water</li>
              </ul>
            </div>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #3B82F6;">🪟 Sliding Window Pattern:</h4>
              <ul>
                <li>Subarray/substring problems</li>
                <li>"K" constraint problems</li>
                <li>Variable window size optimization</li>
              </ul>
            </div>
            <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <h4 style="color: #F59E0B;">🧮 Prefix Sum Pattern:</h4>
              <ul>
                <li>Range sum queries</li>
                <li>Subarray sum problems</li>
                <li>2D matrix sum calculations</li>
              </ul>
            </div>
          `
        }
      ],
      xpReward: 250
    }
  },
  {
    id: 'competition-problems',
    title: 'Competitive Programming Challenges',
    description: 'Solve advanced problems similar to those in programming competitions',
    type: 'playground',
    difficulty: 'advanced',
    duration: 60,
    xpReward: 400,
    completed: false,
    unlocked: false,
    prerequisite: ['interview-patterns'],
    level: 5,
    playgroundConfig: {
      id: 'competition-problems',
      title: 'Median of Two Sorted Arrays',
      description: 'Find the median of two sorted arrays in O(log(min(m,n))) time',
      starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Binary search approach for O(log(min(m,n))) complexity
  // Make sure nums1 is the smaller array
  
}`,
      solution: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  
  const m = nums1.length;
  const n = nums2.length;
  let low = 0, high = m;
  
  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;
    
    const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const right1 = cut1 === m ? Infinity : nums1[cut1];
    const right2 = cut2 === n ? Infinity : nums2[cut2];
    
    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 1) {
        return Math.max(left1, left2);
      } else {
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
      }
    } else if (left1 > right2) {
      high = cut1 - 1;
    } else {
      low = cut1 + 1;
    }
  }
  
  return 0;
}`,
      hints: [
        'Use binary search on the smaller array',
        'Find the correct partition point',
        'Ensure left elements ≤ right elements across partition',
        'Handle odd/even total length cases'
      ],
      testCases: [
        'findMedianSortedArrays([1,3], [2]) should return 2.0',
        'findMedianSortedArrays([1,2], [3,4]) should return 2.5',
        'findMedianSortedArrays([0,0], [0,0]) should return 0.0'
      ],
      difficulty: 'advanced',
      xpReward: 400
    }
  },
  {
    id: 'master-assessment',
    title: 'Master Level Final Assessment',
    description: 'Ultimate array mastery test with the most challenging problems',
    type: 'mastery',
    difficulty: 'advanced',
    duration: 90,
    xpReward: 1000,
    completed: false,
    unlocked: false,
    prerequisite: ['competition-problems'],
    level: 5
  }
];

export const allArrayCourseLessons: CourseLesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
  ...expertLessons,
  ...masterLessons
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
