
import React from "react";
import { useParams, Link } from "react-router-dom";
import { topics, lessons } from "@/data/lessonData";
import Navbar from "@/components/Navbar";
import { Book, ArrowLeft, Layers, Star, CheckCircle, Lock, Trophy, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  
  // Get topic and related lessons
  const topic = topics.find(t => t.id === topicId);
  const topicLessons = lessons.filter(lesson => lesson.topicId === topicId);

  const iconMap: Record<string, React.ReactNode> = {
    book: <Book className="h-6 w-6" />,
    layers: <Layers className="h-6 w-6" />,
  };

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

  // Find the first incomplete lesson
  const currentLessonIndex = topicLessons.findIndex(lesson => !lesson.completed);
  const currentLesson = currentLessonIndex >= 0 ? topicLessons[currentLessonIndex] : topicLessons[topicLessons.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Topic header */}
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Duolingo-style lesson path */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-muted -translate-x-1/2 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            {topicLessons.map((lesson, index) => {
              const isFirst = index === 0;
              const isCompleted = lesson.completed;
              const isCurrent = index === currentLessonIndex;
              const isLocked = index > currentLessonIndex && currentLessonIndex !== -1;
              
              let nodeClass = "duolingo-node";
              let nodeContent = null;
              
              if (isCompleted) {
                nodeClass += " completed";
                nodeContent = <CheckCircle className="h-6 w-6" />;
              } else if (isCurrent) {
                nodeClass += " current";
                nodeContent = <Star className="h-6 w-6" />;
              } else if (isLocked) {
                nodeClass += " locked";
                nodeContent = <Lock className="h-6 w-6" />;
              } else {
                nodeContent = <Book className="h-6 w-6" />;
              }
              
              return (
                <div 
                  key={lesson.id} 
                  className="duolingo-lesson-item"
                >
                  {!isFirst && <div 
                    className={`duolingo-connector ${isCompleted ? 'completed' : ''}`}
                  ></div>}
                  
                  <div className="flex items-center gap-4">
                    <div className={nodeClass}>
                      {nodeContent}
                    </div>
                    
                    <Card className={`duolingo-lesson-card flex-1 ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{lesson.title}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{lesson.points}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <Badge className={`
                            ${lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : 
                              lesson.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' : 
                                'bg-red-100 text-red-700'}
                          `}>
                            {lesson.difficulty}
                          </Badge>
                          
                          {!isLocked && (
                            <Link to={`/lessons/${lesson.id}`}>
                              <Button 
                                size="sm" 
                                className={isCompleted ? 'bg-algo-green-500 hover:bg-algo-green-600' : 'bg-algo-purple-500 hover:bg-algo-purple-600'}
                              >
                                {isCompleted ? 'Review' : 'Start'}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
            
            {/* Final node - achievement/trophy */}
            <div className="duolingo-lesson-item">
              <div className="duolingo-connector"></div>
              <div className="flex items-center gap-4">
                <div className="duolingo-node trophy">
                  <Trophy className="h-6 w-6" />
                </div>
                
                <Card className="duolingo-lesson-card flex-1 trophy">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">Topic Complete!</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">50</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete all lessons to master {topic.title}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <Badge className="bg-yellow-100 text-yellow-700">
                        Achievement
                      </Badge>
                      
                      <Button 
                        size="sm" 
                        className="bg-yellow-500 hover:bg-yellow-600"
                        disabled={topic.completedLessons !== topic.totalLessons}
                      >
                        Claim
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
