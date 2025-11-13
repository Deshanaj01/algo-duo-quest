import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase.ts';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAllProblems } from '../data/unified-arrays-master.ts';
import comprehensiveCurriculum from '../data/comprehensive-arrays-curriculum.ts';
import { batchAddProblems } from '../services/firestoreService.ts';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Database, Upload } from 'lucide-react';

interface MigrationResult {
  updated: number;
  skipped: number;
  errors: number;
  logs: string[];
}

const MigrateProblemsPage: React.FC = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [isPopulating, setIsPopulating] = useState(false);
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [populateResult, setPopulateResult] = useState<{ success: number; failed: number } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [populateLogs, setPopulateLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const addPopulateLog = (message: string) => {
    setPopulateLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const populateFirebase = async () => {
    setIsPopulating(true);
    setPopulateResult(null);
    setPopulateLogs([]);

    addPopulateLog('🚀 Starting Firebase population...');

    try {
      // Get all problems from comprehensive curriculum
      const allProblems: any[] = [];
      
      // Extract all problems from all levels (using subtopics)
      comprehensiveCurriculum.levels.forEach(level => {
        level.subtopics.forEach(subtopic => {
          subtopic.problems.forEach(problem => {
            // Add basic metadata if missing
            allProblems.push({
              ...problem,
              concept: problem.concept || subtopic.name,
              objective: problem.objective || problem.learningObjective,
              description: problem.description || problem.learningObjective,
              estimatedTime: problem.estimatedTime || 30
            });
          });
        });
      });
      
      addPopulateLog(`📦 Found ${allProblems.length} problems in comprehensive curriculum`);

      addPopulateLog('⬆️  Uploading problems to Firebase...');
      const result = await batchAddProblems(allProblems);

      setPopulateResult(result);
      
      addPopulateLog('');
      addPopulateLog('='.repeat(50));
      addPopulateLog(`✅ Successfully added: ${result.success} problems`);
      addPopulateLog(`❌ Failed: ${result.failed} problems`);
      addPopulateLog('='.repeat(50));
      
      if (result.failed === 0) {
        addPopulateLog('🎉 Population completed successfully!');
      } else {
        addPopulateLog('⚠️  Population completed with errors');
      }

    } catch (error: any) {
      addPopulateLog(`💥 Fatal error: ${error.message}`);
      setPopulateResult({ success: 0, failed: 1 });
    } finally {
      setIsPopulating(false);
    }
  };

  const migrateProblems = async () => {
    setIsMigrating(true);
    setResult(null);
    setLogs([]);

    addLog('🚀 Starting migration...');

    try {
      // Get unified problems
      const unifiedProblems = getAllProblems();
      addLog(`📦 Found ${unifiedProblems.length} problems in unified curriculum`);

      // Create map for quick lookup
      const problemMap = new Map(
        unifiedProblems.map(p => [p.id, p])
      );

      // Get Firebase problems
      const problemsRef = collection(db, 'problems');
      const problemsSnapshot = await getDocs(problemsRef);
      
      addLog(`🔍 Found ${problemsSnapshot.size} problems in Firebase`);

      let updated = 0;
      let skipped = 0;
      let errors = 0;

      // Update each problem
      for (const problemDoc of problemsSnapshot.docs) {
        const problemId = problemDoc.id;
        const unifiedProblem = problemMap.get(problemId);

        if (!unifiedProblem) {
          addLog(`⚠️  "${problemId}" not in unified curriculum`);
          skipped++;
          continue;
        }

        const updateData: any = {};

        if (unifiedProblem.concept) {
          updateData.concept = unifiedProblem.concept;
        }

        if (unifiedProblem.objective) {
          updateData.objective = unifiedProblem.objective;
        }

        if (unifiedProblem.estimatedTime) {
          updateData.estimatedTime = unifiedProblem.estimatedTime;
        }

        if (Object.keys(updateData).length === 0) {
          skipped++;
          continue;
        }

        try {
          await updateDoc(doc(db, 'problems', problemId), updateData);
          addLog(`✅ Updated "${problemId}"`);
          updated++;
        } catch (error: any) {
          addLog(`❌ Error updating "${problemId}": ${error.message}`);
          errors++;
        }
      }

      const finalResult = { updated, skipped, errors, logs };
      setResult(finalResult);
      
      addLog('');
      addLog('='.repeat(50));
      addLog(`✅ Updated: ${updated} problems`);
      addLog(`↪️  Skipped: ${skipped} problems`);
      addLog(`❌ Errors: ${errors} problems`);
      addLog('='.repeat(50));
      
      if (errors === 0) {
        addLog('🎉 Migration completed successfully!');
      } else {
        addLog('⚠️  Migration completed with errors');
      }

    } catch (error: any) {
      addLog(`💥 Fatal error: ${error.message}`);
      setResult({ updated: 0, skipped: 0, errors: 1, logs });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Database className="w-10 h-10 text-blue-400" />
            Firebase Data Management
          </h1>
          <p className="text-gray-400">
            Populate Firebase with unified curriculum data or migrate existing problems
          </p>
        </div>

        {/* Populate Firebase Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-400" />
            Populate Firebase with Unified Curriculum
          </h2>
          <p className="text-gray-300 mb-4">
            Upload all problems from the comprehensive-arrays-curriculum.ts to Firebase.
            This includes all 50+ problems organized by difficulty level and topic.
          </p>
          
          <motion.button
            whileHover={{ scale: isPopulating ? 1 : 1.02 }}
            whileTap={{ scale: isPopulating ? 1 : 0.98 }}
            onClick={populateFirebase}
            disabled={isPopulating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3"
          >
            <Upload className={`w-5 h-5 ${isPopulating ? 'animate-bounce' : ''}`} />
            {isPopulating ? 'Populating...' : 'Populate Firebase'}
          </motion.button>

          {/* Populate Results */}
          {populateResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Success</span>
                </div>
                <div className="text-3xl font-bold text-green-400">{populateResult.success}</div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-gray-400">Failed</span>
                </div>
                <div className="text-3xl font-bold text-red-400">{populateResult.failed}</div>
              </div>
            </motion.div>
          )}

          {/* Populate Logs */}
          {populateLogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-y-auto"
            >
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                {populateLogs.join('\n')}
              </pre>
            </motion.div>
          )}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Migration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-blue-400" />
            Migrate Existing Problems
          </h2>
          <p className="text-gray-300 mb-4">
            Update existing Firebase problems to include concept, objective, and estimatedTime fields.
          </p>

          {/* Warning */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">Important Notes:</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• This will update ALL problems in your Firebase database</li>
                  <li>• Existing fields will NOT be overwritten</li>
                  <li>• Only new fields (concept, objective, estimatedTime) will be added</li>
                  <li>• The operation is safe and can be run multiple times</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Migration Button */}
          <motion.button
            whileHover={{ scale: isMigrating ? 1 : 1.02 }}
            whileTap={{ scale: isMigrating ? 1 : 0.98 }}
            onClick={migrateProblems}
            disabled={isMigrating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3"
          >
            <RefreshCw className={`w-5 h-5 ${isMigrating ? 'animate-spin' : ''}`} />
            {isMigrating ? 'Migrating...' : 'Start Migration'}
          </motion.button>

          {/* Results Summary */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-4 mt-4"
            >
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Updated</span>
                </div>
                <div className="text-3xl font-bold text-green-400">{result.updated}</div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Skipped</span>
                </div>
                <div className="text-3xl font-bold text-yellow-400">{result.skipped}</div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-gray-400">Errors</span>
                </div>
                <div className="text-3xl font-bold text-red-400">{result.errors}</div>
              </div>
            </motion.div>
          )}

          {/* Logs */}
          {logs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-y-auto"
            >
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                {logs.join('\n')}
              </pre>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default MigrateProblemsPage;
