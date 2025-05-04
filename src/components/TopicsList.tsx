
import React from "react";
import { Link } from "react-router-dom";
import { Topic } from "@/types";
import { 
  Book, 
  List, 
  Layers, 
  ListCheck, 
  Timer, 
  BarChart, 
  Search, 
  ChartPie,
  Lock,
  Layers3,
  ArrowRight,
  Text,
  Network,
  Star,
  CheckCircle
} from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TopicsListProps {
  topics: Topic[];
}

const TopicsList: React.FC<TopicsListProps> = ({ topics }) => {
  // Map of icon names to Lucide React components
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
    text: <Text className="h-6 w-6" />,
    network: <Network className="h-6 w-6" />,
    star: <Star className="h-6 w-6" />,
  };

  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No topics available in this category.</p>
      </div>
    );
  }

  // Sort topics by unit and section to show correct progression
  const sortedTopics = [...topics].sort((a, b) => {
    if (a.unit !== b.unit) return (a.unit || 0) - (b.unit || 0);
    return (a.section || 0) - (b.section || 0);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {sortedTopics.map((topic, index) => {
        const isComplete = topic.completedLessons === topic.totalLessons;
        
        const topicContent = (
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div 
                className={`${topic.color} text-white p-3 rounded-lg mb-4 inline-flex ${topic.unlocked ? "animate-pulse-gentle" : ""} shadow-lg`}
              >
                {iconMap[topic.iconName]}
              </div>
              {!topic.unlocked && <Lock className="h-5 w-5 text-gray-400" />}
              
              {isComplete ? (
                <Badge className="bg-green-900/30 text-green-300 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Completed</span>
                </Badge>
              ) : topic.completedLessons > 0 && (
                <Badge className="bg-yellow-900/30 text-yellow-300">
                  In Progress
                </Badge>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{topic.title}</h3>
                <Badge variant="outline" className="text-xs">
                  Unit {topic.unit}-{topic.section}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{topic.description}</p>
            </div>
            <div className="mt-auto space-y-3">
              <div className="flex justify-between text-xs">
                <span>{topic.completedLessons} of {topic.totalLessons} lessons completed</span>
                <span>{Math.round((topic.completedLessons / topic.totalLessons) * 100)}%</span>
              </div>
              <ProgressBar 
                value={topic.completedLessons} 
                max={topic.totalLessons} 
                showLabel={false}
                size="sm"
              />
              
              {/* Prerequisites for locked topics */}
              {!topic.unlocked && topic.prerequisiteTopics && topic.prerequisiteTopics.length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Prerequisites: </span>
                  {topic.prerequisiteTopics.map((prereqId, idx) => {
                    const prereq = topics.find(t => t.id === prereqId);
                    return (
                      <span key={prereqId} className="me-1">
                        {prereq?.title || prereqId}
                        {idx < topic.prerequisiteTopics!.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );

        return (
          <div 
            key={topic.id}
            className={`bg-card dark:bg-card border border-border dark:border-white/5 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in delay-${index * 100} ${!topic.unlocked ? "grayscale-[70%]" : ""}`}
          >
            {topic.unlocked ? (
              <Link to={`/topics/${topic.id}`} className="block h-full">
                {topicContent}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-algo-purple-500/20 to-transparent p-4 flex justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-algo-purple-500 hover:bg-algo-purple-600">
                    <span>{topic.completedLessons > 0 ? "Continue" : "Start Learning"}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Link>
            ) : (
              <div className="h-full">
                {topicContent}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg text-center shadow-xl">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <h4 className="font-medium mb-1">Topic Locked</h4>
                    <p className="text-sm text-muted-foreground">Complete prerequisite topics to unlock</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;
