// features/lessons/lessonsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const addLesson = createAsyncThunk(
  "lessons/addLesson",
  async (lesson) => {
    const docRef = await addDoc(collection(db, "lessons"), {
      ...lesson,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...lesson };
  }
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLesson.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default lessonsSlice.reducer;
