import Header from "./components/layout/Header";

import { Routes, Route } from "react-router-dom";
import EditLesson from "./components/EditLesson/EditLesson";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";
import AddLessonPage from "./pages/AddLessonPage";
import LessonDetailsPage from "./components/lessonList/LessonDetails/LessonDetailsPage";
import PracticeLessonPage from "./pages/PracticePage";

export default function App() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddLessonPage />} />
          <Route path="/word" element={<WordPage />} />
          <Route path="/lesson/:id" element={<LessonDetailsPage />} />
          <Route path="/edit/:id" element={<EditLesson />} />
          <Route path="/practice/:id" element={<PracticeLessonPage />} />
        </Routes>
      </main>
    </>
  );
}
