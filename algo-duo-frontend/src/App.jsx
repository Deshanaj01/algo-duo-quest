import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// AlgoVisual Pages
import AlgoVisualHome from './pages/AlgoVisualHome';
import AlgoVisualTopics from './pages/AlgoVisualTopics';
import AlgoVisualProgress from './pages/AlgoVisualProgress';
import AlgoVisualDailyChallenge from './pages/AlgoVisualDailyChallenge';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <Routes>
              {/* AlgoVisual Routes (New UI) - No navbar/footer needed */}
              <Route path="/" element={<AlgoVisualHome />} />
              <Route path="/topics" element={<AlgoVisualTopics />} />
              <Route path="/progress" element={<AlgoVisualProgress />} />
              <Route path="/daily-challenge" element={<AlgoVisualDailyChallenge />} />
              
              {/* Original Routes with Navbar/Footer */}
              <Route path="/login" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Login />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/register" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Register />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Dashboard />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/modules" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Modules />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/modules/:moduleId/problems" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Problems />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/problem/:problemId" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <ProblemSolve />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/leaderboard" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Leaderboard />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Profile />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="/analytics" element={
                <PrivateRoute>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                      <Analytics />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;