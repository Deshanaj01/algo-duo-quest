import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractiveLessonPlayer from '../components/InteractiveLessonPlayer';
import { allArrayLessons } from '../data/arrayLessons';

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  // For now, we'll show array lessons. Later we can expand to other topics
  const lesson = lessonId ? allArrayLessons[lessonId as keyof typeof allArrayLessons] : null;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
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
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <InteractiveLessonPlayer
      lessonTitle={lesson.title}
      steps={lesson.steps}
      onComplete={() => {
        // Handle lesson completion - could navigate to next lesson or show completion
        console.log('Lesson completed!');
        navigate('/');
      }}
    />
  );
};

export default LessonPage;
