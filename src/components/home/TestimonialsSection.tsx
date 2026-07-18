"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    content:
      "Absolutely amazing food quality and delivery speed. The pasta was perfectly al dente and the sauce was divine. Will definitely order again!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    content:
      "Best food delivery service I've ever used. The ingredients are always fresh and the portions are generous. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Health Enthusiast",
    content:
      "Love the healthy options available. The salads are fresh and the grilled chicken is always perfectly cooked. Great for maintaining my diet!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "David Park",
    role: "Busy Professional",
    content:
      "Quick delivery and excellent customer service. The app is easy to use and the food is always hot when it arrives. A lifesaver for busy days!",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real reviews from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-bg-card border border-border rounded-2xl p-8 sm:p-12">
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < testimonials[current].rating
                      ? "fill-accent text-accent"
                      : "text-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-lg sm:text-xl text-text-primary mb-8 leading-relaxed">
              &ldquo;{testimonials[current].content}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-surface">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-text-muted">
                  {testimonials[current].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-text-muted"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
