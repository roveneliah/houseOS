import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/usersSlice";
import windowsReducer from "@/features/windows/windowsSlice";
export const store = configureStore({
  reducer: {
    users: usersReducer,
    windows: windowsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
