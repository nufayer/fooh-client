"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Stay in the <span className="text-primary">Loop</span>
        </h2>
        <p className="text-text-secondary mb-8">
          Subscribe to our newsletter and never miss out on exclusive deals, new restaurants, and delicious updates.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-3 text-success animate-fade-in">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-medium">Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" variant="primary" className="whitespace-nowrap">
              Subscribe
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}

        <p className="text-xs text-text-muted mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
