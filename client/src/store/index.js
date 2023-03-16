import { configureStore } from "@reduxjs/toolkit";
import {
  postReducer,
  addPost,
  deletePost,
  setPosts,
  likePost,
  unlikePost,
} from "./slices/postSlice";
import {
  commentReducer,
  addComment,
  deleteComment,
  getCommentsByPostId,
  setComments,
} from "./slices/commentsSlice";

const rootReducer = {
  posts: postReducer,
  comments: commentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export {
  store,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  setPosts,
  addComment,
  deleteComment,
  setComments,
  getCommentsByPostId,
};
