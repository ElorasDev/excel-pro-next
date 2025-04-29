"use client";

import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit2,
  FiSave,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import Cookies from "js-cookie";

// Admin entity interface
interface Admin {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: Date;
  updatedAt: Date;
}

// UpdateAuthDto interface matching your backend DTO
interface UpdateAuthDto {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  currentPassword?: string;
}

// Notification state interface
interface NotificationState {
  show: boolean;
  type: "success" | "error" | "";
  message: string;
}

// API error response interface
interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Helper function for date formatting that handles undefined/invalid dates
const formatDate = (date: Date | string | undefined | null): string => {
  if (!date) return "N/A";

  try {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

const AdminProfileUpdate: React.FC = () => {
  // Auth token from cookies
  const authToken = Cookies.get("auth_token");

  // Current admin ID (in a real app, this would come from context or state management)
  const adminId = 1; // This should be dynamic in a real application

  // States
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: "",
    message: "",
  });

  // Admin data state
  const [adminData, setAdminData] = useState<Admin | null>(null);

  // Form data state
  const [formData, setFormData] = useState<UpdateAuthDto>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    currentPassword: "",
  });

  // State to track if sensitive fields were changed (username, email, password)
  const [sensitiveFieldsChanged, setSensitiveFieldsChanged] =
    useState<boolean>(false);

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      if (!authToken) {
        setNotification({
          show: true,
          type: "error",
          message: "Authentication token is missing. Please log in again.",
        });
        setIsFetching(false);
        return;
      }

      try {
        setIsFetching(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/${adminId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = (await response.json()) as ApiErrorResponse;
          throw new Error(errorData.message || "Failed to fetch admin data");
        }

        const data = (await response.json()) as Admin;

        // Convert date strings to Date objects if needed
        try {
          if (typeof data.createdAt === "string") {
            data.createdAt = new Date(data.createdAt);
          }
          if (typeof data.updatedAt === "string") {
            data.updatedAt = new Date(data.updatedAt);
          }
        } catch (error) {
          console.error("Error processing dates:", error);
          // Continue without throwing an error
        }

        setAdminData(data);
        setFormData({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          password: "",
          currentPassword: "",
        });
      } catch (error) {
        setNotification({
          show: true,
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Failed to fetch admin data",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchAdminData();
  }, [authToken, adminId]);

  // Check if sensitive fields have been changed (matches backend logic)
  useEffect(() => {
    if (isEditing && adminData) {
      const isUsernameChanged = formData.username !== adminData.username;
      const isEmailChanged = formData.email !== adminData.email;
      const isPasswordChanged =
        formData.password !== undefined && formData.password.length > 0;

      setSensitiveFieldsChanged(
        isUsernameChanged || isEmailChanged || isPasswordChanged
      );
    }
  }, [formData, adminData, isEditing]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear notification when user starts typing
    if (notification.show) {
      setNotification({ show: false, type: "", message: "" });
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing && adminData) {
      // If canceling edit, reset form data to original values
      setFormData({
        username: adminData.username,
        email: adminData.email,
        first_name: adminData.first_name,
        last_name: adminData.last_name,
        password: "",
        currentPassword: "",
      });
      setSensitiveFieldsChanged(false);
    }

    setIsEditing(!isEditing);
    setNotification({ show: false, type: "", message: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authToken || !adminData) {
      setNotification({
        show: true,
        type: "error",
        message: "Authentication token is missing or admin data not loaded",
      });
      return;
    }

    // Validate form for sensitive updates
    if (sensitiveFieldsChanged && !formData.currentPassword) {
      setNotification({
        show: true,
        type: "error",
        message:
          "Current password is required to update username, email, or password",
      });
      return;
    }

    // Create the update data object - only include changed fields
    const updateData: UpdateAuthDto = {};

    if (formData.username !== adminData.username)
      updateData.username = formData.username;
    if (formData.email !== adminData.email) updateData.email = formData.email;
    if (formData.first_name !== adminData.first_name)
      updateData.first_name = formData.first_name;
    if (formData.last_name !== adminData.last_name)
      updateData.last_name = formData.last_name;
    if (formData.password && formData.password.length > 0)
      updateData.password = formData.password;

    // If no changes, show notification and return
    if (Object.keys(updateData).length === 0) {
      setNotification({
        show: true,
        type: "error",
        message: "No changes detected",
      });
      return;
    }

    // Add current password if sensitive fields changed
    if (sensitiveFieldsChanged) {
      updateData.currentPassword = formData.currentPassword;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/${adminId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as ApiErrorResponse;
        throw new Error(errorData.message || "Failed to update admin profile");
      }

      const updatedAdmin = (await response.json()) as Admin;

      // Convert date strings to Date objects if needed
      if (typeof updatedAdmin.createdAt === "string") {
        updatedAdmin.createdAt = new Date(updatedAdmin.createdAt);
      }
      if (typeof updatedAdmin.updatedAt === "string") {
        updatedAdmin.updatedAt = new Date(updatedAdmin.updatedAt);
      }

      // Update admin data with the response
      setAdminData(updatedAdmin);

      // Update form data and reset password fields
      setFormData({
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        first_name: updatedAdmin.first_name,
        last_name: updatedAdmin.last_name,
        password: "",
        currentPassword: "",
      });

      // Show success message
      setNotification({
        show: true,
        type: "success",
        message: "Profile updated successfully",
      });

      // Exit edit mode
      setIsEditing(false);
      setSensitiveFieldsChanged(false);
    } catch (error) {
      // Show error message
      setNotification({
        show: true,
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while fetching initial data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading admin profile...</span>
      </div>
    );
  }

  // If admin data couldn't be fetched, show error
  if (!adminData && !isFetching) {
    return (
      <div className="bg-red-50 p-6 rounded-lg">
        <div className="flex items-start gap-3 text-red-700">
          <FiAlertCircle size={24} className="mt-0.5" />
          <div>
            <h3 className="font-bold text-lg">Error Loading Profile</h3>
            <p>
              {notification.message ||
                "Could not load admin profile. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>

        <button
          type="button"
          onClick={toggleEditMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isEditing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-primary text-white hover:bg-red-600"
          }`}
        >
          {isEditing ? (
            <>
              <FiX size={16} />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FiEdit2 size={16} />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <FiAlertCircle size={20} className="mt-0.5" />
          <p>{notification.message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Basic Information
            </h3>

            {/* First Name */}
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`pl-10 w-full py-2 px-3 border ${
                    isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`pl-10 w-full py-2 px-3 border ${
                    isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Account Information
            </h3>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`pl-10 w-full py-2 px-3 border ${
                    isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`pl-10 w-full py-2 px-3 border ${
                    isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Section - Only visible in edit mode */}
        {isEditing && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Change Password
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
              </div>

              {/* Current Password - Required for sensitive changes */}
              {sensitiveFieldsChanged && (
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword || ""}
                      onChange={handleInputChange}
                      className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Required for sensitive changes"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-500">
                    Required when updating username, email, or password
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button - Only visible in edit mode */}
        {isEditing && (
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave className="mr-2" size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Meta Information */}
        {adminData && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div>
                <span className="inline-block w-32">Account Created:</span>
                <span className="font-medium">
                  {formatDate(adminData.createdAt)}
                </span>
              </div>
              <div>
                <span className="inline-block w-32">Last Updated:</span>
                <span className="font-medium">
                  {formatDate(adminData.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminProfileUpdate;
