import React, { useState } from "react";
import ProfileImageUpdate from "./ProfileImageUpdate";
import userApi from "../api/userApi"; // your API methods
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.newPassword) updateData.password = formData.newPassword;

      const res = await userApi.updateProfile(updateData);

      if (res.data.user) {
        toast.success("Profile updated successfully!");

        // Update Context (which updates localStorage)
        updateUser(res.data.user);

        // Optionally clear password fields
        setFormData({ ...formData, newPassword: "", confirmNewPassword: "" });
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="">
      <p className="font-bold">Edit Your Information</p>
      <ProfileImageUpdate />

      <div className="flex flex-col gap-4 mt-4">
        {/* Full Name */}
        <div className="flex flex-col w-full">
          <label className="font-medium">Full Name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium">Email Address</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Change Password */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Change Password</label>
          <input
            className="input"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
          />
          <input
            className="input"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          className="btn w-full md:w-1/4 bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
