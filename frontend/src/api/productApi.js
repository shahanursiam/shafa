import axiosClient from "./axiosClient";

const productApi = {
  getProductsByOwner: () => axiosClient.get("/products/owner"),
  createProduct: (formData) => 
    axiosClient.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getProducts: (params) => axiosClient.get("/products", { params }),
  
  getProductById: (id) => axiosClient.get(`/products/${id}`),

  updateProduct: (id, formData) =>
    axiosClient.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteProduct: (id) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
