import api from "./apiConfig";

export const createComment = async ({ postId, content }) => {
  try {
    const response = await api.post("/comments/create", { postId, content });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
