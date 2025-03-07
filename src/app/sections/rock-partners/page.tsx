"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";

import partnersImage from "@/public/rocknroll.jpg";

const benefits = [
  { id: 1, title: "Exclusive Rockstock Discounts", description: "Enjoy exclusive discounts on our alternative furniture collections.", icon: "🎸" },
  { id: 2, title: "Concert & Event Access", description: "Get early access or discounts to rock concerts and alternative music festivals.", icon: "🎟️" },
  { id: 3, title: "Limited Edition Collaborations", description: "Be the first to access limited-edition furniture inspired by iconic rock culture.", icon: "🔥" },
  { id: 4, title: "VIP Community & Networking", description: "Connect with fellow rock enthusiasts, designers, and musicians through exclusive meetups.", icon: "🤘" },
  { id: 5, title: "Special Rockstock Playlists", description: "Receive curated playlists to match the aesthetic of your alternative home setup.", icon: "🎶" },
  { id: 6, title: "Backstage Giveaways", description: "Win backstage passes, signed merch, and unique collectibles from your favorite rock bands.", icon: "🎁" },
];

const RockPartners = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Reset message after 5s
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-20">

        {/* Rock Partners Header */}
        <section className="text-center mb-10 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-600">Rock Partners</h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            As a Rock Partner, you get exclusive perks that bring your love for rock culture into your home and lifestyle.
          </p>
          <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <Image src={partnersImage} alt="Rock Partners Showcase" className="rounded-lg object-cover" layout="responsive" width={500} height={300} />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-4xl">{benefit.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mt-3">{benefit.title}</h2>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </section>

        {/* Join Rock Partners Form */}
        <section className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">Ready to rock with us? Fill out the form below to become a Rock Partner!</p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-left">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-left">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-left">Why do you want to join?</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition w-full">
              Submit Application
            </button>

            {submitted && <p className="mt-4 text-green-600">🎉 Application submitted successfully! We’ll be in touch soon.</p>}
          </form>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default RockPartners;
