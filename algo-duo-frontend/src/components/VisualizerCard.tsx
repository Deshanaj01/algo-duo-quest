
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Timer } from "lucide-react";

interface VisualizerCardProps {
  title: string;
  description: string;
}

const VisualizerCard: React.FC<VisualizerCardProps> = ({ title, description }) => {
  // For bubble sort visualization
  const [array, setArray] = useState<number[]>([]);
  const [currentIndices, setCurrentIndices] = useState<number[]>([-1, -1]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([50]); // 1-100, higher is slower
  const [steps, setSteps] = useState<{ array: number[], comparing: number[], sorted: number[] }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate a random array
  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 5);
    setArray(newArray);
    setCurrentIndices([-1, -1]);
    setSortedIndices([]);
    setSteps([]);
    setCurrentStep(0);
    setIsRunning(false);
  };

  // Create bubble sort algorithm steps
  const createBubbleSortSteps = (arr: number[]) => {
    const steps = [];
    const arrayCopy = [...arr];
    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Add the current state to steps
        steps.push({
          array: [...arrayCopy],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, index) => n - 1 - index)
        });
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          
          // Add the state after swap
          steps.push({
            array: [...arrayCopy],
            comparing: [j, j + 1],
            sorted: Array.from({ length: i }, (_, index) => n - 1 - index)
          });
        }
      }
    }
    
    // Add final state with everything sorted
    steps.push({
      array: [...arrayCopy],
      comparing: [],
      sorted: Array.from({ length: n }, (_, index) => index)
    });
    
    return steps;
  };

  // Run the visualization
  const runVisualization = () => {
    if (!isRunning && steps.length === 0) {
      const sortingSteps = createBubbleSortSteps([...array]);
      setSteps(sortingSteps);
    }
    setIsRunning(!isRunning);
  };

  // Handle speed change
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value);
  };

  // Initialize with a random array
  useEffect(() => {
    generateArray();
  }, []);

  // Step through the visualization
  useEffect(() => {
    if (!isRunning || steps.length === 0) return;
    
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        const step = steps[currentStep];
        setArray(step.array);
        setCurrentIndices(step.comparing);
        setSortedIndices(step.sorted);
      } else {
        setIsRunning(false);
      }
    }, 1000 - (speed[0] * 8)); // Convert speed to a delay
    
    return () => clearTimeout(timer);
  }, [isRunning, currentStep, steps, speed]);

  return (
    <Card className="visualizer-container">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-4 space-x-3">
          {array.map((value, index) => (
            <div 
              key={index} 
              className={`array-element flex ${
                currentIndices.includes(index) 
                  ? "compared" 
                  : sortedIndices.includes(index) 
                    ? "sorted" 
                    : ""
              }`}
              style={{ height: `${value * 4 + 30}px` }}
            >
              <span className="m-auto font-medium">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <Timer className="h-5 w-5 text-gray-500" />
          <Slider 
            value={speed} 
            onValueChange={handleSpeedChange} 
            min={1} 
            max={100}
            step={1} 
            className="w-full"
          />
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={runVisualization} 
            className="flex-1 bg-algo-purple-500 hover:bg-algo-purple-600"
          >
            {isRunning 
              ? <><Pause className="h-4 w-4 mr-2" /> Pause</> 
              : <><Play className="h-4 w-4 mr-2" /> Run</>
            }
          </Button>
          <Button 
            onClick={generateArray} 
            variant="outline" 
            className="flex-1"
          >
            New Array
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizerCard;
