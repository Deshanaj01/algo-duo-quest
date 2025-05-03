
import React, { useState } from "react";
import { Quiz } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  onComplete: (correct: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onComplete }) => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!revealed) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    if (selectedOption === null) {
      toast({
        title: "Select an answer",
        description: "Please select an option before checking your answer.",
        variant: "destructive",
      });
      return;
    }

    const correct = selectedOption === quiz.correctOptionIndex;
    setIsCorrect(correct);
    setRevealed(true);

    if (correct) {
      toast({
        title: "Correct!",
        description: "Great job! You selected the right answer.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the explanation and try again.",
        variant: "destructive",
      });
    }

    onComplete(correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setRevealed(false);
  };

  return (
    <Card className="shadow-md animate-scale-in">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{quiz.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quiz.options.map((option, index) => (
          <div
            key={index}
            className={`quiz-option cursor-pointer ${
              selectedOption === index ? "selected" : ""
            } ${
              revealed && index === quiz.correctOptionIndex
                ? "correct"
                : revealed && selectedOption === index && selectedOption !== quiz.correctOptionIndex
                ? "incorrect"
                : ""
            }`}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {revealed && index === quiz.correctOptionIndex && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {revealed && selectedOption === index && selectedOption !== quiz.correctOptionIndex && (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
            </div>
          </div>
        ))}

        {revealed && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-blue-800 mb-1">Explanation:</p>
                <p className="text-sm text-blue-700">{quiz.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!revealed ? (
          <Button onClick={handleCheck} className="w-full bg-algo-purple-500 hover:bg-algo-purple-600">
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
