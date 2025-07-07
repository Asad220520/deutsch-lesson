import React from "react";

export default function LessonStats({ words }) {
  const total = words.length;
  const learned = words.filter((w) => w.status === "learned").length;
  const learning = words.filter((w) => w.status === "learn").length;
  const repeat = words.filter((w) => w.status === "repeat").length;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">📊 Статистика урока</h2>
      <ul className="space-y-1 text-gray-700">
        <li>
          Всего слов: <strong>{total}</strong>
        </li>
        <li>
          Выучено: <strong>{learned}</strong>
        </li>
        <li>
          Изучается: <strong>{learning}</strong>
        </li>
        <li>
          На повторении: <strong>{repeat}</strong>
        </li>
      </ul>
    </div>
  );
}
