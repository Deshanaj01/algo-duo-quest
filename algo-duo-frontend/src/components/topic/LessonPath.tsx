
import React from "react";
import { Lesson, Topic } from "@/types";
import LessonPathItem from "./LessonPathItem";
import TopicAchievementNode from "./TopicAchievementNode";

interface LessonPathProps {
  topic: Topic;
  topicLessons: Lesson[];
}

const LessonPath: React.FC<LessonPathProps> = ({ topic, topicLessons }) => {
  // Find the first incomplete lesson
  const currentLessonIndex = topicLessons.findIndex(lesson => !lesson.completed);

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-muted -translate-x-1/2 z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        {topicLessons.map((lesson, index) => {
          const isFirst = index === 0;
          const isCompleted = lesson.completed;
          const isCurrent = index === currentLessonIndex;
          const isLocked = index > currentLessonIndex && currentLessonIndex !== -1;
          
          return (
            <LessonPathItem
              key={lesson.id}
              lesson={lesson}
              isFirst={isFirst}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isLocked={isLocked}
            />
          );
        })}
        
        {/* Final node - achievement/trophy */}
        <TopicAchievementNode topic={topic} />
      </div>
    </div>
  );
};

export default LessonPath;
