// Utility to initialize AI Tutor sample data for testing
import { initializeSampleQuestions, initializeSampleMLInsights } from '../services/questionService';

/**
 * Initialize all sample data for AI Tutor testing
 * This includes:
 * 1. Sample questions with AI tutor context
 * 2. Sample ML insights for user learning patterns
 * 3. Firebase collections: questions, ml_insights, users
 */
export async function initializeAITutorTestData() {
  console.log('🚀 Initializing AI Tutor test data...');
  
  try {
    // Initialize sample questions
    console.log('📚 Creating sample questions...');
    await initializeSampleQuestions();
    
    // Initialize sample ML insights
    console.log('🧠 Creating sample ML insights...');
    await initializeSampleMLInsights();
    
    console.log('✅ AI Tutor test data initialized successfully!');
    console.log('📊 You can now test:');
    console.log('   - Personalized recommendations');
    console.log('   - Adaptive hint system');
    console.log('   - Learning pattern analysis');
    console.log('   - Progress tracking');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize AI Tutor test data:', error);
    return false;
  }
}

/**
 * Test AI Tutor functionality with sample user
 */
export async function testAITutorFunctions() {
  const { getPersonalizedRecommendations, getAdaptiveHint } = await import('../services/questionService');
  
  try {
    console.log('🧪 Testing AI Tutor functions...');
    
    // Test personalized recommendations
    console.log('📈 Testing personalized recommendations...');
    const recommendations = await getPersonalizedRecommendations('user123', 'arrays');
    console.log('Recommendations:', recommendations);
    
    // Test adaptive hint system
    console.log('💡 Testing adaptive hint system...');
    const hint = await getAdaptiveHint('sample-question-id', 'user123', 2);
    console.log('Adaptive hint:', hint);
    
    console.log('✅ AI Tutor functions tested successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to test AI Tutor functions:', error);
    return false;
  }
}

/**
 * Usage instructions for developers
 */
export const USAGE_INSTRUCTIONS = `
🎯 AI TUTOR TESTING GUIDE

1. Initialize Test Data:
   import { initializeAITutorTestData } from './utils/initializeAITutorData';
   await initializeAITutorTestData();

2. Test Core Functions:
   import { testAITutorFunctions } from './utils/initializeAITutorData';
   await testAITutorFunctions();

3. Available AI Tutor Features:
   ✨ Personalized Recommendations - Based on learning patterns
   💡 Adaptive Hints - Progressive difficulty hints
   📊 Learning Analytics - Track struggles and improvements
   🎯 Concept Mapping - Link related problems and concepts
   🚀 Performance Insights - Time, attempts, and success rates

4. Database Collections Created:
   📚 questions - Problem statements with AI context
   🧠 ml_insights - User learning and performance data
   👤 users - User profiles and progress

5. Testing Scenarios:
   - Complete beginner (Level 1-2)
   - Intermediate learner (Level 3-4) 
   - Advanced problem solver (Level 4-5)
   - Interview preparation mode
   - Struggling with specific concepts

6. Firebase Collections Structure:
   questions/
   ├── title, description, difficulty
   ├── hints[], solution, explanation
   ├── testCases[], tags[]
   └── aiTutorContext/
       ├── conceptsRequired[]
       ├── commonMistakes[]
       ├── learningObjectives[]
       └── relatedProblems[]
   
   ml_insights/
   ├── userId, questionId
   ├── attempts, timeSpent, score
   ├── hintsUsed[], mistakePatterns[]
   ├── conceptsStruggled[]
   └── timestamp, completed

Remember to enable Firebase Authentication and Firestore in your project!
`;

// Export usage instructions for console logging
if (typeof window !== 'undefined') {
  console.log(USAGE_INSTRUCTIONS);
}