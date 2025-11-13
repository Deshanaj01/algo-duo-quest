// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // Import Firebase configuration
// import { auth, db, googleProvider } from './firebase';

// // Import components
// import HomePage from './pages/HomePage-broken.tsx';
// import LessonPage from './pages/LessonPage.tsx';
// import ProfilePage from './pages/ProfilePage.tsx';
// import AchievementsPage from './pages/AchievementsPage.tsx';
// import DailyChallengePage from './pages/DailyChallengePage.tsx';
// import CodePlayground from './pages/CodePlayground.tsx';
// import ProgressPage from './pages/ProgressPage.tsx';
// import NotFound from './pages/NotFound.tsx';
// import ArrayCoursePage from './pages/ArrayCoursePage.tsx';
// import PlaygroundPage from './pages/PlaygroundPage.tsx';
// import RevisionTestPage from './pages/RevisionTestPage.tsx';
// import MasteryTestPage from './pages/MasteryTestPage.tsx';
// import LoginPage from './pages/LoginPage.tsx';
// import { CourseProgressProvider } from './context/CourseProgressContext.tsx';
// import { GameProvider } from './context/GameContext.tsx';
// import { AuthProvider, useAuth } from './context/AuthContext.tsx';

// // Protected Route component
// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// const App = () => {
//   return ( 
//     <AuthProvider>
//       <GameProvider>
//         <CourseProgressProvider>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <HomePage />
//                 </ProtectedRoute>
//               } />
//               <Route path="/arrays" element={
//                 <ProtectedRoute>
//                   <ArrayCoursePage />
//                 </ProtectedRoute>
//               } />
//               {/* <Route path="/topics/:topicId" element={<TopicPage />} /> */}
//               <Route path="/lesson/:lessonId" element={
//                 <ProtectedRoute>
//                   <LessonPage />
//                 </ProtectedRoute>
//               } />
//               <Route path="/playground/:id" element={<PlaygroundPage />} />
//               <Route path="/revision/:level" element={<RevisionTestPage />} />
//               <Route path="/mastery-test" element={<MasteryTestPage />} />
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <ProfilePage />
//                 </ProtectedRoute>
//               } />
//               <Route path="/achievements" element={<AchievementsPage />} />
//               <Route path="/daily-challenge" element={<DailyChallengePage />} />
//               <Route path="/playground" element={<CodePlayground />} />
//               <Route path="/progress" element={<ProgressPage />} />
//               <Route path="/tutor-dev" element={
//                 <ProtectedRoute>
//                   {React.createElement((await import('./pages/TutorDevPage.tsx')).default)}
//                 </ProtectedRoute>
//               } />
//               {/* <Route path="/array-challenges" element={<ArrayChallengePage />} /> */} 
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </CourseProgressProvider>
//       </GameProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Firebase imports
import { auth, db, googleProvider } from './firebase';

// Page imports
import HomePage from './pages/HomePage-broken.tsx';
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
import LearnFirstProblemPage from './pages/LearnFirstProblemPage.tsx';
import MigrateProblemsPage from './pages/MigrateProblemsPage.tsx';

// Context imports
import { CourseProgressProvider } from './context/CourseProgressContext.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';

// Lazy-loaded page
const TutorDevPage = lazy(() => import('./pages/TutorDevPage.tsx'));

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <CourseProgressProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/arrays"
                  element={
                    <ProtectedRoute>
                      <ArrayCoursePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/:lessonId"
                  element={
                    <ProtectedRoute>
                      <LessonPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/learn-problem/:problemId"
                  element={
                    <ProtectedRoute>
                      <LearnFirstProblemPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tutor-dev"
                  element={
                    <ProtectedRoute>
                      <TutorDevPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/migrate-problems"
                  element={
                    <ProtectedRoute>
                      <MigrateProblemsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Non-protected routes */}
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/daily-challenge" element={<DailyChallengePage />} />
                <Route path="/playground" element={<CodePlayground />} />
                <Route path="/playground/:id" element={<PlaygroundPage />} />
                <Route path="/revision/:level" element={<RevisionTestPage />} />
                <Route path="/mastery-test" element={<MasteryTestPage />} />
                <Route path="/progress" element={<ProgressPage />} />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CourseProgressProvider>
      </GameProvider>
    </AuthProvider>
  );
};

export default App;