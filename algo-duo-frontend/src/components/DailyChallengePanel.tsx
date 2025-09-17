
import React, { useState } from 'react';
import { CalendarDays, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const DailyChallengePanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const { toast } = useToast();

  if (isClosed) {
    return (
      <Button 
        className="fixed bottom-6 right-6 shadow-lg z-40 daily-challenge-btn"
        onClick={() => setIsClosed(false)}
      >
        <CalendarDays className="h-5 w-5 mr-2" />
        <span>Daily Challenge</span>
      </Button>
    );
  }

  const handleStartChallenge = () => {
    toast({
      title: "Daily Challenge Started!",
      description: "Solve today's algorithm problem to earn 25 points!",
    });
    setIsClosed(true);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 bg-card border border-border rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${isExpanded ? 'w-80' : 'w-64'}`}>
      <div className="p-4 bg-gradient-to-r from-algo-purple-600 to-algo-blue-600">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 text-white mr-2" />
            <h3 className="font-heading font-bold text-white">Daily Challenge</h3>
          </div>
          <div className="flex space-x-2">
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7"/></svg>
              }
            </button>
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsClosed(true)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h4 className="font-medium mb-1">Array Sorting Puzzle</h4>
          <p className="text-sm text-muted-foreground">
            Can you identify which sorting algorithm has the worst time complexity for nearly-sorted arrays?
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="bg-algo-purple-500/10 flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            <span>25 points</span>
          </Badge>
          <span className="text-xs text-muted-foreground">Resets in 14:32:45</span>
        </div>

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <div className="bg-muted/30 p-3 rounded-lg mb-4">
              <p className="text-sm">Sorting algorithms have different behaviors when processing arrays that are already partially sorted. One algorithm becomes inefficient in this case.</p>
            </div>
          </div>
        )}

        <Button 
          className="w-full mt-2 bg-gradient-to-r from-algo-purple-500 to-algo-blue-500 hover:from-algo-purple-600 hover:to-algo-blue-600 transition-all duration-300"
          onClick={handleStartChallenge}
        >
          Start Challenge
        </Button>
      </div>
    </div>
  );
};

export default DailyChallengePanel;
