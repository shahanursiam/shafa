import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import ProductDetails from "../pages/ProductDetails";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div  className="group card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden my-2">

      {/* Image Section */}
      <figure className="relative h-52 m-3 rounded-xl overflow-hidden border border-gray-200">
        <img
          src={product?.images?.[0]?.url || ""}
          alt={product?.name || "Product"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Add to Cart */}
        <button
          className="absolute inset-x-0 bottom-3 mx-auto w-[80%] btn btn-secondary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-full flex items-center gap-2"
        >
          <FiShoppingCart />
          Add to Cart
        </button>

        {/* Stock Badge */}
        <span
          className={`absolute top-2 left-2 badge ${
            product?.stock > 0 ? "badge-success" : "badge-error"
          }`}
        >
          {product?.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </figure>

      {/* Body */}
      <div  className="card-body pt-2 px-3">
        <div onClick={handleProductClick} className="cursor-pointer space-y-2">
          <h2 className="text-lg font-semibold line-clamp-2 leading-tight">
          {product?.name || "Product Name"}
        </h2>

        {/* Price */}
        <div className="flex items-center gap-1 text-primary text-base font-bold">
          <TbCurrencyTaka className="text-lg" />
          <span>{product?.price || 0}</span>
        </div>

        {/* Stock */}
        <p className="text-sm  text-gray-500">
          Available:{" "}
          <span className=" font-bold text-gray-700">
            {product?.stock || 0}
          </span>
        </p>
        </div>

        {/* Buy Button */}
        <div className="pt-1">
          <button className="btn btn-primary w-full rounded-full">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
