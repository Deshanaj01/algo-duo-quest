import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import ArrayVisualization from './ArrayVisualization.tsx';

interface LessonStep {
  id: string;
  title: string;
  content: string;
  visualization?: {
    title: string;
    description: string;
    animationType: 'access' | 'insert' | 'delete' | 'search' | 'sort' | 'static';
    initialArray?: (number | string)[];
    codeExample?: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

interface InteractiveLessonPlayerProps {
  lessonTitle: string;
  steps: LessonStep[];
  onComplete?: () => void;
  onBack?: () => void;
}

const InteractiveLessonPlayer: React.FC<InteractiveLessonPlayerProps> = ({
  lessonTitle,
  steps,
  onComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  if (!steps || steps.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen">
        {onBack && (
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Back to Course</span>
              </button>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">{lessonTitle}</h1>
            <p className="text-gray-300">This lesson has no content yet. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const restartLesson = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navigation Header */}
      {onBack && (
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Course</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{lessonTitle}</h1>
        <div className="flex items-center justify-between">
          <div className="text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={restartLesson}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Step Title and Content */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {currentStepData.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentStepData.content }}
              />
            </div>
          </div>

          {/* Visualization */}
          {currentStepData.visualization && (
            <ArrayVisualization
              title={currentStepData.visualization.title}
              description={currentStepData.visualization.description}
              animationType={currentStepData.visualization.animationType}
              initialArray={currentStepData.visualization.initialArray}
              showCode={!!currentStepData.visualization.codeExample}
              codeExample={currentStepData.visualization.codeExample}
            />
          )}

          {/* Quiz */}
          {currentStepData.quiz && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                📝 Quick Check
              </h3>
              <p className="text-gray-300 mb-6">{currentStepData.quiz.question}</p>
              
              <div className="space-y-3">
                {currentStepData.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showResult}
                    className={`
                      w-full p-4 text-left rounded-lg border transition-all
                      ${selectedAnswer === index
                        ? showResult
                          ? index === currentStepData.quiz!.correctAnswer
                            ? 'bg-green-600 border-green-500 text-white'
                            : 'bg-red-600 border-red-500 text-white'
                          : 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }
                      ${showResult && index === currentStepData.quiz!.correctAnswer && selectedAnswer !== index
                        ? 'bg-green-600 border-green-500 text-white'
                        : ''
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-700 rounded-lg"
                >
                  <p className="text-white font-medium mb-2">
                    {selectedAnswer === currentStepData.quiz.correctAnswer
                      ? '✅ Correct!'
                      : '❌ Not quite right.'}
                  </p>
                  <p className="text-gray-300">
                    {currentStepData.quiz.explanation}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg transition-all
            ${isFirstStep
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500'
            }
          `}
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentStepData.quiz && !showResult}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg transition-all
            ${currentStepData.quiz && !showResult
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          <span>{isLastStep ? 'Complete' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLessonPlayer;
