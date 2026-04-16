import api from "./api/api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);

    // Sesuaikan dengan balikan API Mas: "access_token"
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
