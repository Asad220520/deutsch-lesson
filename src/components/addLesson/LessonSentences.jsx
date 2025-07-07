import React, { useState } from "react";

export default function LessonSentences({ sentences, setSentences }) {
  const [text, setText] = useState("");
  const [wordsString, setWordsString] = useState("");
  const [translation, setTranslation] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const clearForm = () => {
    setText("");
    setWordsString("");
    setTranslation("");
    setEditingIndex(null);
  };

  const addOrUpdateSentence = () => {
    if (!text || !wordsString || !translation) return;
    const words = wordsString.split(" ").filter(Boolean);

    if (editingIndex !== null) {
      // Обновление
      const updated = [...sentences];
      updated[editingIndex] = { text, words, translation };
      setSentences(updated);
    } else {
      // Добавление
      setSentences([...sentences, { text, words, translation }]);
    }

    clearForm();
  };

  // const editSentence = (index) => {
  //   const s = sentences[index];
  //   setText(s.text);
  //   setWordsString(s.words.join(" "));
  //   setTranslation(s.translation || "");
  //   setEditingIndex(index);
  // };

  const removeSentence = (index) => {
    setSentences(sentences.filter((_, i) => i !== index));
    if (editingIndex === index) clearForm();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Предложения (для практики)</h3>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Полное предложение (напр: Ich bin müde)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Слова через пробел (напр: Ich bin müde)"
          value={wordsString}
          onChange={(e) => setWordsString(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Перевод (напр: Я устал)"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={addOrUpdateSentence}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingIndex !== null ? "💾 Сохранить" : "➕ Добавить"}
          </button>

          {editingIndex !== null && (
            <button
              type="button"
              onClick={clearForm}
              className="text-gray-600 border px-4 py-2 rounded"
            >
              ❌ Отмена
            </button>
          )}
        </div>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        {sentences.map((s, index) => (
          <li
            key={index}
            className="flex justify-between items-start flex-col sm:flex-row sm:items-center"
          >
            <div>
              <span className="font-medium">{s.text}</span>
              <br />
              <span className="text-sm text-gray-600">
                Перевод: {s.translation}
              </span>
            </div>
            <div className="flex gap-3 mt-1 sm:mt-0">
              {/* <button
                onClick={() => editSentence(index)}
                className="text-blue-600"
              >
                ✏️ Редактировать
              </button> */}
              <button
                onClick={() => removeSentence(index)}
                className="text-red-600"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
