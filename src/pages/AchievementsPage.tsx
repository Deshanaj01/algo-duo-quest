
import React from 'react';
import Navbar from '@/components/Navbar';
import { userProfile } from '@/data/lessonData';
import { ArrowLeft, Trophy, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AchievementsPage = () => {
  const { user } = userProfile;
  
  const achievements = [
    { id: 1, name: "First Step", description: "Complete your first lesson", completed: true, icon: "🎯", progress: 100, total: 1, current: 1 },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons in a day", completed: true, icon: "🚀", progress: 100, total: 5, current: 5 },
    { id: 3, name: "Array Master", description: "Complete all array lessons", completed: false, icon: "📊", progress: 60, total: 5, current: 3 },
    { id: 4, name: "Algorithm Expert", description: "Solve 10 advanced algorithm challenges", completed: false, icon: "🧠", progress: 20, total: 10, current: 2 },
    { id: 5, name: "Week Warrior", description: "Maintain a 7-day streak", completed: true, icon: "🔥", progress: 100, total: 7, current: 7 },
    { id: 6, name: "Code Ninja", description: "Write code for 20 different algorithms", completed: false, icon: "⚔️", progress: 45, total: 20, current: 9 },
    { id: 7, name: "Speed Demon", description: "Complete a lesson in under 5 minutes", completed: true, icon: "⚡", progress: 100, total: 1, current: 1 },
    { id: 8, name: "Persistence", description: "Log in for 14 consecutive days", completed: false, icon: "📅", progress: 35, total: 14, current: 5 },
    { id: 9, name: "Problem Solver", description: "Solve 50 algorithm challenges", completed: false, icon: "🧩", progress: 24, total: 50, current: 12 },
  ];

  const dailyQuests = [
    { id: 1, name: "Earn 50 XP", description: "Complete lessons to earn XP", progress: 80, total: 50, current: 40 },
    { id: 2, name: "Score 90% or higher in 3 lessons", progress: 66, total: 3, current: 2 },
    { id: 3, name: "Get 10 in a row correct in 4 lessons", progress: 25, total: 4, current: 1 },
  ];
  
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter(a => a.completed).length;
  const completionPercentage = (completedAchievements / totalAchievements) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to home</span>
        </Link>

        {/* Top section with stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-full md:col-span-1 shadow-md border-white/5 bg-algo-purple-800/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Achievements
              </CardTitle>
              <CardDescription>Track your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{completedAchievements}/{totalAchievements}</div>
                <Progress value={completionPercentage} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  You've unlocked {completedAchievements} out of {totalAchievements} achievements
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="col-span-full md:col-span-2">
            <Card className="h-full shadow-md border-white/5 bg-algo-green-800/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  Daily Quests
                </CardTitle>
                <CardDescription>Complete these for bonus XP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyQuests.map((quest) => (
                    <div key={quest.id} className="duolingo-quest-card">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          {quest.id === 1 ? (
                            <div className="text-yellow-400 text-xl">⚡</div>
                          ) : quest.id === 2 ? (
                            <div className="text-xl">🎯</div>
                          ) : (
                            <div className="text-xl">🔥</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{quest.name}</div>
                            <div className="text-sm font-medium">{quest.current} / {quest.total}</div>
                          </div>
                          <Progress value={quest.progress} className="h-3" />
                        </div>
                        <div className="h-8 w-8 bg-yellow-900/30 rounded-md flex items-center justify-center border border-yellow-700/30">
                          <Star className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Grid with progress bars like Duolingo */}
        <Card className="shadow-md border-white/5 bg-card">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Award className="h-5 w-5 mr-2 text-algo-purple-400" />
              All Achievements
            </CardTitle>
            <CardDescription>Complete tasks and challenges to earn these badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`duolingo-achievement-card ${
                    achievement.completed 
                      ? 'border-algo-purple-500/50 bg-algo-purple-500/5' 
                      : 'border-border bg-muted/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`achievement-icon-container ${achievement.completed ? 'completed' : ''}`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium text-sm">{achievement.name}</div>
                        <div className="text-sm font-medium">
                          {achievement.current}/{achievement.total}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                      <Progress 
                        value={achievement.progress} 
                        className={`h-2 ${achievement.completed ? "bg-algo-purple-900/30" : "bg-gray-200 dark:bg-gray-700"}`}
                      />
                    </div>
                    
                    {achievement.completed && (
                      <Badge className="bg-algo-purple-500/20 text-algo-purple-300">
                        ✓
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AchievementsPage;
