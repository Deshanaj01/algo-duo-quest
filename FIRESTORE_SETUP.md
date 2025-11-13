# Firestore Database Setup Guide

## Summary
Your Firebase project has been configured with Firestore rules and is ready for database creation. Follow these steps to complete the setup.

## Current Status ✅
- ✅ Firebase CLI authenticated as `deshanaj01@gmail.com`
- ✅ Firebase project configured: `algo-duo-quest-37286300-b56fc`
- ✅ Firestore rules deployed successfully
- ✅ Firestore indexes configuration created
- ✅ Seed data structure prepared in `seed.json`

## Manual Steps Required

### 1. Create Firestore Database
1. Open your browser and go to: https://console.firebase.google.com/project/algo-duo-quest-37286300-b56fc/firestore
2. Click "Create database"
3. Choose **Production mode** (as requested)
4. Select location: **us-central1** (or your preferred location)
5. Click "Done"

### 2. Create Collections Manually (Initial Setup)
Once the database is created, you can either:

**Option A: Use the Firebase Console**
1. In the Firestore console, click "Start collection"
2. Create these three collections with sample documents:

#### Collection: `users`
- Document ID: `sample_user_id`
- Fields:
  - `xp` (number): `0`
  - `level` (number): `1` 
  - `topic_performance` (map): `{}`
  - `weak_areas` (array): `[]`
  - `ai_recommendations` (map): `{}`
  - `created_at` (timestamp): [current time]
  - `updated_at` (timestamp): [current time]

#### Collection: `questions`
- Document ID: `sample_question_id`
- Fields:
  - `title` (string): `"Sample Algorithm Problem"`
  - `description` (string): `"This is a sample problem description."`
  - `topic` (string): `"arrays"`
  - `difficulty` (string): `"easy"`
  - `tags` (array): `["array", "two-pointers"]`
  - `hints` (array): `["Consider using two pointers approach"]`
  - `created_at` (timestamp): [current time]
  - `updated_at` (timestamp): [current time]

#### Collection: `ml_insights`
- Document ID: `sample_insight_id`
- Fields:
  - `user_id` (string): `"sample_user_id"`
  - `predicted_weak_topics` (array): `["dynamic_programming", "graphs"]`
  - `suggested_difficulty` (string): `"medium"`
  - `confidence_score` (number): `0.85`
  - `generated_at` (timestamp): [current time]

**Option B: Import Seed Data (After Authentication Setup)**
If you prefer to use the seed data programmatically:
1. Set up Google Cloud credentials (see Authentication section below)
2. Run: `node setup-firestore.cjs`

### 3. Verify Database Setup
Once created, you can verify by running:
```bash
firebase firestore:databases:list
```

## Authentication Setup (For Programmatic Access)
If you want to use the `setup-firestore.cjs` script, you'll need to set up authentication:

1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts?project=algo-duo-quest-37286300-b56fc
2. Create a service account
3. Download the JSON key file
4. Set environment variable: `export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"`
5. Run: `node setup-firestore.cjs`

## Project Structure Created
- `firebase.json` - Firebase project configuration
- `firestore.rules` - Security rules for Firestore
- `firestore.indexes.json` - Index configuration
- `seed.json` - Sample data structure
- `setup-firestore.cjs` - Automated setup script (requires auth)

## Next Steps
1. Create the Firestore database (step 1 above)
2. Add collections and sample data (step 2 above)
3. Start building your AI Tutor application!

## Useful Commands
```bash
# Deploy rules and indexes
firebase deploy --only firestore

# List databases
firebase firestore:databases:list

# Open Firebase console
open "https://console.firebase.google.com/project/algo-duo-quest-37286300-b56fc/firestore"
```