import React, { useEffect, useState } from "react";
import WordList from "../components/word/wordList";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const WordPage = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWords = async () => {
      const lessonsSnapshot = await getDocs(collection(db, "lessons"));
      let allWords = [];

      lessonsSnapshot.forEach((docSnap) => {
        const lesson = docSnap.data();
        const lessonId = docSnap.id;

        if (Array.isArray(lesson.words)) {
          const wordsWithMeta = lesson.words.map((word, index) => ({
            ...word,
            id: `${lessonId}_${index}`, // уникальный id для слова
            lessonId: lessonId,
            lessonNumber: lesson.lessonNumber || "?",
            status: word.status || "learn", // если статуса нет, задаём learn по умолчанию
          }));
          allWords = [...allWords, ...wordsWithMeta];
        }
      });

      setWords(allWords);
      setLoading(false);
    };

    fetchAllWords();
  }, []);

  // Функция для обновления статуса слова в базе и локальном состоянии
  const handleStatusChange = async (wordId, lessonId, index, newStatus) => {
    try {
      // Обновляем локально
      setWords((prevWords) =>
        prevWords.map((w) =>
          w.id === wordId ? { ...w, status: newStatus } : w
        )
      );

      // Получаем урок из Firestore
      const lessonRef = doc(db, "lessons", lessonId);
      const lessonSnap = await getDocs(lessonRef);

      const lessonDoc = await lessonRef.get(); // заменим getDocs на get() для одного документа
      if (!lessonDoc.exists()) {
        console.error("Урок не найден");
        return;
      }
      const lessonData = lessonDoc.data();
      const wordsArray = lessonData.words || [];

      // Обновляем статус нужного слова в массиве
      const newWordsArray = wordsArray.map((w, i) =>
        i === index ? { ...w, status: newStatus } : w
      );

      // Сохраняем обновлённый массив слов в Firestore
      await updateDoc(lessonRef, {
        words: newWordsArray,
      });
    } catch (error) {
      console.error("Ошибка при обновлении статуса слова:", error);
    }
  };

  if (loading) return <p className="text-center mt-4">Загрузка слов...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Все слова из уроков</h1>
      <WordList words={words} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default WordPage;
