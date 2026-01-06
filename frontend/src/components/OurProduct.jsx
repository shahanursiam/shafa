import React from "react";
import ProductCard from "./ProductCard";
import productApi from "../api/productApi";
import { useEffect, useState } from "react";
const OurProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProducts();
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-10 w-2 bg-indigo-500 rounded-lg"></span>
        <p className="text-lg text-indigo-500 font-bold">Our Products</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Explore Our Products
      </h2>
      <div>
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      {products.length > 8 && (
        <div className="flex justify-center">
          <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default OurProduct;
