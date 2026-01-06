import React, { useState } from "react";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import { getUser } from "../uits/auth";
const ProfileImageUpdate = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // show preview immediately
    setLoading(true);

    try {
      const res = await userApi.updateProfileImage(file);

      if (res.data.avatar) {
        toast.success("Profile image updated!");

        // Update existing 'user' in localStorage
        const currentUser = JSON.parse(localStorage.getItem("user")) || {};
        currentUser.profile = res.data.avatar.url; // only update profile field
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to upload profile image"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col  items-center md:w-2/6  gap-4 mt-6">
      <h1 className="text-xl font-bold">Update Profile Image</h1>

      {/* Profile Preview */}
      <img
        src={preview || getUser()?.profile || "/default-avatar.png"}
        alt="Profile Preview"
        className="w-32 h-32 rounded-full object-cover border shadow"
      />

      {/* Upload Button */}
      <label className="btn w-2/4 md:3/4">
        {loading ? "Uploading..." : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default ProfileImageUpdate;
