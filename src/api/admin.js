import api from "../lib/axiox";

export const getAdminDashboard = async () => {
  try {
    const response = await api.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    throw error;
  }
}