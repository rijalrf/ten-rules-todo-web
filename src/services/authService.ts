import apiClient from "./apiClient";

export const login = async (credentials: any) => {
  try {
    const response = await apiClient.post("/login", credentials);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
