"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <div className="container mx-auto max-w-4xl px-6 py-10">
        
        <h1 className="text-4xl font-bold text-center text-red-600">Terms & Conditions</h1>
        <p className="text-gray-700 text-center mt-2">Updated as of March 2025</p>

        {/* Introduction */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-gray-600 mt-2">
            Welcome to Rockstock! By using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        {/* User Agreement */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">2. User Agreement</h2>
          <p className="text-gray-600 mt-2">
            By accessing our website, you confirm that you are at least 18 years old or have legal parental consent to use our services.
          </p>
        </section>

        {/* Purchases & Payments */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">3. Purchases & Payments</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>All prices are listed in your local currency where applicable.</li>
            <li>We accept payments via major credit cards, PayPal, and other secure payment methods.</li>
            <li>Orders cannot be canceled once they have been processed.</li>
          </ul>
        </section>

        {/* Shipping & Delivery */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">4. Shipping & Delivery</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>We currently ship to select regions. Check our shipping policy for details.</li>
            <li>Delivery times vary based on location and shipping method.</li>
            <li>Customs and import duties may apply based on your country.</li>
          </ul>
        </section>

        {/* Returns & Refunds */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">5. Returns & Refunds</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Returns are accepted within 14 days of delivery.</li>
            <li>Items must be unused and in their original packaging.</li>
            <li>Shipping costs for returns are the responsibility of the buyer unless the item is defective.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
          <p className="text-gray-600 mt-2">
            All content on Rockstock, including images, designs, and trademarks, is our property and may not be used without permission.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
          <p className="text-gray-600 mt-2">
            Rockstock is not liable for any indirect damages, including lost profits or business interruptions.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:support@rockstock.com" className="text-red-600 underline">support@rockstock.com</a>.
          </p>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Terms;
