const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Update user role
const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.role = req.body.role || user.role;
  await user.save();
  res.json(user);
};

// Delete user
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.remove();
  res.json({ message: "User deleted" });
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  res.json({ users, products, orders });
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getDashboardStats,
};
