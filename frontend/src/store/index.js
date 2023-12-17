import { configureStore } from "@reduxjs/toolkit";
// slices
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
});
