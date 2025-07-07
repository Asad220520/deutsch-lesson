// src/components/addLesson/PracticeBlock.jsx
import React from "react";

export default function PracticeBlock({ index, data, update, remove, types }) {
  const updateField = (field, value) => {
    update(index, { ...data, [field]: value });
  };

  const updateQuestion = (qIndex, field, value) => {
    const questions = [...(data.questions || [])];
    if (!questions[qIndex]) return;
    questions[qIndex] = { ...questions[qIndex], [field]: value };
    update(index, { ...data, questions });
  };

  const updateOption = (oIndex, field, value) => {
    const options = [...(data.options || [])];
    if (!options[oIndex]) return;
    options[oIndex] = { ...options[oIndex], [field]: value };
    update(index, { ...data, options });
  };

  const addQuestion = () => {
    update(index, {
      ...data,
      questions: [...(data.questions || []), { sentence: "", answer: "" }],
    });
  };

  const removeQuestion = (qIndex) => {
    const questions = (data.questions || []).filter((_, i) => i !== qIndex);
    update(index, { ...data, questions });
  };

  const addOption = () => {
    update(index, {
      ...data,
      options: [...(data.options || []), { text: "", isCorrect: false }],
    });
  };

  const removeOption = (oIndex) => {
    const options = (data.options || []).filter((_, i) => i !== oIndex);
    update(index, { ...data, options });
  };

  return (
    <div className="border p-3 rounded space-y-2 bg-gray-50">
      {/* Тип упражнения */}
      <select
        className="w-full p-2 border rounded mb-2"
        value={data.type}
        onChange={(e) => updateField("type", e.target.value)}
      >
        {types.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Заголовок */}
      <input
        type="text"
        placeholder="Заголовок задания"
        value={data.title || ""}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      {/* Тип: Заполнение пропусков */}
      {data.type === "fillInTheBlanks" && (
        <>
          {(data.questions || []).map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder={`Предложение ${i + 1}`}
                value={q.sentence || ""}
                onChange={(e) => updateQuestion(i, "sentence", e.target.value)}
              />
              <input
                type="text"
                className="w-32 p-2 border rounded"
                placeholder="Ответ"
                value={q.answer || ""}
                onChange={(e) => updateQuestion(i, "answer", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-500 text-sm"
          >
            + Добавить вопрос
          </button>
        </>
      )}

      {/* Тип: Выбор ответа */}
      {data.type === "multipleChoice" && (
        <>
          <p className="font-medium">Варианты ответов</p>
          {(data.options || []).map((opt, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={opt.isCorrect}
                onChange={(e) => updateOption(i, "isCorrect", e.target.checked)}
              />
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                placeholder="Вариант ответа"
                value={opt.text || ""}
                onChange={(e) => updateOption(i, "text", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeOption(i)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-blue-500 text-sm"
          >
            + Добавить вариант
          </button>
        </>
      )}

      {/* Тип: Перевод */}
      {data.type === "translation" && (
        <>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Фраза для перевода"
            value={data.questions?.[0]?.sentence || ""}
            onChange={(e) => updateQuestion(0, "sentence", e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Перевод"
            value={data.questions?.[0]?.answer || ""}
            onChange={(e) => updateQuestion(0, "answer", e.target.value)}
          />
        </>
      )}

      {/* Кнопка удаления */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-xs text-red-500 hover:underline"
        >
          Удалить задание
        </button>
      </div>
    </div>
  );
}
