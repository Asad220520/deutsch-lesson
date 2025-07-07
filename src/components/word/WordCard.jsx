import React from "react";

export default function WordCard({ word, index, onStatusChange }) {
  const status = word.status;

  const speakWord = () => {
    if (!window.speechSynthesis) {
      alert("Ваш браузер не поддерживает озвучку");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word.de);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <span>{index + 1}.</span> {word.de}
        <button
          onClick={speakWord}
          title="Прослушать слово"
          className="ml-2 px-1 py-0.5 rounded bg-blue-200 hover:bg-blue-300 text-sm"
        >
          🔊
        </button>
      </h3>
      <p className="text-gray-600">{word.ru}</p>

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onStatusChange("learn")}
          className={`px-2 py-1 rounded text-sm ${
            status === "learn" ? "bg-yellow-400" : "bg-gray-100"
          }`}
        >
          🧠 Учу
        </button>
        <button
          onClick={() => onStatusChange("learned")}
          className={`px-2 py-1 rounded text-sm ${
            status === "learned" ? "bg-green-400" : "bg-gray-100"
          }`}
        >
          ✅ Выучено
        </button>
        <button
          onClick={() => onStatusChange("repeat")}
          className={`px-2 py-1 rounded text-sm ${
            status === "repeat" ? "bg-blue-400" : "bg-gray-100"
          }`}
        >
          🔁 Повторить
        </button>
      </div>
    </div>
  );
}
