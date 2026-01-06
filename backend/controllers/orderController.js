const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Place order
const placeOrder = async (req, res) => {
  const { items, addressId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    let orderItems = [];
    let totalPrice = 0;

    // Validate items and calculate price
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      // Update stock
      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        
      });

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingInfo: {
        address: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        phone: address.phone,
        fullName: address.fullName,
      },
      itemsPrice: totalPrice,
      totalAmount: totalPrice, // Add tax/shipping logic here if needed
      orderStatus: "Processing"
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get my orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
     res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

};

// Update order status (seller/admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.status || order.orderStatus;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};
