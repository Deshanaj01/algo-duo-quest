const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
// This will use the default credentials from Firebase CLI
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'algo-duo-quest-37286300-b56fc'
  });
}

const db = admin.firestore();

async function setupFirestore() {
  try {
    console.log('Setting up Firestore database...');
    
    // Read seed data
    const seedData = JSON.parse(fs.readFileSync('./seed.json', 'utf8'));
    
    // Create collections with sample data
    const batch = db.batch();
    
    // Process each collection
    for (const [collectionName, documents] of Object.entries(seedData)) {
      console.log(`Creating collection: ${collectionName}`);
      
      for (const [docId, docData] of Object.entries(documents)) {
        const docRef = db.collection(collectionName).doc(docId);
        
        // Process timestamps
        const processedData = processTimestamps(docData);
        batch.set(docRef, processedData);
        console.log(`  - Added document: ${docId}`);
      }
    }
    
    // Commit the batch
    await batch.commit();
    console.log('✅ Firestore setup completed successfully!');
    
    // Verify the setup
    await verifySetup();
    
  } catch (error) {
    console.error('❌ Error setting up Firestore:', error);
    process.exit(1);
  }
}

function processTimestamps(obj) {
  const processed = { ...obj };
  
  for (const key in processed) {
    if (processed[key] && typeof processed[key] === 'object') {
      if (processed[key].__timestamp === true) {
        processed[key] = admin.firestore.FieldValue.serverTimestamp();
      } else {
        processed[key] = processTimestamps(processed[key]);
      }
    }
  }
  
  return processed;
}

async function verifySetup() {
  console.log('\nVerifying database setup...');
  
  const collections = ['users', 'questions', 'ml_insights'];
  
  for (const collectionName of collections) {
    try {
      const snapshot = await db.collection(collectionName).get();
      console.log(`✅ Collection '${collectionName}': ${snapshot.size} documents`);
    } catch (error) {
      console.error(`❌ Error accessing collection '${collectionName}':`, error.message);
    }
  }
}

// Run the setup
setupFirestore()
  .then(() => {
    console.log('\n🎉 Firestore database setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });