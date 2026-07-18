"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const slides = [
  {
    title: "Delicious Food,\nDelivered Fast",
    description:
      "Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    cta: "Order Now",
  },
  {
    title: "Fresh Takeaway,\nZero Wait Time",
    description:
      "Skip the queue! Order ahead and pick up your food fresh and ready from nearby restaurants.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    cta: "Explore Takeaway",
  },
  {
    title: "Premium Quality,\nAffordable Prices",
    description:
      "Enjoy restaurant-quality meals without breaking the bank. Exclusive deals and discounts daily.",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop",
    cta: "View Deals",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[70vh] flex items-center bg-bg-dark overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div key={currentSlide} className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 whitespace-pre-line leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explore">
                <Button variant="primary" size="lg" className="group">
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/#about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-bg-card/50 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-primary hover:bg-bg-card transition-colors border border-border"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-8 bg-primary" : "w-2 bg-text-muted"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-bg-card/50 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-primary hover:bg-bg-card transition-colors border border-border"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
