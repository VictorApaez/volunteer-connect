import api from "./apiConfig";

export const signup = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/signup", { username, password });
    if (response.status === 200) {
      return {
        success: true,
        token: response.data.token,
        error: null,
        status: response.status,
      };
    }
  } catch (err) {
    const { data, status } = err.response;
    if (status === 409) {
      return { success: false, error: data.message, status, token: null };
    } else {
      return {
        success: false,
        error: "An error occurred during signup",
        status,
        token: null,
      };
    }
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return { success: true, token: response.data.token };
  } catch (err) {
    return { success: false, error: err.response.data };
  }
};
