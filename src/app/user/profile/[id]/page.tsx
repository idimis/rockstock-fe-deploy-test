"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UserData {
  fullName: string;
  email: string;
  photoProfileUrl: string;
  bio: string;
  website: string;
  socialMedia: string;
  blogs: string[];
  activity: string[];
  friends: string[];
  recentPurchase: string;
}

const generateRandomProfileData = () => {
  const bios = [
    "A passionate traveler exploring the world, one city at a time.",
    "Aspiring writer with a love for nature and photography.",
    "Tech enthusiast, always looking for new innovations and gadgets."
  ];

  const websites = [
    "https://johntravels.com",
    "https://mariasstories.com",
    "https://techgadgetszone.com"
  ];

  const socialMedias = [
    "https://instagram.com/john_travels",
    "https://twitter.com/maria_stories",
    "https://linkedin.com/in/techguy"
  ];

  return {
    bio: bios[Math.floor(Math.random() * bios.length)],
    website: websites[Math.floor(Math.random() * websites.length)],
    socialMedia: socialMedias[Math.floor(Math.random() * socialMedias.length)],
    blogs: [
      "Exploring the hidden gems of Europe",
      "The art of storytelling: How to craft unforgettable narratives",
      "Top 5 gadgets every tech lover needs in 2025"
    ],
    activity: [
      "Liked '10 tips for solo travelers'",
      "Commented on 'How to find the best coffee shops in Paris'",
      "Shared 'The future of AI: What to expect in the next 10 years'"
    ],
    friends: ["Alice Cooper", "Bob Marley", "Sophia Loren"],
    recentPurchase: "Ergonomic office chair",
  };
};

const UserProfile = () => {
  const params = useParams();
  const userId = params?.id;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!BACKEND_URL || !userId) {
          throw new Error("Missing BACKEND_URL or userId");
        }

        const response = await fetch(`${BACKEND_URL}/api/v1/user/${userId}/details`);
        const result = await response.json();

        if (result.body?.success && result.body?.data) {
          setUserData({
            fullName: result.body.data.fullName,
            email: result.body.data.email,
            photoProfileUrl: result.body.data.photoProfileUrl,
            ...generateRandomProfileData(), // Dynamically generating random data for the user
          });
        } else {
          console.error("Failed to fetch user details:", result.body?.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen text-red-500">User not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center py-8 w-full">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl text-center transform transition-all hover:scale-105">
          <Image
            src={userData.photoProfileUrl}
            alt="User Profile"
            width={48} 
            height={48}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-bold mb-2 text-indigo-600">{userData.fullName}</h2>
          <p className="text-gray-600 mb-4">{userData.email}</p>
          <p className="text-gray-700 italic mb-6">{userData.bio}</p>
          <div className="text-blue-600 mb-4">
            <a href={userData.website} target="_blank" rel="noopener noreferrer" className="underline">
              {userData.website}
            </a>
          </div>
          <div className="text-blue-600 mb-6">
            <a href={userData.socialMedia} target="_blank" rel="noopener noreferrer" className="underline">
              {userData.socialMedia}
            </a>
          </div>
  
          {/* Display Recent Purchase */}
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Purchase</h3>
            <p className="text-gray-700">{userData.recentPurchase}</p>
          </div>
  
          <div className="mt-4 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Blogs</h3>
            <ul className="list-disc pl-5 mb-4">
              {userData.blogs.map((blog, index) => (
                <li key={index}>{blog}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Activity</h3>
            <ul className="list-disc pl-5 mb-4">
              {userData.activity.map((act, index) => (
                <li key={index}>{act}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Friends</h3>
            <ul className="list-disc pl-5">
              {userData.friends.map((friend, index) => (
                <li key={index}>{friend}</li>
              ))}
            </ul>
          </div>
  
          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300">
              Add Friend
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export default UserProfile;
