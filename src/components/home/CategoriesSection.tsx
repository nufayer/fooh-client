"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/useData";

export default function CategoriesSection() {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-20 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-bg-surface rounded-xl animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 bg-bg-surface rounded-xl animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 bg-bg-surface rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Explore <span className="text-primary">Categories</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Browse our wide variety of food categories and discover your next favorite meal
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category._id}
              href={`/explore?category=${category.name.toLowerCase()}`}
              className="group relative h-56 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-text-muted">
                  {category.itemCount} items
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/explore?view=categories"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
