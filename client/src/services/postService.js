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

export const likePost = async (postId) => {
  try {
    const res = await api.post(`/posts/like`, { postId });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (postId) => {
  try {
    const res = await api.post(`/posts/unlike`, { postId });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
