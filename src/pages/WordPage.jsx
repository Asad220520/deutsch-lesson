import React, { useEffect, useState } from "react";
import WordList from "../components/word/wordList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const WordPage = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWords = async () => {
      const lessonsSnapshot = await getDocs(collection(db, "lessons"));
      let allWords = [];

      lessonsSnapshot.forEach((doc) => {
        const lesson = doc.data();
        if (Array.isArray(lesson.words)) {
          allWords = [...allWords, ...lesson.words];
        }
      });

      setWords(allWords);
      setLoading(false);
    };

    fetchAllWords();
  }, []);

  if (loading) return <p className="text-center mt-4">Загрузка слов...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Все слова из уроков</h1>
      <WordList words={words} />
    </div>
  );
};

export default WordPage;
