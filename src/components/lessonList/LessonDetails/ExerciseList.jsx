import React from "react";

export default function ExerciseList({ exercises }) {
  if (!Array.isArray(exercises) || exercises.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2 text-lg">📌 Упражнения</h2>
      <div className="space-y-4">
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow transition"
          >
            {typeof ex === "string" ? (
              <p>{ex}</p>
            ) : (
              <>
                <p className="font-medium">❓ Вопрос: {ex.title}</p>

                {/* Проверка на правильность данных */}
                {Array.isArray(ex.questions) && ex.questions.length > 0 ? (
                  ex.questions.map((q, index) => {
                    // Пропускаем вопросы с неполными данными
                    if (!q.sentence || !q.answer) {
                      return null; // Просто пропускаем этот вопрос
                    }
                    return (
                      <div key={index}>
                        <p>💬 Предложение: {q.sentence}</p>
                        <p className="text-green-700">✅ Ответ: {q.answer}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-yellow-500">⚠️ Нет данных для вопросов.</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
