
import React from "react";
import { Link } from "react-router-dom";
import { Book, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/lessonData";

const Navbar = () => {
  const profile = userProfile.user.profile;
  
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-algo-purple-500" />
              <span className="font-bold text-xl text-algo-purple-500">
                AlgoDuoQuest
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-algo-purple-100 rounded-full px-3 py-1.5">
              <Star className="h-4 w-4 text-yellow-500 mr-1.5" />
              <span className="font-medium">{profile.points} pts</span>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gray-700 hover:text-algo-purple-500"
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
