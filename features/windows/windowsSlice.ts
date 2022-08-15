import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowsState {
  open: { [windowName: string]: boolean };
}

const initialState: WindowsState = {
  open: {
    welcome: false,
    search: false,
  },
};

export const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    open: (state, { payload }) => {
      const { windowName } = payload;
      state.open[payload.windowName] = true;
    },
    close: (state, { payload }) => {
      const { windowName } = payload;
      state.open[windowName] = false;
    },
    toggle: (state, { payload }) => {
      state.open[payload.windowName] = !state.open[payload.windowName];
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = windowsSlice.actions;

export default windowsSlice.reducer;
