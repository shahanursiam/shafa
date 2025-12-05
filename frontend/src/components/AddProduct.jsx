import React, { useState, useRef } from "react";
import productApi from "../api/productApi";
import { ToastContainer, toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [imagePreview, setImagePreview] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const fileInputs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreview = [...imagePreview];
    newPreview[index] = URL.createObjectURL(file);
    setImagePreview(newPreview);
  };

  const triggerUpload = (index) => {
    fileInputs[index].current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = images.filter((img) => img !== null);
    if (uploadedImages.length !== 4) {
      toast.error("You must upload 4 images");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);

      images.forEach((img) => formData.append("images", img));

      setLoading(true);
      await productApi.createProduct(formData);
      toast.success("Product created!");

      // Reset form
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImages([null, null, null, null]);
      setImagePreview([null, null, null, null]);
      fileInputs.forEach((ref) => {
        if (ref.current) ref.current.value = null;
      });
    } catch (error) {
      toast.error("Failed to create product.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <ToastContainer />
        <div className=" flex flex-col gap-4">
          
        {/* Image Upload Section */}
        
        <div className=" flex flex-col gap-2">
        <p>Product Images</p>
          <div className="flex gap-4">
          {imagePreview.map((img, index) => (
            <div
              key={index}
              onClick={() => triggerUpload(index)}
              className="w-28 h-28 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer bg-gray-50"
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputs[index]}
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, index)}
              />
              {img ? (
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <IoCloudUploadOutline size={40} className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
        </div>

        {/* Product Details */}
        <div className="space-y-2 mt-4">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <p>Product Description</p>
          <textarea
            name="description"
            placeholder="Description"
            className="h-28 input"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <p>Product Price</p>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <p>Product Stock</p>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="input"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <p>Product Category</p>
          <select
            name="category"
            className="select"
            value={productData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option>Women's Fashion</option>
            <option>Men's Fashion</option>
            <option>Electronics</option>
            <option>Home & Garden</option>
            <option>Sports & Outdoors</option>
            <option>Health & Beauty</option>
            <option>Toys & Hobbies</option>
            <option>Automotive</option>
            <option>Books & Media</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn bg-indigo-400 mt-4"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
