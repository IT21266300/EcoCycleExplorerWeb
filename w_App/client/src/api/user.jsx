import axiosInstance from "../services/axiosConfig";

export const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/api/user/user-details');
        return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
};