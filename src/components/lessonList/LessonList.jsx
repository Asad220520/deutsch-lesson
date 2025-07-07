import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const snapshot = await getDocs(collection(db, "lessons"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(data.sort((a, b) => a.lessonNumber - b.lessonNumber));
    };

    fetchLessons();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 Список уроков</h1>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">
            Урок {lesson.lessonNumber}: {lesson.topic}
          </h2>

          <p className="text-sm text-gray-500">
            📅 {new Date(lesson.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-2 flex gap-4">
            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              ▶️ Видео
            </a>

            <Link
              to={`/lesson/${lesson.id}`}
              className="text-indigo-600 font-medium hover:underline"
            >
              🔍 Подробнее
            </Link>
            <Link
              to={`/edit/${lesson.id}`}
              className="text-yellow-600 font-medium hover:underline ml-4"
            >
              ✏️ Редактировать
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
