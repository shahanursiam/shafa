const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  updateProfileImage,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/userController"); 

const { protect } = require("../middlewares/authMiddlewares");
const upload = require("../middlewares/uploadMiddlewares"); 

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/image", protect, upload.single("profileImage"), updateProfileImage);

// Address management
router.get("/addresses", protect, getAddresses);
router.post("/addresses", protect, addAddress);
router.put("/addresses/:id", protect, updateAddress);
router.delete("/addresses/:id", protect, deleteAddress);

module.exports = router;
