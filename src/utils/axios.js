import axios from "axios"
import { useAuthStore } from '../hooks/useAuthStore'; // Đường dẫn tới useAuthStore của bạn

export const TOKEN_KEY = "accessToken"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Redirecting to login page")
      useAuthStore.setState({ accessToken: null });
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default axiosInstance;
