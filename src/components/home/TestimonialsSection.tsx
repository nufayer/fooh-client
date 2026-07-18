"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Join thousands of satisfied customers who love ordering with FOOH
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-accent text-accent"
                        : "fill-transparent text-text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-text-secondary text-sm mb-6 line-clamp-4">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {new Date(testimonial.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
