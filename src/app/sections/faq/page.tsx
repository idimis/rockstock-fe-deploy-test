"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const faqs = [
  {
    question: "Do you ship worldwide?",
    answer: "We currently ship to select countries. Check our shipping policy for details.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and other secure payment options.",
  },
  {
    question: "Can I return or exchange an item?",
    answer: "Yes, we offer a 14-day return policy for unused items in original packaging.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us at support@rockstock.com or via our contact page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <div className="container mx-auto max-w-4xl px-6 py-10">
        
        <h1 className="text-4xl font-bold text-center text-red-600">Frequently Asked Questions</h1>
        <p className="text-gray-700 text-center mt-2">
          Find answers to the most common questions about Rockstock.
        </p>

        <div className="mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-900"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
