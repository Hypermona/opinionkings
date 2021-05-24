import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { preferedTheme: "dark" },
  reducers: {
    setTheme: (state, action) => {
      state.preferedTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
