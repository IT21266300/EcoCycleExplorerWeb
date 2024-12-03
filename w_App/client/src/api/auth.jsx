import axiosInstance from "../services/axiosConfig";

export const signIn = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/token', { email, password });
      return response.data; // Return token or user data
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
};