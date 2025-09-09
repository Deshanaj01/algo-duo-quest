import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseLesson, allArrayCourseLessons } from '../data/arrayCourseLessons.ts';
import { useGame } from './GameContext.tsx';

interface CourseProgressContextType {
  lessons: CourseLesson[];
  updateLessonProgress: (lessonId: string, completed: boolean, score?: number) => void;
  unlockNextLessons: (completedLessonId: string) => void;
  getLessonById: (id: string) => CourseLesson | undefined;
  getProgressByLevel: (level: 1 | 2 | 3) => number;
  getTotalProgress: () => number;
  canAccessLesson: (lessonId: string) => boolean;
  getNextAvailableLesson: () => CourseLesson | null;
  resetProgress: () => void;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within a CourseProgressProvider');
  }
  return context;
};

// Local storage key for persisting progress
const PROGRESS_STORAGE_KEY = 'algo-duo-array-course-progress';

// Initial state - load from localStorage if available
const getInitialLessons = (): CourseLesson[] => {
  try {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      
      // Merge saved progress with lesson definitions
      return allArrayCourseLessons.map(lesson => ({
        ...lesson,
        completed: progressData[lesson.id]?.completed || false,
        unlocked: progressData[lesson.id]?.unlocked !== undefined 
          ? progressData[lesson.id].unlocked 
          : lesson.unlocked
      }));
    }
  } catch (error) {
    console.error('Failed to load course progress:', error);
  }
  
  return allArrayCourseLessons;
};

export const CourseProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<CourseLesson[]>(getInitialLessons);
  const { earnXP, completeLesson, completeChallenge } = useGame();

  // Save progress to localStorage whenever lessons change
  useEffect(() => {
    const progressData = lessons.reduce((acc, lesson) => {
      acc[lesson.id] = {
        completed: lesson.completed,
        unlocked: lesson.unlocked
      };
      return acc;
    }, {} as Record<string, { completed: boolean; unlocked: boolean }>);

    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
  }, [lessons]);

  const updateLessonProgress = (lessonId: string, completed: boolean, score: number = 100) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed } 
          : lesson
      )
    );

    // Award XP and update game context
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && completed) {
      earnXP(lesson.xpReward, `Completed: ${lesson.title}`);
      
      // Update different counters based on lesson type
      switch (lesson.type) {
        case 'concept':
          completeLesson(lessonId, score);
          break;
        case 'playground':
        case 'revision':
        case 'mastery':
          completeChallenge(lessonId, score);
          break;
      }

      // Auto-unlock next lessons
      unlockNextLessons(lessonId);
    }
  };

  const unlockNextLessons = (completedLessonId: string) => {
    setLessons(prevLessons => {
      const updatedLessons = [...prevLessons];
      
      // Find lessons that have this lesson as a prerequisite
      updatedLessons.forEach((lesson, index) => {
        if (lesson.prerequisite?.includes(completedLessonId)) {
          // Check if all prerequisites are met
          const allPrereqsMet = lesson.prerequisite.every(prereqId => {
            const prereqLesson = updatedLessons.find(l => l.id === prereqId);
            return prereqLesson?.completed;
          });
          
          if (allPrereqsMet) {
            updatedLessons[index] = { ...lesson, unlocked: true };
          }
        }
      });

      // Special logic for level progression
      const completedLesson = updatedLessons.find(l => l.id === completedLessonId);
      if (completedLesson?.type === 'revision') {
        // Unlock next level when revision test is completed
        const nextLevel = (completedLesson.level + 1) as 1 | 2 | 3;
        if (nextLevel <= 3) {
          const nextLevelLessons = updatedLessons.filter(l => l.level === nextLevel);
          nextLevelLessons.forEach((lesson, index) => {
            if (lesson.type === 'concept' && !lesson.prerequisite?.length) {
              const lessonIndex = updatedLessons.findIndex(l => l.id === lesson.id);
              if (lessonIndex !== -1) {
                updatedLessons[lessonIndex] = { ...lesson, unlocked: true };
              }
            }
          });
        }
      }

      return updatedLessons;
    });
  };

  const getLessonById = (id: string) => {
    return lessons.find(lesson => lesson.id === id);
  };

  const getProgressByLevel = (level: 1 | 2 | 3): number => {
    const levelLessons = lessons.filter(lesson => lesson.level === level);
    const completedCount = levelLessons.filter(lesson => lesson.completed).length;
    return levelLessons.length > 0 ? (completedCount / levelLessons.length) * 100 : 0;
  };

  const getTotalProgress = (): number => {
    const completedCount = lessons.filter(lesson => lesson.completed).length;
    return (completedCount / lessons.length) * 100;
  };

  const canAccessLesson = (lessonId: string): boolean => {
    const lesson = lessons.find(l => l.id === lessonId);
    return lesson?.unlocked || false;
  };

  const getNextAvailableLesson = (): CourseLesson | null => {
    return lessons.find(lesson => lesson.unlocked && !lesson.completed) || null;
  };

  const resetProgress = () => {
    setLessons(allArrayCourseLessons);
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  };

  return (
    <CourseProgressContext.Provider
      value={{
        lessons,
        updateLessonProgress,
        unlockNextLessons,
        getLessonById,
        getProgressByLevel,
        getTotalProgress,
        canAccessLesson,
        getNextAvailableLesson,
        resetProgress
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
};
