import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Question {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  hints: string[];
  solution: string;
  explanation?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  tags: string[];
  testCases: TestCase[];
  aiTutorContext?: AITutorContext;
  createdAt?: Date;
}

interface TestCase {
  input: any;
  expectedOutput: any;
  explanation?: string;
}

interface AITutorContext {
  conceptsRequired: string[];
  commonMistakes: string[];
  learningObjectives: string[];
  relatedProblems: string[];
  difficultyProgression: {
    easier: string[];
    harder: string[];
  };
}

interface MLInsight {
  userId: string;
  questionId: string;
  attempts: number;
  timeSpent: number; // in seconds
  hintsUsed: string[];
  mistakePatterns: string[];
  conceptsStruggled: string[];
  timestamp: Date;
  completed: boolean;
  score?: number;
}

export async function addQuestion(question: Question) {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      ...question,
      createdAt: new Date()
    });
    console.log("Question added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
}

// Example usage
export async function addMaxSubarrayQuestion() {
  await addQuestion({
    title: "Find maximum subarray sum",
    description: "Given an array of integers, find the contiguous subarray with the maximum sum.",
    difficulty: "medium",
    topic: "arrays",
    hints: [
      "Think about prefix sums.",
      "Can you solve it in O(n)?"
    ],
    solution: "Use Kadane's Algorithm"
  });
}

// Helper function to get questions
export async function getQuestions(topic?: string) {
  try {
    let q = collection(db, "questions");
    if (topic) {
      q = query(q, where("topic", "==", topic));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

// AI Tutor - Log user attempt and learning insights
export async function logMLInsight(insight: MLInsight) {
  try {
    const docRef = await addDoc(collection(db, "ml_insights"), {
      ...insight,
      timestamp: new Date()
    });
    console.log("ML insight logged with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error logging ML insight:", error);
    throw error;
  }
}

// AI Tutor - Get personalized recommendations
export async function getPersonalizedRecommendations(userId: string, topic: string) {
  try {
    // Get user's learning history
    const insightsQuery = query(
      collection(db, "ml_insights"),
      where("userId", "==", userId)
    );
    const insightsSnapshot = await getDocs(insightsQuery);
    const userInsights = insightsSnapshot.docs.map(doc => doc.data() as MLInsight);
    
    // Get questions for the topic
    const questions = await getQuestions(topic);
    
    // Simple recommendation logic (can be enhanced with ML)
    const struggledConcepts = [...new Set(
      userInsights.flatMap(insight => insight.conceptsStruggled)
    )];
    
    const recommendedQuestions = questions.filter(q => 
      q.aiTutorContext?.conceptsRequired.some(concept => 
        struggledConcepts.includes(concept)
      )
    );
    
    return {
      struggledConcepts,
      recommendedQuestions: recommendedQuestions.slice(0, 3),
      totalAttempts: userInsights.length,
      averageScore: userInsights.length > 0 
        ? userInsights.reduce((sum, insight) => sum + (insight.score || 0), 0) / userInsights.length
        : 0
    };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}

// AI Tutor - Adaptive hint system
export async function getAdaptiveHint(questionId: string, userId: string, attemptNumber: number) {
  try {
    const questionDoc = await getDoc(doc(db, "questions", questionId));
    if (!questionDoc.exists()) {
      throw new Error("Question not found");
    }
    
    const question = questionDoc.data() as Question;
    const hints = question.hints;
    
    // Progressive hint system based on attempt number
    if (attemptNumber <= hints.length) {
      return {
        hint: hints[attemptNumber - 1],
        isLastHint: attemptNumber === hints.length,
        encouragement: getEncouragementMessage(attemptNumber)
      };
    } else {
      return {
        hint: "Consider reviewing the solution and understanding the approach.",
        isLastHint: true,
        encouragement: "Don't give up! Every expert was once a beginner."
      };
    }
  } catch (error) {
    console.error("Error getting adaptive hint:", error);
    throw error;
  }
}

function getEncouragementMessage(attemptNumber: number): string {
  const messages = [
    "You're on the right track! Keep thinking about the problem.",
    "Great effort! Sometimes a different perspective helps.",
    "You're learning! Each attempt teaches you something new.",
    "Almost there! Break down the problem into smaller parts.",
    "Persistence is key in programming. You've got this!"
  ];
  return messages[Math.min(attemptNumber - 1, messages.length - 1)];
}

// Initialize with comprehensive sample questions for testing
export async function initializeSampleQuestions() {
  const sampleQuestions: Question[] = [
    {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "easy",
      topic: "arrays",
      hints: [
        "Think about what information you need to store as you iterate through the array.",
        "Consider using a hash map to store values and their indices.",
        "For each number, check if its complement (target - current number) exists in your hash map."
      ],
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
      explanation: "We use a hash map to store each number and its index as we iterate. For each number, we check if its complement exists in the map. This gives us O(n) time complexity.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      tags: ["hash-map", "array", "two-pointers"],
      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1], explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
        { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2], explanation: "nums[1] + nums[2] = 2 + 4 = 6" }
      ],
      aiTutorContext: {
        conceptsRequired: ["hash-maps", "array-iteration", "complementary-search"],
        commonMistakes: ["nested-loops-brute-force", "not-handling-duplicates", "returning-values-instead-of-indices"],
        learningObjectives: ["understand-hash-map-usage", "optimize-from-O(n²)-to-O(n)", "handle-index-tracking"],
        relatedProblems: ["three-sum", "two-sum-ii", "two-sum-iv-bst"],
        difficultyProgression: {
          easier: ["find-target-in-array", "array-contains-duplicate"],
          harder: ["three-sum", "four-sum", "two-sum-closest"]
        }
      }
    },
    {
      title: "Maximum Subarray (Kadane's Algorithm)",
      description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      difficulty: "medium",
      topic: "arrays",
      hints: [
        "Think about what happens when you include the current element vs starting a new subarray.",
        "Keep track of the maximum sum ending at the current position.",
        "Also keep track of the global maximum seen so far.",
        "At each position, decide: continue the current subarray or start fresh?"
      ],
      solution: `function maxSubArray(nums) {
  let currentMax = nums[0];
  let globalMax = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }
  
  return globalMax;
}`,
      explanation: "Kadane's algorithm uses dynamic programming. At each position, we decide whether to start a new subarray or extend the current one. We track both local and global maximums.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      tags: ["dynamic-programming", "array", "kadanes-algorithm"],
      testCases: [
        { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expectedOutput: 6, explanation: "[4,-1,2,1] has the largest sum = 6" },
        { input: [1], expectedOutput: 1, explanation: "Single element array" },
        { input: [5, 4, -1, 7, 8], expectedOutput: 23, explanation: "All elements form the maximum subarray" }
      ],
      aiTutorContext: {
        conceptsRequired: ["dynamic-programming", "array-iteration", "optimization"],
        commonMistakes: ["trying-all-subarrays-brute-force", "forgetting-negative-numbers", "not-handling-all-negative-array"],
        learningObjectives: ["understand-dp-optimization", "recognize-kadane-pattern", "optimize-from-O(n²)-to-O(n)"],
        relatedProblems: ["maximum-product-subarray", "longest-increasing-subsequence", "house-robber"],
        difficultyProgression: {
          easier: ["find-maximum-in-array", "sum-of-array"],
          harder: ["maximum-product-subarray", "maximum-subarray-with-one-deletion"]
        }
      }
    },
    {
      title: "Trapping Rain Water",
      description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      difficulty: "hard",
      topic: "arrays",
      hints: [
        "Think about what determines how much water can be stored at each position.",
        "The water level at any position depends on the minimum of maximum heights to its left and right.",
        "Consider using two pointers starting from both ends.",
        "Keep track of the maximum height seen so far from both directions."
      ],
      solution: `function trap(height) {
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
      explanation: "We use two pointers and track maximum heights from both sides. Water at any position is determined by the minimum of left and right maximum heights minus current height.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      tags: ["two-pointers", "array", "water-trapping", "optimization"],
      testCases: [
        { input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expectedOutput: 6, explanation: "Water can be trapped in the valleys" },
        { input: [4, 2, 0, 3, 2, 5], expectedOutput: 9, explanation: "Multiple water pockets" }
      ],
      aiTutorContext: {
        conceptsRequired: ["two-pointers", "array-traversal", "optimization", "spatial-reasoning"],
        commonMistakes: ["not-understanding-water-level-logic", "using-extra-space-unnecessarily", "incorrect-boundary-conditions"],
        learningObjectives: ["master-two-pointer-technique", "understand-optimization-trade-offs", "solve-complex-array-problems"],
        relatedProblems: ["container-with-most-water", "largest-rectangle-histogram", "product-of-array-except-self"],
        difficultyProgression: {
          easier: ["container-with-most-water", "two-sum"],
          harder: ["largest-rectangle-histogram", "maximal-rectangle"]
        }
      }
    }
  ];
  
  try {
    for (const question of sampleQuestions) {
      await addQuestion(question);
    }
    console.log("Sample questions initialized successfully!");
  } catch (error) {
    console.error("Error initializing sample questions:", error);
  }
}

// Initialize sample ML insights for testing
export async function initializeSampleMLInsights() {
  const sampleInsights: MLInsight[] = [
    {
      userId: "user123",
      questionId: "two-sum-question-id",
      attempts: 3,
      timeSpent: 1200, // 20 minutes
      hintsUsed: ["Think about what information you need to store", "Consider using a hash map"],
      mistakePatterns: ["nested-loops-brute-force", "not-handling-duplicates"],
      conceptsStruggled: ["hash-maps", "complementary-search"],
      timestamp: new Date(),
      completed: true,
      score: 85
    },
    {
      userId: "user123",
      questionId: "maximum-subarray-question-id",
      attempts: 2,
      timeSpent: 900, // 15 minutes
      hintsUsed: ["Think about what happens when you include the current element"],
      mistakePatterns: ["trying-all-subarrays-brute-force"],
      conceptsStruggled: ["dynamic-programming", "optimization"],
      timestamp: new Date(),
      completed: true,
      score: 78
    },
    {
      userId: "user123",
      questionId: "trapping-rain-water-question-id",
      attempts: 5,
      timeSpent: 2400, // 40 minutes
      hintsUsed: ["Think about what determines water level", "Consider using two pointers", "Keep track of maximum heights"],
      mistakePatterns: ["not-understanding-water-level-logic", "using-extra-space-unnecessarily"],
      conceptsStruggled: ["two-pointers", "spatial-reasoning", "optimization"],
      timestamp: new Date(),
      completed: false,
      score: 45
    }
  ];
  
  try {
    for (const insight of sampleInsights) {
      await logMLInsight(insight);
    }
    console.log("Sample ML insights initialized successfully!");
  } catch (error) {
    console.error("Error initializing sample ML insights:", error);
  }
}
