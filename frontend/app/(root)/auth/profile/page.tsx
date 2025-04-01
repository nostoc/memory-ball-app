"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function ProfilePage() {
  const { state } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (state.user) {
      setProfileData({
        name: state.user.name || "User",
        email: state.user.email || "",
      });
    }
  }, [state.user]);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-8 font-poppins">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-bricolage">
            My Profile
          </h1>
          <p className="text-white mt-2 font-montserrat">
            Manage your account information
          </p>
        </div>

        <div className="bg-white rounded-[22px] shadow-md p-6 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-title font-medium mb-2 font-montserrat">
                Name
              </label>
              <p className="font-poppins text-title">{profileData.name}</p>
            </div>

            <div>
              <label className="block text-title font-medium mb-2 font-montserrat">
                Email
              </label>
              <p className="font-poppins text-title">{profileData.email}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="px-6 py-2 bg-button hover:bg-oceanBlue text-white rounded-[22px] transition duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
