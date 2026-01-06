import React, { useState, useEffect } from "react";
import productApi from "../api/productApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./EditProduct";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProductsByOwner();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productApi.deleteProduct(productId);
      fetchProducts();
      toast.success("Product deleted successfully");
      // Refresh the product list
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Use this to finish editing
  const handleUpdateSuccess = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  if (editingProduct) {
    return <EditProduct product={editingProduct} onCancel={() => setEditingProduct(null)} onUpdateSuccess={handleUpdateSuccess} />
  }

  // Render
  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center flex-col md:flex-row gap-2">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-20 h-20 object-cover"
                      />
                    ) : (
                      "No Images"
                    )}
                    <span className="font-bold ml-2">{product.name}</span>
                  </div>
                </td>
                <td>{product.category || "N/A"}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="">
                  <button onClick={() => setEditingProduct(product)} className="btn btn-sm btn-primary mr-2">Edit</button>
                  <button
                    className="btn btn-sm btn-error mt-2 md:mt-0"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
