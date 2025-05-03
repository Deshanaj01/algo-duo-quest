
import React from "react";
import { useParams, Link } from "react-router-dom";
import { topics, lessons } from "@/data/lessonData";
import Navbar from "@/components/Navbar";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";
import { Book, ArrowLeft, Layers, List, ListCheck, Timer, BarChart, Search, ChartPie, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  
  // Get topic and related lessons
  const topic = topics.find(t => t.id === topicId);
  const topicLessons = lessons.filter(lesson => lesson.topicId === topicId);

  const iconMap: Record<string, React.ReactNode> = {
    book: <Book className="h-6 w-6" />,
    list: <List className="h-6 w-6" />,
    "list-check": <ListCheck className="h-6 w-6" />,
    layers: <Layers className="h-6 w-6" />,
    "layers-3": <Layers3 className="h-6 w-6" />,
    timer: <Timer className="h-6 w-6" />,
    "bar-chart": <BarChart className="h-6 w-6" />,
    search: <Search className="h-6 w-6" />,
    "chart-pie": <ChartPie className="h-6 w-6" />,
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-algo-purple-500 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to topics</span>
        </Link>

        {/* Topic header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className={`${topic.color} text-white p-3 rounded-lg mr-4`}>
                {iconMap[topic.iconName]}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-3">
                    {topic.totalLessons} Lessons
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {topic.completedLessons} completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar 
              value={topic.completedLessons} 
              max={topic.totalLessons} 
              showLabel={true}
              size="lg"
            />
          </div>
        </div>

        {/* Lesson list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topicLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
