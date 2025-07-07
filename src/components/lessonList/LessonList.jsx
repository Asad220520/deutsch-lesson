import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // путь к твоей настройке firebase

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      const querySnapshot = await getDocs(collection(db, "lessons"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(data.sort((a, b) => a.lessonNumber - b.lessonNumber));
      setLoading(false);
    };

    fetchLessons();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Загрузка...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Список уроков</h1>

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold">
                Урок {lesson.lessonNumber}: {lesson.topic}
              </h2>
              <p className="text-sm text-gray-500">
                📅 {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>

            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              ▶️ Смотреть видео
            </a>
          </div>

          {lesson.words?.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">🧠 Слова:</p>
              <ul className="list-disc list-inside text-gray-700">
                {lesson.words.map((word, i) => (
                  <li key={i}>
                    🇷🇺 {word.ru} — 🇩🇪 {word.de}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.exercises?.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer font-medium text-indigo-600">
                📌 Упражнения
              </summary>
              <ul className="list-decimal list-inside text-gray-700 mt-1 space-y-1">
                {lesson.exercises.map((ex, i) => (
                  <li key={i}>
                    {typeof ex === "string" ? (
                      ex
                    ) : (
                      <>
                        <strong>❓ Вопрос:</strong> {ex.title}
                        <br />
                        <strong>✅ Ответ:</strong> {ex.questions}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {lesson.notes && (
            <div className="mt-2">
              <p className="font-semibold text-gray-700">📝 Заметки:</p>
              <p className="text-gray-800 whitespace-pre-line">
                {lesson.notes}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
