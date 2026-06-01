import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://date.nager.at/api/v3",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);
