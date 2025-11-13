/* Add more coding challenge lessons to the arrays course.
   Usage:
   - For emulator: export FIRESTORE_EMULATOR_HOST=localhost:8080 and optionally GCLOUD_PROJECT
   - For prod: export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/to/serviceAccount.json (or FIREBASE_SERVICE_ACCOUNT)
   - node scripts/addMoreLessons.js
*/

const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

const projectId = process.env.GCLOUD_PROJECT || process.env.FIREBASE_PROJECT_ID || 'algo-duo-quest-37286300-b56fc';
const usingEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

function resolveServiceAccountCredential() {
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (saPath) {
    const abs = path.isAbsolute(saPath) ? saPath : path.resolve(process.cwd(), saPath);
    if (!fs.existsSync(abs)) throw new Error(`Service account file not found at ${abs}`);
    const serviceAccount = require(abs);
    return admin.credential.cert(serviceAccount);
  }
  return admin.credential.applicationDefault();
}

if (admin.apps.length === 0) {
  if (usingEmulator) {
    admin.initializeApp({ projectId });
  } else {
    admin.initializeApp({ credential: resolveServiceAccountCredential(), projectId });
  }
}

const db = admin.firestore();

async function addLessons() {
  const batch = db.batch();
  const courseRef = db.collection('courses').doc('arrays');

  // Add a new level-3 for advanced challenges
  const level3 = {
    id: 'level-3',
    title: 'Advanced Challenges',
    description: 'Solve complex array problems with optimal solutions',
    xpReward: 400,
    difficulty: 'advanced',
    isUnlocked: false,
  };

  const level3Ref = courseRef.collection('levels').doc('level-3');
  batch.set(level3Ref, level3, { merge: true });

  // Lessons for level-3
  const advancedLessons = [
    {
      id: 'lesson-5',
      title: 'Two Sum Challenge',
      content: 'Given an array of integers and a target, return indices of two numbers that add up to the target.',
      exampleCode: `// Example: nums = [2,7,11,15], target = 9
// Output: [0,1] because nums[0] + nums[1] = 9`,
      xpReward: 100,
      difficulty: 'easy',
      hints: [
        'Think about what information you need to store as you iterate.',
        'Use a hash map to store values and their indices.',
        'For each number, check if its complement exists in the map.',
      ],
      tags: ['hash-map', 'array'],
      testCases: [
        { input: { nums: [2,7,11,15], target: 9 }, expectedOutput: [0,1] },
        { input: { nums: [3,2,4], target: 6 }, expectedOutput: [1,2] },
        { input: { nums: [3,3], target: 6 }, expectedOutput: [0,1] },
      ],
      starterCode: `function solve({ nums, target }) {
  // Return array of two indices [i, j]
  return null;
}`,
    },
    {
      id: 'lesson-6',
      title: "Maximum Subarray (Kadane's Algorithm)",
      content: 'Find the contiguous subarray with the largest sum using dynamic programming.',
      exampleCode: `// Example: [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6 (subarray [4,-1,2,1])`,
      xpReward: 120,
      difficulty: 'medium',
      hints: [
        'Track the maximum sum ending at the current position.',
        'At each element, decide: extend the existing subarray or start fresh?',
        'Keep a global maximum as you iterate.',
      ],
      tags: ['dp', 'array', 'kadanes-algorithm'],
      testCases: [
        { input: [-2,1,-3,4,-1,2,1,-5,4], expectedOutput: 6 },
        { input: [1], expectedOutput: 1 },
        { input: [5,4,-1,7,8], expectedOutput: 23 },
      ],
      starterCode: `function solve(nums) {
  // Return the maximum sum
  return 0;
}`,
    },
    {
      id: 'lesson-7',
      title: 'Trapping Rain Water',
      content: 'Calculate how much rainwater can be trapped between elevation bars.',
      exampleCode: `// Example: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6 units of water trapped`,
      xpReward: 150,
      difficulty: 'hard',
      hints: [
        'Water level at each position depends on min(leftMax, rightMax) - height.',
        'Use two pointers moving from both ends.',
        'Track the maximum heights seen from left and right.',
      ],
      tags: ['two-pointers', 'array'],
      testCases: [
        { input: [0,1,0,2,1,0,1,3,2,1,2,1], expectedOutput: 6 },
        { input: [4,2,0,3,2,5], expectedOutput: 9 },
      ],
      starterCode: `function solve(height) {
  // Return total trapped water
  return 0;
}`,
    },
    {
      id: 'lesson-8',
      title: 'Container With Most Water',
      content: 'Find two lines that together with the x-axis form a container holding the most water.',
      exampleCode: `// Example: [1,8,6,2,5,4,8,3,7]
// Output: 49`,
      xpReward: 120,
      difficulty: 'medium',
      hints: [
        'Area = min(height[left], height[right]) * (right - left).',
        'Use two pointers at both ends.',
        'Move the pointer with the smaller height inward.',
      ],
      tags: ['two-pointers', 'array', 'greedy'],
      testCases: [
        { input: [1,8,6,2,5,4,8,3,7], expectedOutput: 49 },
        { input: [1,1], expectedOutput: 1 },
      ],
      starterCode: `function solve(height) {
  // Return maximum area
  return 0;
}`,
    },
  ];

  for (const lesson of advancedLessons) {
    const lessonRef = level3Ref.collection('lessons').doc(lesson.id);
    batch.set(lessonRef, lesson, { merge: true });
  }

  // Update course level count
  batch.update(courseRef, { levelCount: 3 });

  await batch.commit();
  console.log('✅ Added level-3 with 4 coding challenge lessons');
  console.log('Lessons added:');
  advancedLessons.forEach(l => console.log(`  - ${l.title} (${l.difficulty}, ${l.xpReward} XP)`));
}

addLessons()
  .then(() => process.exit(0))
  .catch((e) => { console.error('❌ Failed to add lessons', e); process.exit(1); });
