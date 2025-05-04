
import React from "react";
import { useParams, Link } from "react-router-dom";
import { topics, lessons } from "@/data/lessonData";
import Navbar from "@/components/Navbar";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopicHeader from "@/components/topic/TopicHeader";
import LessonPath from "@/components/topic/LessonPath";

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  
  // Get topic and related lessons
  const topic = topics.find(t => t.id === topicId);
  const topicLessons = lessons.filter(lesson => lesson.topicId === topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Topic header */}
      <TopicHeader topic={topic} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Duolingo-style lesson path */}
        <LessonPath topic={topic} topicLessons={topicLessons} />
      </div>
    </div>
  );
};

export default TopicPage;
