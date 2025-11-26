const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddlewares");
const { roleCheck } = require("../middlewares/roleMiddlewares");

const router = express.Router();

// Buyer routes
router.post("/", protect, roleCheck("buyer"), placeOrder);
router.get("/my-orders", protect, roleCheck("buyer"), getMyOrders);
router.get("/:id", protect, getOrderById);

// Seller/Admin routes (update order status)
router.put("/:id/status", protect, roleCheck("seller", "admin"), updateOrderStatus);

module.exports = router;
