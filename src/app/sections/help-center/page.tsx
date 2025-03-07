"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: 1, title: "Orders & Shipping", description: "Track orders, shipping info, and delivery issues." },
  { id: 2, title: "Payments & Refunds", description: "Payment methods, refunds, and billing concerns." },
  { id: 3, title: "Account & Security", description: "Manage your account, passwords, and security settings." },
  { id: 4, title: "Product Information", description: "Details about materials, sizes, and custom orders." },
  { id: 5, title: "Partnership & Collaborations", description: "Want to collaborate? Let’s talk business." },
  { id: 6, title: "Technical Support", description: "Troubleshooting issues with our site or app." },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-20">
        
        {/* Help Center Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600">Help Center</h1>
          <p className="mt-3 text-lg text-gray-700">Find answers to your questions or contact us for further assistance.</p>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full max-w-lg px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Help Categories */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              <p className="text-gray-600 mt-2">{category.description}</p>
              <Link href={`/help/${category.id}`} className="text-red-600 mt-3 inline-block hover:underline">
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700">Still need help? Reach out to our support team.</p>
          <Link href="/contact">
            <button className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition">
              Contact Us
            </button>
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
