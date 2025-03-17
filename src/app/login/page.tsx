"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import GoogleIcon from "@/public/icons/google.png";
import FacebookIcon from "@/public/icons/facebook.jpg";
import darkImage from "@/public/darkacademia.webp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { signIn, getSession, useSession } from "next-auth/react"; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginContent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session) return;
  
    const roles = session.roles;
    const accessToken = session.accessToken;
    const refreshToken = session.refreshToken;
  
    if (!accessToken) return;
  
    const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
  
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken || "");
    localStorage.setItem("fullname", decodedToken.fullname);
  
    if (roles === "Super Admin" || roles === "Warehouse Admin") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  }, [status, session, router]);
  

  interface CustomJwtPayload {
    userId: number;
    exp: number;
    iat: number;
    roles: string;
    fullname: string;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
        email,
        password,
      });
  
      if (response.data.success) {
        console.log("Login successful", response.data);
  
        const { accessToken, refreshToken, fullname } = response.data.data;
  
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("fullname", fullname);
  
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
        console.log("Decoded token:", decodedToken);
  
        localStorage.setItem("userId", decodedToken.userId.toString());
  
        if (decodedToken?.roles?.[0] === "Customer") {
          router.push("/dashboard/user");
        } else {
          router.push("/dashboard/admin");
        }
      } else {
        setError(response.data.message || "Invalid email or password");
      }
    } catch {
      setError("Failed to log in. Please try again.");
    }
    setLoading(false);
  };
  
  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    try {
      // Step 1: Login dengan NextAuth tanpa redirect
      const result = await signIn(provider.toLowerCase(), { redirect: false });
       alert(result); 
      if (!result || result.error) {
        throw new Error(`Failed to sign in with ${provider}: ${result?.error}`);
      }
  
      // Step 2: Tunggu sesi NextAuth diperbarui
      const session = await getSession();
  
      if (!session || !session.accessToken) {
        throw new Error("Failed to retrieve access token from session");
      }
  
      // Step 3: Decode JWT
      const decodedToken = jwtDecode<{ userId: number; scope: string }>(session.accessToken);
      console.log("Decoded Token:", decodedToken);
  
      // Step 4: Simpan ke localStorage (opsional)
      localStorage.setItem("accessToken", session.accessToken);
      localStorage.setItem("refreshToken", session.refreshToken || "");
      localStorage.setItem("userId", decodedToken.userId.toString());
  
      console.log("scope =", decodedToken.scope);
  
      // Step 5: Redirect berdasarkan role/scope
      if (decodedToken.scope === "Customer") {
        router.push("/dashboard/user");
      } else {
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Social Login Error:", error);
      setError(`Ready to sign in with Social`);
    }
    setLoading(false);
  };
  
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-gray">
        <div className="relative w-full lg:w-1/2">
          <Image src={darkImage} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0" />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">Welcome Back to Rockstock!</h1>
          <p className="text-gray-600 mb-4 text-center">
            The place where dark academia, goth, and emo souls come to find solace in their golden years.
          </p>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="w-full max-w-xs">
            <input
              type="email"
              placeholder="Email Address"
              className="border text-black border-gray-300 rounded-lg p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
                        <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border text-black border-gray-300 rounded-lg p-2 w-full mb-4 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div> 
            <div className="flex items-center mb-4">
              <input type="checkbox" id="rememberMe" className="mr-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
            </div>
            <button type="submit" className="bg-rockstock-primary text-black font-semibold py-2 px-4 rounded-full hover:bg-rockstock-primary-dark transition duration-300 w-full mb-4" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-gray-600 mb-4 text-center">or</p>

          <button
            className="flex items-center bg-white text-black border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-full max-w-xs mb-4"
            onClick={() => handleSocialLogin("Google")}
            disabled={loading}
          >
            <Image src={GoogleIcon} alt="Google Icon" width={20} height={20} className="mr-2" />
            {loading ? "Logging in with Google..." : "Login with Google"}
          </button>

          <button
            className="flex items-center bg-white text-black border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition duration-300 w-full max-w-xs mb-4"
            onClick={() => handleSocialLogin("Facebook")}
            disabled={loading}
          >
            <Image src={FacebookIcon} alt="Facebook Icon" width={20} height={20} className="mr-2" />
            {loading ? "Logging in with Facebook..." : "Login with Facebook"}
          </button>

          <p className="mt-4 text-gray-700 text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-purple-600 underline">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Login: React.FC = () => {
  return <LoginContent />;
};

export default Login;