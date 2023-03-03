import api from "./apiConfig";

export const signup = async ({ username, password }) => {
  try {
    const response = await api.post("/auth/signup", {
      username,
      password,
    });
    if (response.status === 200) {
      // Signup was successful, log in the user
      const loginResponse = await login({ username, password });

      if (loginResponse.success) {
        return {
          success: true,
          token: loginResponse.token,
          error: null,
          status: response.status,
        };
      } else {
        return loginResponse;
      }
    }
  } catch (err) {
    const { data, status } = err.response;
    if (status === 409) {
      // Username already exists, return error message
      return { success: false, error: data.message, status, token: null };
    } else {
      // Some other error occurred
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
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    if (response.status === 200) {
      return { success: true, token: response.data.token };
    } else {
      return { success: false, error: response.data.message };
    }
  } catch (err) {
    return { success: false, error: err.response.data };
  }
};
