import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🇩🇪 Deutsch Lesson
        </Link>

        <nav className="space-x-4">
          <Link
            to="/"
            className="hover:underline hover:text-yellow-300 transition"
          >
            📚 Уроки
          </Link>
          <Link
            to="/add"
            className="hover:underline hover:text-yellow-300 transition"
          >
            ➕ Добавить урок
          </Link>
        </nav>
      </div>
    </header>
  );
}
