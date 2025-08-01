import api from "../lib/axiox";
const user = JSON.parse(localStorage.getItem("user"));

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Return user data and token
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data; // Return user data and token
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};

export const getDashboardData = async (userId) => {
  try {
    const response = await api.get(`/fundraiser/fundraiser/${userId}`);
    return response.data; // Return dashboard data
  } catch (error) {
    throw error.response?.data || new Error("Failed to fetch dashboard data");
  }
};

export const createFundraiser = async (fundraiserData) => {
  try {
    const response = await api.post(
      `/fundraiser/create-fundraiser/${user.id}`,
      fundraiserData
    );  
    return response.data; // Return created fundraiser data
  } catch (error) {
    throw error.response?.data || new Error("Failed to create fundraiser");
  }
};
