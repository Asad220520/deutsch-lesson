import React, { useState } from "react";

export default function LessonWords({ words, setWords }) {
  const [de, setDe] = useState("");
  const [ru, setRu] = useState("");

  const addWord = () => {
    if (de && ru) {
      setWords([...words, { de, ru }]);
      setDe("");
      setRu("");
    }
  };

  const removeWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="block font-semibold">Новые слова</label>

      {words.map((word, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="flex-1">
            {word.de} — {word.ru}
          </span>
          <button
            type="button"
            onClick={() => removeWord(index)}
            className="text-red-500 hover:underline"
          >
            удалить
          </button>
        </div>
      ))}

      <div className="flex flex-col gap-2 md:flex-row md:gap-1">
        <input
          type="text"
          placeholder="der Mann"
          value={de}
          onChange={(e) => setDe(e.target.value)}
          className="w-full p-2 border rounded" // w-full для растягивания на всю ширину
        />
        <input
          type="text"
          placeholder="мужчина"
          value={ru}
          onChange={(e) => setRu(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={addWord}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded" // py-2 для высоты
        >
          +
        </button>
      </div>
    </div>
  );
}
