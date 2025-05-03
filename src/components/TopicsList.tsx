
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
} from "lucide-react";
import ProgressBar from "./ProgressBar";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => {
        const topicContent = (
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div 
                className={`${topic.color} text-white p-3 rounded-lg mb-4 inline-flex animate-pulse-gentle`}
              >
                {iconMap[topic.iconName]}
              </div>
              {!topic.unlocked && <Lock className="h-5 w-5 text-gray-400" />}
            </div>
            <h3 className="text-lg font-medium mb-1 dark:text-gray-100">{topic.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{topic.description}</p>
            <div className="mt-auto">
              <ProgressBar 
                value={topic.completedLessons} 
                max={topic.totalLessons} 
                showLabel={true}
              />
            </div>
          </div>
        );

        return (
          <div 
            key={topic.id}
            className={`topic-card bg-white dark:bg-gray-800 rounded-xl shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-fade-in ${!topic.unlocked ? "grayscale-[70%]" : ""}`}
          >
            {topic.unlocked ? (
              <Link to={`/topics/${topic.id}`}>
                {topicContent}
                <div className="topic-card-overlay absolute inset-0 bg-gradient-to-br from-transparent to-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium bg-algo-purple-500 px-4 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">Start Learning</span>
                </div>
              </Link>
            ) : (
              <div>
                {topicContent}
                <div className="topic-card-overlay absolute inset-0 bg-gradient-to-br from-transparent to-black/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium bg-gray-600 px-4 py-2 rounded-full shadow-lg">Locked</span>
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
