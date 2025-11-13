# Firebase Firestore Integration Setup Guide

## 🎯 Overview
Your Algo Duo project is now equipped with Firebase Firestore integration for user XP and level management. This guide will help you complete the setup and test the functionality.

## ✅ What's Been Created

### 1. Updated Firebase Configuration
- **File**: `algo-duo-frontend/src/firebase.ts`
- **Updated**: Project ID to `algo-duo-quest-37286300-b56fc`
- **⚠️ Action Required**: You need to update the `apiKey` and `appId` with your actual Firebase app credentials

### 2. Firestore Types
- **File**: `algo-duo-frontend/src/types/firestore.ts`
- **Contains**: Complete TypeScript interfaces for UserProfile, Question, MLInsight

### 3. Firestore Service
- **File**: `algo-duo-frontend/src/services/firestoreService.ts`
- **Functions**:
  - `getUserData(uid)`: Fetch user stats from Firestore
  - `updateXP(uid, delta)`: Add/subtract XP and recalculate level
  - `updatePerformance(uid, topic, accuracy)`: Track topic-specific performance
  - `subscribeToUserData(uid, callback)`: Real-time updates with onSnapshot
  - Level calculation: **1 level every 100 XP**

### 4. React Hook
- **File**: `algo-duo-frontend/src/hooks/useFirestoreUser.ts`
- **Features**: Real-time user data, XP updates, performance tracking, automatic level-up detection

### 5. Test Components
- **File**: `algo-duo-frontend/src/components/FirestoreTest.tsx`
- **File**: `algo-duo-frontend/src/pages/FirestoreTestPage.tsx`
- **Features**: Complete testing interface with dummy user creation, XP testing, level-up simulation

## 🔧 Setup Steps

### Step 1: Update Firebase Config
1. Go to [Firebase Console](https://console.firebase.google.com/project/algo-duo-quest-37286300-b56fc/settings/general/web)
2. Get your web app config
3. Update `algo-duo-frontend/src/firebase.ts` with the correct `apiKey` and `appId`

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY", // Update this
  authDomain: "algo-duo-quest-37286300-b56fc.firebaseapp.com",
  projectId: "algo-duo-quest-37286300-b56fc",
  storageBucket: "algo-duo-quest-37286300-b56fc.appspot.com",
  messagingSenderId: "802859361739",
  appId: "YOUR_ACTUAL_APP_ID", // Update this
};
```

### Step 2: Create Firestore Database
1. Go to [Firestore Console](https://console.firebase.google.com/project/algo-duo-quest-37286300-b56fc/firestore)
2. Click "Create database"
3. Choose **Production mode**
4. Select your preferred location (e.g., us-central1)

### Step 3: Add Test Route (Optional)
Add the test page to your routing system. If you're using React Router, add:

```typescript
import FirestoreTestPage from './pages/FirestoreTestPage';

// In your router configuration:
<Route path="/firestore-test" element={<FirestoreTestPage />} />
```

### Step 4: Install Missing UI Components
Your test component uses these UI components. Make sure they exist or create basic versions:

- `Button` from `./ui/button`
- `Card`, `CardHeader`, `CardTitle`, `CardContent` from `./ui/card`
- `Badge` from `./ui/badge`
- `Progress` from `./ui/progress`

## 🧪 Testing the Integration

### Method 1: Use the Test Page
1. Navigate to `/firestore-test` (if you added the route)
2. Click "Create Test User" to create an anonymous user
3. Test XP addition with the buttons
4. Test performance recording
5. Watch real-time updates in the UI
6. Check the browser console for detailed logs
7. Verify in Firebase Console that data is being written

### Method 2: Integrate with Existing Components
Use the hook in your existing components:

```typescript
import { useFirestoreUser } from '../hooks/useFirestoreUser';
import { useAuth } from '../context/AuthContext'; // Your auth context

const YourComponent = () => {
  const { user } = useAuth(); // However you get the current user
  const { profile, addXP, recordPerformance, getLevelProgress } = useFirestoreUser(user);
  
  const handleQuestionAnswer = async (topic: string, correct: boolean) => {
    await recordPerformance(topic, correct);
    // XP is automatically awarded in recordPerformance
  };

  const handleLessonComplete = async () => {
    await addXP(50); // Award 50 XP for lesson completion
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Level {profile.level}</h2>
      <p>XP: {profile.xp}</p>
      {/* Your component UI */}
    </div>
  );
};
```

## 📊 Level System Details

- **XP per Level**: 100 XP
- **Level 1**: 0-99 XP
- **Level 2**: 100-199 XP  
- **Level 3**: 200-299 XP
- And so on...

### XP Rewards (Built-in)
- **Correct Answer**: +10 XP
- **Wrong Answer**: +5 XP (for attempting)
- **Custom**: Use `addXP(amount)` for custom rewards

## 🔄 Real-time Features

The integration uses Firestore's `onSnapshot` for real-time updates:
- XP changes are immediately reflected in UI
- Level-ups are detected automatically
- Performance tracking updates in real-time
- Weak areas are automatically calculated

## 🚀 Performance Tracking

The system automatically tracks:
- **Topic Performance**: Correct/total answers per topic
- **Accuracy Calculation**: Percentage accuracy per topic  
- **Weak Areas**: Topics with <60% accuracy (after 3+ attempts)
- **Strong Areas**: Topics with 80%+ accuracy (automatically removed from weak areas)

## 🔧 Troubleshooting

### Common Issues:

1. **"Could not load default credentials"**
   - Make sure Firestore database is created
   - Check Firebase config values are correct

2. **"Permission denied"**
   - Verify Firestore rules are deployed
   - Check user authentication

3. **Real-time updates not working**
   - Check browser console for subscription errors
   - Verify user is authenticated

4. **UI components not found**
   - Install/create the required UI components
   - Use basic HTML elements if needed

### Debug Commands:
```bash
# Check if Firestore rules are deployed
firebase firestore:databases:list

# Deploy Firestore rules
firebase deploy --only firestore

# Check project status
firebase projects:list
```

## 🎉 Testing Checklist

- [ ] Create test user successfully
- [ ] Add XP and see level progress update
- [ ] Trigger level-up (100+ XP gain)
- [ ] Record correct/incorrect answers for topics
- [ ] See topic performance update
- [ ] See weak areas populate (after getting <60% accuracy)
- [ ] Verify data appears in Firebase Console
- [ ] Test real-time updates (open two browser tabs)

## 📝 Next Steps

1. **Complete Firebase setup** (API keys, database creation)
2. **Run the test page** to verify functionality  
3. **Integrate with your existing components**
4. **Add proper error handling and loading states**
5. **Consider adding toast notifications for XP gains/level-ups**
6. **Add proper authentication flow**

Your Firestore integration is ready to go! 🚀