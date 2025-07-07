import React, { useState } from "react";
import WordCard from "./WordCard";

export default function WordList({ words = [] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [wordList, setWordList] = useState(
    words.map((w) => ({ ...w, status: w.status || "learn" }))
  );

  const handleStatusChange = (index, newStatus) => {
    const updatedWords = [...wordList];
    updatedWords[index].status = newStatus;
    setWordList(updatedWords);
  };

  // Фильтрация по статусу и поиску
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

      <div className="flex gap-2 mb-4">
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
            key={index}
            word={word}
            index={index}
            onStatusChange={(newStatus) => handleStatusChange(index, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}
