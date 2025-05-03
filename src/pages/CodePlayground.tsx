
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Save, ArrowLeft, BookOpen, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CodePlayground = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(`// Welcome to AlgoDuoQuest Code Playground!
// Try writing and running some code

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Test with an array
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", array);
console.log("Sorted array:", bubbleSort([...array]));
`);
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Save original console.log
    const originalConsoleLog = console.log;
    
    // Captured output
    let capturedOutput = '';
    
    // Override console.log
    console.log = (...args) => {
      const output = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      capturedOutput += output + '\n';
    };
    
    setTimeout(() => {
      try {
        // Execute code
        eval(code);
        setOutput(capturedOutput || 'Code executed successfully!');
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      } finally {
        // Restore original console.log
        console.log = originalConsoleLog;
        setIsRunning(false);
      }
    }, 500);
    
    toast({
      title: "Code running...",
      description: "Executing your algorithm in the playground.",
    });
  };
  
  const saveCode = () => {
    toast({
      title: "Code saved!",
      description: "Your code snippet has been saved to your profile.",
    });
  };
  
  const templates = [
    { id: 1, name: "Bubble Sort", algorithm: "bubbleSort" },
    { id: 2, name: "Binary Search", algorithm: "binarySearch" },
    { id: 3, name: "Merge Sort", algorithm: "mergeSort" },
    { id: 4, name: "Linked List", algorithm: "linkedList" },
    { id: 5, name: "Binary Tree", algorithm: "binaryTree" },
  ];
  
  const loadTemplate = (algorithm: string) => {
    let templateCode = '';
    
    switch(algorithm) {
      case 'bubbleSort':
        templateCode = `// Bubble Sort Algorithm
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Test with an array
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", array);
console.log("Sorted array:", bubbleSort([...array]));`;
        break;
      case 'binarySearch':
        templateCode = `// Binary Search Algorithm
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    // Check if target is at mid
    if (arr[mid] === target) {
      return mid;
    }
    
    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  // Element not present
  return -1;
}

// Test with a sorted array
const sortedArray = [11, 12, 22, 25, 34, 64, 90];
const target = 25;
const result = binarySearch(sortedArray, target);
console.log(\`Finding \${target} in \${JSON.stringify(sortedArray)}\`);
console.log(result !== -1 
  ? \`Element found at index \${result}\` 
  : "Element not found");`;
        break;
      default:
        templateCode = '// Select a template to get started';
    }
    
    setCode(templateCode);
    toast({
      title: "Template loaded",
      description: `${algorithm} template has been loaded.`,
    });
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
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Playground Area */}
          <div className="lg:flex-1">
            <Card className="shadow-md border-white/5 h-full">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Code Playground</CardTitle>
                  <CardDescription>Write, test, and visualize algorithms</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={loadTemplate}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Load Template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.algorithm}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setCode('// Write your code here')}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border border-white/5 rounded-lg p-1">
                  <textarea 
                    className="font-mono w-full h-96 bg-gray-950 text-gray-100 p-4 rounded-md outline-none resize-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your code here..."
                    spellCheck="false"
                  />
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={saveCode}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-algo-purple-500 to-algo-blue-500 hover:from-algo-purple-600 hover:to-algo-blue-600 transition-all duration-300"
                  >
                    {isRunning ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Output and Resources */}
          <div className="lg:w-1/3 space-y-6">
            <Card className="shadow-md border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono bg-card border border-white/10 p-4 rounded-lg text-sm h-56 overflow-y-auto whitespace-pre">
                  {output || 'Run your code to see output...'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="algorithms">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                    <TabsTrigger value="datastructures">Data Structures</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                  </TabsList>
                  <TabsContent value="algorithms" className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-purple-400 mr-2" />
                        <span className="text-sm font-medium">Bubble Sort</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-purple-400 mr-2" />
                        <span className="text-sm font-medium">Quick Sort</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-purple-400 mr-2" />
                        <span className="text-sm font-medium">Binary Search</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="datastructures" className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-blue-400 mr-2" />
                        <span className="text-sm font-medium">Linked Lists</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-blue-400 mr-2" />
                        <span className="text-sm font-medium">Binary Trees</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-algo-blue-400 mr-2" />
                        <span className="text-sm font-medium">Hash Tables</span>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="tips" className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30 text-sm">
                      <h3 className="font-medium mb-2">Time Complexity</h3>
                      <p className="text-muted-foreground">Remember to analyze the time complexity of your algorithms. Big O notation helps you understand how your code will scale with larger inputs.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 text-sm">
                      <h3 className="font-medium mb-2">Edge Cases</h3>
                      <p className="text-muted-foreground">Always test your algorithms with edge cases such as empty arrays, single elements, or duplicate values.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 text-sm">
                      <h3 className="font-medium mb-2">Space Complexity</h3>
                      <p className="text-muted-foreground">Consider both time and space complexity. Sometimes you can trade one for the other.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
