# Leaderboard System Setup Guide

## Overview
The leaderboard system displays top users ranked by XP, level, or streak. It fetches data directly from the Firebase Firestore `users` collection.

## Features
- **Multiple Sorting Options**: View leaderboard by XP, Level, or Streak
- **Customizable Display**: Show top 10, 25, 50, or 100 users
- **Current User Highlighting**: Your position is highlighted in the leaderboard
- **Real-time Data**: Fetches latest user statistics from Firebase
- **Responsive Design**: Works on all screen sizes with a beautiful gradient UI

## Required Firebase Indexes

For the leaderboard queries to work efficiently, you need to create the following indexes in Firebase Firestore:

### Method 1: Deploy via Firebase CLI (Recommended)

1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init firestore
   ```

4. Deploy the indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```

The indexes are already configured in `firestore.indexes.json`.

### Method 2: Create Indexes Manually in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `algo-duo-quest-37286300-b56fc`
3. Navigate to Firestore Database > Indexes
4. Create the following composite indexes:

#### Index 1: Level + XP (for sorting by level)
- Collection: `users`
- Fields:
  - `level` - Descending
  - `xp` - Descending
- Query Scope: Collection

#### Index 2: XP (for sorting by XP)
- Collection: `users`
- Fields:
  - `xp` - Descending
- Query Scope: Collection

#### Index 3: Streak (for sorting by streak)
- Collection: `users`
- Fields:
  - `streak.current` - Descending
- Query Scope: Collection

## User Data Structure

The leaderboard expects the following fields in the `users` collection:

```typescript
{
  uid: string;              // User ID (document ID)
  name: string;             // Display name
  photoURL?: string;        // Profile photo URL
  xp: number;               // Total XP earned
  level: number;            // Current level
  streak?: {
    current: number;        // Current login streak
    longest: number;        // Longest streak achieved
    lastLoginDate: string;  // Last login timestamp
  };
  email?: string;
  // ... other fields
}
```

## Component Usage

### Basic Usage
```tsx
import Leaderboard from './components/Leaderboard';

function App() {
  return <Leaderboard />;
}
```

### Features in the UI
1. **Filter Buttons**: Click to sort by XP, Level, or Streak
2. **Dropdown**: Select how many top users to display
3. **Rank Indicators**: Top 3 users get medal emojis (🥇🥈🥉)
4. **User Highlighting**: Your row is highlighted with a purple background
5. **Avatar Fallback**: Uses placeholder if user has no profile photo

## API Functions

### `getLeaderboard(maxResults: number)`
Fetches top users sorted by XP.

```typescript
import { getLeaderboard } from '../services/firestoreService';

const leaders = await getLeaderboard(25);
```

### `getLeaderboardByLevel(maxResults: number)`
Fetches top users sorted by level, then XP.

```typescript
import { getLeaderboardByLevel } from '../services/firestoreService';

const leaders = await getLeaderboardByLevel(50);
```

### `getLeaderboardByStreak(maxResults: number)`
Fetches top users sorted by current streak.

```typescript
import { getLeaderboardByStreak } from '../services/firestoreService';

const leaders = await getLeaderboardByStreak(10);
```

## Troubleshooting

### Index Required Error
If you see an error like "The query requires an index", click the error link to automatically create the index in Firebase Console, or deploy via CLI.

### No Data Showing
- Ensure users have been created in Firestore with valid data
- Check that `xp`, `level`, and `streak.current` fields exist
- Verify Firebase connection in `firebase.ts`

### Slow Performance
- Ensure indexes are created (see above)
- Consider caching leaderboard data
- Implement pagination for large datasets

## Updating User Stats

To update user statistics that appear on the leaderboard:

```typescript
import { updateXP } from '../services/firestoreService';

// Award XP (automatically updates level)
await updateXP(userId, 50);
```

Streak updates should be handled in your authentication flow:

```typescript
// In your login/auth handler
const userRef = doc(db, 'users', userId);
await updateDoc(userRef, {
  'streak.current': increment(1),
  'streak.lastLoginDate': new Date().toISOString()
});
```

## Customization

### Styling
The component uses Tailwind CSS. Modify classes in `Leaderboard.tsx`:
- Background gradient: `bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900`
- Card styling: `bg-gray-800/50 backdrop-blur-sm`
- Highlight color: `bg-purple-900/30 border-purple-500`

### Limits
Change default limits in the dropdown:
```tsx
<option value={10}>Top 10</option>
<option value={25}>Top 25</option>
<option value={50}>Top 50</option>
<option value={100}>Top 100</option>
```

## Future Enhancements
- [ ] Add real-time updates using Firestore listeners
- [ ] Implement user rank history tracking
- [ ] Add time-based leaderboards (daily, weekly, monthly)
- [ ] Include more statistics (accuracy, problems solved)
- [ ] Add search/filter by username
- [ ] Implement pagination for large leaderboards
- [ ] Add animations for rank changes
