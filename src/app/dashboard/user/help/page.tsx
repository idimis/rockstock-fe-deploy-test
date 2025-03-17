"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on 'Forgot Password' at the login page and following the instructions.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact us via email at support@rockstock.com, call us at +62 123-4567, or use our live chat feature.",
  },
  {
    question: "What is the estimated delivery time?",
    answer: "Delivery times vary based on location, but most orders arrive within 3-7 business days.",
  },
  {
    question: "How do I return a product?",
    answer: "Please visit our Return Policy page and submit a request within 14 days of receiving your order.",
  },
];

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>

      {/* Contact Support Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
        <p><strong>Email:</strong> <a href="mailto:support@rockstock.com" className="text-blue-600 hover:underline">support@rockstock.com</a></p>
        <p><strong>Phone:</strong> +62 123-4567</p>
        <p><strong>Live Chat:</strong> Available from 9 AM - 6 PM</p>
      </div>

      {/* FAQ Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-2 px-4 bg-white border rounded-md flex justify-between items-center hover:bg-gray-200"
            >
              {faq.question}
              <span>{openFAQ === index ? "▲" : "▼"}</span>
            </button>
            {openFAQ === index && (
              <div className="p-4 text-gray-700 border-l-4 border-blue-500 bg-gray-50">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
