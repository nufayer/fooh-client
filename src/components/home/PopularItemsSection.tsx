"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { foodItems } from "@/data/mockData";
import FoodCard from "@/components/ui/FoodCard";

export default function PopularItemsSection() {
  const popularItems = foodItems.filter((item) => item.isPopular).slice(0, 8);

  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
              Popular <span className="text-primary">Items</span>
            </h2>
            <p className="text-text-secondary">
              Most ordered dishes from our partner restaurants
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.shortDescription}
              price={item.price}
              image={item.image}
              rating={item.rating}
              reviews={item.reviews}
              category={item.category}
              preparationTime={item.preparationTime}
              location={item.location}
              tags={item.tags}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
          >
            Explore All Items
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
