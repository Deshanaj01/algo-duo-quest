
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { lessons, quizzes, userProfile } from "@/data/lessonData";
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import QuizCard from "@/components/QuizCard";
import VisualizerCard from "@/components/VisualizerCard";
import ReactMarkdown from "react-markdown";

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the current lesson
  const lesson = lessons.find(l => l.id === lessonId);
  
  // Find quizzes for this lesson
  const lessonQuizzes = quizzes.filter(q => q.id.includes(lesson?.topicId || ""));
  
  // State for tracking quiz completion
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, boolean>>({});
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(lesson?.completed || false);
  
  // Quiz completion handler
  const handleQuizComplete = (quizId: string, correct: boolean) => {
    setCompletedQuizzes(prev => ({
      ...prev,
      [quizId]: correct
    }));
    
    if (correct) {
      setEarnedPoints(prev => prev + 5);
    }
    
    // Check if all quizzes are completed correctly
    const allCompleted = lessonQuizzes.every(q => 
      completedQuizzes[q.id] || (q.id === quizId && correct)
    );
    
    if (allCompleted && !lessonCompleted) {
      setLessonCompleted(true);
      toast({
        title: "Lesson Completed!",
        description: `You've earned ${lesson?.points} points for completing this lesson.`,
      });
      setEarnedPoints(prev => prev + (lesson?.points || 0));
    }
  };
  
  // Complete lesson handler
  const handleCompleteLesson = () => {
    if (lessonCompleted) {
      toast({
        title: "Great job!",
        description: `You've earned a total of ${earnedPoints} points.`,
      });
      
      // Navigate to next lesson or back to topic
      navigate(`/topics/${lesson?.topicId}`);
    } else {
      toast({
        title: "Complete all quizzes",
        description: "You need to correctly answer all quizzes to complete this lesson.",
        variant: "destructive",
      });
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-red-100 text-red-700"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link 
          to={`/topics/${lesson.topicId}`} 
          className="inline-flex items-center text-gray-600 hover:text-algo-purple-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to topic</span>
        </Link>

        {/* Lesson header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={difficultyColors[lesson.difficulty]}>
                  {lesson.difficulty}
                </Badge>
                <span className="flex items-center text-gray-500 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {lesson.points} points
                </span>
              </div>
            </div>
            {lessonCompleted && (
              <Badge className="bg-green-100 text-green-700 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> Completed
              </Badge>
            )}
          </div>
        </div>
        
        {/* Lesson content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 prose max-w-none">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </Card>
            
            {/* Visualizer (if this lesson needs one) */}
            {lesson.id.includes("sort") && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">Interactive Visualization</h2>
                <VisualizerCard 
                  title="Algorithm in Action" 
                  description="See how the algorithm works step by step"
                />
              </div>
            )}
            
            {/* Quizzes */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">Test Your Knowledge</h2>
              <div className="space-y-6">
                {lessonQuizzes.map((quiz, index) => (
                  <QuizCard 
                    key={quiz.id} 
                    quiz={quiz} 
                    onComplete={(correct) => handleQuizComplete(quiz.id, correct)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Lesson Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Content</h3>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">Read the material</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Quizzes</h3>
                  {lessonQuizzes.map((quiz, index) => (
                    <div key={quiz.id} className="flex items-center mb-2">
                      {completedQuizzes[quiz.id] ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-300 mr-2" />
                      )}
                      <span className="text-gray-700">Quiz {index + 1}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Points Earned</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-lg font-bold">{earnedPoints}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-algo-purple-500 hover:bg-algo-purple-600"
                onClick={handleCompleteLesson}
              >
                {lessonCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Continue
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Complete Lesson
                  </>
                )}
              </Button>
            </Card>
            
            {/* Related lessons (could be added here) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
