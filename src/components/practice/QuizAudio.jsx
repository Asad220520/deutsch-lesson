import React, { useEffect, useState } from "react";

export default function QuizAudio({ word, allWords, onNext }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Выбираем 3 неправильных варианта из allWords, кроме правильного
    function getRandomItems(arr, count, exclude) {
      const filtered = arr.filter((w) => w.de !== exclude);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const fakeOptions = getRandomItems(allWords, 3, word.de).map((w) => w.de);
    const mixedOptions = [...fakeOptions, word.de].sort(
      () => 0.5 - Math.random()
    );
    setOptions(mixedOptions);
    setSelected(null);
    setFeedback(null);

    // Произнести слово на немецком
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(word.de);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
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
      <h2 className="text-xl font-bold">Выбери слово, которое услышал</h2>

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
