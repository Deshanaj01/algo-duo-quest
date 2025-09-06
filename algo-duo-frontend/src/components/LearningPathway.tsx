
import React from "react";
import { Link } from "react-router-dom";
import { Topic } from "@/types";
import { 
  Book, 
  Lock,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LearningPathwayProps {
  topics: Topic[];
}

const LearningPathway: React.FC<LearningPathwayProps> = ({ topics }) => {
  // Sort topics by unit and section
  const sortedTopics = [...topics].sort((a, b) => {
    if (a.unit !== b.unit) return (a.unit || 0) - (b.unit || 0);
    return (a.section || 0) - (b.section || 0);
  });

  return (
    <div className="learning-pathway p-4 bg-card rounded-xl border border-border">
      <h2 className="text-xl font-bold mb-6">Your Learning Pathway</h2>
      
      <div className="relative">
        {/* Vertical line connecting topics */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 z-0"></div>
        
        {/* Topics */}
        <div className="space-y-8">
          {sortedTopics.map((topic, index) => {
            // Determine if this topic is currently in progress
            const isInProgress = topic.completedLessons > 0 && topic.completedLessons < topic.totalLessons;
            const isCompleted = topic.completedLessons === topic.totalLessons;
            
            return (
              <div key={topic.id} className="relative z-10">
                <div className="flex items-start gap-4">
                  {/* Topic node/circle */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? "bg-algo-green-500" : 
                      topic.unlocked ? topic.color : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : topic.unlocked ? (
                      <Book className="h-5 w-5 text-white" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Topic content */}
                  <div className={`flex-1 ${!topic.unlocked ? "opacity-70" : ""}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{topic.title}</h3>
                      
                      <div className="flex items-center gap-2">
                        {isInProgress && (
                          <Badge className="bg-yellow-900/30 text-yellow-300">
                            In Progress
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="bg-green-900/30 text-green-300">
                            Completed
                          </Badge>
                        )}
                        {topic.unlocked && !isCompleted && (
                          <Badge className={`${topic.color} text-white`}>
                            Unit {topic.unit} - {topic.section}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1 mb-2">{topic.description}</p>
                    
                    {/* Progress info */}
                    <div className="flex justify-between text-xs">
                      <span>{topic.completedLessons} of {topic.totalLessons} lessons</span>
                      <span>{Math.round((topic.completedLessons / topic.totalLessons) * 100)}% complete</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-muted mt-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${isCompleted ? "bg-algo-green-500" : topic.color}`}
                        style={{ width: `${(topic.completedLessons / topic.totalLessons) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Start/Continue button */}
                    {topic.unlocked && (
                      <Link to={`/topics/${topic.id}`} className="inline-block mt-3">
                        <Badge 
                          className={`${isCompleted ? "bg-algo-green-500 hover:bg-algo-green-600" : "bg-algo-purple-500 hover:bg-algo-purple-600"} text-white cursor-pointer transition-colors py-1 px-3`}
                        >
                          {isInProgress ? "Continue" : isCompleted ? "Review" : "Start Learning"}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Badge>
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Prerequisites info (for locked topics) */}
                {!topic.unlocked && topic.prerequisiteTopics && topic.prerequisiteTopics.length > 0 && (
                  <div className="ml-14 mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">Prerequisites: </span>
                    {topic.prerequisiteTopics.map((prereqId, idx) => {
                      const prereq = topics.find(t => t.id === prereqId);
                      return (
                        <span key={prereqId}>
                          {prereq?.title || prereqId}
                          {idx < topic.prerequisiteTopics!.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathway;
