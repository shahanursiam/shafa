const User = require("../models/userModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Get profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// Update profile
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  res.json({ message: "Profile updated" });
};

// Update profile image
const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // If user already has an image, delete it from Cloudinary
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new image to Cloudinary
    let cloudResult;
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profile_images" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload error", error });
        }
        cloudResult = result;

        // Save to user document
        user.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        user.save();

        return res.json({
          message: "Profile image updated successfully",
          avatar: user.avatar,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Get addresses
const getAddresses = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.addresses);
};

// Add address
const addAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const newAddress = {
    label: req.body.label,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    country: req.body.country,
  };
  user.addresses.push(newAddress);
  await user.save();
  res.status(201).json(user.addresses);
};

// Update address
const updateAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.id);
  if (!address) return res.status(404).json({ message: "Address not found" });
  Object.assign(address, req.body);
  await user.save();
  res.json(user.addresses);
};

// Delete address
const deleteAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.id);
  if (!address) return res.status(404).json({ message: "Address not found" });
  address.remove();
  await user.save();
  res.json({ message: "Address deleted", addresses: user.addresses });
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfileImage,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
