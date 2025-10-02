import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage-broken.tsx';
// import TopicPage from './pages/TopicPage';
import LessonPage from './pages/LessonPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import AchievementsPage from './pages/AchievementsPage.tsx';
import DailyChallengePage from './pages/DailyChallengePage.tsx';
import CodePlayground from './pages/CodePlayground.tsx';
import ProgressPage from './pages/ProgressPage.tsx';
import NotFound from './pages/NotFound.tsx';
import ArrayCoursePage from './pages/ArrayCoursePage.tsx';
import PlaygroundPage from './pages/PlaygroundPage.tsx';
import RevisionTestPage from './pages/RevisionTestPage.tsx';
import MasteryTestPage from './pages/MasteryTestPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { CourseProgressProvider } from './context/CourseProgressContext.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
//import ArrayChallengePage from './pages/ArrayChallengePage';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <CourseProgressProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/arrays" element={
                <ProtectedRoute>
                  <ArrayCoursePage />
                </ProtectedRoute>
              } />
              {/* <Route path="/topics/:topicId" element={<TopicPage />} /> */}
              <Route path="/lesson/:lessonId" element={
                <ProtectedRoute>
                  <LessonPage />
                </ProtectedRoute>
              } />
              <Route path="/playground/:id" element={<PlaygroundPage />} />
              <Route path="/revision/:level" element={<RevisionTestPage />} />
              <Route path="/mastery-test" element={<MasteryTestPage />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/daily-challenge" element={<DailyChallengePage />} />
              <Route path="/playground" element={<CodePlayground />} />
              <Route path="/progress" element={<ProgressPage />} />
              {/* <Route path="/array-challenges" element={<ArrayChallengePage />} /> */} 
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CourseProgressProvider>
      </GameProvider>
    </AuthProvider>
  );
};

export default App;
