import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import VideoInput from "../addLesson/VideoInput";
import LessonWords from "../addLesson/LessonWords";
import Exercises from "../addLesson/Exercises";
import NotesInput from "../addLesson/NotesInput";
import LessonSentences from "../addLesson/LessonSentences";

export default function EditLesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lessonNumber, setLessonNumber] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [words, setWords] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [notes, setNotes] = useState("");
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, "lessons", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLessonNumber(data.lessonNumber || "");
          setVideoUrl(data.videoUrl || "");
          setTopic(data.topic || "");
          setWords(Array.isArray(data.words) ? data.words : []);

          setExercises(data.exercises || []);
          setNotes(data.notes || "");
          setSentences(data.sentences || []);
        } else {
          alert("Урок не найден");
          navigate("/");
        }
      } catch (err) {
        console.error("Ошибка при загрузке урока:", err);
        alert("Ошибка при загрузке урока");
      }
    };

    fetchLesson();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLesson = {
      lessonNumber,
      videoUrl,
      topic,
      words,
      exercises,
      notes,
      sentences,
    };
    try {
      const docRef = doc(db, "lessons", id);
      await updateDoc(docRef, updatedLesson);
      // alert("Урок успешно обновлён!");  // <- закомментировано
      console.log("Урок успешно обновлён!");
      navigate("/");
    } catch (err) {
      console.error("Ошибка при обновлении урока:", err);
      alert("Ошибка при обновлении урока");
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Редактировать урок</h2>

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
      <LessonSentences sentences={sentences} setSentences={setSentences} />
      <Exercises exercises={exercises} setExercises={setExercises} />
      <NotesInput notes={notes} setNotes={setNotes} />
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          💾 Сохранить изменения
        </button>
      </div>
    </form>
  );
}
