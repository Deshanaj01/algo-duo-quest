# Database Scripts

This directory contains scripts for managing the Firestore database for Algo Duo Quest.

## Setup

### For Production Firestore
```bash
export FIREBASE_SERVICE_ACCOUNT=/path/to/serviceAccountKey.json
```

### For Local Emulator
```bash
export FIRESTORE_EMULATOR_HOST=localhost:8080
```

## Available Scripts

### Seeding Data

#### `npm run seed`
Seeds the complete course structure with levels and lessons to Firestore.
- Creates the `arrays` course
- Adds 2 levels with lessons and quizzes
- Creates a demo user with progress

```bash
npm run seed
```

#### `npm run add:lessons`
Adds 4 new coding challenge lessons to level-3:
- Two Sum Challenge (easy, 100 XP)
- Maximum Subarray / Kadane's Algorithm (medium, 120 XP)
- Trapping Rain Water (hard, 150 XP)
- Container With Most Water (medium, 120 XP)

```bash
npm run add:lessons
```

### Viewing Data

#### `npm run list:courses`
Lists all courses in the database with their details.

```bash
npm run list:courses
```

#### `npm run list:questions`
Lists all questions in the questions collection (if it exists).

```bash
npm run list:questions
```

### Cleaning Data

#### `npm run delete:questions`
Deletes all documents from the `questions` collection.
⚠️ **Warning**: This is destructive and cannot be undone!

```bash
npm run delete:questions
```

## Database Structure

### Courses Collection
```
courses/{courseId}
  ├── id: string
  ├── title: string
  ├── description: string
  ├── xpReward: number
  ├── levelCount: number
  ├── icon: string
  └── levels (subcollection)
      └── {levelId}
          ├── id: string
          ├── title: string
          ├── description: string
          ├── xpReward: number
          ├── difficulty: string
          ├── isUnlocked: boolean
          └── lessons (subcollection)
              └── {lessonId}
                  ├── id: string
                  ├── title: string
                  ├── content: string
                  ├── exampleCode: string
                  ├── xpReward: number
                  ├── difficulty: string
                  ├── hints: string[]
                  ├── tags: string[]
                  ├── testCases: object[]
                  └── starterCode: string
```

## Coding Challenge Lessons

The new coding challenge lessons added to level-3 include:

### 1. Two Sum Challenge
- **Difficulty**: Easy
- **Duration**: 25 min
- **XP**: 100
- **Topics**: Hash maps, Arrays
- **Description**: Find two numbers in an array that add up to a target value

### 2. Maximum Subarray (Kadane's Algorithm)
- **Difficulty**: Medium
- **Duration**: 30 min
- **XP**: 120
- **Topics**: Dynamic Programming, Arrays
- **Description**: Find the contiguous subarray with the largest sum

### 3. Trapping Rain Water
- **Difficulty**: Hard
- **Duration**: 40 min
- **XP**: 150
- **Topics**: Two Pointers, Arrays
- **Description**: Calculate how much rainwater can be trapped between elevation bars

### 4. Container With Most Water
- **Difficulty**: Medium
- **Duration**: 30 min
- **XP**: 120
- **Topics**: Two Pointers, Greedy, Arrays
- **Description**: Find two lines that form a container holding the most water

## Development Workflow

1. **Initial Setup**: Run `npm run seed` to create the base course structure
2. **Add Challenges**: Run `npm run add:lessons` to add coding challenges
3. **View Data**: Use `npm run list:courses` to verify the data
4. **Clean Up**: If needed, use `npm run delete:questions` to remove old data

## Notes

- All scripts support both production Firestore and the local emulator
- Scripts use merge operations to avoid overwriting existing data
- Test cases are included with each coding challenge
- Each lesson has multiple hints to guide learners
