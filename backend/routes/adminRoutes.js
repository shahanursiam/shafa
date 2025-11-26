const express = require("express");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getDashboardStats,
} = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddlewares");
const { roleCheck } = require("../middlewares/roleMiddlewares");

const router = express.Router();

// Admin only
router.get("/users", protect, roleCheck("admin"), getAllUsers);
router.put("/users/:id/role", protect, roleCheck("admin"), updateUserRole);
router.delete("/users/:id", protect, roleCheck("admin"), deleteUser);
router.get("/dashboard/stats", protect, roleCheck("admin"), getDashboardStats);

module.exports = router;
