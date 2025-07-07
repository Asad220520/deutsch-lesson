import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLesson } from "../store/features/lessons/lessonsSlice";

import VideoInput from "../components/addLesson/VideoInput";
import LessonWords from "../components/addLesson/LessonWords";
import Exercises from "../components/addLesson/Exercises";
import NotesInput from "../components/addLesson/NotesInput";
import LessonSentences from "../components/addLesson/LessonSentences";

export default function AddLessonPage() {
  const dispatch = useDispatch();

  const [lessonNumber, setLessonNumber] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [lessonDate, setLessonDate] = useState("");
  const [tags, setTags] = useState([]);
  const [words, setWords] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState("");
  const [sentences, setSentences] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lessonNumber || !topic || words.length === 0) {
      alert("⚠️ Заполните все обязательные поля: номер урока, тема, слова.");
      return;
    }

    const newLesson = {
      lessonNumber,
      videoUrl,
      topic,
      lessonDate,
      tags,
      words,
      exercises,
      notes,
      sentences,
    };

    try {
      await dispatch(addLesson(newLesson));
      alert("✅ Урок добавлен!");

      // очистка формы
      setLessonNumber("");
      setVideoUrl("");
      setTopic("");
      setLessonDate("");
      setTags([]);
      setWords([]);
      setExercises([]);
      setNotes("");
      setSentences([]); // <--- ОБЯЗАТЕЛЬНО добавлено
    } catch (err) {
      console.error("❌ Ошибка при добавлении урока:", err);
      alert("Ошибка при добавлении урока.");
    }
  };

  const availableTags = ["Грамматика", "Лексика", "Произношение"];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Добавить урок</h2>

      <div className="space-y-1">
        <label className="block font-semibold">Номер урока *</label>
        <input
          type="number"
          value={lessonNumber}
          onChange={(e) => setLessonNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">Дата урока</label>
        <input
          type="date"
          value={lessonDate}
          onChange={(e) => setLessonDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <VideoInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} />

      <div className="space-y-1">
        <label className="block font-semibold">Тема урока *</label>
        <input
          type="text"
          placeholder="Например: Глагол sein, артикли"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">Категории</label>
        <div className="flex flex-wrap gap-2">
          {["Грамматика", "Лексика", "Произношение"].map((tag) => (
            <label key={tag} className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() =>
                  setTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  )
                }
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>

      <LessonWords words={words} setWords={setWords} />
      <LessonSentences sentences={sentences} setSentences={setSentences} />
      <Exercises exercises={exercises} setExercises={setExercises} />
      <NotesInput notes={notes} setNotes={setNotes} />

      <div className="text-center mb-10">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          💾 Сохранить урок
        </button>
      </div>
    </form>
  );
}
