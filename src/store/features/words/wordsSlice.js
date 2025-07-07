// features/words/wordsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

// 🔁 Асинхронное обновление статуса слова в Firestore
export const updateWordStatusAsync = createAsyncThunk(
  "words/updateWordStatusAsync",
  async ({ id, status }) => {
    const wordRef = doc(db, "words", id);
    await updateDoc(wordRef, { status });
    return { id, status };
  }
);

const wordsSlice = createSlice({
  name: "words",
  initialState: [],
  reducers: {
    setWords: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(updateWordStatusAsync.fulfilled, (state, action) => {
      const { id, status } = action.payload;
      const word = state.find((w) => w.id === id);
      if (word) word.status = status;
    });
  },
});

export const { setWords } = wordsSlice.actions;
export default wordsSlice.reducer;
