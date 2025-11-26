const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, enum: ["Home", "Office"], default: "Home" }, // Home, Office, etc.
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        default: "default_avatar_id", // optional, for Cloudinary or your storage
      },
      url: {
        type: String,
        default: "https://www.example.com/default-avatar.png", // URL of default image
      },
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    address: [addressSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // only hash if password is new/modified
  this.password = await bcrypt.hash(this.password, 10); // 10 = salt rounds
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
