import { configureStore } from "@reduxjs/toolkit";
// slices
import modalSlice from "./modalSlice";
import curtainSlice from "./curtainSlice";

export const store = configureStore({
  reducer: {
    curtain: curtainSlice,
    modal: modalSlice,
  },
});
