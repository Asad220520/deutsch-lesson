// store.js
import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "./features/lessons/lessonsSlice";
import wordsReducer from "./features/words/wordsSlice";
export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    words: wordsReducer,
  },
});
