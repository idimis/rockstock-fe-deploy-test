"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <div className="container mx-auto max-w-4xl px-6 py-10">
        
        <h1 className="text-4xl font-bold text-center text-red-600">Privacy Policy</h1>
        <p className="text-gray-700 text-center mt-2">Last updated: March 2025</p>

        {/* Introduction */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-gray-600 mt-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </section>

        {/* Data Collection */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Personal details (name, email, phone number) when you sign up.</li>
            <li>Payment information when you make a purchase.</li>
            <li>Browsing behavior on our website.</li>
          </ul>
        </section>

        {/* How Data is Used */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>To process orders and payments.</li>
            <li>To improve user experience and website performance.</li>
            <li>To send promotional offers and newsletters (if subscribed).</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
          <p className="text-gray-600 mt-2">
            We do not sell or rent your data. However, we may share information with:
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Trusted payment processors for secure transactions.</li>
            <li>Logistics partners for shipping and delivery.</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        {/* Cookies Policy */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">5. Cookies & Tracking Technologies</h2>
          <p className="text-gray-600 mt-2">
            We use cookies to enhance user experience and analyze website traffic.
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>You can disable cookies in your browser settings.</li>
            <li>Some features may not work properly if cookies are disabled.</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">6. How We Protect Your Data</h2>
          <p className="text-gray-600 mt-2">
            We use encryption, firewalls, and secure servers to keep your data safe.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">7. Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions about our privacy practices, contact us at <a href="mailto:privacy@rockstock.com" className="text-red-600 underline">privacy@rockstock.com</a>.
          </p>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;