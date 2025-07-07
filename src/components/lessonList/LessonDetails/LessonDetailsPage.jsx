import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import WordList from "../../word/wordList";
import { useDispatch, useSelector } from "react-redux";
import { setWords } from "../../../store/features/words/wordsSlice";
import LessonStats from "./LessonStats";
import ExerciseList from "./ExerciseList";

export default function LessonDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Берём слова из Redux
  const words = useSelector((state) => state.words);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, "lessons", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const wordsWithStatus = Array.isArray(data.words)
            ? data.words.map((w) => ({
                ...w,
                status: w.status || "learn",
              }))
            : [];

          // Записываем слова в Redux
          dispatch(setWords(wordsWithStatus));

          setLesson({
            id: docSnap.id,
            ...data,
            words: wordsWithStatus,
          });
        } else {
          setLesson(null);
        }
      } catch (error) {
        console.error("Ошибка при загрузке урока:", error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, dispatch]);

  const handleSpeak = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  };

  if (loading) return <p className="text-center mt-4">Загрузка...</p>;
  if (!lesson)
    return <p className="text-center mt-4 text-red-600">Урок не найден.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h1 className="text-2xl font-bold mb-2">
        Урок {lesson.lessonNumber}: {lesson.topic}
      </h1>

      {lesson.createdAt?.toDate && (
        <p className="text-sm text-gray-500 mb-4">
          📅 {lesson.createdAt.toDate().toLocaleDateString()}
        </p>
      )}

      {lesson.videoUrl && (
        <a
          href={lesson.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline block mb-4"
        >
          ▶️ Смотреть видео
        </a>
      )}

      {words.length > 0 && (
        <>
          <LessonStats words={words} />

          <div className="mb-6">
            <h2 className="font-semibold mb-2 text-lg">🧠 Новые слова</h2>
            <WordList
              words={words}
              lessonId={lesson.id}
              onSpeak={handleSpeak}
            />
          </div>
        </>
      )}

      {lesson.exercises?.length > 0 && (
        <ExerciseList exercises={lesson.exercises} />
      )}
      {lesson.words?.length > 0 && (
        <div className="text-center mt-6">
          <a
            href={`/practice/${lesson.id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            🧪 Пройти практику
          </a>
        </div>
      )}

      {lesson.notes && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-lg">📝 Заметки</h2>
          <p className="whitespace-pre-line">{lesson.notes}</p>
        </div>
      )}
    </div>
  );
}
