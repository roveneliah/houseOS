import { RootState } from "@/app/store";
import { User } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  [address: string]: User;
}
const initialState: UsersState = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    track: (state, { payload: user }) => {
      state[user.address] = user;
    },
    update: (state, { payload: userFields }) => {
      if (!userFields?.address) return;
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
