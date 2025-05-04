
import React from 'react';
import Navbar from '@/components/Navbar';
import { userProfile, topics } from '@/data/lessonData';
import { ArrowLeft, BarChart, Award, Star, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreakCounter from '@/components/StreakCounter';
import { 
  LineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const ProgressPage = () => {
  const { user } = userProfile;
  const profile = user.profile;

  // Calculate points needed for next level
  const pointsForNextLevel = profile.level * 100;
  const currentLevelPoints = (profile.level - 1) * 100;
  const progressToNextLevel = Math.min(profile.points - currentLevelPoints, pointsForNextLevel - currentLevelPoints);
  const progressPercentage = (progressToNextLevel / (pointsForNextLevel - currentLevelPoints)) * 100;
  
  // Learning path progress data
  const learningPathData = [
    { name: 'Arrays & Strings', progress: 80 },
    { name: 'Linked Lists', progress: 65 },
    { name: 'Trees & Graphs', progress: 30 },
    { name: 'Sorting & Searching', progress: 45 },
    { name: 'Dynamic Programming', progress: 10 },
  ];
  
  // Activity data
  const activityData = [
    { day: 'Mon', points: 45 },
    { day: 'Tue', points: 25 },
    { day: 'Wed', points: 60 },
    { day: 'Thu', points: 15 },
    { day: 'Fri', points: 30 },
    { day: 'Sat', points: 75 },
    { day: 'Sun', points: 40 },
  ];
  
  // Skills distribution data
  const skillsData = [
    { name: 'Arrays', value: 30 },
    { name: 'Sorting', value: 25 },
    { name: 'Graphs', value: 15 },
    { name: 'Trees', value: 20 },
    { name: 'DP', value: 10 },
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to home</span>
        </Link>

        {/* Progress Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">Track your learning journey and growth</p>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md border-white/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-algo-purple-400 mb-2" />
                <span className="text-2xl font-bold">{profile.level}</span>
                <span className="text-xs text-muted-foreground">Current Level</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-white/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Star className="h-8 w-8 text-yellow-400 mb-2" />
                <span className="text-2xl font-bold">{profile.points}</span>
                <span className="text-xs text-muted-foreground">Total Points</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-white/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                <span className="text-2xl font-bold">{profile.completedLessons.length}</span>
                <span className="text-xs text-muted-foreground">Lessons Completed</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-white/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-blue-400 mb-2" />
                <span className="text-2xl font-bold">{profile.streakDays}</span>
                <span className="text-xs text-muted-foreground">Day Streak</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-md border-white/5 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level {profile.level}</span>
                      <span>Level {profile.level + 1}</span>
                    </div>
                    <div className="relative">
                      <Progress value={progressPercentage} className="h-3" />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 left-0 h-5 w-5 rounded-full bg-white shadow-md border-2 border-algo-purple-500 transition-all duration-300"
                        style={{ left: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground text-center">
                      {progressToNextLevel} / {pointsForNextLevel - currentLevelPoints} XP needed for next level
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <StreakCounter />
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-white/5 md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-xl">Learning Path Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningPathData.map((path) => (
                      <div key={path.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{path.name}</span>
                          <span className="text-sm">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              <Card className="shadow-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl">Weekly Point Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ReBarChart
                      width={700}
                      height={300}
                      data={activityData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="points" fill="#8884d8" />
                    </ReBarChart>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl">Skills Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex justify-center">
                    <PieChart width={400} height={300}>
                      <Pie
                        data={skillsData}
                        cx={200}
                        cy={150}
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl">Learning Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillsData.map((skill) => (
                      <div key={skill.name} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[skillsData.findIndex(s => s.name === skill.name) % COLORS.length] }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span>{skill.value}%</span>
                          </div>
                          <Progress value={skill.value} className="h-2 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgressPage;
