import AddLesson from "./components/addLesson/AddLesson";
import LessonList from "./components/lessonList/LessonList";
import Header from "./components/layout/Header";

import { Routes, Route } from "react-router-dom";
// import LessonDetails from "./components/LessonDetails"; // если есть

export default function App() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<LessonList />} />
          <Route path="/add" element={<AddLesson />} />
          {/* <Route path="/lesson/:id" element={<LessonDetails />} />  */}
        </Routes>
      </main>
    </>
  );
}

