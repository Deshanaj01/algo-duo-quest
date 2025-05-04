
import React from "react";
import { useParams, Link } from "react-router-dom";
import { topics, lessons } from "@/data/lessonData";
import Navbar from "@/components/Navbar";
import { Book, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopicHeader from "@/components/topic/TopicHeader";
import LessonPath from "@/components/topic/LessonPath";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  
  // Get topic and related lessons
  const topic = topics.find(t => t.id === topicId);
  const topicLessons = lessons.filter(lesson => lesson.topicId === topicId);
  
  // Find the next topics to unlock
  const nextTopics = topics.filter(t => 
    !t.unlocked && t.prerequisiteTopics?.includes(topicId || '')
  );

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
        
        {/* Next topics to unlock */}
        {nextTopics.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Complete this topic to unlock:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nextTopics.map(nextTopic => (
                <Card key={nextTopic.id} className="border border-white/10">
                  <CardHeader className={`${nextTopic.color} text-white pb-3`}>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{nextTopic.title}</CardTitle>
                      <Lock className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-3">{nextTopic.description}</p>
                    <Badge variant="outline" className="bg-background/50">
                      Unit {nextTopic.unit} - Section {nextTopic.section}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
