import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayVisualizationProps {
  title: string;
  description: string;
  initialArray?: (number | string)[];
  animationType: 'access' | 'insert' | 'delete' | 'search' | 'sort' | 'static';
  highlightIndex?: number;
  showCode?: boolean;
  codeExample?: string;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({
  title,
  description,
  initialArray = [1, 2, 3, 4, 5],
  animationType,
  highlightIndex = -1,
  showCode = false,
  codeExample = ""
}) => {
  const [array, setArray] = useState(initialArray);
  const [currentHighlight, setCurrentHighlight] = useState(highlightIndex);
  const [animationStep, setAnimationStep] = useState(0);

  // Animation sequences based on type
  useEffect(() => {
    let interval: NodeJS.Timeout;

    switch (animationType) {
      case 'access':
        // Animate accessing each element
        interval = setInterval(() => {
          setCurrentHighlight(prev => (prev + 1) % array.length);
        }, 1000);
        break;
      
      case 'search':
        // Simulate linear search animation
        interval = setInterval(() => {
          setCurrentHighlight(prev => {
            if (prev >= array.length - 1) {
              return 0;
            }
            return prev + 1;
          });
        }, 800);
        break;
      
      case 'insert':
        // Simulate array insertion
        interval = setInterval(() => {
          setAnimationStep(prev => {
            const step = (prev + 1) % 4;
            if (step === 0) {
              setArray([1, 2, 3, 4, 5]);
              setCurrentHighlight(-1);
            } else if (step === 1) {
              setCurrentHighlight(2); // Highlight insert position
            } else if (step === 2) {
              setArray([1, 2, 99, 3, 4, 5]); // Insert new element
              setCurrentHighlight(2);
            } else {
              setCurrentHighlight(-1);
            }
            return step;
          });
        }, 1500);
        break;

      case 'delete':
        // Simulate array deletion
        interval = setInterval(() => {
          setAnimationStep(prev => {
            const step = (prev + 1) % 3;
            if (step === 0) {
              setArray([1, 2, 3, 4, 5]);
              setCurrentHighlight(-1);
            } else if (step === 1) {
              setCurrentHighlight(2); // Highlight element to delete
            } else {
              setArray([1, 2, 4, 5]); // Remove element
              setCurrentHighlight(-1);
            }
            return step;
          });
        }, 1500);
        break;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animationType, array.length]);

  const getElementColor = (index: number) => {
    if (currentHighlight === index) {
      return 'bg-yellow-400 text-black border-yellow-500';
    }
    return 'bg-blue-500 text-white border-blue-600';
  };

  const getElementAnimation = (index: number) => {
    return {
      scale: currentHighlight === index ? 1.1 : 1,
      y: currentHighlight === index ? -5 : 0,
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      
      {/* Array Visualization */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <AnimatePresence mode="wait">
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                className={`
                  w-16 h-16 flex items-center justify-center border-2 rounded-lg
                  font-bold text-lg transition-all duration-300
                  ${getElementColor(index)}
                `}
                animate={getElementAnimation(index)}
                initial={{ opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                layout
              >
                {value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Index Labels */}
        <div className="flex items-center justify-center space-x-2">
          {array.map((_, index) => (
            <div
              key={index}
              className="w-16 text-center text-sm text-gray-400"
            >
              [{index}]
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      {showCode && codeExample && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Code Example</h4>
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ArrayVisualization;
