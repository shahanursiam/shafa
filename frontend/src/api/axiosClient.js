import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api", // your backend URL
  withCredentials: true,
});

// Attach token on every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
