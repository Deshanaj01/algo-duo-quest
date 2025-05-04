
import React from 'react';
import Navbar from '@/components/Navbar';
import { userProfile } from '@/data/lessonData';
import { ArrowLeft, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const AchievementsPage = () => {
  const { user } = userProfile;
  
  const achievements = [
    { id: 1, name: "First Step", description: "Complete your first lesson", completed: true, icon: "🎯" },
    { id: 2, name: "Quick Learner", description: "Complete 5 lessons in a day", completed: true, icon: "🚀" },
    { id: 3, name: "Array Master", description: "Complete all array lessons", completed: false, icon: "📊" },
    { id: 4, name: "Algorithm Expert", description: "Solve 10 advanced algorithm challenges", completed: false, icon: "🧠" },
    { id: 5, name: "Week Warrior", description: "Maintain a 7-day streak", completed: true, icon: "🔥" },
    { id: 6, name: "Code Ninja", description: "Write code for 20 different algorithms", completed: false, icon: "⚔️" },
    { id: 7, name: "Speed Demon", description: "Complete a lesson in under 5 minutes", completed: true, icon: "⚡" },
    { id: 8, name: "Persistence", description: "Log in for 14 consecutive days", completed: false, icon: "📅" },
    { id: 9, name: "Problem Solver", description: "Solve 50 algorithm challenges", completed: false, icon: "🧩" },
    { id: 10, name: "Graph Explorer", description: "Complete all graph algorithm lessons", completed: false, icon: "🕸️" },
    { id: 11, name: "Tree Climber", description: "Master all tree data structures", completed: false, icon: "🌳" },
    { id: 12, name: "Recursion Wizard", description: "Complete all recursion challenges", completed: false, icon: "🔄" },
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

        {/* Achievements Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground">Unlock badges by completing specific milestones</p>
          </div>
          <div className="bg-muted p-2 px-4 rounded-lg">
            <span className="font-medium">{achievements.filter(a => a.completed).length}/{achievements.length} Unlocked</span>
          </div>
        </div>

        {/* Achievement Grid */}
        <Card className="shadow-md border-white/5 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">All Achievements</CardTitle>
            <CardDescription>Complete tasks and challenges to earn these badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
};

export default AchievementsPage;
