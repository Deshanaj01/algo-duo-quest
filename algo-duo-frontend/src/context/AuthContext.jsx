// 
// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // MOCK USER DATA - Remove this when backend is ready
  const mockUser = {
    _id: '123456',
    username: 'demo_user',
    email: 'demo@codepilot.com',
    level: 5,
    totalXP: 1250,
    streak: 7,
    createdAt: new Date().toISOString()
  };

  // Initialize with mock user for development
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development

  useEffect(() => {
    // Skip API check in development
    setLoading(false);
  }, []);

  const checkAuth = async () => {
    // Mock implementation
    setLoading(false);
  };

  const login = async (credentials) => {
    // Mock login - always succeeds
    toast.success('Login successful! (Mock Mode)');
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = async (userData) => {
    // Mock register - always succeeds
    toast.success('Registration successful! (Mock Mode)');
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = async () => {
    toast.success('Logged out successfully');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};