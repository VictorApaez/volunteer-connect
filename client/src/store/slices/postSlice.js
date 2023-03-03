import { createSlice } from "@reduxjs/toolkit";
import { addPostReducer, addPostPrepare } from "../reducers/postReducers";

const initialState = {
  posts: {
    byId: {},
    allIds: [],
  },
  comments: {
    byId: {},
    allIds: [],
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: addPostReducer,
      prepare: addPostPrepare,
    },
    addComment: {
      reducer: (state, action) => {
        const { id, comment, postId } = action.payload;
        state.comments.byId[id] = comment;
        state.posts.byId[postId].comments.push(id);
        state.comments.allIds.unshift(id);
      },
      prepare: (comment, postId) => {
        return { payload: { id: comment._id, comment, postId } };
      },
    },
  },
});

export const { addPost, addComment } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
