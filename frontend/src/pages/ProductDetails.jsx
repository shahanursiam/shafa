import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../api/productApi";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiMinus, FiPlus } from "react-icons/fi";
import BestSellingProduct from "../components/BestSellingProduct";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await productApi.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE SECTION */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 justify-center">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt=""
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-24 h-24 rounded-lg cursor-pointer border-2 transition
                  ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={product.images?.[selectedImageIndex]?.url}
                alt={product.name}
                className="w-full h-[420px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col space-y-5">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-1 text-2xl font-bold text-primary">
              <TbCurrencyTaka />
              {product.price}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <p className="text-sm">
              Stock:
              <span
                className={`ml-2 font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </p>

            {/* Quantity Controller */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>

              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FiMinus />
                </button>

                <span className="px-6 font-semibold select-none">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="pt-6">
              <button
                disabled={product.stock === 0}
                className="btn btn-primary w-full rounded-full text-lg disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="my-7">
        <BestSellingProduct />
        </div>
    </div>
  );
};

export default ProductDetails;
