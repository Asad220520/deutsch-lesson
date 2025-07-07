import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 5;

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    const snapshot = await getDocs(collection(db, "lessons"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessons(data.sort((a, b) => a.lessonNumber - b.lessonNumber));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить этот урок?"
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "lessons", id));
      setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
      // При удалении может измениться количество страниц — можно поправить currentPage, если надо
      alert("Урок удалён");
    } catch (error) {
      console.error("Ошибка при удалении урока:", error);
      alert("Не удалось удалить урок");
    }
  };

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const totalPages = Math.ceil(lessons.length / lessonsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">📚 Список уроков</h1>

      {currentLessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-md transition flex justify-between items-start"
        >
          <div>
            <h2 className="text-lg font-semibold">
              Урок {lesson.lessonNumber}: {lesson.topic}
            </h2>

            <p className="text-sm text-gray-500">
              📅{" "}
              {lesson.createdAt?.toDate
                ? lesson.createdAt.toDate().toLocaleDateString()
                : "Дата отсутствует"}
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

          <button
            onClick={() => handleDelete(lesson.id)}
            className="text-red-600 font-bold hover:underline ml-4 self-start"
            title="Удалить урок"
          >
            🗑️ Удалить
          </button>
        </div>
      ))}

      {/* Навигация по страницам */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Назад
        </button>
        <span className="flex items-center">
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}
