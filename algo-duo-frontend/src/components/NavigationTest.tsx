import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseProgress } from '../context/CourseProgressContext.tsx';

const NavigationTest: React.FC = () => {
  const navigate = useNavigate();
  const { lessons, updateLessonProgress } = useCourseProgress();

  const testLessonCompletion = () => {
    // Complete the first lesson for testing
    const firstLesson = lessons.find(l => l.id === 'arrays-introduction');
    if (firstLesson) {
      updateLessonProgress(firstLesson.id, true, 95);
      console.log('Lesson completed, should stay on course page');
    }
  };

  const testNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg border border-gray-600 z-50">
      <h3 className="text-white font-semibold mb-2">Navigation Test</h3>
      <div className="space-y-2">
        <button
          onClick={() => testNavigation('/arrays')}
          className="block w-full px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          → Arrays Course
        </button>
        <button
          onClick={() => testNavigation('/lesson/arrays-introduction')}
          className="block w-full px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          → Test Lesson
        </button>
        <button
          onClick={testLessonCompletion}
          className="block w-full px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
        >
          Complete Lesson
        </button>
        <button
          onClick={() => testNavigation('/playground/array-basics-playground')}
          className="block w-full px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
        >
          → Playground
        </button>
      </div>
    </div>
  );
};

export default NavigationTest;
