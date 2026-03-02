const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const config = {};

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    config.credential = admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    );
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    config.credential = admin.credential.applicationDefault();
  } else {
    config.projectId = process.env.FIREBASE_PROJECT_ID || 'algo-duo-quest-37286300-b56fc';
  }

  admin.initializeApp(config);
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

module.exports = { admin, adminDb, adminAuth };
