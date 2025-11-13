/* Seed basic coding questions for AI Tutor.
   Usage:
   - For emulator: export FIRESTORE_EMULATOR_HOST=localhost:8080 and optionally GCLOUD_PROJECT
   - For prod: export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/to/serviceAccount.json (or FIREBASE_SERVICE_ACCOUNT)
   - node scripts/seedQuestions.js
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

async function seed() {
  const questions = [
    {
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      topic: 'arrays',
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
      ],
      starterCode: `function solve({ nums, target }) {\n  // return [i, j]\n  return null;\n}`,
    },
    {
      title: "Maximum Subarray (Kadane's)",
      description: 'Find the contiguous subarray with the largest sum.',
      topic: 'arrays',
      difficulty: 'medium',
      hints: [
        'Track max ending here vs starting fresh.',
        'Update a global maximum as you go.',
      ],
      tags: ['dp', 'array'],
      testCases: [
        { input: [-2,1,-3,4,-1,2,1,-5,4], expectedOutput: 6 },
        { input: [1], expectedOutput: 1 },
      ],
      starterCode: `function solve(nums) {\n  // return max sum\n  return 0;\n}`,
    },
    {
      title: 'Trapping Rain Water',
      description: 'Compute how much water can be trapped after raining.',
      topic: 'arrays',
      difficulty: 'hard',
      hints: [
        'Water level depends on min(leftMax, rightMax).',
        'Two-pointer approach from both ends.',
      ],
      tags: ['two-pointers', 'array'],
      testCases: [
        { input: [0,1,0,2,1,0,1,3,2,1,2,1], expectedOutput: 6 },
        { input: [4,2,0,3,2,5], expectedOutput: 9 },
      ],
      starterCode: `function solve(height) {\n  // return trapped water\n  return 0;\n}`,
    },
  ];

  for (const q of questions) {
    const ref = db.collection('questions').doc();
    await ref.set({
      ...q,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log('Added question', ref.id, q.title);
  }
}

seed()
  .then(() => { console.log('✅ Questions seeded'); process.exit(0); })
  .catch((e) => { console.error('❌ Seed failed', e); process.exit(1); });