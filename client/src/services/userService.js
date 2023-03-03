import api from "./apiConfig";

export const getUser = async () => {
  try {
    const response = await api.get("/auth/verifyUser");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
