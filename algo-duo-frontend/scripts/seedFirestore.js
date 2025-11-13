/*
 Seed Firestore with Algo Duo structure:
 - courses -> levels -> lessons
 - users -> progress

 Usage:
 1) npm i -D firebase-admin
 2) For production Firestore: export GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/serviceAccount.json
    Or: export FIREBASE_SERVICE_ACCOUNT=/absolute/path/to/serviceAccount.json
 3) For local emulator: export FIRESTORE_EMULATOR_HOST=localhost:8080 and (optionally) GCLOUD_PROJECT=your-project-id
 4) node scripts/seedFirestore.js
*/

const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

const saPathEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

function inferProjectId() {
  if (process.env.GCLOUD_PROJECT) return process.env.GCLOUD_PROJECT;
  if (process.env.FIREBASE_PROJECT_ID) return process.env.FIREBASE_PROJECT_ID;
  if (saPathEnv) {
    const abs = path.isAbsolute(saPathEnv) ? saPathEnv : path.resolve(process.cwd(), saPathEnv);
    try {
      const json = JSON.parse(fs.readFileSync(abs, 'utf8'));
      if (json.project_id) return json.project_id;
    } catch (_) {
      // ignore parse errors
    }
  }
  return undefined;
}

const projectId = inferProjectId();
const usingEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

console.log(`[seed] Target=${usingEmulator ? 'emulator' : 'prod'} projectId=${projectId ?? '(unset)'} host=${process.env.FIRESTORE_EMULATOR_HOST || 'googleapis'}`);

function resolveServiceAccountCredential() {
  // Prefer explicit FIREBASE_SERVICE_ACCOUNT path if provided
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (saPath) {
    const abs = path.isAbsolute(saPath) ? saPath : path.resolve(process.cwd(), saPath);
    if (!fs.existsSync(abs)) {
      throw new Error(`Service account file not found at ${abs}`);
    }
    const serviceAccount = require(abs);
    return admin.credential.cert(serviceAccount);
  }
  // Fallback to ADC via GOOGLE_APPLICATION_CREDENTIALS or gcloud ADC
  return admin.credential.applicationDefault();
}

// Initialize Admin SDK
if (admin.apps.length === 0) {
  if (usingEmulator) {
    // Emulator does not require credentials
    admin.initializeApp({ projectId });
  } else {
    admin.initializeApp({
      credential: resolveServiceAccountCredential(),
      ...(projectId ? { projectId } : {}),
    });
  }
}

const db = admin.firestore();

async function seed() {
  const batch = db.batch();

  // Sample course
  const course = {
    id: 'arrays',
    title: 'Arrays Course',
    description: 'Master arrays from fundamentals to advanced techniques.',
    xpReward: 500,
    levelCount: 2,
    icon: 'layers',
  };

  const levels = [
    {
      id: 'level-1',
      title: 'Basics',
      description: 'Array fundamentals and basic operations',
      xpReward: 150,
      difficulty: 'beginner',
      isUnlocked: true,
      lessons: [
        {
          id: 'lesson-1',
          title: 'What Are Arrays?',
          content:
            'An array is an ordered list of values. Learn zero-based indexing and constant-time access by index.',
          exampleCode:
            "const nums = [10, 20, 30];\nconsole.log(nums[0]); // 10",
          xpReward: 50,
          question: 'What is the index of the first element in an array?',
          options: ['1', '0', '-1', 'Depends on language'],
          correctAnswer: 1,
        },
        {
          id: 'lesson-2',
          title: 'Access and Update',
          content: 'Accessing and mutating elements using indices.',
          exampleCode:
            "const arr = [1,2,3];\narr[1] = 99;\nconsole.log(arr[1]); // 99",
          xpReward: 50,
          question: 'After arr[1] = 99 on [1,2,3], what is arr[1]?',
          options: ['1', '2', '99', '3'],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'level-2',
      title: 'Algorithms',
      description: 'Two pointers and sliding window patterns',
      xpReward: 250,
      difficulty: 'intermediate',
      isUnlocked: false,
      lessons: [
        {
          id: 'lesson-3',
          title: 'Two Sum (Two Pointers)',
          content: 'Use two pointers on sorted arrays to find target pairs in O(n).',
          exampleCode:
            "function twoSum(a, t){let i=0,j=a.length-1;while(i<j){const s=a[i]+a[j];if(s===t)return[i,j];s<t?i++:j--; }return null;}",
          xpReward: 80,
          question: 'Time complexity of two-pointer technique on sorted array?',
          options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
          correctAnswer: 1,
        },
        {
          id: 'lesson-4',
          title: 'Sliding Window',
          content: 'Maintain a moving window to optimize subarray computations.',
          exampleCode:
            "function maxSum(arr,k){let sum=0,best=-Infinity;for(let i=0;i<arr.length;i++){sum+=arr[i];if(i>=k) sum-=arr[i-k]; if(i>=k-1) best=Math.max(best,sum);}return best;}",
          xpReward: 80,
          question: 'Sliding window helps reduce which complexity?',
          options: ['Space only', 'Time by avoiding recomputation', 'Neither', 'I/O latency'],
          correctAnswer: 1,
        },
      ],
    },
  ];

  // Write course
  const courseRef = db.collection('courses').doc(course.id);
  batch.set(courseRef, course, { merge: true });

  // Write levels and lessons
  for (const lvl of levels) {
    const levelRef = courseRef.collection('levels').doc(lvl.id);
    const { lessons, ...levelData } = lvl;
    batch.set(levelRef, levelData, { merge: true });

    for (const les of lessons) {
      const lessonRef = levelRef.collection('lessons').doc(les.id);
      batch.set(lessonRef, les, { merge: true });
    }
  }

  // Sample user with progress subcollection
  const user = {
    username: 'demoUser',
    email: 'demo@example.com',
    totalXP: 0,
    currentCourse: course.id,
    streakDays: 0,
  };
  const userId = 'demo-user-1';
  const userRef = db.collection('users').doc(userId);
  batch.set(userRef, user, { merge: true });

  const progress = {
    completedLevels: ['level-1'],
    lastLesson: 'lesson-2',
    xpEarned: 180,
  };
  const progressRef = userRef.collection('progress').doc('state');
  batch.set(progressRef, progress, { merge: true });

  try {
    await batch.commit();
  } catch (err) {
    console.error('Commit failed', { code: err.code, details: err.details, message: err.message });
    throw err;
  }
}

seed()
  .then(() => {
    console.log('✅ Firestore seeded successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
