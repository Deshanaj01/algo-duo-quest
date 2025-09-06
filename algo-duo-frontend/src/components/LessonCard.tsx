
import React from "react";
import { Link } from "react-router-dom";
import { Lesson } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Check, Lock } from "lucide-react";

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-red-100 text-red-700"
  };

  if (!lesson.unlocked) {
    return (
      <Card className="lesson-card grayscale opacity-80">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{lesson.title}</CardTitle>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <CardDescription>
            {lesson.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-2 flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            <span>{lesson.timeEstimate} min</span>
          </div>
          <Badge variant="secondary">Locked</Badge>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Link to={`/lessons/${lesson.id}`}>
      <Card className={`lesson-card ${lesson.completed ? "border-2 border-green-500" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{lesson.title}</CardTitle>
            {lesson.completed && <Check className="h-5 w-5 text-green-500" />}
          </div>
          <CardDescription>
            {lesson.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-2 flex justify-between text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-gray-500">{lesson.timeEstimate} min</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span className="text-gray-500">{lesson.points} pts</span>
            </div>
          </div>
          <Badge className={difficultyColors[lesson.difficulty]}>
            {lesson.difficulty}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LessonCard;
