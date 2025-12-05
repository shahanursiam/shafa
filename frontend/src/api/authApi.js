import axiosClient from "./axiosClient";

const authApi = {
  signup: (data) => axiosClient.post("/auth/signup", data),
  login: (data) => axiosClient.post("/auth/login", data),
};

export default authApi;
