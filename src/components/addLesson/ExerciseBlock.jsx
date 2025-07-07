import React from "react";

export default function ExerciseBlock({ index, data, update, remove }) {
  const updateTitle = (title) => {
    update(index, { ...data, title });
  };

  const updateQuestion = (qIndex, value) => {
    const questions = [...data.questions];
    questions[qIndex] = value;
    update(index, { ...data, questions });
  };

  const addQuestion = () => {
    update(index, { ...data, questions: [...data.questions, ""] });
  };

  const removeQuestion = (qIndex) => {
    const questions = data.questions.filter((_, i) => i !== qIndex);
    update(index, { ...data, questions });
  };

  return (
    <div className="border p-3 rounded space-y-2 bg-gray-50">
      <input
        type="text"
        placeholder="Заголовок упражнения"
        value={data.title}
        onChange={(e) => updateTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {data.questions.map((q, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={q}
            onChange={(e) => updateQuestion(i, e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder={`Вопрос ${i + 1}`}
          />
          <button
            type="button"
            onClick={() => removeQuestion(i)}
            className="text-red-500 hover:underline"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="text-blue-500 text-sm hover:underline"
      >
        + Добавить вопрос
      </button>

      <div className="text-right">
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-xs text-red-500 hover:underline"
        >
          Удалить упражнение
        </button>
      </div>
    </div>
  );
}
