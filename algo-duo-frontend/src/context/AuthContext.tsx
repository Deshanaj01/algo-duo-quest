import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase.ts';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace createOrUpdateUser with saveUserToFirestore
  const saveUserToFirestore = async (user: User) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          email: user.email,
          photoURL: user.photoURL || null,
          currentLevel: 1,
          xp: 0,
          lastQuestionId: null,
          createdAt: new Date(),
          lastLogin: new Date() // Add last login time
        },
        { merge: true }
      );
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      throw error;
    }
  };

  // Update Google Sign-In to use saveUserToFirestore
  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user) {
        throw new Error('No user data available');
      }
      await saveUserToFirestore(result.user);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email Sign-In
  const signInWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during email sign-in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Email Sign-Up to use saveUserToFirestore
  const signUpWithEmail = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (!userCredential.user) {
        throw new Error('No user data available');
      }
      await saveUserToFirestore(userCredential.user);
    } catch (error: any) {
      console.error('Error during email sign-up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  };

  // Update auth state listener to save user data on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await saveUserToFirestore(user);
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};