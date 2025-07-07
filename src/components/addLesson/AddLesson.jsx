import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import VideoInput from "./ VideoInput";
import LessonWords from "./LessonWords";
import Exercises from "./Exercises";
import NotesInput from "./NotesInput";

export default function AddLesson() {
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
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "lessons"), newLesson);
      alert("Урок добавлен!");

      setLessonNumber("");
      setVideoUrl("");
      setTopic("");
      setWords([]);
      setExercises([]);
      setNotes("");
    } catch (err) {
      console.error("Ошибка при добавлении урока:", err);
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
