import React, { useState, useEffect } from "react";
import WordCard from "./WordCard";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function WordList({ words = [], lessonId }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [wordList, setWordList] = useState([]);

  // Синхронизация при изменении пропса words
  useEffect(() => {
    setWordList(
      words.map((w) => ({
        ...w,
        status: w.status || "learn",
      }))
    );
  }, [words]);

  // Обновление статуса слова в Firebase в массиве words внутри урока
  const handleStatusChange = async (index, newStatus) => {
    const updatedWords = [...wordList];
    updatedWords[index].status = newStatus;
    setWordList(updatedWords);

    if (!lessonId) {
      console.error("lessonId отсутствует, не могу обновить статус");
      return;
    }

    try {
      const lessonRef = doc(db, "lessons", lessonId);
      const lessonSnap = await getDoc(lessonRef);
      if (!lessonSnap.exists()) {
        console.error("Урок не найден для обновления статуса слова");
        return;
      }

      const lessonData = lessonSnap.data();
      const wordsArray = lessonData.words || [];

      // Обновляем статус нужного слова по индексу
      const newWordsArray = wordsArray.map((word, i) =>
        i === index ? { ...word, status: newStatus } : word
      );

      // Сохраняем обратно в Firestore
      await updateDoc(lessonRef, {
        words: newWordsArray,
      });
    } catch (error) {
      console.error("Ошибка при сохранении статуса:", error);
    }
  };

  const filtered = wordList.filter((w) => {
    const matchesStatus = filter === "all" ? true : w.status === filter;
    const matchesSearch =
      w.de.toLowerCase().includes(search.toLowerCase()) ||
      w.ru.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Поиск слов..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "learn", "learned", "repeat"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {f === "all"
              ? "Все"
              : f === "learn"
              ? "🧠 Изучаю"
              : f === "learned"
              ? "✅ Выучено"
              : "🔁 Повторить"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((word, index) => (
          <WordCard
            key={word.id || index}
            word={word}
            index={index}
            onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}
