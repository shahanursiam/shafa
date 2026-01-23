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

    // Group items by seller
    const sellerItemsMap = {};

    // Validate items, check stock, and group by seller
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      // Prevent seller from buying their own product
      if (product.seller.toString() === req.user.id.toString()) {
          return res.status(400).json({ message: `You cannot buy your own product: ${product.name}` });
      }

      const sellerId = product.seller.toString();
      if (!sellerItemsMap[sellerId]) {
        sellerItemsMap[sellerId] = [];
      }

      sellerItemsMap[sellerId].push({
        product,
        quantity: item.quantity
      });
    }

    const createdOrders = [];

    // Create an order for each seller
    for (const sellerId in sellerItemsMap) {
      const sellerGroup = sellerItemsMap[sellerId];
      let orderItems = [];
      let itemsPrice = 0;

      for (const groupItem of sellerGroup) {
         const { product, quantity } = groupItem;
         
         // Update stock
         product.stock -= quantity;
         await product.save();

         orderItems.push({
            product: product._id,
            name: product.name,
            quantity: quantity,
            price: product.price,
         });
         itemsPrice += product.price * quantity;
      }

      const shippingPrice = 50; // Per order/package shipping cost
      const totalAmount = itemsPrice + shippingPrice;

      const order = await Order.create({
        user: req.user.id,
        seller: sellerId,
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
        paymentInfo: req.body.paymentInfo,
        itemsPrice,
        shippingPrice,
        totalAmount,
        orderStatus: "Processing"
      });

      createdOrders.push(order);
    }

    res.status(201).json({ message: "Orders placed successfully", orders: createdOrders });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders (Admin/Seller)
const getAllOrders = async (req, res) => {
  try {
    let query = {};
    
    // If seller, only show orders assigned to them
    if (req.user.role === 'seller') {
      query = { seller: req.user.id };
    }

    const orders = await Order.find(query)
        .populate("user", "name email")
        .sort({ createdAt: -1 });
        
    res.json(orders);
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
  getAllOrders,
};
