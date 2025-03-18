"use client";

import React, { useState } from "react";
import axios from "axios"; 
import Footer from "@/components/common/Footer";
import Image from "next/image";
import GoogleIcon from "@/public/icons/google.png";
import darkImage from "@/public/darkacadem.jpg";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignupContent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const formattedBirthdate = new Date(birthdate).toISOString();
  
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      if (!BACKEND_URL) {
        throw new Error("Backend URL is not set in environment variables.");
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        fullname,
        email,
        gender,
        birthdate: formattedBirthdate,
      });
  
      console.log("Signup successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("newSignup", "true"); 
      window.location.href = "/dashboard/user";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Signup error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      } else if (err instanceof Error) {
        console.error("Signup error:", err.message);
        setError(err.message);
      } else {
        console.error("Signup error:", err);
        setError("An unknown error occurred.");
      }
    }
  };
  

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
        <div className="relative w-full lg:w-1/2">
          <Image src={darkImage} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0" />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">Join Rockstock Now!</h1>
          <p className="text-gray-600 mb-4 text-center">The place where dark academia, goth, and emo souls come to find solace in their golden years.</p>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSignup} className="w-full max-w-xs">
            <input type="text" placeholder="Fullname" className="border border-gray-300 text-gray-600 rounded-lg p-2 w-full mb-4" value={fullname} onChange={(e) => setFullname(e.target.value)} required aria-label="Fullname" />
            
            <select className="border border-gray-300 text-gray-600 rounded-lg p-2 w-full mb-4" value={gender} onChange={(e) => setGender(e.target.value)} required aria-label="Gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input type="date" placeholder="Birthdate" className="border border-gray-300 text-gray-600 rounded-lg p-2 w-full mb-4" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required aria-label="Birthdate" />
            
            <input type="email" placeholder="Email Address" className="border border-gray-300 text-gray-600 rounded-lg p-2 w-full mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email Address" />
            
            <button type="submit" className="bg-rockstock-primary text-gray-600 font-semibold py-2 px-4 rounded-full hover:bg-rockstock-primary-dark transition duration-300 w-full mb-4" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-600 mb-4 text-center">or</p>

          <button className="flex items-center bg-white text-gray-600 border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-full max-w-xs mb-4" onClick={() => signIn("google")} aria-label="Sign up with Google">
            <Image src={GoogleIcon} alt="Google Icon" width={20} height={20} className="mr-2" />
            Sign up with Google
          </button>

          <p className="mt-4 text-gray-600 text-center">Already have an account? <Link href="/login" className="text-purple-600 underline">Log in</Link></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Signup: React.FC = () => {
  return <SignupContent />;
};

export default Signup;
