import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage-broken';
// import TopicPage from './pages/TopicPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import DailyChallengePage from './pages/DailyChallengePage';
import CodePlayground from './pages/CodePlayground';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import ArrayCoursePage from './pages/ArrayCoursePage';

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
