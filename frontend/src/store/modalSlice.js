import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    content: "",
  },
  reducers: {
    setContent: (state, action) => ({
      ...state,
      content: action.payload,
    }),
  },
});

export const { setContent } = modalSlice.actions;

export default modalSlice.reducer;
