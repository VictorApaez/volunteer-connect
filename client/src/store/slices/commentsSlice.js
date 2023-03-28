import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.byId = {};
      state.allIds = [];

      action.payload.forEach((comment) => {
        state.byId[comment._id] = comment;
        state.allIds.push(comment._id);
      });
    },
    addComment: (state, action) => {
      const { _id, content, postId, author, timestamp, likes } = action.payload;

      state.byId[_id] = { _id, content, postId, author, timestamp, likes };
      state.allIds.push(_id);
    },
    deleteComment: (state, action) => {
      const { id } = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((commentId) => commentId !== id);
    },
  },
});

export const { addComment, deleteComment, setComments } = commentsSlice.actions;
export const commentReducer = commentsSlice.reducer;

export const getCommentsByPostId = (state, postId) => {
  return state.comments.allIds
    .filter((id) => state.comments.byId[id].postId === postId)
    .map((id) => state.comments.byId[id]);
};
