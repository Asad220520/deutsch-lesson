import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import QuizWordChoice from "../components/practice/QuizWordChoice";
import QuizTranslate from "../components/practice/QuizTranslate";
import QuizAudio from "../components/practice/QuizAudio";
import QuizFillBlank from "../components/practice/QuizFillBlank";
import QuizMatch from "../components/practice/QuizMatch";
import QuizSentenceBuilder from "../components/practice/QuizSentenceBuilder";

// Все доступные типы викторин
const quizTypes = [
  "wordchoice",
  "translate",
  "audio",
  "fillblank",
  "match",
  "sentencebuilder",
];


export default function PracticeLessonPage() {
  const { id } = useParams();
  const [words, setWords] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const totalSteps = words.length * quizTypes.length;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, "lessons", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const wordsArray = Array.isArray(data.words) ? data.words : [];
          const sentencesArray = Array.isArray(data.sentences)
            ? data.sentences
            : [];

          setLesson({ ...data, sentences: sentencesArray });
          setWords(wordsArray);
        } else {
          console.error("❌ Документ не найден.");
        }
      } catch (error) {
        console.error("❌ Ошибка при загрузке урока:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleNext = () => setStep((prev) => prev + 1);

  if (loading) return <p className="text-center mt-4">Загрузка практики...</p>;
  if (!lesson || words.length === 0)
    return <p className="text-center text-red-600">Нет слов для практики.</p>;

  const currentWord = words[Math.floor(step / quizTypes.length)];
  const currentQuizType = quizTypes[step % quizTypes.length];
  
  if (step >= totalSteps) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-green-600">
          🎉 Викторина завершена!
        </h2>
        <p className="mt-2">Вы прошли все задания. Отличная работа!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4 text-center">
        Практика: Урок {lesson.lessonNumber} – {lesson.topic}
      </h1>

      {currentQuizType === "wordchoice" && currentWord && (
        <QuizWordChoice
          word={currentWord}
          allWords={words}
          onNext={handleNext}
        />
      )}
      {currentQuizType === "translate" && currentWord && (
        <QuizTranslate
          word={currentWord}
          onNext={handleNext}
          allWords={words}
        />
      )}
      {currentQuizType === "audio" && currentWord && (
        <QuizAudio word={currentWord} allWords={words} onNext={handleNext} />
      )}
      {currentQuizType === "fillblank" && currentWord && (
        <QuizFillBlank
          word={currentWord}
          onNext={handleNext}
          allWords={words}
        />
      )}
      {currentQuizType === "match" && currentWord && (
        <QuizMatch word={currentWord} onNext={handleNext} allWords={words} />
      )}
      {currentQuizType === "sentencebuilder" &&
        lesson.sentences &&
        lesson.sentences.length > 0 && (
          <QuizSentenceBuilder
            sentence={lesson.sentences[step % lesson.sentences.length]}
            onNext={handleNext}
          />
        )}
    </div>
  );
}
