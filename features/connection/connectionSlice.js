import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    value: false,
  },
  reducers: {
    setConnected: () => (state.value = true),
  },
});

// Action creators are generated for each case reducer function
export const { setConnected } = connectionSlice.actions;

export default connectionSlice.reducer;
