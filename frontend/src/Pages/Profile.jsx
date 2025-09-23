import React, { useState, useEffect } from "react";
import { Edit3, Mail, AtSign, User, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { user, editUserProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });

  const [editProfile, setEditProfile] = useState(profile);

  // keep profile in sync with context user
  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  const handleClose = () => navigate(-1);

  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updated = await editUserProfile(editProfile);
      setProfile(updated);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-4 px-2 sm:px-4 pt-20">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-2xl shadow-md p-6 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-900">Profile</h1>
              <button
                onClick={handleClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-1">
                <img
                  src={isEditing ? editProfile.photoURL : profile.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>

            {/* Profile Pic URL (edit mode) */}
            {isEditing && (
              <div className="mb-4">
                <input
                  type="url"
                  value={editProfile.photoURL}
                  onChange={(e) =>
                    handleInputChange("photoURL", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  placeholder="Profile picture URL"
                />
              </div>
            )}

            {/* Info Fields */}
            <div className="space-y-4 text-sm">
              {/* Full Name */}
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
                    placeholder="Full name"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {profile.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-md">
                  <AtSign className="h-4 w-4 text-green-600" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.userName}
                    onChange={(e) =>
                      handleInputChange("userName", e.target.value)
                    }
                    className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
                    placeholder="Username"
                  />
                ) : (
                  <p className="text-gray-700">@{profile.userName}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"
                    placeholder="Email"
                  />
                ) : (
                  <p className="text-gray-700">{profile.email}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
