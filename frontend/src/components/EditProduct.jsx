import React, { useState, useRef, useEffect } from "react";
import productApi from "../api/productApi";
import { ToastContainer, toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";

const EditProduct = ({ product, onCancel, onUpdateSuccess }) => {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
    });

    const [images, setImages] = useState([null, null, null, null]); // For NEW images
    const [imagePreview, setImagePreview] = useState([null, null, null, null]); // For Previews
    const [loading, setLoading] = useState(false);

    const fileInputs = [useRef(), useRef(), useRef(), useRef()];

    // Load initial data
    useEffect(() => {
        if (product) {
            setProductData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                stock: product.stock || "",
                category: product.category || "",
            });

            // Show existing images in preview
            const existingPreviews = [null, null, null, null];
            if (product.images && product.images.length > 0) {
                product.images.forEach((img, i) => {
                    if (i < 4) existingPreviews[i] = img.url;
                });
            }
            setImagePreview(existingPreviews);
        }
    }, [product]);

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

        try {
            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("description", productData.description);
            formData.append("price", productData.price);
            formData.append("stock", productData.stock);
            formData.append("category", productData.category);

            // Append new images only if selected
            images.forEach((img) => {
                if (img) formData.append("images", img);
            });

            setLoading(true);
            await productApi.updateProduct(product._id, formData);
            toast.success("Product updated successfully!");
            if (onUpdateSuccess) onUpdateSuccess();
        } catch (error) {
            toast.error("Failed to update product.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Product</h2>
                <button onClick={onCancel} className="btn btn-sm btn-ghost">Cancel</button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <ToastContainer />
                <div className=" flex flex-col gap-4">

                    {/* Image Upload Section */}

                    <div className=" flex flex-col gap-2">
                        <p>Product Images (Click to replace)</p>
                        <div className="flex gap-4 flex-wrap">
                            {imagePreview.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => triggerUpload(index)}
                                    className="w-28 h-28 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer bg-gray-50 relative"
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

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="btn bg-indigo-400 flex-1"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline flex-1"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default EditProduct;
