import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import connectionReducer from "@/features/connection/connectionSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    connection: connectionReducer,
  },
});
