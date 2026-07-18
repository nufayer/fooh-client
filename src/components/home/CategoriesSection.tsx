"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
              Browse by <span className="text-primary">Category</span>
            </h2>
            <p className="text-text-secondary">
              Explore a wide variety of cuisines and dishes
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explore?category=${category.name.toLowerCase()}`}
              className="group relative h-40 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {category.icon} {category.name}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {category.itemCount} items
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/explore"
          className="flex sm:hidden items-center justify-center gap-2 mt-6 text-primary hover:text-primary-light transition-colors font-medium"
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
