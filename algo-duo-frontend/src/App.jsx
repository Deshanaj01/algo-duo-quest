import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Problems from './pages/Problems';
import ProblemSolve from './pages/ProblemSolve';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                
                <Route path="/modules" element={
                  <PrivateRoute>
                    <Modules />
                  </PrivateRoute>
                } />
                
                <Route path="/modules/:moduleId/problems" element={
                  <PrivateRoute>
                    <Problems />
                  </PrivateRoute>
                } />
                
                <Route path="/problem/:problemId" element={
                  <PrivateRoute>
                    <ProblemSolve />
                  </PrivateRoute>
                } />
                
                <Route path="/leaderboard" element={
                  <PrivateRoute>
                    <Leaderboard />
                  </PrivateRoute>
                } />
                
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                
                <Route path="/analytics" element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              </main>
              <Footer />
              <Toaster position="top-right" />
            </div>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;