import axiosClient from "./axiosClient";

const userApi = {
  getProfile: () => axiosClient.get("/users/profile"),

  updateProfile: (data) => axiosClient.put("/users/profile", data),

  updateProfileImage: (file) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    return axiosClient.put("/users/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Address
  getAddresses: () => axiosClient.get("/users/addresses"),
  addAddress: (data) => axiosClient.post("/users/addresses", data),
  updateAddress: (id, data) =>
    axiosClient.put(`/users/addresses/${id}`, data),
  deleteAddress: (id) => axiosClient.delete(`/users/addresses/${id}`),
};

export default userApi;
