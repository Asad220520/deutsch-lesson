import React, { useState, useEffect } from "react";

export default function QuizSentenceBuilder({ sentence, onNext }) {
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    setShuffledWords(shuffleArray(sentence.words));
    setSelectedWords([]);
  }, [sentence]);

  // Перемешивание массива
  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Перетаскиваем слово из списка доступных слов
  const handleDragStart = (e, word, source) => {
    e.dataTransfer.setData("text/plain", word);
    e.dataTransfer.setData("source", source);
  };

  // Разрешаем сброс
  const handleDragOver = (e) => e.preventDefault();

  // Добавляем слово в предложение при сбросе
  const handleDrop = (e) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    const source = e.dataTransfer.getData("source");

    if (source === "shuffled") {
      setSelectedWords([...selectedWords, word]);
      setShuffledWords(shuffledWords.filter((w) => w !== word));
    } else if (source === "selected") {
      // Позволим перетаскивать слова внутри выбранных для перестановки
    }
  };

  // Удаляем слово из предложения и возвращаем в список
  const removeWord = (word) => {
    setSelectedWords(
      selectedWords.filter((w, i) => i !== selectedWords.indexOf(word))
    );
    setShuffledWords([...shuffledWords, word]);
  };

  // Проверка результата
  const handleSubmit = () => {
    if (selectedWords.join(" ") === sentence.text) {
      alert("✅ Правильно!");
      onNext();
    } else {
      alert("❌ Неправильно. Попробуй еще.");
    }
  };

  // Перемещаем слово внутри выбранных (drag and drop reorder)
  const handleDropOnSelected = (e, index) => {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData("text/plain");
    const source = e.dataTransfer.getData("source");

    if (source === "selected") {
      const draggedIndex = selectedWords.indexOf(draggedWord);
      if (draggedIndex === -1) return;

      let newSelected = [...selectedWords];
      newSelected.splice(draggedIndex, 1); // удаляем с прошлой позиции
      newSelected.splice(index, 0, draggedWord); // вставляем на новую
      setSelectedWords(newSelected);
    }
  };

  return (
    <div className="p-4 border rounded shadow space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Соберите предложение:</h2>

      {sentence.translation ? (
        <p className="italic text-gray-700 mb-4">
          Перевод: {sentence.translation}
        </p>
      ) : (
        <p className="italic text-gray-500 mb-4">🛈 Перевод недоступен</p>
      )}

      {/* Слова для выбора */}
      <div className="flex flex-wrap gap-2 mb-4 border p-3 rounded min-h-[50px]">
        {shuffledWords.length === 0 && <i>Все слова выбраны</i>}
        {shuffledWords.map((word, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, word, "shuffled")}
            className="cursor-move bg-gray-200 px-3 py-1 rounded select-none"
          >
            {word}
          </div>
        ))}
      </div>

      {/* Собранное предложение (дроп зона) */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-wrap gap-2 min-h-[50px] border p-3 rounded bg-gray-50"
      >
        {selectedWords.length === 0 && (
          <i>Перетащите сюда слова, чтобы составить предложение</i>
        )}

        {selectedWords.map((word, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, word, "selected")}
            onDrop={(e) => handleDropOnSelected(e, i)}
            onDragOver={handleDragOver}
            className="cursor-move bg-blue-300 px-3 py-1 rounded select-none relative"
          >
            {word}
            <button
              onClick={() => removeWord(word)}
              className="absolute top-0 right-0 text-xs font-bold text-red-700 px-1"
              type="button"
              aria-label="Удалить слово"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => {
            setSelectedWords([]);
            setShuffledWords(shuffleArray(sentence.words));
          }}
          className="bg-yellow-400 px-4 py-2 rounded"
        >
          Сбросить
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Проверить
        </button>
      </div>
    </div>
  );
}
