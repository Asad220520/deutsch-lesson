import React, { useState, useEffect } from "react";

export default function QuizMatch({ allWords, onNext }) {
  const [leftWords, setLeftWords] = useState([]); // слова на русском
  const [rightWords, setRightWords] = useState([]); // варианты на немецком
  const [matches, setMatches] = useState({}); // ключ: индекс левого слова, значение: индекс правого
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Берём 5 случайных слов из allWords
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    setLeftWords(selected.map((w) => w.ru));
    setRightWords(selected.map((w) => w.de).sort(() => 0.5 - Math.random()));

    setMatches({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setFeedback(null);
  }, [allWords]);

  const handleLeftClick = (index) => {
    setSelectedLeft(index);
  };

  const handleRightClick = (index) => {
    if (selectedLeft === null) return;
    setMatches((prev) => ({ ...prev, [selectedLeft]: index }));
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const checkAnswers = () => {
    let correctCount = 0;
    Object.entries(matches).forEach(([leftIdx, rightIdx]) => {
      if (
        rightWords[rightIdx] ===
        allWords.find((w) => w.ru === leftWords[leftIdx])?.de
      ) {
        correctCount++;
      }
    });

    if (correctCount === leftWords.length) {
      setFeedback("✅ Отлично! Все совпадения правильные.");
    } else {
      setFeedback(
        `❌ Правильно ${correctCount} из ${leftWords.length}. Попробуйте снова.`
      );
    }
  };

  const resetGame = () => {
    setMatches({});
    setFeedback(null);
  };

  return (
    <div className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Сопоставь слово и перевод</h2>

      <div className="flex justify-between gap-4">
        {/* Русские слова */}
        <ul className="w-1/2 list-decimal list-inside border p-2 rounded">
          {leftWords.map((word, i) => (
            <li
              key={i}
              onClick={() => handleLeftClick(i)}
              className={`cursor-pointer p-1 rounded ${
                selectedLeft === i ? "bg-blue-200" : ""
              } ${matches[i] !== undefined ? "opacity-50" : ""}`}
            >
              {word}
            </li>
          ))}
        </ul>

        {/* Немецкие слова */}
        <ul className="w-1/2 list-decimal list-inside border p-2 rounded">
          {rightWords.map((word, i) => (
            <li
              key={i}
              onClick={() => handleRightClick(i)}
              className={`cursor-pointer p-1 rounded ${
                Object.values(matches).includes(i) ? "opacity-50" : ""
              }`}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={checkAnswers}
        className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition mt-4"
      >
        Проверить ответы
      </button>

      <button
        onClick={resetGame}
        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400 transition ml-4 mt-4"
      >
        Сбросить
      </button>

      {feedback && (
        <p
          className={`mt-4 text-lg font-semibold ${
            feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}

      {Object.keys(matches).length === leftWords.length && (
        <button
          onClick={onNext}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition mt-4"
        >
          Следующий урок
        </button>
      )}
    </div>
  );
}
