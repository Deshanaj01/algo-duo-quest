export const arrayIntroductionLesson = {
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
      `,
      visualization: {
        title: 'Array Structure',
        description: 'Each element has a value and an index position',
        animationType: 'static' as const,
        initialArray: [42, 17, 89, 3, 56],
        codeExample: `// Creating an array
const numbers = [42, 17, 89, 3, 56];

// Array indices:  0   1   2   3   4
// Array values:  42  17  89   3  56`
      }
    },
    {
      id: 'step2',
      title: 'Accessing Array Elements',
      content: `
        <p>To get a value from an array, we use its index inside square brackets: <code>array[index]</code></p>
        <p>Watch as we access different elements in the array below. Notice how the yellow highlight shows which element we're accessing!</p>
        <p><strong>Key Point:</strong> Array access is super fast - it takes the same amount of time regardless of the array size! This is called O(1) time complexity.</p>
      `,
      visualization: {
        title: 'Accessing Elements',
        description: 'Watch as we access each element by its index',
        animationType: 'access' as const,
        initialArray: [42, 17, 89, 3, 56],
        codeExample: `// Accessing elements by index
console.log(numbers[0]); // Output: 42 (first element)
console.log(numbers[2]); // Output: 89 (third element)
console.log(numbers[4]); // Output: 56 (last element)

// Remember: arrays start at index 0!`
      },
      quiz: {
        question: 'What is the value at index 2 in the array [10, 20, 30, 40, 50]?',
        options: ['10', '20', '30', '40'],
        correctAnswer: 2,
        explanation: 'Since arrays are zero-indexed, index 2 refers to the third element, which is 30.'
      }
    },
    {
      id: 'step3',
      title: 'Why Arrays are Important',
      content: `
        <p>Arrays are fundamental in programming because they:</p>
        <ul>
          <li><strong>Fast Access:</strong> Get any element instantly with its index</li>
          <li><strong>Foundation:</strong> Building blocks for complex data structures</li>
          <li><strong>Organization:</strong> Store related data together</li>
          <li><strong>Iteration:</strong> Easy to process all elements</li>
        </ul>
        <p>Arrays are used everywhere: from storing user profiles to managing game scores, from image pixels to shopping cart items!</p>
      `,
      visualization: {
        title: 'Real-World Examples',
        description: 'Arrays represent collections in everyday programming',
        animationType: 'static' as const,
        initialArray: ['cart', 'phone', 'game', 'book', 'music'],
        codeExample: `// Real-world array examples
const shoppingCart = ['apple', 'bread', 'milk'];
const gameScores = [1500, 2300, 1800, 2100];
const usernames = ['alice', 'bob', 'charlie'];
const temperatures = [72, 75, 68, 70, 73];`
      }
    }
  ]
};

export const arrayOperationsLesson = {
  id: 'array-operations',
  title: 'Array Operations',
  description: 'Learn how to add, remove, and modify array elements',
  steps: [
    {
      id: 'step1',
      title: 'Adding Elements',
      content: `
        <p>There are several ways to add elements to an array:</p>
        <ul>
          <li><strong>push():</strong> Adds to the end (fast!)</li>
          <li><strong>unshift():</strong> Adds to the beginning (slower)</li>
          <li><strong>splice():</strong> Adds at any position</li>
        </ul>
        <p>Watch the animation to see how insertion at different positions affects the array!</p>
      `,
      visualization: {
        title: 'Array Insertion',
        description: 'Adding element 99 at position 2 - watch how elements shift!',
        animationType: 'insert' as const,
        initialArray: [1, 2, 3, 4, 5],
        codeExample: `// Adding elements
const arr = [1, 2, 3, 4, 5];

arr.push(6);           // [1, 2, 3, 4, 5, 6] - O(1)
arr.unshift(0);        // [0, 1, 2, 3, 4, 5, 6] - O(n)
arr.splice(2, 0, 99);  // [0, 1, 99, 2, 3, 4, 5, 6] - O(n)`
      },
      quiz: {
        question: 'Which array operation is fastest for adding elements?',
        options: ['unshift() - add to beginning', 'push() - add to end', 'splice() - add anywhere', 'They are all the same speed'],
        correctAnswer: 1,
        explanation: 'push() is fastest because it adds to the end without shifting existing elements. It runs in O(1) time, while unshift() and splice() require shifting elements, taking O(n) time.'
      }
    },
    {
      id: 'step2',
      title: 'Removing Elements',
      content: `
        <p>Just like adding, there are different ways to remove elements:</p>
        <ul>
          <li><strong>pop():</strong> Removes from the end (fast!)</li>
          <li><strong>shift():</strong> Removes from the beginning (slower)</li>
          <li><strong>splice():</strong> Removes from any position</li>
        </ul>
        <p>Notice how removing from the middle requires shifting all the elements to the right!</p>
      `,
      visualization: {
        title: 'Array Deletion',
        description: 'Removing element at position 2 - watch the remaining elements shift left!',
        animationType: 'delete' as const,
        initialArray: [1, 2, 3, 4, 5],
        codeExample: `// Removing elements
const arr = [1, 2, 3, 4, 5];

arr.pop();           // [1, 2, 3, 4] - O(1)
arr.shift();         // [2, 3, 4] - O(n)
arr.splice(1, 1);    // [2, 4] - O(n)

// Returns the removed element(s)`
      }
    },
    {
      id: 'step3',
      title: 'Time Complexity Summary',
      content: `
        <p>Understanding performance is crucial for writing efficient code:</p>
        <table style="color: white; border-collapse: collapse; width: 100%;">
          <tr style="background-color: #374151;">
            <th style="padding: 12px; border: 1px solid #6B7280;">Operation</th>
            <th style="padding: 12px; border: 1px solid #6B7280;">Time Complexity</th>
            <th style="padding: 12px; border: 1px solid #6B7280;">Why?</th>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #6B7280;">Access by index</td>
            <td style="padding: 12px; border: 1px solid #6B7280; color: #10B981;">O(1)</td>
            <td style="padding: 12px; border: 1px solid #6B7280;">Direct memory calculation</td>
          </tr>
          <tr style="background-color: #374151;">
            <td style="padding: 12px; border: 1px solid #6B7280;">Push/Pop (end)</td>
            <td style="padding: 12px; border: 1px solid #6B7280; color: #10B981;">O(1)</td>
            <td style="padding: 12px; border: 1px solid #6B7280;">No shifting needed</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #6B7280;">Unshift/Shift (beginning)</td>
            <td style="padding: 12px; border: 1px solid #6B7280; color: #F59E0B;">O(n)</td>
            <td style="padding: 12px; border: 1px solid #6B7280;">Must shift all elements</td>
          </tr>
          <tr style="background-color: #374151;">
            <td style="padding: 12px; border: 1px solid #6B7280;">Insert/Delete (middle)</td>
            <td style="padding: 12px; border: 1px solid #6B7280; color: #F59E0B;">O(n)</td>
            <td style="padding: 12px; border: 1px solid #6B7280;">Must shift remaining elements</td>
          </tr>
        </table>
        <p style="margin-top: 16px;"><strong>Pro Tip:</strong> When possible, prefer operations at the end of arrays for better performance!</p>
      `
    }
  ]
};

export const arraySearchLesson = {
  id: 'array-search',
  title: 'Searching in Arrays',
  description: 'Learn different techniques to find elements in arrays',
  steps: [
    {
      id: 'step1',
      title: 'Linear Search',
      content: `
        <p>Linear search is the most basic search algorithm. We check each element one by one until we find what we're looking for.</p>
        <p>It's like looking for a specific book on a shelf by checking each book from left to right until you find it!</p>
        <p>Watch the animation below to see how linear search works - notice how we examine each element sequentially.</p>
      `,
      visualization: {
        title: 'Linear Search in Action',
        description: 'Searching through the array element by element',
        animationType: 'search' as const,
        initialArray: [64, 34, 25, 12, 22, 11, 90],
        codeExample: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found! Return the index
    }
  }
  return -1; // Not found
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(linearSearch(numbers, 22)); // Output: 4`
      },
      quiz: {
        question: 'What is the worst-case time complexity of linear search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'In the worst case, linear search might need to check every element in the array, giving us O(n) time complexity where n is the number of elements.'
      }
    },
    {
      id: 'step2',
      title: 'Built-in Search Methods',
      content: `
        <p>JavaScript provides several built-in methods that make searching easier:</p>
        <ul>
          <li><strong>indexOf():</strong> Finds the first occurrence of an element</li>
          <li><strong>includes():</strong> Checks if an element exists (returns true/false)</li>
          <li><strong>find():</strong> Finds the first element matching a condition</li>
          <li><strong>findIndex():</strong> Gets the index of the first matching element</li>
        </ul>
        <p>These methods use linear search internally but provide a cleaner API.</p>
      `,
      visualization: {
        title: 'Built-in Search Methods',
        description: 'JavaScript provides convenient methods for common search tasks',
        animationType: 'static' as const,
        initialArray: ['apple', 'banana', 'orange', 'grape', 'kiwi'],
        codeExample: `const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];

// indexOf - returns index or -1
fruits.indexOf('orange');     // 2
fruits.indexOf('strawberry'); // -1 (not found)

// includes - returns boolean
fruits.includes('banana');    // true
fruits.includes('strawberry'); // false

// find - returns element or undefined
const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
users.find(user => user.id === 2);  // {id: 2, name: 'Bob'}

// findIndex - returns index or -1
users.findIndex(user => user.name === 'Alice');  // 0`
      }
    },
    {
      id: 'step3',
      title: 'Binary Search (Bonus)',
      content: `
        <p>Binary search is a much faster algorithm, but it only works on <strong>sorted arrays</strong>.</p>
        <p>It works like the "guess my number" game:</p>
        <ol>
          <li>Start in the middle</li>
          <li>Is it the target? If yes, we're done!</li>
          <li>Is it too high? Search the left half</li>
          <li>Is it too low? Search the right half</li>
          <li>Repeat until found or no more elements</li>
        </ol>
        <p><strong>Amazing fact:</strong> Binary search can find any element in a million-item array in just 20 steps!</p>
      `,
      visualization: {
        title: 'Binary Search Concept',
        description: 'Binary search eliminates half of the remaining elements with each step',
        animationType: 'static' as const,
        initialArray: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        codeExample: `function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (sortedArr[mid] === target) {
      return mid; // Found it!
    }
    
    if (sortedArr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}

// Time Complexity: O(log n) - much faster than O(n)!`
      },
      quiz: {
        question: 'What is required for binary search to work correctly?',
        options: ['The array must be sorted', 'The array must have even number of elements', 'The array must contain only numbers', 'The array must be small'],
        correctAnswer: 0,
        explanation: 'Binary search requires the array to be sorted because it relies on eliminating half of the remaining elements by comparing with the middle element.'
      }
    }
  ]
};

export const arrayTraversalLesson = {
  id: 'array-traversal',
  title: 'Array Traversal Techniques',
  description: 'Different ways to loop through array elements',
  steps: [
    {
      id: 'step1',
      title: 'The Classic For Loop',
      content: `
        <p>The traditional for loop is the most flexible way to traverse an array:</p>
        <ul>
          <li><strong>Full control:</strong> Access to index and element</li>
          <li><strong>Conditional breaking:</strong> Stop early if needed</li>
          <li><strong>Skip elements:</strong> Jump to specific positions</li>
          <li><strong>Reverse iteration:</strong> Go backwards through the array</li>
        </ul>
        <p>Use the classic for loop when you need maximum control over the iteration process.</p>
      `,
      visualization: {
        title: 'For Loop Traversal',
        description: 'The classic for loop gives you complete control over iteration',
        animationType: 'access' as const,
        initialArray: [10, 20, 30, 40, 50],
        codeExample: `const numbers = [10, 20, 30, 40, 50];

// Standard forward iteration
for (let i = 0; i < numbers.length; i++) {
  console.log(\`Index \${i}: \${numbers[i]}\`);
}

// Backward iteration
for (let i = numbers.length - 1; i >= 0; i--) {
  console.log(numbers[i]);
}

// Skip even indices
for (let i = 1; i < numbers.length; i += 2) {
  console.log(numbers[i]); // 20, 40
}`
      }
    },
    {
      id: 'step2',
      title: 'Modern Iteration Methods',
      content: `
        <p>JavaScript provides elegant functional methods for common iteration patterns:</p>
        <ul>
          <li><strong>for...of:</strong> Simple iteration over values</li>
          <li><strong>forEach():</strong> Functional approach with callbacks</li>
          <li><strong>map():</strong> Transform each element into a new array</li>
          <li><strong>filter():</strong> Create a new array with elements that pass a test</li>
          <li><strong>reduce():</strong> Reduce array to a single value</li>
        </ul>
        <p>These methods make your code more readable and less error-prone!</p>
      `,
      visualization: {
        title: 'Modern Iteration',
        description: 'Functional methods provide clean, readable code',
        animationType: 'static' as const,
        initialArray: [2, 4, 6, 8, 10],
        codeExample: `const numbers = [2, 4, 6, 8, 10];

// for...of: simplest for values only
for (const num of numbers) {
  console.log(num);
}

// forEach: functional style
numbers.forEach((num, index) => {
  console.log(\`\${index}: \${num}\`);
});

// map: transform each element
const doubled = numbers.map(num => num * 2);
// [4, 8, 12, 16, 20]

// filter: elements that pass a test
const large = numbers.filter(num => num > 5);
// [6, 8, 10]

// reduce: combine into single value
const sum = numbers.reduce((total, num) => total + num, 0);
// 30`
      },
      quiz: {
        question: 'Which method would you use to create a new array with only elements greater than 5?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswer: 2,
        explanation: 'filter() creates a new array containing only the elements that pass the test function. In this case, it would return elements greater than 5.'
      }
    },
    {
      id: 'step3',
      title: 'Choosing the Right Method',
      content: `
        <p>Here's when to use each traversal method:</p>
        <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="color: #10B981; margin-bottom: 12px;">🔧 Use for loop when:</h4>
          <ul>
            <li>You need the index for calculations</li>
            <li>You might break early or skip elements</li>
            <li>You're modifying the array while iterating</li>
            <li>Performance is critical (slightly faster)</li>
          </ul>
        </div>
        <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="color: #3B82F6; margin-bottom: 12px;">✨ Use functional methods when:</h4>
          <ul>
            <li><strong>for...of:</strong> Simple iteration, just need values</li>
            <li><strong>forEach:</strong> Side effects (logging, updating DOM)</li>
            <li><strong>map:</strong> Transform all elements</li>
            <li><strong>filter:</strong> Select elements that match criteria</li>
            <li><strong>reduce:</strong> Calculate a summary value</li>
          </ul>
        </div>
        <p><strong>Pro Tip:</strong> Functional methods are often more readable and less error-prone, while for loops offer maximum flexibility!</p>
      `,
      quiz: {
        question: 'You need to find the sum of all even numbers in an array. Which combination is most appropriate?',
        options: [
          'for loop with if statement',
          'forEach() with if statement', 
          'filter() then reduce()',
          'map() then reduce()'
        ],
        correctAnswer: 2,
        explanation: 'filter() to get only even numbers, then reduce() to sum them up. This is more readable and follows functional programming principles: arr.filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0)'
      }
    }
  ]
};

export const array2DLesson = {
  id: 'array-2d',
  title: 'Two-Dimensional Arrays',
  description: 'Working with matrices and grid-like data structures',
  steps: [
    {
      id: 'step1',
      title: 'What are 2D Arrays?',
      content: `
        <p>A 2D array is an array of arrays - think of it as a grid or table!</p>
        <p>Common examples include:</p>
        <ul>
          <li><strong>Game boards:</strong> Chess, tic-tac-toe, minesweeper</li>
          <li><strong>Images:</strong> Each pixel represented as an element</li>
          <li><strong>Spreadsheets:</strong> Rows and columns of data</li>
          <li><strong>Maps:</strong> Geographic grids, elevation data</li>
        </ul>
        <p>You access elements using two indices: <code>matrix[row][column]</code></p>
      `,
      visualization: {
        title: '2D Array Structure',
        description: 'A 3x3 matrix - like a tic-tac-toe board!',
        animationType: 'static' as const,
        initialArray: ['1,2,3', '4,5,6', '7,8,9'],
        codeExample: `// Creating a 2D array (3x3 matrix)
const matrix = [
  [1, 2, 3],    // Row 0
  [4, 5, 6],    // Row 1  
  [7, 8, 9]     // Row 2
];

// Accessing elements: matrix[row][column]
console.log(matrix[0][0]); // 1 (top-left)
console.log(matrix[1][2]); // 6 (middle-right)
console.log(matrix[2][1]); // 8 (bottom-center)

// Think: matrix[row][column] like matrix[y][x]`
      },
      quiz: {
        question: 'In a 2D array called "grid", how would you access the element in the 2nd row, 3rd column?',
        options: ['grid[2][3]', 'grid[1][2]', 'grid[3][2]', 'grid[2,3]'],
        correctAnswer: 1,
        explanation: 'Since arrays are zero-indexed, the 2nd row is at index 1 and the 3rd column is at index 2. So the answer is grid[1][2].'
      }
    },
    {
      id: 'step2',
      title: 'Traversing 2D Arrays',
      content: `
        <p>To visit every element in a 2D array, we use <strong>nested loops</strong>:</p>
        <ul>
          <li>🔄 <strong>Outer loop:</strong> Iterates through rows</li>
          <li>🔄 <strong>Inner loop:</strong> Iterates through columns in each row</li>
        </ul>
        <p>This pattern is fundamental and you'll use it constantly when working with grids, images, and matrices!</p>
        <p>Common patterns include:</p>
        <ul>
          <li>Row-by-row processing (like reading a book)</li>
          <li>Column-by-column processing</li>
          <li>Diagonal traversal</li>
          <li>Searching for specific patterns</li>
        </ul>
      `,
      visualization: {
        title: 'Nested Loop Traversal',
        description: 'Visiting each element row by row, like reading a book',
        animationType: 'access' as const,
        initialArray: ['A1', 'A2', 'A3', 'B1', 'B2'],
        codeExample: `const matrix = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
  ['C1', 'C2', 'C3']
];

// Traverse all elements (row by row)
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(\`[\${row}][\${col}]: \${matrix[row][col]}\`);
  }
}

// Using for...of (cleaner syntax)
for (const row of matrix) {
  for (const element of row) {
    console.log(element);
  }
}`
      }
    },
    {
      id: 'step3',
      title: 'Common 2D Array Operations',
      content: `
        <p>Here are essential operations you'll frequently perform on 2D arrays:</p>
        <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="color: #10B981;">🧮 Sum Operations:</h4>
          <ul>
            <li>Sum of each row</li>
            <li>Sum of each column</li>
            <li>Sum of diagonals</li>
          </ul>
        </div>
        <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="color: #3B82F6;">🔄 Matrix Transformations:</h4>
          <ul>
            <li>Transpose (flip rows and columns)</li>
            <li>Rotate 90 degrees</li>
            <li>Mirror horizontally/vertically</li>
          </ul>
        </div>
        <div style="background-color: #1F2937; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4 style="color: #F59E0B;">🔍 Search Operations:</h4>
          <ul>
            <li>Find specific values</li>
            <li>Count occurrences</li>
            <li>Find patterns</li>
          </ul>
        </div>
      `,
      visualization: {
        title: 'Matrix Operations',
        description: 'Common operations on 2D arrays',
        animationType: 'static' as const,
        initialArray: ['1,2,3', '4,5,6', '7,8,9'],
        codeExample: `const matrix = [
  [1, 2, 3],
  [4, 5, 6], 
  [7, 8, 9]
];

// Sum of each row
const rowSums = matrix.map(row => 
  row.reduce((sum, num) => sum + num, 0)
);
console.log(rowSums); // [6, 15, 24]

// Transpose matrix (flip rows ↔ columns)
const transposed = matrix[0].map((_, colIndex) =>
  matrix.map(row => row[colIndex])
);
// Result: [[1,4,7], [2,5,8], [3,6,9]]

// Find all elements > 5
let found = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] > 5) {
      found.push({value: matrix[i][j], row: i, col: j});
    }
  }
}`
      },
      quiz: {
        question: 'What does transposing a matrix do?',
        options: [
          'Reverses the order of elements',
          'Converts rows to columns and columns to rows', 
          'Sorts all elements',
          'Removes duplicate elements'
        ],
        correctAnswer: 1,
        explanation: 'Transposing a matrix swaps its rows and columns. Element at position [i][j] moves to position [j][i]. It\'s like flipping the matrix over its main diagonal.'
      }
    }
  ]
};

export const allArrayLessons = {
  'arrays-introduction': arrayIntroductionLesson,
  'array-operations': arrayOperationsLesson,
  'array-search': arraySearchLesson,
  'array-traversal': arrayTraversalLesson,
  'array-2d': array2DLesson
};
