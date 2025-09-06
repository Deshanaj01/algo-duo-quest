
import React, { useState } from "react";
import { Challenge } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Code, LucideIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ArrayChallengeCardProps {
  challenge: Challenge;
  onComplete: (success: boolean) => void;
}

const ArrayChallengeCard: React.FC<ArrayChallengeCardProps> = ({ challenge, onComplete }) => {
  const { toast } = useToast();
  const [code, setCode] = useState(challenge.code);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");

  const runCode = () => {
    setStatus("running");
    setOutput("Running tests...");

    try {
      // Create a function from the submitted code
      // This is a simplified approach - in a real app, you'd want more sandboxing
      const userFn = new Function('return ' + code)();
      
      // Run test cases
      const results = challenge.tests.map((test, index) => {
        try {
          const testFn = new Function('fn', test);
          return { passed: testFn(userFn), test: test };
        } catch (err) {
          return { passed: false, test: test, error: err };
        }
      });

      // Check if all tests pass
      const allPassed = results.every(r => r.passed);
      
      // Format output
      const outputText = results.map((r, i) => 
        `Test ${i + 1}: ${r.passed ? '✓ PASSED' : '✗ FAILED'}${r.error ? ' (Error: ' + r.error + ')' : ''}`
      ).join('\n');
      
      setOutput(outputText);
      setStatus(allPassed ? "success" : "error");
      
      if (allPassed) {
        toast({
          title: "Challenge Completed!",
          description: "Great job! All tests passed.",
        });
        onComplete(true);
      } else {
        toast({
          title: "Not quite right",
          description: "Some tests failed. Keep trying!",
          variant: "destructive",
        });
      }
    } catch (err) {
      setStatus("error");
      setOutput(`Error: ${err}`);
      toast({
        title: "Code Error",
        description: `There's an error in your code: ${err}`,
        variant: "destructive",
      });
    }
  };

  const resetCode = () => {
    setCode(challenge.code);
    setOutput(null);
    setStatus("idle");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <span>{challenge.title}</span>
        </CardTitle>
        <p className="text-muted-foreground">{challenge.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-auto rounded-md border">
          <Textarea
            className="font-mono text-sm h-full resize-none p-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your solution here..."
          />
        </div>
        
        {output && (
          <div className={`mt-4 p-3 rounded-md font-mono text-sm whitespace-pre-wrap ${
            status === "error" ? "bg-red-100 text-red-800" : 
            status === "success" ? "bg-green-100 text-green-800" :
            "bg-gray-100 text-gray-800"
          }`}>
            {output}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-between">
        <Button variant="outline" onClick={resetCode}>
          Reset Code
        </Button>
        <Button 
          className="bg-algo-purple-500 hover:bg-algo-purple-600" 
          onClick={runCode}
          disabled={status === "running"}
        >
          {status === "running" ? "Running..." : "Run Tests"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArrayChallengeCard;
