
import { Challenge } from "@/types";

export const arrayChallenges: Challenge[] = [
  {
    id: "array-reverse",
    title: "Array Reversal",
    description: "Write a function that reverses an array without using built-in reverse methods.",
    difficulty: "beginner",
    code: `function reverseArray(arr) {
  // Your code here
  
}`,
    solution: `function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}`,
    tests: [
      `function(fn) { 
        const input = [1, 2, 3, 4, 5];
        const output = fn(input);
        return JSON.stringify(output) === JSON.stringify([5, 4, 3, 2, 1]); 
      }`,
      `function(fn) {
        const input = ['a', 'b', 'c'];
        const output = fn(input);
        return JSON.stringify(output) === JSON.stringify(['c', 'b', 'a']);
      }`,
      `function(fn) {
        const input = [];
        const output = fn(input);
        return JSON.stringify(output) === JSON.stringify([]);
      }`
    ]
  },
  {
    id: "array-max",
    title: "Find Maximum",
    description: "Write a function that finds the maximum value in an array of numbers.",
    difficulty: "beginner",
    code: `function findMaximum(arr) {
  // Your code here
  
}`,
    solution: `function findMaximum(arr) {
  if (arr.length === 0) return null;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    tests: [
      `function(fn) { 
        return fn([1, 3, 5, 7, 9]) === 9; 
      }`,
      `function(fn) {
        return fn([-5, -3, -1]) === -1;
      }`,
      `function(fn) {
        return fn([100]) === 100;
      }`,
      `function(fn) {
        return fn([]) === null;
      }`
    ]
  },
  {
    id: "array-twosum",
    title: "Two Sum",
    description: "Given an array of numbers and a target, return the indices of two numbers that add up to the target.",
    difficulty: "intermediate",
    code: `function twoSum(nums, target) {
  // Your code here
  
}`,
    solution: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in map) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return null;
}`,
    tests: [
      `function(fn) { 
        const indices = fn([2, 7, 11, 15], 9);
        return indices[0] === 0 && indices[1] === 1;
      }`,
      `function(fn) {
        const indices = fn([3, 2, 4], 6);
        return indices[0] === 1 && indices[1] === 2;
      }`,
      `function(fn) {
        const indices = fn([3, 3], 6);
        return indices[0] === 0 && indices[1] === 1;
      }`
    ]
  },
  {
    id: "array-rotation",
    title: "Array Rotation",
    description: "Write a function to rotate an array to the right by k steps.",
    difficulty: "intermediate",
    code: `function rotateArray(nums, k) {
  // Your code here
  // Modify nums in-place
  
}`,
    solution: `function rotateArray(nums, k) {
  k = k % nums.length;
  
  // Reverse the entire array
  reverse(nums, 0, nums.length - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the rest
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
}`,
    tests: [
      `function(fn) { 
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const result = fn([...arr], 3);
        return JSON.stringify(result) === JSON.stringify([5, 6, 7, 1, 2, 3, 4]);
      }`,
      `function(fn) {
        const arr = [-1, -100, 3, 99];
        const result = fn([...arr], 2);
        return JSON.stringify(result) === JSON.stringify([3, 99, -1, -100]);
      }`,
      `function(fn) {
        const arr = [1, 2];
        const result = fn([...arr], 3);
        return JSON.stringify(result) === JSON.stringify([2, 1]);
      }`
    ]
  }
];
