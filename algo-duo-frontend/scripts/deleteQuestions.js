/* Delete all documents from the questions collection.
   Usage:
   - For emulator: export FIRESTORE_EMULATOR_HOST=localhost:8080 and optionally GCLOUD_PROJECT
   - For prod: export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/to/serviceAccount.json (or FIREBASE_SERVICE_ACCOUNT)
   - node scripts/deleteQuestions.js
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

async function deleteCollection() {
  const snapshot = await db.collection('questions').get();
  
  if (snapshot.empty) {
    console.log('No questions to delete.');
    return;
  }

  console.log(`Deleting ${snapshot.size} question(s)...`);
  
  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log('✅ All questions deleted');
}

deleteCollection()
  .then(() => process.exit(0))
  .catch((e) => { console.error('❌ Failed to delete questions', e); process.exit(1); });
