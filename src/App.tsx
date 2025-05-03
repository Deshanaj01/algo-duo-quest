
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import TopicPage from "./pages/TopicPage";
import LessonPage from "./pages/LessonPage";
import NotFound from "./pages/NotFound";
import DailyChallengePanel from "./components/DailyChallengePanel"; 
import ProfilePage from "./pages/ProfilePage";
import CodePlayground from "./pages/CodePlayground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/topics/:topicId" element={<TopicPage />} />
            <Route path="/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/playground" element={<CodePlayground />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DailyChallengePanel />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
