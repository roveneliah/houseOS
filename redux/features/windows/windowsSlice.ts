import { RootState } from "@/redux/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface WindowsState {
  open: { [windowName: string]: boolean };
  primaryApp: ReactNode;
}

const initialState: WindowsState = {
  open: {
    welcome: false,
    search: false,
  },
  primaryApp: undefined,
};

export const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.open[payload.windowName] = true;
    },
    close: (state, { payload }) => {
      const { windowName } = payload;
      state.open[windowName] = false;
    },
    toggle: (state, { payload }) => {
      state.open[payload.windowName] = !state.open[payload.windowName];
    },
    launch: (state, { payload }) => {
      state.primaryApp = payload;
    },
    quitApp: (state) => {
      state.primaryApp = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, toggle, launch, quitApp } = windowsSlice.actions;

export default windowsSlice.reducer;
