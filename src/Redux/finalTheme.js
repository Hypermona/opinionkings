import { createSlice } from "@reduxjs/toolkit";

let preferedTheme = window.matchMedia("(prefers-color-scheme: dark)");
const finalThemeSlice = createSlice({
  name: "theme",
  initialState: { preferedTheme },
  reducers: {
    setFinalTheme: (state, action) => {
      state.preferedTheme = action.payload;
    },
  },
});

export const { setFinalTheme } = finalThemeSlice.actions;
export default finalThemeSlice.reducer;
