
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Topic } from "@/types";

interface TopicHeaderProps {
  topic: Topic;
}

const TopicHeader: React.FC<TopicHeaderProps> = ({ topic }) => {
  return (
    <div className="bg-algo-green-600 pt-4 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-white mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to topics</span>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white mr-3">
              <div className="flex items-center gap-1">
                <div className="duolingo-section-badge">{topic.unit || 1}</div>
                <span className="font-medium">SECTION {topic.section || 1}, UNIT {topic.unit || 1}</span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">{topic.title}</h1>
            </div>
          </div>
          
          <Button variant="secondary" className="bg-white text-algo-green-600 hover:bg-white/90">
            <Book className="h-4 w-4 mr-2" />
            Guidebook
          </Button>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between text-white text-sm">
            <span>{topic.completedLessons} of {topic.totalLessons} completed</span>
            <span>{Math.round((topic.completedLessons / topic.totalLessons) * 100)}%</span>
          </div>
          <Progress 
            value={(topic.completedLessons / topic.totalLessons) * 100} 
            className="h-2 mt-1 bg-white/20" 
          />
        </div>
      </div>
    </div>
  );
};

export default TopicHeader;
