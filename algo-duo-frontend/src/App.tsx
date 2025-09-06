import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
//import ArrayChallengePage from './pages/ArrayChallengePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arrays" element={<ArrayCoursePage />} />
        {/* <Route path="/topics/:topicId" element={<TopicPage />} /> */}
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/daily-challenge" element={<DailyChallengePage />} />
        <Route path="/playground" element={<CodePlayground />} />
        <Route path="/progress" element={<ProgressPage />} />
        {/* <Route path="/array-challenges" element={<ArrayChallengePage />} /> */} 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
