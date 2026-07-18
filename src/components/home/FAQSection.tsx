"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Simply browse our menu, add items to your cart, and proceed to checkout. You can pay securely online and track your order in real-time.",
  },
  {
    id: 2,
    question: "What are your delivery hours?",
    answer:
      "We deliver from 10:00 AM to 10:00 PM, 7 days a week. Our peak hours are during lunch (12-2 PM) and dinner (6-8 PM) times.",
  },
  {
    id: 3,
    question: "Is there a minimum order amount?",
    answer:
      "There is no minimum order amount. However, orders under $30 may have a small delivery fee of $4.99. Orders over $30 qualify for free delivery!",
  },
  {
    id: 4,
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify or cancel your order within 15 minutes of placing it. After that, the order may already be in preparation.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery.",
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-bg-card hover:bg-bg-hover transition-colors"
      >
        <span className="font-medium text-text-primary">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 bg-bg-card">
          <p className="text-text-secondary">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our service
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
