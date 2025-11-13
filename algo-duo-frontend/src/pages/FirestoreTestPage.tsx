import React from 'react';
import FirestoreTest from '../components/FirestoreTest';

const FirestoreTestPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Firestore Integration Test
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        This page tests the Firebase Firestore integration for user XP, levels, and performance tracking.
        Create a test user and try the different functions to see real-time updates.
      </p>
      <FirestoreTest />
    </div>
  );
};

export default FirestoreTestPage;