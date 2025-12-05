import axiosClient from "./axiosClient";

const orderApi = {
  createOrder: (data) => axiosClient.post("/orders", data),
  getMyOrders: () => axiosClient.get("/orders/my"),
  getOrderById: (id) => axiosClient.get(`/orders/${id}`),
};

export default orderApi;
