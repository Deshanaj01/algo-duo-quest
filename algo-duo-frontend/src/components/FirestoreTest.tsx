import React, { useState } from 'react';
import { useFirestoreUser } from '../hooks/useFirestoreUser';
import { useAuth } from '../context/AuthContext'; // Assuming you have this
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  signInAnonymously, 
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../firebase';

const FirestoreTest: React.FC = () => {
  const [testUser, setTestUser] = useState<User | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  // Use either the authenticated user or test user
  const currentUser = testUser;
  
  const {
    profile,
    loading,
    error,
    addXP,
    recordPerformance,
    refreshData,
    getLevelProgress
  } = useFirestoreUser(currentUser);

  const [isUpdating, setIsUpdating] = useState(false);

  // Create a dummy anonymous user for testing
  const createTestUser = async () => {
    setIsCreatingUser(true);
    try {
      const result = await signInAnonymously(auth);
      setTestUser(result.user);
      console.log('Test user created:', result.user.uid);
    } catch (error) {
      console.error('Error creating test user:', error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Sign out the test user
  const signOutTestUser = async () => {
    try {
      await signOut(auth);
      setTestUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Test adding XP
  const testAddXP = async (amount: number) => {
    setIsUpdating(true);
    try {
      const result = await addXP(amount);
      console.log('XP Update Result:', result);
      
      if (result.leveledUp) {
        alert(`🎉 Level Up! You reached level ${result.newLevel}!`);
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Test recording performance
  const testPerformance = async (topic: string, correct: boolean) => {
    setIsUpdating(true);
    try {
      await recordPerformance(topic, correct);
      console.log(`Recorded ${correct ? 'correct' : 'incorrect'} answer for ${topic}`);
    } catch (error) {
      console.error('Error recording performance:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Test level-up by adding enough XP
  const testLevelUp = async () => {
    if (!profile) return;
    
    const { xpToNextLevel } = getLevelProgress();
    await testAddXP(xpToNextLevel + 10); // Add enough XP to level up + extra
  };

  if (!currentUser) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Firestore Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Create a test user to test Firestore integration with XP and levels.
          </p>
          <Button 
            onClick={createTestUser} 
            disabled={isCreatingUser}
            className="w-full"
          >
            {isCreatingUser ? 'Creating...' : 'Create Test User'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-center">Loading user data...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Error: {error}
            <Button onClick={refreshData} className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-center">No user profile found</div>
        </CardContent>
      </Card>
    );
  }

  const levelProgress = getLevelProgress();
  const progressPercentage = (levelProgress.currentLevelXP / 100) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-6">
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Firestore Test Dashboard
            <Badge variant="outline">Level {profile.level}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p><strong>User ID:</strong> {profile.uid}</p>
              <p><strong>Total XP:</strong> {profile.xp}</p>
              <p><strong>Level:</strong> {profile.level}</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Level Progress</span>
                <span>{levelProgress.currentLevelXP}/100 XP</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
              <p className="text-xs text-gray-500 mt-1">
                {levelProgress.xpToNextLevel} XP to next level
              </p>
            </div>
            
            <Button 
              onClick={signOutTestUser} 
              variant="outline" 
              size="sm"
            >
              Sign Out Test User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* XP Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle>XP Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => testAddXP(10)} 
              disabled={isUpdating}
              size="sm"
            >
              +10 XP
            </Button>
            <Button 
              onClick={() => testAddXP(25)} 
              disabled={isUpdating}
              size="sm"
            >
              +25 XP
            </Button>
            <Button 
              onClick={() => testAddXP(50)} 
              disabled={isUpdating}
              size="sm"
            >
              +50 XP
            </Button>
            <Button 
              onClick={testLevelUp} 
              disabled={isUpdating}
              size="sm"
              variant="secondary"
            >
              Level Up!
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button 
                onClick={() => testPerformance('arrays', true)}
                disabled={isUpdating}
                size="sm"
                variant="outline"
              >
                Arrays ✓
              </Button>
              <Button 
                onClick={() => testPerformance('arrays', false)}
                disabled={isUpdating}
                size="sm"
                variant="destructive"
              >
                Arrays ✗
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => testPerformance('strings', true)}
                disabled={isUpdating}
                size="sm"
                variant="outline"
              >
                Strings ✓
              </Button>
              <Button 
                onClick={() => testPerformance('dynamic_programming', false)}
                disabled={isUpdating}
                size="sm"
                variant="destructive"
              >
                DP ✗
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Performance Display */}
      {Object.keys(profile.topic_performance).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Topic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(profile.topic_performance).map(([topic, perf]) => (
                perf.total > 0 && (
                  <div key={topic} className="flex justify-between items-center">
                    <span className="capitalize">{topic.replace('_', ' ')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {perf.correct}/{perf.total}
                      </span>
                      <Badge variant={perf.accuracy >= 80 ? "default" : perf.accuracy >= 60 ? "secondary" : "destructive"}>
                        {perf.accuracy}%
                      </Badge>
                    </div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weak Areas */}
      {profile.weak_areas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Weak Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.weak_areas.map((area) => (
                <Badge key={area} variant="destructive">
                  {area.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FirestoreTest;