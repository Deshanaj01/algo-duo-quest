import { Topic, Lesson, Quiz, Challenge, UserProfile } from "../types";

// Topics data with clear progression path
export const topics: Topic[] = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Learn about arrays, the most basic data structure.",
    iconName: "layers",
    color: "bg-algo-purple-500",
    totalLessons: 7, // Updated to include new lessons
    completedLessons: 2,
    unlocked: true,
    unit: 1,
    section: 1,
    prerequisiteTopics: [],
  },
  {
    id: "strings",
    title: "Strings",
    description: "Master string manipulation and common operations.",
    iconName: "text",
    color: "bg-emerald-500",
    totalLessons: 4,
    completedLessons: 0,
    unlocked: false,
    unit: 1,
    section: 2,
    prerequisiteTopics: ["arrays"],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Master the fundamentals of singly and doubly linked lists.",
    iconName: "list",
    color: "bg-algo-blue-500",
    totalLessons: 4,
    completedLessons: 0,
    unlocked: false,
    unit: 1, 
    section: 3,
    prerequisiteTopics: ["arrays", "strings"],
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "Understand the LIFO data structure and its applications.",
    iconName: "layers-3",
    color: "bg-algo-green-500",
    totalLessons: 3,
    completedLessons: 0,
    unlocked: false,
    unit: 1,
    section: 4,
    prerequisiteTopics: ["linked-lists"],
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
    prerequisiteTopics: ["linked-lists"],
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
    prerequisiteTopics: ["arrays", "stacks"],
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
    prerequisiteTopics: ["arrays", "recursion"],
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
    prerequisiteTopics: ["arrays", "sorting"],
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
    prerequisiteTopics: ["recursion", "searching"],
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Learn about graph representations and algorithms.",
    iconName: "network",
    color: "bg-indigo-500",
    totalLessons: 5,
    completedLessons: 0,
    unlocked: false,
    unit: 3,
    section: 3,
    prerequisiteTopics: ["trees"],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Master optimization techniques for complex problems.",
    iconName: "star",
    color: "bg-red-500",
    totalLessons: 5,
    completedLessons: 0,
    unlocked: false,
    unit: 4,
    section: 1,
    prerequisiteTopics: ["recursion", "arrays"],
  }
];

// Enhanced Lessons data for Arrays topic
export const lessons: Lesson[] = [
  {
    id: "arrays-intro",
    topicId: "arrays",
    title: "Introduction to Arrays",
    description: "Learn what arrays are and how they work",
    content: `
      # Introduction to Arrays
      
      An array is a collection of elements stored at contiguous memory locations. It is the simplest data structure where each element can be accessed using an index.
      
      ## What is an Array?
      
      Think of an array as a row of boxes, each containing a value. These boxes are numbered starting from 0, and we can access any box by referring to its number (or index).
      
      ![Array visualization](https://i.imgur.com/4nOChwD.png)
      
      ## Key characteristics:
      
      - **Fixed size** in many languages (JavaScript arrays can grow dynamically)
      - **Elements are of the same type** (though JavaScript allows mixed types)
      - **Zero-indexed** - the first element is at position 0
      - **Contiguous memory** allocation - elements are stored next to each other in memory
      
      ## Why Arrays Are Important
      
      Arrays are fundamental because they:
      - Allow efficient access to elements (O(1) time)
      - Serve as the foundation for more complex data structures
      - Represent collections of items in a simple way
      - Are used extensively in almost all types of programming
      
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
      
      ## Array Memory Representation
      
      In memory, an array of integers might look like this:
      
      \`\`\`
      Index:  0    1    2    3    4
      Value:  1   10    3    4    5
      Memory: 1000 1004 1008 1012 1016
      \`\`\`
      
      Each integer takes 4 bytes of memory, so the addresses are 4 bytes apart.
      This arrangement allows the computer to quickly calculate the exact memory address of any element.
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
      
      ## Why is Shift/Unshift O(n)?
      
      When you add or remove elements at the beginning of an array, all existing elements need to be shifted one position:
      
      ![Shift operation](https://i.imgur.com/IqTDVvV.png)
      
      The more elements in the array, the more shifting needs to happen, making it a linear operation.
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
      
      Traversal means visiting each element of an array. There are multiple ways to traverse an array in modern programming. Let's explore them.
      
      ## For Loop
      
      The classic approach. Best when you need the index or need to skip elements.
      
      \`\`\`javascript
      const arr = [1, 2, 3, 4, 5];
      
      // Standard for loop
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
      }
      \`\`\`
      
      ## For...of Loop
      
      A more modern and cleaner approach. Best when you only need the elements.
      
      \`\`\`javascript
      for (const element of arr) {
        console.log(element);
      }
      \`\`\`
      
      ## forEach Method
      
      Functional approach with a callback. Provides element, index, and array.
      
      \`\`\`javascript
      arr.forEach((element, index, array) => {
        console.log(element, index);
      });
      \`\`\`
      
      ## Map, Filter, Reduce
      
      Advanced functional operations that create new arrays.
      
      \`\`\`javascript
      // Transform all elements
      const doubled = arr.map(x => x * 2);  // [2, 4, 6, 8, 10]
      
      // Filter elements
      const evens = arr.filter(x => x % 2 === 0);  // [2, 4]
      
      // Reduce to a single value
      const sum = arr.reduce((total, current) => total + current, 0);  // 15
      \`\`\`
      
      ## When to Use Each Technique
      
      1. **Standard for loop**: Use when you need precise control over iteration (skipping, breaking, etc.)
      2. **For...of**: Use for cleaner code when you only need the elements
      3. **forEach**: Use when you need element, index, and array within the callback
      4. **map/filter/reduce**: Use when you need to transform data or create new arrays
      
      ## Array Traversal Performance
      
      For small to medium arrays, all methods have similar performance. For very large arrays or performance-critical code, standard for loops are typically fastest as they have the least overhead.
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
    content: `
      # Searching in Arrays
      
      Finding elements in arrays is one of the most common operations. Let's explore different search techniques.
      
      ## Linear Search
      
      The simplest search algorithm - check each element one by one.
      
      \`\`\`javascript
      function linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) {
            return i; // Return the index if found
          }
        }
        return -1; // Return -1 if not found
      }
      
      const numbers = [4, 2, 7, 1, 9, 5];
      console.log(linearSearch(numbers, 7)); // Output: 2
      console.log(linearSearch(numbers, 8)); // Output: -1
      \`\`\`
      
      **Time Complexity**: O(n) - in the worst case, you might have to check every element
      
      ## Built-in Methods
      
      JavaScript provides several built-in methods for searching:
      
      ### indexOf / lastIndexOf
      
      \`\`\`javascript
      const fruits = ['apple', 'banana', 'orange', 'banana'];
      
      console.log(fruits.indexOf('banana'));     // 1 (first occurrence)
      console.log(fruits.lastIndexOf('banana')); // 3 (last occurrence)
      console.log(fruits.indexOf('grape'));      // -1 (not found)
      \`\`\`
      
      ### includes
      
      Checks if an element exists in the array:
      
      \`\`\`javascript
      console.log(fruits.includes('orange')); // true
      console.log(fruits.includes('grape'));  // false
      \`\`\`
      
      ### find / findIndex
      
      Search for elements that match a condition:
      
      \`\`\`javascript
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ];
      
      // Find the first element that matches the condition
      const user = users.find((user: { id: number; name: string }) => String(user.id) === "2");
      console.log(user); // { id: 2, name: 'Bob' }
      
      // Find the index of the first element that matches
      const index = users.findIndex(user => String(user.name) === 'Charlie');
      console.log(index); // 2
      \`\`\`
      
      ## Binary Search (for sorted arrays)
      
      If your array is sorted, binary search is much faster than linear search:
      
      \`\`\`javascript
      function binarySearch(sortedArr, target) {
        let left = 0;
        let right = sortedArr.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          
          if (sortedArr[mid] === target) {
            return mid; // Found the target
          }
          
          if (sortedArr[mid] < target) {
            left = mid + 1; // Search in the right half
          } else {
            right = mid - 1; // Search in the left half
          }
        }
        
        return -1; // Target not found
      }
      
      const sortedNumbers = [1, 2, 4, 5, 7, 9];
      console.log(binarySearch(sortedNumbers, 5)); // Output: 3
      console.log(binarySearch(sortedNumbers, 6)); // Output: -1
      \`\`\`
      
      **Time Complexity**: O(log n) - much faster than linear search for large arrays
      
      ## Key Takeaways
      
      1. Use linear search or built-in methods for unsorted arrays
      2. Use binary search for sorted arrays when performance matters
      3. Choose the right search method based on your data and requirements
    `,
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
    content: `
      # Two-Dimensional Arrays
      
      A 2D array is essentially an array of arrays - perfect for representing tables, grids, matrices, and other two-dimensional data.
      
      ## Creating 2D Arrays
      
      \`\`\`javascript
      // Creating a 3x3 matrix
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      
      // Creating a 2D array with a nested loop
      const grid = [];
      for (let i = 0; i < 3; i++) {
        grid[i] = [];
        for (let j = 0; j < 3; j++) {
          grid[i][j] = i * 3 + j + 1;
        }
      }
      // grid is now identical to matrix
      \`\`\`
      
      ## Accessing Elements
      
      To access an element, we need two indices: row and column.
      
      \`\`\`javascript
      const element = matrix[1][2];
      console.log(element); // Output: 6 (row 1, column 2)
      
      // Updating an element
      matrix[0][1] = 10;
      console.log(matrix);
      // Output: [[1, 10, 3], [4, 5, 6], [7, 8, 9]]
      \`\`\`
      
      ## Traversing 2D Arrays
      
      The most common way is using nested loops:
      
      \`\`\`javascript
      // Traverse all elements
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          console.log(matrix[i][j]);
        }
      }
      
      // Using for...of loops (cleaner)
      for (const row of matrix) {
        for (const element of row) {
          console.log(element);
        }
      }
      \`\`\`
      
      ## Common 2D Array Operations
      
      ### Finding Row and Column Sums
      
      \`\`\`javascript
      // Sum of each row
      const rowSums = matrix.map(row => row.reduce((sum, num) => sum + num, 0));
      console.log(rowSums); // [14, 15, 24]
      
      // Sum of each column
      const columnSums = [];
      for (let j = 0; j < matrix[0].length; j++) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
          sum += matrix[i][j];
        }
        columnSums.push(sum);
      }
      console.log(columnSums); // [12, 15, 18]
      \`\`\`
      
      ### Matrix Transposition (Rows → Columns)
      
      \`\`\`javascript
      function transpose(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const result = [];
        
        for (let j = 0; j < cols; j++) {
          result[j] = [];
          for (let i = 0; i < rows; i++) {
            result[j][i] = matrix[i][j];
          }
        }
        
        return result;
      }
      
      const transposed = transpose(matrix);
      console.log(transposed);
      // Output: [[1, 4, 7], [10, 5, 8], [3, 6, 9]]
      \`\`\`
      
      ## Real-World Applications
      
      2D arrays are used in many applications:
      
      1. **Game boards**: Chess, tic-tac-toe, minesweeper
      2. **Image processing**: Each pixel represented as an element
      3. **Spreadsheets**: Excel-like data
      4. **Geographic data**: Elevation maps, heat maps
      5. **Scientific computing**: Matrix operations
      
      ## Memory Representation
      
      In memory, a 2D array is stored as a contiguous block with rows placed one after another. For a 3x3 matrix, the memory layout might look like:
      
      ```
      [1, 10, 3, 4, 5, 6, 7, 8, 9]
      ```
      
      The computer uses a formula to find the right element: \`address = baseAddress + (row * numCols + col) * elementSize\`
    `,
    difficulty: "intermediate",
    points: 25,
    timeEstimate: 15,
    completed: false,
    unlocked: false,
  },
  {
    id: "array-problems-easy",
    topicId: "arrays",
    title: "Array Practice: Easy Problems",
    description: "Solve common array problems with step-by-step solutions",
    content: `
      # Array Practice: Easy Problems
      
      Let's apply what we've learned by solving some common array problems. Each problem includes a step-by-step explanation.
      
      ## Problem 1: Find the Maximum Element
      
      **Problem**: Write a function to find the maximum element in an array.
      
      **Solution**:
      
      \`\`\`javascript
      function findMax(arr) {
        // Edge case: empty array
        if (arr.length === 0) return null;
        
        let max = arr[0]; // Assume first element is the maximum
        
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
            max = arr[i]; // Update max if we find a larger element
          }
        }
        
        return max;
      }
      
      // Test cases
      console.log(findMax([3, 7, 2, 9, 1])); // Output: 9
      console.log(findMax([-5, -2, -10, -1])); // Output: -1
      console.log(findMax([42])); // Output: 42
      \`\`\`
      
      **Explanation**:
      
      1. We start by assuming the first element is the maximum
      2. We then loop through the rest of the array, comparing each element with our current maximum
      3. If we find a larger element, we update our maximum
      4. By the end, we've found the largest element in the array
      
      **Time Complexity**: O(n) - we need to check every element once
      
      ## Problem 2: Reverse an Array
      
      **Problem**: Write a function to reverse an array without using built-in methods.
      
      **Solution**:
      
      \`\`\`javascript
      function reverseArray(arr) {
        const result = [];
        
        for (let i = arr.length - 1; i >= 0; i--) {
          result.push(arr[i]);
        }
        
        return result;
      }
      
      // Alternative in-place solution
      function reverseArrayInPlace(arr) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left < right) {
          // Swap elements
          const temp = arr[left];
          arr[left] = arr[right];
          arr[right] = temp;
          
          // Move indices inward
          left++;
          right--;
        }
        
        return arr;
      }
      
      // Test cases
      console.log(reverseArray([1, 2, 3, 4, 5])); // Output: [5, 4, 3, 2, 1]
      console.log(reverseArrayInPlace([1, 2, 3, 4, 5])); // Output: [5, 4, 3, 2, 1]
      \`\`\`
      
      **Explanation**:
      
      1. In the first solution, we create a new array and fill it by iterating backward through the original array
      2. In the in-place solution, we use two pointers (left and right) at the ends of the array
      3. We swap elements at these positions and then move the pointers inward
      4. The process continues until the pointers meet in the middle
      
      **Time Complexity**: O(n) for both solutions
      
      ## Problem 3: Remove Duplicates
      
      **Problem**: Write a function to remove duplicates from an array.
      
      **Solution**:
      
      \`\`\`javascript
      function removeDuplicates(arr) {
        const uniqueArray = [];
        
        for (const item of arr) {
          if (!uniqueArray.includes(item)) {
            uniqueArray.push(item);
          }
        }
        
        return uniqueArray;
      }
      
      // More efficient solution using a Set
      function removeDuplicatesSet(arr) {
        return [...new Set(arr)];
      }
      
      // Test cases
      console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
      console.log(removeDuplicatesSet([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
      \`\`\`
      
      **Explanation**:
      
      1. In the first solution, we iterate through the array and only add elements to a new array if they're not already present
      2. The includes() method checks if an element already exists in the array
      3. In the more efficient solution, we use a Set object which automatically eliminates duplicates
      4. We then convert the Set back to an array using the spread operator
      
      **Time Complexity**: 
      - First solution: O(n²) due to the includes() method being O(n)
      - Set solution: O(n) - much more efficient for large arrays
      
      ## Problem 4: Find Missing Number
      
      **Problem**: Given an array containing n distinct numbers taken from 0 to n, find the missing number.
      
      **Solution**:
      
      \`\`\`javascript
      function findMissingNumber(nums) {
        const n = nums.length;
        
        // Expected sum of numbers from 0 to n
        const expectedSum = (n * (n + 1)) / 2;
        
        // Actual sum of numbers in the array
        const actualSum = nums.reduce((sum, num) => sum + num, 0);
        
        // The missing number is the difference
        return expectedSum - actualSum;
      }
      
      // Test cases
      console.log(findMissingNumber([3, 0, 1])); // Output: 2
      console.log(findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // Output: 8
      \`\`\`
      
      **Explanation**:
      
      1. We know that the array should contain numbers from 0 to n, with one number missing
      2. The sum of numbers from 0 to n can be calculated using the formula n*(n+1)/2
      3. We calculate the actual sum of the array using the reduce method
      4. The difference between the expected sum and the actual sum is the missing number
      
      **Time Complexity**: O(n) - we only need to iterate through the array once to calculate the sum
    `,
    difficulty: "beginner",
    points: 25,
    timeEstimate: 20,
    completed: false,
    unlocked: true,
  },
  {
    id: "array-problems-intermediate",
    topicId: "arrays",
    title: "Array Practice: Intermediate Problems",
    description: "More challenging array problems for practice",
    content: `
      # Array Practice: Intermediate Problems
      
      Let's tackle some more challenging array problems that apply the concepts we've learned so far.
      
      ## Problem 1: Two Sum
      
      **Problem**: Given an array of integers and a target sum, return the indices of two numbers that add up to the target.
      
      **Solution**:
      
      \`\`\`javascript
      function twoSum(nums, target) {
        const numMap = {}; // Value -> Index mapping
        
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          
          // If we've seen the complement before, we found our pair
          if (complement in numMap) {
            return [numMap[complement], i];
          }
          
          // Otherwise, record this number and its index
          numMap[nums[i]] = i;
        }
        
        return null; // No solution found
      }
      
      // Test cases
      console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
      console.log(twoSum([3, 2, 4], 6)); // Output: [1, 2]
      \`\`\`
      
      **Explanation**:
      
      1. We use a hash map to store each number we've seen along with its index
      2. For each number, we calculate its complement (target - current number)
      3. If the complement exists in our map, we've found our pair
      4. If not, we add the current number to our map and continue
      
      **Time Complexity**: O(n) - we only need to go through the array once
      
      ## Problem 2: Maximum Subarray Sum
      
      **Problem**: Find the contiguous subarray with the largest sum.
      
      **Solution** (Kadane's Algorithm):
      
      \`\`\`javascript
      function maxSubarraySum(nums) {
        if (nums.length === 0) return 0;
        
        let currentMax = nums[0];
        let globalMax = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
          // Either take the current element alone or add it to the previous sum
          currentMax = Math.max(nums[i], currentMax + nums[i]);
          
          // Update the global maximum if needed
          globalMax = Math.max(globalMax, currentMax);
        }
        
        return globalMax;
      }
      
      // Test cases
      console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 (from [4, -1, 2, 1])
      console.log(maxSubarraySum([1])); // Output: 1
      console.log(maxSubarraySum([-1, -2, -3])); // Output: -1
      \`\`\`
      
      **Explanation**:
      
      1. We use Kadane's algorithm, which is a dynamic programming approach
      2. For each position, we decide whether to start a new subarray or extend the existing one
      3. currentMax represents the maximum sum ending at the current position
      4. globalMax keeps track of the best solution we've found so far
      
      **Time Complexity**: O(n) - one pass through the array
      
      ## Problem 3: Rotate Array
      
      **Problem**: Rotate an array to the right by k steps.
      
      **Solution**:
      
      \`\`\`javascript
      function rotateArray(nums, k) {
        // Handle edge cases
        k = k % nums.length; // In case k is larger than array length
        if (k === 0 || nums.length <= 1) return nums;
        
        // Reverse the entire array
        reverse(nums, 0, nums.length - 1);
        
        // Reverse the first k elements
        reverse(nums, 0, k - 1);
        
        // Reverse the rest of the elements
        reverse(nums, k, nums.length - 1);
        
        return nums;
      }
      
      function reverse(nums, start, end) {
        while (start < end) {
          const temp = nums[start];
          nums[start] = nums[end];
          nums[end] = temp;
          start++;
          end--;
        }
      }
      
      // Test cases
      console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)); // Output: [5, 6, 7, 1, 2, 3, 4]
      console.log(rotateArray([-1, -100, 3, 99], 2)); // Output: [3, 99, -1, -100]
      \`\`\`
      
      **Explanation**:
      
      1. We use a clever three-step reversal approach:
         - First, reverse the entire array: [1,2,3,4,5,6,7] → [7,6,5,4,3,2,1]
         - Then reverse the first k elements: [7,6,5,4,3,2,1] → [5,6,7,4,3,2,1]
         - Finally reverse the remaining elements: [5,6,7,4,3,2,1] → [5,6,7,1,2,3,4]
      2. This approach works in-place with O(1) extra space
      
      **Time Complexity**: O(n) - we process each element a constant number of times
      **Space Complexity**: O(1) - we modify the array in-place
      
      ## Problem 4: Meeting Rooms
      
      **Problem**: Given an array of meeting time intervals, determine if a person could attend all meetings.
      
      **Solution**:
      
      \`\`\`javascript
      function canAttendAllMeetings(intervals) {
        // Sort intervals by start time
        intervals.sort((a, b) => a[0] - b[0]);
        
        // Check for overlaps
        for (let i = 1; i < intervals.length; i++) {
          if (intervals[i][0] < intervals[i-1][1]) {
            // Current meeting starts before previous meeting ends
            return false;
          }
        }
        
        return true;
      }
      
      // Test cases
      console.log(canAttendAllMeetings([[0, 30], [5, 10], [15, 20]])); // Output: false
      console.log(canAttendAllMeetings([[7, 10], [2, 4]])); // Output: true
      \`\`\`
      
      **Explanation**:
      
      1. We sort the meetings by their start time
      2. Then we check if any meeting starts before the previous meeting ends
      3. If there's any such overlap, the person can't attend all meetings
      
      **Time Complexity**: O(n log n) - dominated by the sorting operation
    `,
    difficulty: "intermediate",
    points: 30,
    timeEstimate: 25,
    completed: false,
    unlocked: false,
  },
  // ... keep existing code (other lessons)
];

// Enhanced Quizzes for the array lessons
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
  },
  {
    id: "q-array-traversal-1",
    question: "Which traversal method should you use if you need to transform each element in an array?",
    options: [
      "for loop",
      "for...of loop",
      "forEach()",
      "map()"
    ],
    correctOptionIndex: 3,
    explanation: "The map() method is designed specifically to transform each element in an array and create a new array with the results. It returns a new array without modifying the original one."
  },
  {
    id: "q-array-search-1",
    question: "What's the time complexity of binary search?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctOptionIndex: 1,
    explanation: "Binary search has O(log n) time complexity because each comparison eliminates half of the remaining elements from consideration. This makes it much faster than linear search for large arrays."
  },
  {
    id: "q-array-search-2",
    question: "What's a prerequisite for using binary search?",
    options: [
      "The array must have an even number of elements",
      "The array must be sorted",
      "The array must contain only numbers",
      "The array cannot contain duplicates"
    ],
    correctOptionIndex: 1,
    explanation: "Binary search requires the array to be sorted. It works by repeatedly dividing the search interval in half, which only works correctly if the elements are in order."
  },
  {
    id: "q-array-2d-1",
    question: "How would you access the element in the 2nd row and 3rd column of a 2D array called 'matrix'?",
    options: [
      "matrix[2][3]",
      "matrix[1][2]",
      "matrix[3][2]",
      "matrix[2, 3]"
    ],
    correctOptionIndex: 1,
    explanation: "Since arrays are zero-indexed, the 2nd row is at index 1 and the 3rd column is at index 2. Therefore, the correct access is matrix[1][2]."
  },
  {
    id: "q-array-problems-1",
    question: "What's the most efficient way to find two numbers in an array that add up to a specific target?",
    options: [
      "Nested loops checking all pairs (brute force)",
      "Sort the array first, then use two pointers",
      "Use a hash map to store values and check for complements",
      "Binary search for each element's complement"
    ],
    correctOptionIndex: 2,
    explanation: "Using a hash map gives us O(n) time complexity. We store each element and check if its complement (target - current element) exists in the map. This is more efficient than brute force O(n²) or sorting plus two pointers O(n log n)."
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

// Function to determine if a topic should be unlocked based on prerequisites
export const shouldTopicBeUnlocked = (topicId: string, completedTopics: string[]): boolean => {
  const topic = topics.find(t => t.id === topicId);
  
  // If topic doesn't exist or has no prerequisites, it should be unlocked
  if (!topic || !topic.prerequisiteTopics || topic.prerequisiteTopics.length === 0) {
    return true;
  }
  
  // Check if all prerequisites are completed
  return topic.prerequisiteTopics.every(prereq => 
    completedTopics.includes(prereq)
  );
};

// Update topic unlock status based on user progress
export const updateTopicUnlockStatus = (userCompletedTopics: string[]) => {
  // First topic is always unlocked
  if (topics.length > 0) {
    topics[0].unlocked = true;
  }
  
  // For each topic except the first one, check if prerequisites are met
  for (let i = 1; i < topics.length; i++) {
    const topic = topics[i];
    
    // A topic is unlocked if all its prerequisites are in the user's completed topics
    // Or if the previous topic is completed (basic linear progression)
    const prevTopicCompleted = i > 0 && 
      userCompletedTopics.includes(topics[i-1].id);
      
    const prerequisitesMet = shouldTopicBeUnlocked(topic.id, userCompletedTopics);
    
    topic.unlocked = prevTopicCompleted || prerequisitesMet;
  }
  
  return topics;
};

// Example: update unlock status based on user's completed topics
updateTopicUnlockStatus(userProfile.user.profile.completedLessons.map(lessonId => {
  const lesson = lessons.find(l => l.id === lessonId);
  return lesson ? lesson.topicId : "";
}).filter(Boolean));
