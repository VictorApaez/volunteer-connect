import api from "./apiConfig";

export const getPosts = async () => {
  try {
    const res = await api.get("/posts/all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (post) => {
  try {
    const res = await api.post("/posts/create", post);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const likePostDB = async (postId) => {
  try {
    const res = await api.post(`/posts/like`, { postId });
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const unlikePostDB = async (postId) => {
  try {
    const res = await api.post(`/posts/unlike`, { postId });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersByPostLikes = async (postId) => {
  try {
    const res = await api.post(`/posts/likes/users`, { postId });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
