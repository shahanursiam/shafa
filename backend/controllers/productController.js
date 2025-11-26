const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Helper: Upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Upload images to Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "products");
        images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
      seller: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  const { keyword, category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (keyword) query.name = { $regex: keyword, $options: "i" };
  if (category) query.category = category;

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await Product.countDocuments(query);

  res.json({ products, page, totalPages: Math.ceil(total / limit), total });
};

// Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller", "name email");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.seller.toString() !== req.user.id.toString() && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(product, req.body);

  // Replace images if new ones uploaded
  if (req.files && req.files.length > 0) {
    // Delete old images
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    product.images = [];
    // Upload new images
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, "products");
      product.images.push({ public_id: result.public_id, url: result.secure_url });
    }
  }

  await product.save();
  res.json(product);
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.seller.toString() !== req.user.id.toString() && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  // Delete images from Cloudinary
  for (const img of product.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await product.remove();
  res.json({ message: "Product removed" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
