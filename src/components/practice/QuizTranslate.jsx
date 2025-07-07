import React, { useState } from "react";

export default function QuizTranslate({ word, onNext }) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCorrect = input.trim().toLowerCase() === word.de.toLowerCase();
    setFeedback(
      isCorrect ? "✅ Верно!" : `❌ Неверно. Правильный ответ: ${word.de}`
    );

    setTimeout(() => {
      setInput("");
      setFeedback(null);
      onNext(); // переход к следующему вопросу
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Переведи на немецкий:</h2>
      <p className="text-2xl">{word.ru}</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Ваш ответ"
        autoFocus
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
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
    </form>
  );
}
