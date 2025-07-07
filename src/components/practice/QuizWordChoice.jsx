import React, { useState, useEffect } from "react";

export default function QuizWordChoice({ word, allWords, onNext }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!word || !allWords || !Array.isArray(allWords)) {
      console.warn("Некорректные данные: word или allWords отсутствуют", {
        word,
        allWords,
      });
      return;
    }

    // Исключаем правильное слово
    const filteredWords = allWords.filter((w) => w.de !== word.de);

    const getRandomItems = (items, count) => {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const fakeOptions = getRandomItems(filteredWords, 3).map((w) => w.de);
    const mixedOptions = [...fakeOptions, word.de].sort(
      () => 0.5 - Math.random()
    );

    setOptions(mixedOptions);
    setSelected(null);
    setFeedback(null);
  }, [word, allWords]);
  
  

  const handleChoice = (choice) => {
    const isCorrect = choice === word.de;
    setSelected(choice);
    setFeedback(
      isCorrect ? "✅ Верно!" : `❌ Неверно. Правильный ответ: ${word.de}`
    );

    setTimeout(() => {
      onNext();
    }, 1500);
  };

  return (
    <div className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Выбери перевод:</h2>
      <p className="text-2xl">{word.ru}</p>

      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            disabled={selected !== null}
            onClick={() => handleChoice(opt)}
            className={`p-2 rounded border ${
              selected === opt
                ? opt === word.de
                  ? "bg-green-200"
                  : "bg-red-200"
                : "hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div
          className={`text-lg font-semibold ${
            feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
