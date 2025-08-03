import api from "../lib/axiox";

export const getAllCampaigns = async () => {
  try {
    const response = await api.get("/campaigns");
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};