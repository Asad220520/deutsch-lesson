import React, { useState } from "react";
import LessonForm from "../components/LessonForm/LessonForm";

export default function AddLessonPage() {
  const [lessons, setLessons] = useState([]);

  // Функция для добавления урока в список
  const handleAddLesson = (lessonData) => {
    setLessons((prevLessons) => [...prevLessons, lessonData]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Добавить уроки</h1>

      {/* Формы для уроков */}
      {lessons.map((lesson, index) => (
        <div key={index} className="mb-8">
          <LessonForm onSave={handleAddLesson} />
        </div>
      ))}

      {/* Кнопка для добавления нового урока */}
      <div className="text-center">
        <button
          onClick={() => setLessons((prevLessons) => [...prevLessons, {}])}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Добавить еще один урок
        </button>
      </div>
    </div>
  );
}
