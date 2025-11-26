const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Place order
const placeOrder = async (req, res) => {
  const { items, addressId } = req.body;

  // Check stock
  for (let item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity)
      return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    buyer: req.user.id,
    items,
    addressId,
    status: "pending",
  });

  res.status(201).json(order);
};

// Get my orders
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id }).populate("items.product");
  res.json(orders);
};

// Get single order
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// Update order status (seller/admin)
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};
