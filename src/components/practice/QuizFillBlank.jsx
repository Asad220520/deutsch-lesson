import React, { useState } from "react";

export default function QuizFillBlank({ word, onNext }) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Предположим, у тебя в слове есть поле sentence с пропуском "_"
  // например: "Ich _ ein Buch." - надо вставить правильный глагол
  // если нет — можно просто сделать простую проверку слова

  const handleSubmit = () => {
    const answer = input.trim().toLowerCase();
    const correct = word.de.trim().toLowerCase();

    if (!answer) return;

    if (answer === correct) {
      setFeedback("✅ Правильно!");
    } else {
      setFeedback(`❌ Неправильно. Правильный ответ: ${word.de}`);
    }

    setTimeout(() => {
      setInput("");
      setFeedback(null);
      onNext();
    }, 1500);
  };

  return (
    <div className="p-4 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Заполни пропуск:</h2>

      <p className="mb-4 text-2xl whitespace-pre-wrap">
        {/* Если есть sentence с _ */}
        {word.sentence
          ? word.sentence.replace("_", "___")
          : `Переведи: ${word.ru}`}
      </p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Введите ответ"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={!input.trim()}
      >
        Проверить
      </button>

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
