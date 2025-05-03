import React from 'react';
import Navbar from '@/components/Navbar';
import { userProfile } from '@/data/lessonData';
import { User, Star, Award, CalendarDays, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const { user } = userProfile;
  const { profile } = user.profile;

  // Calculate points needed for next level
  const pointsForNextLevel = profile.level * 100;
  const currentLevelPoints = (profile.level - 1) * 100;
  const progressToNextLevel = Math.min(profile.points - currentLevelPoints, pointsForNextLevel - currentLevelPoints);
  const progressPercentage = (progressToNextLevel / (pointsForNextLevel - currentLevelPoints)) * 100;
  
  const achievements = [
    { id: 1, name: "First Step", description: "Complete your first lesson", completed: true, icon: "🎯" },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons in a day", completed: true, icon: "🚀" },
    { id: 3, name: "Array Master", description: "Complete all array lessons", completed: false, icon: "📊" },
    { id: 4, name: "Algorithm Expert", description: "Solve 10 advanced algorithm challenges", completed: false, icon: "🧠" },
    { id: 5, name: "Week Warrior", description: "Maintain a 7-day streak", completed: true, icon: "🔥" },
    { id: 6, name: "Code Ninja", description: "Write code for 20 different algorithms", completed: false, icon: "⚔️" },
  ];

  const recentActivity = [
    { id: 1, title: "Completed Binary Search lesson", date: "Today", points: 15, type: "lesson" },
    { id: 2, title: "Solved Daily Challenge", date: "Yesterday", points: 25, type: "challenge" },
    { id: 3, title: "Completed Merge Sort lesson", date: "2 days ago", points: 20, type: "lesson" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to home</span>
        </Link>

        {/* User Profile Header */}
        <div className="bg-gradient-to-r from-algo-purple-900/50 to-algo-blue-900/50 rounded-3xl p-6 md:p-8 mb-8 shadow-lg backdrop-blur-sm border border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/10 shadow-xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=68" />
              <AvatarFallback className="bg-algo-purple-500 text-xl">
                {user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.username}</h1>
                  <p className="text-muted-foreground">Joined on April 15, 2023</p>
                </div>
                <Button className="bg-gradient-to-r from-algo-purple-500 to-algo-blue-500 hover:from-algo-purple-600 hover:to-algo-blue-600">
                  Edit Profile
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-algo-purple-900/60 hover:bg-algo-purple-900/80 text-white px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span>{profile.points} Points</span>
                  </Badge>
                  <Badge className="bg-orange-900/60 hover:bg-orange-900/80 text-white px-3 py-1 flex items-center gap-1">
                    <span className="streak-flame">🔥</span>
                    <span>{profile.streakDays} Day Streak</span>
                  </Badge>
                  <Badge className="bg-blue-900/60 hover:bg-blue-900/80 text-white px-3 py-1 flex items-center gap-1">
                    <Award className="h-3 w-3 text-blue-300" />
                    <span>Level {profile.level}</span>
                  </Badge>
                  <Badge className="bg-green-900/60 hover:bg-green-900/80 text-white px-3 py-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-300" />
                    <span>{profile.completedLessons.length} Lessons Completed</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border-white/5 animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="p-4 rounded-lg border border-border flex items-start justify-between transition-all duration-300 hover:bg-muted/50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${activity.type === 'lesson' ? 'bg-blue-900/20' : 'bg-green-900/20'}`}>
                          {activity.type === 'lesson' ? (
                            <BookOpen className="h-5 w-5 text-blue-400" />
                          ) : (
                            <Star className="h-5 w-5 text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <Badge className="bg-algo-purple-500/20 text-algo-purple-300">
                        +{activity.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-md border-white/5 animate-fade-in delay-100">
              <CardHeader>
                <CardTitle className="text-xl">Achievements</CardTitle>
                <CardDescription>Unlock badges by completing specific milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                        achievement.completed 
                          ? 'border-algo-purple-500/50 bg-algo-purple-500/5' 
                          : 'border-border bg-muted/20 opacity-60'
                      }`}
                    >
                      <div className={`text-3xl mb-2 ${achievement.completed ? 'animate-bounce-subtle' : ''}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      {achievement.completed && (
                        <Badge variant="secondary" className="mt-2 bg-algo-purple-500/20 text-algo-purple-300">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Analytics */}
          <div className="space-y-6">
            <Card className="shadow-md border-white/5 animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="text-xl">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 text-algo-purple-400 mr-3" />
                    <span>Days Active</span>
                  </div>
                  <span className="font-semibold">{profile.streakDays + 12}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-algo-blue-400 mr-3" />
                    <span>Lessons Completed</span>
                  </div>
                  <span className="font-semibold">{profile.completedLessons.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-algo-accent-400 mr-3" />
                    <span>Achievements</span>
                  </div>
                  <span className="font-semibold">{achievements.filter(a => a.completed).length}/{achievements.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-3" />
                    <span>Total Points Earned</span>
                  </div>
                  <span className="font-semibold">{profile.points}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-white/5 animate-fade-in delay-300">
              <CardHeader>
                <CardTitle className="text-xl">Learning Path Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Arrays & Strings</span>
                      <span className="text-sm">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Linked Lists</span>
                      <span className="text-sm">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Trees & Graphs</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sorting & Searching</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Dynamic Programming</span>
                      <span className="text-sm">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
