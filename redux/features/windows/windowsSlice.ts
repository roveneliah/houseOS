import { RootState } from "@/redux/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface WindowsState {
  open: { [windowName: string]: boolean };
  searchView: number | undefined;
  primaryApp: ReactNode;
  primaryAppWidth?: number;
  primaryAppHeight?: number;
}

const initialState: WindowsState = {
  open: {
    welcome: false,
    search: false,
  },
  searchView: undefined,
  primaryApp: undefined,
  primaryAppWidth: undefined,
  primaryAppHeight: undefined,
};

export const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.open[payload.windowName] = true;
      state.searchView = payload.searchView;
    },
    close: (state, { payload }) => {
      const { windowName } = payload;
      state.open[windowName] = false;
      state.searchView = undefined;
    },
    toggle: (state, { payload }) => {
      state.open[payload.windowName] = !state.open[payload.windowName];
    },
    launch: (state, { payload }) => {
      state.primaryApp = payload.app;
      state.primaryAppWidth = payload.width;
      state.primaryAppHeight = payload.height;
    },
    quitApp: (state) => {
      state.primaryApp = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, toggle, launch, quitApp } = windowsSlice.actions;

export default windowsSlice.reducer;
