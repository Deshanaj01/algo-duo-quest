import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Lightbulb,
  Clock,
  Zap,
  Trophy,
  CheckCircle,
  XCircle,
  Calendar,
  Flame,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Timer
} from 'lucide-react';
import { useGame } from '../context/GameContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  bonusXP: number;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: { input: any; expected: any; description: string }[];
  timeLimit: number;
  tags: string[];
}

const dailyChallenges: DailyChallenge[] = [
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

**Example 2:**
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
    difficulty: 'easy',
    xpReward: 50,
    bonusXP: 25,
    starterCode: `function reverseString(s) {
  // Your code here
  // Modify s in-place
  
  return s;
}`,
    solution: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`,
    hints: [
      'Think about using two pointers - one at the start and one at the end.',
      'Swap the characters at the two pointers and move them towards each other.',
      'Continue until the pointers meet in the middle.'
    ],
    testCases: [
      { input: ['h', 'e', 'l', 'l', 'o'], expected: ['o', 'l', 'l', 'e', 'h'], description: 'Basic string' },
      { input: ['H', 'a', 'n', 'n', 'a', 'h'], expected: ['h', 'a', 'n', 'n', 'a', 'H'], description: 'Palindrome-like string' },
      { input: ['a'], expected: ['a'], description: 'Single character' },
      { input: ['a', 'b'], expected: ['b', 'a'], description: 'Two characters' }
    ],
    timeLimit: 15,
    tags: ['two-pointers', 'string', 'array']
  },
  {
    id: 'find-max',
    title: 'Find Maximum in Array',
    description: `Given an array of integers, find and return the maximum value.

**Example 1:**
Input: nums = [3, 7, 2, 9, 1]
Output: 9

**Example 2:**
Input: nums = [-5, -2, -10, -1]
Output: -1

**Constraints:**
- The array will have at least one element
- Elements can be positive, negative, or zero`,
    difficulty: 'easy',
    xpReward: 40,
    bonusXP: 20,
    starterCode: `function findMax(nums) {
  // Your code here
  // Return the maximum value
  
}`,
    solution: `function findMax(nums) {
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}`,
    hints: [
      'Start by assuming the first element is the maximum.',
      'Loop through the rest of the array.',
      'Update the maximum whenever you find a larger element.'
    ],
    testCases: [
      { input: [3, 7, 2, 9, 1], expected: 9, description: 'Positive numbers' },
      { input: [-5, -2, -10, -1], expected: -1, description: 'Negative numbers' },
      { input: [42], expected: 42, description: 'Single element' },
      { input: [1, 1, 1, 1], expected: 1, description: 'All same values' }
    ],
    timeLimit: 10,
    tags: ['array', 'iteration']
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example 1:**
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9

**Example 2:**
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]`,
    difficulty: 'medium',
    xpReward: 75,
    bonusXP: 35,
    starterCode: `function twoSum(nums, target) {
  // Your code here
  // Return array of two indices
  
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
  return [];
}`,
    hints: [
      'Think about what information you need to store as you iterate.',
      'Use a hash map to store values and their indices.',
      'For each number, check if its complement (target - current) exists.'
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], description: 'Basic case' },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], description: 'Not first elements' },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], description: 'Duplicate values' }
    ],
    timeLimit: 20,
    tags: ['hash-map', 'array']
  },
  {
    id: 'palindrome-check',
    title: 'Valid Palindrome',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1:**
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2:**
Input: s = "race a car"
Output: false`,
    difficulty: 'easy',
    xpReward: 50,
    bonusXP: 25,
    starterCode: `function isPalindrome(s) {
  // Your code here
  // Return true or false
  
}`,
    solution: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
    hints: [
      'First, clean the string by removing non-alphanumeric characters.',
      'Convert to lowercase for comparison.',
      'Use two pointers from both ends to compare characters.'
    ],
    testCases: [
      { input: 'A man, a plan, a canal: Panama', expected: true, description: 'Valid palindrome with spaces' },
      { input: 'race a car', expected: false, description: 'Not a palindrome' },
      { input: ' ', expected: true, description: 'Empty after cleaning' },
      { input: 'aa', expected: true, description: 'Simple palindrome' }
    ],
    timeLimit: 15,
    tags: ['string', 'two-pointers']
  },
  {
    id: 'fizz-buzz',
    title: 'FizzBuzz',
    description: `Given an integer n, return a string array answer (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5
- answer[i] == "Fizz" if i is divisible by 3
- answer[i] == "Buzz" if i is divisible by 5
- answer[i] == i (as a string) if none of the above conditions are true

**Example 1:**
Input: n = 3
Output: ["1","2","Fizz"]

**Example 2:**
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    difficulty: 'easy',
    xpReward: 40,
    bonusXP: 20,
    starterCode: `function fizzBuzz(n) {
  // Your code here
  // Return array of strings
  
}`,
    solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(String(i));
    }
  }
  return result;
}`,
    hints: [
      'Check divisibility by 15 first (both 3 and 5).',
      'Then check divisibility by 3, then by 5.',
      'Use modulo operator (%) to check divisibility.'
    ],
    testCases: [
      { input: 3, expected: ['1', '2', 'Fizz'], description: 'Small input' },
      { input: 5, expected: ['1', '2', 'Fizz', '4', 'Buzz'], description: 'Up to Buzz' },
      { input: 15, expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], description: 'Up to FizzBuzz' }
    ],
    timeLimit: 10,
    tags: ['math', 'string', 'simulation']
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Arrays',
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.

Return the merged sorted array.

**Example 1:**
Input: nums1 = [1, 3, 5], nums2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]

**Example 2:**
Input: nums1 = [1, 2, 3], nums2 = [4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]`,
    difficulty: 'medium',
    xpReward: 70,
    bonusXP: 35,
    starterCode: `function mergeSortedArrays(nums1, nums2) {
  // Your code here
  // Return merged sorted array
  
}`,
    solution: `function mergeSortedArrays(nums1, nums2) {
  const result = [];
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i]);
      i++;
    } else {
      result.push(nums2[j]);
      j++;
    }
  }
  while (i < nums1.length) {
    result.push(nums1[i]);
    i++;
  }
  while (j < nums2.length) {
    result.push(nums2[j]);
    j++;
  }
  return result;
}`,
    hints: [
      'Use two pointers, one for each array.',
      'Compare elements at both pointers and add the smaller one.',
      'Don\'t forget to add remaining elements after one array is exhausted.'
    ],
    testCases: [
      { input: { nums1: [1, 3, 5], nums2: [2, 4, 6] }, expected: [1, 2, 3, 4, 5, 6], description: 'Interleaved merge' },
      { input: { nums1: [1, 2, 3], nums2: [4, 5, 6] }, expected: [1, 2, 3, 4, 5, 6], description: 'Sequential merge' },
      { input: { nums1: [], nums2: [1, 2, 3] }, expected: [1, 2, 3], description: 'One empty array' }
    ],
    timeLimit: 15,
    tags: ['array', 'two-pointers', 'sorting']
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    description: `Given a string, count the number of vowels (a, e, i, o, u) in it. Both uppercase and lowercase vowels should be counted.

**Example 1:**
Input: s = "Hello World"
Output: 3

**Example 2:**
Input: s = "AEIOU"
Output: 5`,
    difficulty: 'easy',
    xpReward: 35,
    bonusXP: 15,
    starterCode: `function countVowels(s) {
  // Your code here
  // Return count of vowels
  
}`,
    solution: `function countVowels(s) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (const char of s) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}`,
    hints: [
      'Create a string or set containing all vowels.',
      'Iterate through each character in the input string.',
      'Check if each character is in your vowels collection.'
    ],
    testCases: [
      { input: 'Hello World', expected: 3, description: 'Mixed case' },
      { input: 'AEIOU', expected: 5, description: 'All uppercase vowels' },
      { input: 'bcdfg', expected: 0, description: 'No vowels' },
      { input: '', expected: 0, description: 'Empty string' }
    ],
    timeLimit: 10,
    tags: ['string', 'iteration']
  }
];

const getDailyChallenge = (): DailyChallenge => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % dailyChallenges.length;
  return dailyChallenges[index];
};

const getTimeUntilMidnight = (): { hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
};

const DailyChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userStats, earnXP } = useGame();
  
  const challenge = useMemo(() => getDailyChallenge(), []);
  
  const [code, setCode] = useState(challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{ name: string; passed: boolean; expected: any; received: any; error?: string }[]>([]);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showHints, setShowHints] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilMidnight());
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeUntilMidnight());
      if (!completed) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, completed]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      const fnMatch = code.match(/function\s+(\w+)/);
      const fnName = fnMatch?.[1] || 'solve';
      const wrapped = `"use strict";\n${code}\nreturn ${fnName};`;
      const fn = new Function(wrapped)();

      if (typeof fn !== 'function') {
        throw new Error(`Function "${fnName}" not found`);
      }

      const testResults = challenge.testCases.map((tc) => {
        try {
          let received;
          if (typeof tc.input === 'object' && !Array.isArray(tc.input)) {
            received = fn(...Object.values(tc.input));
          } else {
            received = fn(Array.isArray(tc.input) ? [...tc.input] : tc.input);
          }
          const passed = JSON.stringify(received) === JSON.stringify(tc.expected);
          return { name: tc.description, passed, expected: tc.expected, received };
        } catch (e: any) {
          return { name: tc.description, passed: false, expected: tc.expected, received: undefined, error: e?.message };
        }
      });

      setResults(testResults);

      const allPassed = testResults.every((r) => r.passed);
      if (allPassed && !completed) {
        setCompleted(true);
        const bonusEarned = elapsedTime < challenge.timeLimit * 60;
        const totalXP = challenge.xpReward + (bonusEarned ? challenge.bonusXP : 0);
        earnXP(totalXP, `Daily Challenge: ${challenge.title}`);
      }
    } catch (err: any) {
      setResults([{ name: 'Runtime Error', passed: false, expected: 'No error', received: err?.message, error: err?.message }]);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setResults([]);
    setHintIndex(-1);
  };

  const revealNextHint = () => {
    if (hintIndex < challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };

  const passedCount = results.filter((r) => r.passed).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/50 via-yellow-900/50 to-red-900/50 border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Daily Challenge</h1>
                  <p className="text-orange-300 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Time Remaining */}
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Next challenge in</div>
                <div className="flex items-center gap-1 text-lg font-mono">
                  <Timer className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400">
                    {String(timeRemaining.hours).padStart(2, '0')}:
                    {String(timeRemaining.minutes).padStart(2, '0')}:
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* XP Reward */}
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Reward</div>
                <div className="flex items-center gap-1 text-lg font-bold text-yellow-400">
                  <Zap className="w-5 h-5" />
                  {challenge.xpReward} XP
                </div>
              </div>

              {/* Streak */}
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Streak</div>
                <div className="flex items-center gap-1 text-lg font-bold text-orange-400">
                  <Flame className="w-5 h-5" />
                  {userStats.streakDays} days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="space-y-4">
            {/* Problem Header */}
            <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~{challenge.timeLimit} min
                    </span>
                  </div>
                </div>
                {completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <Trophy className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Completed!</span>
                  </motion.div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 text-sm font-sans bg-transparent p-0">
                  {challenge.description}
                </pre>
              </div>
            </div>

            {/* Hints Section */}
            <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 overflow-hidden">
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Hints</span>
                  <span className="text-sm text-gray-400">
                    ({hintIndex + 1}/{challenge.hints.length} revealed)
                  </span>
                </div>
                {showHints ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-700/60"
                  >
                    <div className="p-4 space-y-3">
                      {challenge.hints.slice(0, hintIndex + 1).map((hint, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                        >
                          <span className="text-yellow-400 font-bold">#{i + 1}</span>
                          <span className="text-gray-300">{hint}</span>
                        </motion.div>
                      ))}

                      {hintIndex < challenge.hints.length - 1 && (
                        <button
                          onClick={revealNextHint}
                          className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 transition-colors flex items-center justify-center gap-2"
                        >
                          <Lightbulb className="w-4 h-4" />
                          Reveal Next Hint
                        </button>
                      )}

                      {hintIndex === -1 && (
                        <button
                          onClick={revealNextHint}
                          className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 transition-colors flex items-center justify-center gap-2"
                        >
                          <Lightbulb className="w-4 h-4" />
                          Get First Hint
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bonus Info */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/30 p-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="font-semibold text-purple-300">Speed Bonus</h3>
                  <p className="text-sm text-gray-400">
                    Complete within {challenge.timeLimit} minutes for +{challenge.bonusXP} bonus XP!
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-mono text-purple-400">{formatTime(elapsedTime)}</div>
                  <div className="text-xs text-gray-500">elapsed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor & Results */}
          <div className="space-y-4">
            {/* Editor */}
            <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-gray-700/60">
                <span className="text-sm text-gray-300">Solution</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetCode}
                    className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-700 disabled:opacity-60 text-sm flex items-center gap-1 transition-colors font-medium"
                  >
                    <Play className="w-4 h-4" />
                    {isRunning ? 'Running...' : 'Run Tests'}
                  </button>
                </div>
              </div>
              <div className="h-[350px]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(v) => setCode(v || '')}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 }
                  }}
                />
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-gray-800/60 rounded-xl border border-gray-700/60 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Test Results</span>
                </div>
                {results.length > 0 && (
                  <div className={`text-sm font-medium ${passedCount === results.length ? 'text-green-400' : 'text-gray-400'}`}>
                    {passedCount}/{results.length} Passed
                  </div>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Click "Run Tests" to check your solution</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((r, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        r.passed
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      {r.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1 text-sm">
                        <div className="font-medium mb-1">{r.name}</div>
                        {r.error ? (
                          <div className="text-red-300">Error: {r.error}</div>
                        ) : !r.passed && (
                          <div className="text-gray-400">
                            <span>Expected: </span>
                            <code className="text-blue-300">{JSON.stringify(r.expected)}</code>
                            <span className="mx-2">|</span>
                            <span>Got: </span>
                            <code className="text-yellow-300">{JSON.stringify(r.received)}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Success Message */}
              {completed && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl text-center"
                >
                  <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-green-400 mb-1">Challenge Complete!</h3>
                  <p className="text-gray-300">
                    You earned <span className="text-yellow-400 font-bold">+{challenge.xpReward} XP</span>
                    {elapsedTime < challenge.timeLimit * 60 && (
                      <span className="text-purple-400"> + {challenge.bonusXP} bonus XP</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Come back tomorrow for a new challenge!
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallengePage;
