import api from "./apiConfig";

export const createComment = async ({ postId, content }) => {
  try {
    const response = await api.post("/comments/create", { postId, content });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllComments = async (postId) => {
  try {
    const response = await api.get("/comments/all", { postId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
