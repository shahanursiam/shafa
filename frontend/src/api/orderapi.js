import axiosClient from "./axiosClient";

const orderApi = {
  createOrder: (data) => axiosClient.post("/orders", data),
  getMyOrders: () => axiosClient.get("/orders/my-orders"),
  getOrderById: (id) => axiosClient.get(`/orders/${id}`),
  getAllOrders: () => axiosClient.get("/orders/admin/all"),
  updateStatus: (id, status) => axiosClient.put(`/orders/${id}/status`, { status }),
};

export default orderApi;
