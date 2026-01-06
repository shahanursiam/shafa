import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productApi from "../api/productApi";

const BestSellingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBestSellingProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getBestSellingProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Failed to fetch best selling products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellingProducts();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-2 bg-indigo-500 rounded-lg"></span>
        <p className="text-lg text-indigo-500 font-bold">This Month</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Best Selling Products
        </h2>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
          View All
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellingProduct;
