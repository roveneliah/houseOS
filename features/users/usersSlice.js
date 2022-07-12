import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    track: (state, { payload: user }) => {
      state[user.address] = user;
    },
    update: (state, { payload: userFields }) => {
      state[userFields.address] = {
        ...state[userFields.address],
        ...userFields,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { track, update } = usersSlice.actions;

export default usersSlice.reducer;
