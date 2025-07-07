import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Уроки", icon: "📚" },
  { to: "/add", label: "Добавить", icon: "➕" },
  { to: "/word", label: "Словарь", icon: "📖" },
];

export default function Header() {
  const location = useLocation();

  return (
    <>
      {/* Десктопный хедер */}
      <header className="hidden md:flex bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center w-full">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            🇩🇪 Deutsch Lesson
          </Link>

          <nav className="space-x-6">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`hover:underline hover:text-yellow-300 transition ${
                  location.pathname === to ? "underline text-yellow-300" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Мобильная нижняя навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white shadow-inner md:hidden">
        <div className="max-w-6xl mx-auto flex justify-around items-center h-14">
          {navItems.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center text-xs ${
                  active ? "text-yellow-300" : "text-white"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
