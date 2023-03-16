// reducers/posts.js

import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.byId = {};
      state.allIds = [];

      action.payload.forEach((post) => {
        const { _id, timestamp, content, author, likes } = post;
        state.allIds.push(_id);
        state.byId[_id] = { _id, timestamp, content, author, likes };
      });
    },
    addPost: (state, action) => {
      console.log(action.payload);
      const { _id, timestamp, content, author, likes } = action.payload;
      const authorId = author._id;
      state.byId[_id] = { _id, content, author, timestamp, likes };
      state.allIds.unshift(_id);
    },
    deletePost: (state, action) => {
      const { id } = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((postId) => postId !== id);
    },
    likePost: (state, action) => {
      const { postId, userId } = action.payload;
      console.log(postId);
      state.byId[postId].likes.push(userId);
    },
    unlikePost: (state, action) => {
      const { postId, userId } = action.payload;
      const updatedLikes = state.byId[postId].likes.filter(
        (id) => id !== userId
      );
      console.log(updatedLikes);
      state.byId[postId].likes = updatedLikes;
    },
  },
});

export const { addPost, deletePost, setPosts, unlikePost, likePost } =
  postsSlice.actions;
export const postReducer = postsSlice.reducer;
