import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLesson } from "../store/features/lessons/lessonsSlice";

import VideoInput from "../components/addLesson/VideoInput";
import LessonWords from "../components/addLesson/LessonWords";
import Exercises from "../components/addLesson/Exercises";
import NotesInput from "../components/addLesson/NotesInput";

export default function AddLessonPage() {
  const dispatch = useDispatch();

  const [lessonNumber, setLessonNumber] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [words, setWords] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLesson = {
      lessonNumber,
      videoUrl,
      topic,
      words,
      exercises,
      notes,
    };

    try {
      await dispatch(addLesson(newLesson));
      alert("✅ Урок добавлен!");

      // очистка формы
      setLessonNumber("");
      setVideoUrl("");
      setTopic("");
      setWords([]);
      setExercises([]);
      setNotes("");
    } catch (err) {
      console.error("❌ Ошибка при добавлении урока:", err);
      alert("Ошибка при добавлении урока.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Добавить урок</h2>

      <div className="space-y-1">
        <label className="block font-semibold">Номер урока</label>
        <input
          type="number"
          value={lessonNumber}
          onChange={(e) => setLessonNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <VideoInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} />

      <div className="space-y-1">
        <label className="block font-semibold">Тема урока</label>
        <input
          type="text"
          placeholder="Например: Глагол sein, артикли"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <LessonWords words={words} setWords={setWords} />
      <Exercises exercises={exercises} setExercises={setExercises} />
      <NotesInput notes={notes} setNotes={setNotes} />

      <div className="text-center">
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
