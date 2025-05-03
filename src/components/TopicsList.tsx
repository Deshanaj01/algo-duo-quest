
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
  ArrowRight
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
  };

  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No topics available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {topics.map((topic, index) => {
        const topicContent = (
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div 
                className={`${topic.color} text-white p-3 rounded-lg mb-4 inline-flex animate-pulse-gentle shadow-lg`}
              >
                {iconMap[topic.iconName]}
              </div>
              {!topic.unlocked && <Lock className="h-5 w-5 text-gray-400" />}
              
              {topic.completedLessons > 0 && (
                <Badge className={`${topic.completedLessons === topic.totalLessons ? 'bg-green-900/30 text-green-300' : 'bg-yellow-900/30 text-yellow-300'}`}>
                  {topic.completedLessons === topic.totalLessons ? 'Completed' : 'In Progress'}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-medium mb-1">{topic.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{topic.description}</p>
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
                    <span>Start Learning</span>
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
                    <p className="text-sm text-muted-foreground">Complete previous topics to unlock</p>
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
