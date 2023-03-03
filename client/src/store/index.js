import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, addPost } from "./slices/postSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export { store, addPost };
