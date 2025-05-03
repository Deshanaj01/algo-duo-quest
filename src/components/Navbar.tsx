
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book, User, Star, Code, Award, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/lessonData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const { user } = userProfile;
  const { profile } = user;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  return (
    <nav className="border-b border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative w-8 h-8 bg-algo-purple-500 rounded-lg flex items-center justify-center text-white overflow-hidden animate-bounce-subtle">
                <Book className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-algo-purple-400 to-algo-blue-400 dark:from-algo-purple-300 dark:to-algo-blue-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-algo-accent-400 group-hover:to-algo-purple-400">
                AlgoDuoQuest
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {/* Points Badge */}
            <div className="flex items-center bg-algo-purple-900/40 rounded-full px-3 py-1.5 transition-all duration-300 hover:scale-105 border border-algo-purple-700/50 shadow-inner">
              <Star className="h-4 w-4 text-yellow-400 mr-1.5 animate-bounce-subtle" />
              <span className="font-medium text-white">{profile.points} pts</span>
            </div>
            
            {/* Streak Badge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-orange-900/40 rounded-full px-3 py-1.5 border border-orange-700/50 shadow-inner">
                    <span className="mr-1 streak-flame">🔥</span>
                    <span className="font-medium text-white">{profile.streakDays}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Day streak! Keep it going!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Level Badge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-blue-900/40 rounded-full px-3 py-1.5 border border-blue-700/50 shadow-inner">
                    <Award className="h-4 w-4 text-blue-300 mr-1.5" />
                    <span className="font-medium text-white">{profile.level}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current level</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Notifications */}
            <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-gray-300 hover:text-white"
                >
                  <BellRing className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pop">
                    2
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 mt-1">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                    <span className="font-medium">New Daily Challenge</span>
                    <span className="text-xs text-muted-foreground">Complete today's sorting challenge</span>
                    <Badge variant="outline" className="mt-1 text-[10px] bg-algo-purple-500/10">5 min ago</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                    <span className="font-medium">Streak Reminder</span>
                    <span className="text-xs text-muted-foreground">Don't break your 7-day streak!</span>
                    <Badge variant="outline" className="mt-1 text-[10px] bg-orange-500/10">3 hours ago</Badge>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Code Playground */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/playground">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-300 hover:text-white"
                    >
                      <Code className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Code Playground</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1 hover:bg-transparent">
                  <Avatar className="h-8 w-8 transition-all hover:scale-110">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                    <AvatarFallback className="bg-algo-purple-500 text-white">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  <Award className="mr-2 h-4 w-4" />
                  <span>Achievements</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Progress</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
