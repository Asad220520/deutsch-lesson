import React, { useState, useEffect } from "react";

export default function QuizSentenceBuilder({ sentence, onNext }) {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    setShuffledWords(shuffleArray(sentence.words));
    setSelectedWords([]);
  }, [sentence]);

  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Добавляем слово в собранное предложение
  const handleSelect = (word) => {
    setSelectedWords([...selectedWords, word]);
    setShuffledWords(shuffledWords.filter((w) => w !== word));
  };

  // Удаляем слово из собранного предложения
  const handleRemove = (word, index) => {
    const updated = [...selectedWords];
    updated.splice(index, 1);
    setSelectedWords(updated);
    setShuffledWords([...shuffledWords, word]);
  };

  const handleSubmit = () => {
    const correct = selectedWords.join(" ") === sentence.text;
    if (correct) {
      alert("✅ Правильно!");
      onNext();
    } else {
      alert("❌ Неправильно. Попробуй еще.");
    }
  };

  const reset = () => {
    setShuffledWords(shuffleArray(sentence.words));
    setSelectedWords([]);
  };

  return (
    <div className="p-4 border rounded shadow space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Соберите предложение:</h2>

      {sentence.translation ? (
        <p className="italic text-gray-700 mb-4">
          Перевод: {sentence.translation}
        </p>
      ) : (
        <p className="italic text-gray-500 mb-4">🛈 Перевод недоступен</p>
      )}

      {/* Выбор слов */}
      <div className="flex flex-wrap gap-2 mb-4 border p-3 rounded min-h-[50px] bg-gray-100">
        {shuffledWords.length === 0 && (
          <i className="text-sm text-gray-400">Все слова выбраны</i>
        )}
        {shuffledWords.map((word, i) => (
          <button
            key={i}
            onClick={() => handleSelect(word)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Собранное предложение */}
      <div className="flex flex-wrap gap-2 min-h-[50px] border p-3 rounded bg-blue-50">
        {selectedWords.length === 0 && (
          <i className="text-sm text-gray-400">
            Нажимайте на слова выше, чтобы составить предложение
          </i>
        )}
        {selectedWords.map((word, index) => (
          <div
            key={index}
            className="bg-blue-300 px-3 py-1 rounded relative text-white"
          >
            {word}
            <button
              onClick={() => handleRemove(word, index)}
              className="ml-2 text-sm text-red-200 hover:text-white"
              aria-label="Удалить"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={reset}
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded transition"
        >
          Сбросить
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Проверить
        </button>
      </div>
    </div>
  );
}
