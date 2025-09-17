import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractiveLessonPlayer from '../components/InteractiveLessonPlayer.tsx';
import { allArrayLessons } from '../data/arrayLessons.ts';
import { useCourseProgress } from '../context/CourseProgressContext.tsx';
import { useGame } from '../context/GameContext.tsx';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { updateLessonProgress, getLessonById } = useCourseProgress();
  const { earnXP } = useGame();

  // Check if this is a lesson from our new course structure
  const courseLesson = lessonId ? getLessonById(lessonId) : null;
  
  // Fallback to old array lessons if not found in new structure
  const legacyLesson = lessonId ? allArrayLessons[lessonId as keyof typeof allArrayLessons] : null;
  
  // Determine effective title and steps
  const lessonTitle = courseLesson?.title || legacyLesson?.title || 'Lesson';
  const effectiveSteps = (courseLesson?.conceptConfig?.steps && courseLesson.conceptConfig.steps.length > 0)
    ? courseLesson.conceptConfig.steps
    : (legacyLesson?.steps || []);

  // Use course lesson if available, otherwise fallback to legacy (for completion updates)
  const lesson = courseLesson || legacyLesson;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/arrays')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Arrays Course</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">📚 Lesson Not Found</h1>
            <p className="text-gray-400 mb-6">The lesson you're looking for doesn't exist or hasn't been created yet.</p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-400">Available Array Lessons:</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(allArrayLessons).map(([id, lessonData]) => (
                  <button
                    key={id}
                    onClick={() => navigate(`/lesson/${id}`)}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-white">{lessonData.title}</h3>
                    <p className="text-gray-400 text-sm">{lessonData.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('/arrays')}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🎓 Back to Arrays Course
            </button>
          </div>
        </div>
      </div>
    );
  }
  // If no steps available, show under development message
  if (effectiveSteps.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/arrays')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to Arrays Course</span>
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">{lessonTitle}</h1>
          <p className="text-gray-300">This lesson content is under development. Please check back soon!</p>
          <button
            onClick={() => navigate('/arrays')}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Arrays Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <InteractiveLessonPlayer
      lessonTitle={lessonTitle}
      steps={effectiveSteps}
      onBack={() => navigate('/arrays')}
      onComplete={() => {
        // Handle lesson completion with progress tracking
        console.log('Lesson completed!');
        
        // Update progress if this is a course lesson
        if (courseLesson && lessonId) {
          updateLessonProgress(lessonId, true, 100);
        }
        
        // Navigate back to arrays course page
        navigate('/arrays');
      }}
    />
  );
};

export default LessonPage;
