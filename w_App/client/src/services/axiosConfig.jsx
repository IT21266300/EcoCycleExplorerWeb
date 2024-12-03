import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed for tokens or error handling
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Fetch token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    return Promise.reject(error);
  }
);

export default axiosInstance;