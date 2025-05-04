
import React from "react";
import { Star, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Topic } from "@/types";

interface TopicAchievementNodeProps {
  topic: Topic;
}

const TopicAchievementNode: React.FC<TopicAchievementNodeProps> = ({ topic }) => {
  return (
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
  );
};

export default TopicAchievementNode;
