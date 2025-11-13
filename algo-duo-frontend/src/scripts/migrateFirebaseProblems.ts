/**
 * Firebase Migration Script
 * 
 * This script migrates existing problem documents in Firebase to include:
 * - concept: Main technique/pattern
 * - objective: One-line learning goal
 * - estimatedTime: Time in minutes
 * 
 * Run this once to update all existing problems
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAllRestructuredProblems } from '../data/complete-restructured-arrays';

// Firebase config (update with your credentials)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface FirebaseProblemUpdate {
  concept?: string;
  objective?: string;
  estimatedTime?: number;
}

/**
 * Main migration function
 */
export async function migrateProblems() {
  console.log('🚀 Starting Firebase problem migration...\n');
  
  try {
    // Get all problems from restructured curriculum
    const restructuredProblems = getAllRestructuredProblems();
    console.log(`📦 Found ${restructuredProblems.length} problems in restructured curriculum\n`);
    
    // Create a map for quick lookups
    const problemMap = new Map(
      restructuredProblems.map(p => [p.id, p])
    );
    
    // Get existing problems from Firebase
    const problemsRef = collection(db, 'problems');
    const problemsSnapshot = await getDocs(problemsRef);
    
    console.log(`🔍 Found ${problemsSnapshot.size} problems in Firebase\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Update each problem
    for (const problemDoc of problemsSnapshot.docs) {
      const problemId = problemDoc.id;
      const existingData = problemDoc.data();
      
      // Find corresponding problem in restructured curriculum
      const restructuredProblem = problemMap.get(problemId);
      
      if (!restructuredProblem) {
        console.log(`⚠️  Problem "${problemId}" not found in restructured curriculum, skipping...`);
        skippedCount++;
        continue;
      }
      
      // Prepare update data
      const updateData: FirebaseProblemUpdate = {};
      
      if (restructuredProblem.concept) {
        updateData.concept = restructuredProblem.concept;
      }
      
      if (restructuredProblem.objective) {
        updateData.objective = restructuredProblem.objective;
      }
      
      if (restructuredProblem.estimatedTime) {
        updateData.estimatedTime = restructuredProblem.estimatedTime;
      }
      
      // Only update if there are new fields
      if (Object.keys(updateData).length === 0) {
        console.log(`  ↪️  "${problemId}" already up to date`);
        skippedCount++;
        continue;
      }
      
      try {
        // Update the document
        await updateDoc(doc(db, 'problems', problemId), updateData);
        
        console.log(`✅ Updated "${problemId}":`);
        console.log(`   Concept: ${updateData.concept || 'N/A'}`);
        console.log(`   Objective: ${updateData.objective || 'N/A'}`);
        console.log(`   Time: ${updateData.estimatedTime || 'N/A'} min\n`);
        
        updatedCount++;
      } catch (error) {
        console.error(`❌ Error updating "${problemId}":`, error);
        errorCount++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Updated: ${updatedCount} problems`);
    console.log(`↪️  Skipped: ${skippedCount} problems`);
    console.log(`❌ Errors: ${errorCount} problems`);
    console.log('='.repeat(50) + '\n');
    
    if (errorCount === 0) {
      console.log('🎉 Migration completed successfully!\n');
    } else {
      console.log('⚠️  Migration completed with some errors. Please review.\n');
    }
    
    return {
      success: errorCount === 0,
      updated: updatedCount,
      skipped: skippedCount,
      errors: errorCount
    };
    
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    throw error;
  }
}

/**
 * Verify migration by checking a sample of problems
 */
export async function verifyMigration() {
  console.log('🔍 Verifying migration...\n');
  
  try {
    const problemsRef = collection(db, 'problems');
    const problemsSnapshot = await getDocs(problemsRef);
    
    let withConcept = 0;
    let withObjective = 0;
    let withEstimatedTime = 0;
    
    problemsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.concept) withConcept++;
      if (data.objective) withObjective++;
      if (data.estimatedTime) withEstimatedTime++;
    });
    
    const total = problemsSnapshot.size;
    
    console.log('📊 Verification Results:');
    console.log(`  Total problems: ${total}`);
    console.log(`  With concept: ${withConcept} (${Math.round(withConcept/total*100)}%)`);
    console.log(`  With objective: ${withObjective} (${Math.round(withObjective/total*100)}%)`);
    console.log(`  With estimatedTime: ${withEstimatedTime} (${Math.round(withEstimatedTime/total*100)}%)`);
    
    if (withConcept === total && withObjective === total && withEstimatedTime === total) {
      console.log('\n✅ All problems successfully migrated!\n');
      return true;
    } else {
      console.log('\n⚠️  Some problems are missing new fields.\n');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
    return false;
  }
}

/**
 * Rollback migration (remove new fields)
 * Use with caution!
 */
export async function rollbackMigration() {
  console.log('⚠️  Starting rollback...\n');
  
  const confirmation = confirm(
    'This will remove concept, objective, and estimatedTime fields from all problems. Continue?'
  );
  
  if (!confirmation) {
    console.log('Rollback cancelled.\n');
    return;
  }
  
  try {
    const problemsRef = collection(db, 'problems');
    const problemsSnapshot = await getDocs(problemsRef);
    
    let rolledBack = 0;
    
    for (const problemDoc of problemsSnapshot.docs) {
      await updateDoc(doc(db, 'problems', problemDoc.id), {
        concept: null,
        objective: null,
        estimatedTime: null
      });
      rolledBack++;
    }
    
    console.log(`✅ Rolled back ${rolledBack} problems\n`);
    
  } catch (error) {
    console.error('❌ Error during rollback:', error);
    throw error;
  }
}

// Export for command-line usage
if (require.main === module) {
  (async () => {
    try {
      // Run migration
      await migrateProblems();
      
      // Verify
      await verifyMigration();
      
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  })();
}
