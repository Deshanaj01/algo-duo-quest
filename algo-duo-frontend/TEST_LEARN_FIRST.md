# Test Learn-First System

## Issue
The Learn-First problems aren't showing on the Arrays page because they're in a separate file (`enhanced-arrays-curriculum.ts`) from the problems displaying on the page (`comprehensive-arrays-curriculum.ts`).

## Quick Test

To test the Learn-First system works, navigate directly to:

```
http://localhost:3000/learn-problem/largest-element
http://localhost:3000/learn-problem/two-sum
```

These should load the full 3-stage learning experience.

## Solution Options

### Option 1: Add Enhanced Content to Existing Problems (RECOMMENDED)

Update `comprehensive-arrays-curriculum.ts` to include the `learnContent` field from `enhanced-arrays-curriculum.ts` for each problem.

### Option 2: Create a Mapper

Create a function that looks up enhanced content by problem ID and merges it with the basic problem info.

### Option 3: Replace Comprehensive with Enhanced

Use `enhanced-arrays-curriculum.ts` as the source in ArrayCoursePage instead of `comprehensive-arrays-curriculum.ts`.

## Immediate Fix

Let me update the comprehensive curriculum to include the enhanced learn content for the 2 problems we have...
