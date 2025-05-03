
import React from "react";
import Navbar from "@/components/Navbar";
import StreakCounter from "@/components/StreakCounter";
import TopicsList from "@/components/TopicsList";
import ProgressBar from "@/components/ProgressBar";
import VisualizerCard from "@/components/VisualizerCard";
import { topics, userProfile } from "@/data/lessonData";
import { Book, Award, Star } from "lucide-react";

const Index = () => {
  const { user } = userProfile;
  const { level, points } = user.profile;
  
  // Calculate points needed for next level (just a simple formula for demonstration)
  const pointsForNextLevel = level * 100;
  const currentLevelPoints = (level - 1) * 100;
  const progressToNextLevel = points - currentLevelPoints;
  
  // Recommended topics (for this demo, just showing unlocked ones)
  const recommendedTopics = topics.filter(topic => topic.unlocked);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User progress */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
              <StreakCounter />
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">Level {level}</span>
                  <span className="text-sm text-gray-500">
                    {progressToNextLevel}/{pointsForNextLevel - currentLevelPoints} XP to Level {level + 1}
                  </span>
                </div>
                <ProgressBar 
                  value={progressToNextLevel} 
                  max={pointsForNextLevel - currentLevelPoints}
                  size="lg"
                />
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                  <Award className="h-8 w-8 text-blue-500 mb-1" />
                  <span className="text-xl font-bold">{level}</span>
                  <span className="text-xs text-gray-500">Current Level</span>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
                  <Star className="h-8 w-8 text-yellow-500 mb-1" />
                  <span className="text-xl font-bold">{points}</span>
                  <span className="text-xs text-gray-500">Total Points</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Algorithm Visualizer</h2>
              <VisualizerCard 
                title="Bubble Sort" 
                description="Watch how bubble sort compares and swaps adjacent elements"
              />
            </div>
          </div>
          
          {/* Right column - Topics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Learning Paths</h2>
                <Book className="h-5 w-5 text-algo-purple-500" />
              </div>
              <p className="text-gray-500 mb-6">
                Master data structures and algorithms one step at a time. 
                Start with the basics and work your way up.
              </p>
              <TopicsList topics={recommendedTopics} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
