const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddlewares");
const { roleCheck } = require("../middlewares/roleMiddlewares");

const router = express.Router();

// Buyer routes (and others can buy too, except their own products)
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Seller/Admin routes (update order status)
router.get("/admin/all", protect, roleCheck("seller", "admin"), getAllOrders);
router.put("/:id/status", protect, roleCheck("seller", "admin"), updateOrderStatus);

module.exports = router;
