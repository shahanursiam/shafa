const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddlewares");
const { roleCheck } = require("../middlewares/roleMiddlewares");
const upload = require("../middlewares/uploadMiddlewares");

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Seller/Admin
router.post("/", protect, roleCheck("seller", "admin"), upload.array("images", 4), createProduct);
router.put("/:id", protect, roleCheck("seller", "admin"), upload.array("images", 4), updateProduct);
router.delete("/:id", protect, roleCheck("seller", "admin"), deleteProduct);

module.exports = router;
