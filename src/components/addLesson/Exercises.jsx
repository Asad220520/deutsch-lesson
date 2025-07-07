import React from "react";
import ExerciseBlock from "./ExerciseBlock";

export default function Exercises({ exercises, setExercises }) {
  const addExercise = () => {
    setExercises([...exercises, { title: "", questions: [""] }]);
  };

  const updateExercise = (index, updated) => {
    const newExercises = [...exercises];
    newExercises[index] = updated;
    setExercises(newExercises);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block font-semibold">Упражнения</label>

      {exercises.map((ex, i) => (
        <ExerciseBlock
          key={i}
          index={i}
          data={ex}
          update={updateExercise}
          remove={removeExercise}
        />
      ))}

      <button
        type="button"
        onClick={addExercise}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        + Добавить упражнение
      </button>
    </div>
  );
}
