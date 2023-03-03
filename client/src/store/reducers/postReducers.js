export const addPostReducer = (state, action) => {
  const { id, post } = action.payload;
  state.posts.byId[id] = post;
  state.posts.allIds.unshift(id);
  return state;
};

export const addPostPrepare = (post) => {
  return { payload: { id: post._id, post } };
};
