
import React from "react";
import { Link } from "react-router-dom";
import { Book, CheckCircle, Lock, Star, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types";

interface LessonPathItemProps {
  lesson: Lesson;
  isFirst: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
}

const LessonPathItem: React.FC<LessonPathItemProps> = ({
  lesson,
  isFirst,
  isCompleted,
  isCurrent,
  isLocked
}) => {
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
  
  // Check if this is a challenge lesson
  const isChallenge = lesson.id.includes('problems') || lesson.id.includes('challenge');
  
  return (
    <div className="duolingo-lesson-item">
      {!isFirst && <div 
        className={`duolingo-connector ${isCompleted ? 'completed' : ''}`}
      ></div>}
      
      <div className="flex items-center gap-4">
        <div className={nodeClass}>
          {nodeContent}
        </div>
        
        <Card className={`duolingo-lesson-card flex-1 ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isChallenge ? 'border-yellow-500/50 bg-yellow-500/5' : ''}`}>
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
                    className={isCompleted ? 'bg-algo-green-500 hover:bg-algo-green-600' : 
                      isChallenge ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-algo-purple-500 hover:bg-algo-purple-600'}
                  >
                    {isCompleted ? 'Review' : isChallenge ? 'Practice' : 'Start'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LessonPathItem;
