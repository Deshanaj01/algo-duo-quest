/* List all courses from Firestore.
   Usage:
   - For emulator: export FIRESTORE_EMULATOR_HOST=localhost:8080 and optionally GCLOUD_PROJECT
   - For prod: export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/to/serviceAccount.json (or FIREBASE_SERVICE_ACCOUNT)
   - node scripts/listCourses.js
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

async function listCourses() {
  const snapshot = await db.collection('courses').get();
  
  if (snapshot.empty) {
    console.log('No courses found in database.');
    return;
  }

  console.log(`\n📚 Found ${snapshot.size} course(s):\n`);
  
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`Name: ${data.name || data.title || 'N/A'}`);
    console.log(`Description: ${data.description || 'N/A'}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    console.log('---');
  });
}

listCourses()
  .then(() => { console.log('✅ Done'); process.exit(0); })
  .catch((e) => { console.error('❌ Failed to list courses', e); process.exit(1); });
