import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../state/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
