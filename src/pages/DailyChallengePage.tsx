
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Award, Clock, Play, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const DailyChallengePage = () => {
  const { toast } = useToast();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  
  const dailyChallenge = {
    title: "Array Manipulation Challenge",
    description: "Test your array manipulation skills with today's challenge",
    difficulty: "Intermediate",
    points: 25,
    timeLimit: "2:00",
    questions: [
      {
        id: 1,
        question: "Given an array [3, 1, 4, 1, 5, 9], what will be the result of using the sort() method?",
        options: [
          "[1, 1, 3, 4, 5, 9]",
          "[9, 5, 4, 3, 1, 1]",
          "[1, 1, 3, 4, 9, 5]",
          "[3, 1, 4, 1, 5, 9]"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "What method can be used to add elements to the end of an array?",
        options: [
          "shift()",
          "push()",
          "unshift()",
          "concat()"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which array method creates a new array with all elements that pass a test?",
        options: [
          "find()",
          "includes()",
          "filter()",
          "some()"
        ],
        correctAnswer: 2
      }
    ]
  };
  
  const handleStartChallenge = () => {
    setIsStarted(true);
    // Start timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  
  const handleSelectAnswer = (optionIndex) => {
    // Check if answer is correct
    const isCorrect = optionIndex === dailyChallenge.questions[currentQuestion].correctAnswer;
    
    // Show feedback toast
    toast({
      title: isCorrect ? "Correct!" : "Not quite right!",
      description: isCorrect ? "Great job! Moving to the next question." : "Try again!",
      variant: isCorrect ? "default" : "destructive",
    });
    
    if (isCorrect) {
      // Move to next question or complete
      if (currentQuestion < dailyChallenge.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Challenge completed
        setIsCompleted(true);
        toast({
          title: "Challenge Completed!",
          description: `You've earned ${dailyChallenge.points} points!`,
        });
      }
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to home</span>
        </Link>

        {/* Challenge Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Daily Challenge</h1>
            <p className="text-muted-foreground">Complete daily challenges to earn extra points</p>
          </div>
          {isStarted && !isCompleted && (
            <div className="bg-muted p-2 px-4 rounded-lg flex items-center">
              <Clock className="h-4 w-4 mr-2 text-red-400" />
              <span className="font-medium">{formatTime(timer)}</span>
            </div>
          )}
        </div>

        {/* Challenge Card */}
        <Card className="shadow-md border-white/5 animate-fade-in mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{dailyChallenge.title}</CardTitle>
                <CardDescription>{dailyChallenge.description}</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-blue-900/40 text-blue-300">
                  {dailyChallenge.difficulty}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-900/40 text-yellow-300 flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  {dailyChallenge.points} points
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!isStarted && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce-subtle">🏆</div>
                <h2 className="text-lg font-medium mb-2">Ready for today's challenge?</h2>
                <p className="text-muted-foreground mb-6">
                  You have {dailyChallenge.timeLimit} to complete {dailyChallenge.questions.length} questions
                </p>
                <Button 
                  className="bg-algo-purple-500 hover:bg-algo-purple-600"
                  onClick={handleStartChallenge}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Challenge
                </Button>
              </div>
            )}
            
            {isStarted && !isCompleted && (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Question {currentQuestion + 1} of {dailyChallenge.questions.length}</span>
                  </div>
                  <div className="bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-algo-purple-500 h-2 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / dailyChallenge.questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">
                    {dailyChallenge.questions[currentQuestion].question}
                  </h3>
                  
                  <div className="grid gap-3">
                    {dailyChallenge.questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start p-4 h-auto text-left hover:bg-muted"
                        onClick={() => handleSelectAnswer(index)}
                      >
                        <span className="font-mono bg-muted rounded-full h-6 w-6 flex items-center justify-center mr-3">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {isCompleted && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce-subtle">🎉</div>
                <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
                <p className="text-muted-foreground mb-6">
                  You've earned {dailyChallenge.points} points
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/">
                    <Button variant="outline">
                      Return Home
                    </Button>
                  </Link>
                  <Link to="/progress">
                    <Button className="bg-algo-purple-500 hover:bg-algo-purple-600">
                      View Progress
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyChallengePage;
