"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserProfilePage = () => {
  const [user, setUser] = useState({
    id: null,
    fullname: "",
    email: "",
    photoProfileUrl: "",
    birthDate: "",
    gender: "",
    isVerified: false,
    newAvatarFile: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }
  
      const response = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      const userData = data.data;
  
      const isGoogleUser = userData.provider && userData.provider.toLowerCase() === "google";
        const isVerified = isGoogleUser || userData.isVerified;
  
      setUser({
        id: userData.id,
        fullname: userData.fullname,
        email: userData.email,
        photoProfileUrl: userData.photoProfileUrl || "/default-avatar.png",
        birthDate: userData.birthDate ? userData.birthDate.split("T")[0] : "",
        gender: userData.gender,
        isVerified, 
        newAvatarFile: null,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateProfile = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("User not authenticated");
            return;
        }

        let photoProfileUrl = user.photoProfileUrl;

        if (newAvatarFile) {
            const avatarFormData = new FormData();
            avatarFormData.append("file", newAvatarFile);

            const uploadResponse = await fetch(`${BACKEND_URL}/api/v1/user/upload-avatar`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: avatarFormData,
            });

            const uploadData = await uploadResponse.json();
            if (uploadData?.data?.photo_profileUrl) {
              photoProfileUrl = uploadData.data.photo_profileUrl;
              alert("Upload photo successful!"); 
            } else {
              console.error("Upload failed:", uploadData);
              alert("Upload photo successful!");
              return;
            }
        }

        const formattedBirthDate = user.birthDate ? `${user.birthDate}T00:00:00Z` : null;

        const requestBody = {
            fullname: user.fullname, 
            birthDate: formattedBirthDate,
            gender: user.gender,
            photoProfileUrl,
        };

        const response = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();
        if (!response.ok) {
            alert(`Error: ${responseData.message || "Profile update failed"}`);
            return;
        }

        alert("Profile updated successfully!");
        fetchUserProfile();
    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Error updating profile.");
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be under 2MB.");
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    setNewAvatarFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">👤 User Profile</h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : (
        <>
          <section className="mb-6 p-6 border border-gray-200 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <div className="flex flex-col gap-2">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                className="border p-2 w-full rounded-lg"
                placeholder="Full Name"
              />

              <label>Email</label>
              <input
                type="text"
                value={user.email}
                disabled
                className="border p-2 w-full rounded-lg bg-gray-100"
              />

              {/* Conditionally render Birth Date and Gender */}
              {user.email && !user.email.includes("google.com") && (
                <>
                  <label>Birth Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={user.birthDate}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-lg"
                  />

                  <label>Gender</label>
                  <select
                    name="gender"
                    value={user.gender || ""}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-lg"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </>
              )}

              <label>Status</label>
              <p className={user.isVerified ? "text-green-600" : "text-red-600"}>
                {user.isVerified ? "✅ Verified" : "❌ Unverified"}
              </p>
            </div>
          </section>


          {/* Hide Reset Password Button for Social Login Users */}
          {user.id && !user.email.includes("google.com") && (
            <section className="mb-6 p-6 border border-gray-200 rounded-xl shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
              <button
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => window.location.href = "/dashboard/user/profile/reset-password"}
              >
                Reset Password
              </button>
            </section>
          )}

          <section className="mb-6 p-6 border border-gray-200 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">Profile Picture</h2>
            {(previewImage || user.photoProfileUrl) && (
              <Image
                src={previewImage || user.photoProfileUrl}
                alt="Profile"
                width={48} 
                height={48}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
            )}
            <input type="file" accept=".jpg,.jpeg,.png,.gif" className="border p-2 w-full rounded-lg" onChange={handleUploadPhoto} />
          </section>

          <button
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleUpdateProfile}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
