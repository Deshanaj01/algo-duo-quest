
import React from "react";
import { Link } from "react-router-dom";
import { Book, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/lessonData";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const profile = userProfile.user.profile;
  
  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Book className="h-6 w-6 text-algo-purple-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-xl text-algo-purple-500 dark:text-algo-purple-300">
                AlgoDuoQuest
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-algo-purple-100 dark:bg-algo-purple-900/40 rounded-full px-3 py-1.5 transition-all duration-300 hover:scale-105">
              <Star className="h-4 w-4 text-yellow-500 mr-1.5 animate-bounce-subtle" />
              <span className="font-medium dark:text-white">{profile.points} pts</span>
            </div>

            <ThemeToggle />

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-algo-purple-500 dark:hover:text-algo-purple-300"
            >
              <User className="h-5 w-5 mr-1" />
              <span>Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
