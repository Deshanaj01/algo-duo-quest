
import React from "react";
import Navbar from "@/components/Navbar";
import StreakCounter from "@/components/StreakCounter";
import TopicsList from "@/components/TopicsList";
import ProgressBar from "@/components/ProgressBar";
import VisualizerCard from "@/components/VisualizerCard";
import { topics, userProfile } from "@/data/lessonData";
import { Book, Award, Star, CheckCircle, Flag, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = userProfile;
  const { level, points } = user.profile;
  const { toast } = useToast();
  
  // Calculate points needed for next level (just a simple formula for demonstration)
  const pointsForNextLevel = level * 100;
  const currentLevelPoints = (level - 1) * 100;
  const progressToNextLevel = points - currentLevelPoints;
  
  // Recommended topics (for this demo, just showing unlocked ones)
  const recommendedTopics = topics.filter(topic => topic.unlocked);
  const inProgressTopics = recommendedTopics.filter(topic => topic.completedLessons > 0 && topic.completedLessons < topic.totalLessons);
  const availableTopics = recommendedTopics.filter(topic => topic.completedLessons === 0);
  
  const handleStartDailyChallenge = () => {
    toast({
      title: "Daily Challenge Started",
      description: "Solve today's algorithm problem to earn 25 points!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold welcome-header mb-2">
            Learn DSA the fun way!
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master data structures and algorithms with bite-sized lessons, interactive visualizations, and daily challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User progress */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md border-white/5 animate-fade-in">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Progress</CardTitle>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-6">
                <StreakCounter />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">Level {level}</span>
                    <span className="text-sm text-muted-foreground">
                      {progressToNextLevel}/{pointsForNextLevel - currentLevelPoints} XP to Level {level + 1}
                    </span>
                  </div>
                  <ProgressBar 
                    value={progressToNextLevel} 
                    max={pointsForNextLevel - currentLevelPoints}
                    size="lg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-algo-purple-900/30 rounded-lg p-4 flex flex-col items-center border border-algo-purple-700/30">
                    <Award className="h-8 w-8 text-algo-purple-400 mb-1 animate-bounce-subtle" />
                    <span className="text-xl font-bold">{level}</span>
                    <span className="text-xs text-muted-foreground">Current Level</span>
                  </div>
                  
                  <div className="bg-yellow-900/30 rounded-lg p-4 flex flex-col items-center border border-yellow-700/30">
                    <Star className="h-8 w-8 text-yellow-400 mb-1 animate-float" />
                    <span className="text-xl font-bold">{points}</span>
                    <span className="text-xs text-muted-foreground">Total Points</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-900/30 rounded-lg p-4 flex flex-col items-center border border-green-700/30">
                    <CheckCircle className="h-8 w-8 text-green-400 mb-1" />
                    <span className="text-xl font-bold">15</span>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  
                  <div className="bg-blue-900/30 rounded-lg p-4 flex flex-col items-center border border-blue-700/30">
                    <Flag className="h-8 w-8 text-blue-400 mb-1" />
                    <span className="text-xl font-bold">5</span>
                    <span className="text-xs text-muted-foreground">In Progress</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full daily-challenge-btn" 
                  onClick={handleStartDailyChallenge}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Daily Challenge
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-white/5 animate-fade-in delay-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Algorithm Visualizer</CardTitle>
              </CardHeader>
              <CardContent>
                <VisualizerCard 
                  title="Bubble Sort" 
                  description="Watch how bubble sort compares and swaps adjacent elements"
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Topics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border-white/5 animate-fade-in delay-200">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Learning Paths</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">
                    Master data structures and algorithms step by step
                  </p>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="inProgress">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                    <TabsTrigger value="available">Available</TabsTrigger>
                    <TabsTrigger value="all">All Topics</TabsTrigger>
                  </TabsList>
                  <TabsContent value="inProgress" className="animate-fade-in">
                    {inProgressTopics.length > 0 ? (
                      <TopicsList topics={inProgressTopics} />
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          You haven't started any topics yet.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="available" className="animate-fade-in">
                    <TopicsList topics={availableTopics} />
                  </TabsContent>
                  <TabsContent value="all" className="animate-fade-in">
                    <TopicsList topics={recommendedTopics} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-white/5 animate-fade-in delay-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Interactive Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/30 p-4 rounded-lg flex items-start space-x-4 hover:bg-muted/50 transition-all cursor-pointer">
                    <div className="bg-algo-purple-900/40 p-2 rounded-lg">
                      <Book className="h-5 w-5 text-algo-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Array Manipulation</h3>
                      <p className="text-sm text-muted-foreground">Solve array challenges with sorting and searching</p>
                      <div className="mt-2">
                        <Badge className="bg-algo-purple-900/30 hover:bg-algo-purple-900/40 text-algo-purple-300">
                          Beginner
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg flex items-start space-x-4 hover:bg-muted/50 transition-all cursor-pointer">
                    <div className="bg-algo-blue-900/40 p-2 rounded-lg">
                      <Book className="h-5 w-5 text-algo-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Linked List Problems</h3>
                      <p className="text-sm text-muted-foreground">Master linked list operations and algorithms</p>
                      <div className="mt-2">
                        <Badge className="bg-algo-blue-900/30 hover:bg-algo-blue-900/40 text-algo-blue-300">
                          Intermediate
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-white/5 animate-fade-in delay-400">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <h3 className="font-medium text-sm">Quick Learner</h3>
                        <p className="text-xs text-muted-foreground">Complete 5 lessons in a day</p>
                      </div>
                    </div>
                    <Badge className="bg-green-900/30 text-green-300">Unlocked</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl opacity-50">🎯</div>
                      <div>
                        <h3 className="font-medium text-sm">Algorithm Expert</h3>
                        <p className="text-xs text-muted-foreground">Solve 10 advanced challenges</p>
                      </div>
                    </div>
                    <Badge className="bg-muted/20 text-muted-foreground">2/10</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl opacity-50">🔥</div>
                      <div>
                        <h3 className="font-medium text-sm">Week Warrior</h3>
                        <p className="text-xs text-muted-foreground">Maintain a 7-day streak</p>
                      </div>
                    </div>
                    <Badge className="bg-muted/20 text-muted-foreground">{user.profile.streakDays}/7</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
