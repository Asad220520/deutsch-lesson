import React, { useState } from "react";
import PracticeBlock from "./PracticeBlock";

// Возможные типы упражнений
const EXERCISE_TYPES = [
  { value: "fillInTheBlanks", label: "Заполнение пропусков" },
  { value: "multipleChoice", label: "Выбор ответа" },
  { value: "translation", label: "Перевод" },
];

export default function Exercises({ exercises, setExercises }) {
  // Стейт для текущего типа упражнения
  const [exerciseType, setExerciseType] = useState(EXERCISE_TYPES[0].value);

  // Функция для добавления нового упражнения
  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        type: exerciseType, // Используем выбранный тип упражнения
        title: "",
        questions: [{ sentence: "", answer: "" }],
        options: [{ text: "", isCorrect: false }],
      },
    ]);
  };

  // Функция для обновления конкретного упражнения
  const updateExercise = (index, updated) => {
    const newExercises = [...exercises];
    newExercises[index] = updated;
    setExercises(newExercises);
  };

  // Функция для удаления упражнения
  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block font-semibold">Практические задания</label>
      {/* Рендеринг всех упражнений */}
      {exercises.map((ex, i) => (
        <PracticeBlock
          key={i}
          index={i}
          data={ex}
          update={updateExercise}
          remove={removeExercise}
          types={EXERCISE_TYPES}
        />
      ))}

      {/* Кнопка для добавления нового упражнения */}
      <button
        type="button"
        onClick={addExercise}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        + Добавить задание
      </button>
    </div>
  );
}
