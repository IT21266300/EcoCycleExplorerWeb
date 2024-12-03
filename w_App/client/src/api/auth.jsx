import axiosInstance from "../services/axiosConfig";

export const signIn = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/stafflogin', { email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
};

export const signUp = async (name, employeeType, email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/staffregister", {
      name,
      employeeType,
      email,
      password,
    });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};