"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useItems } from "@/hooks/useData";
import FoodCard from "@/components/ui/FoodCard";
import { ListSkeleton } from "@/components/ui/Skeleton";

export default function PopularItemsSection() {
  const { items, isLoading } = useItems({ sort: "rating" });

  if (isLoading) {
    return (
      <section className="py-20 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-bg-surface rounded-xl animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 bg-bg-surface rounded-xl animate-pulse mx-auto" />
          </div>
          <ListSkeleton count={4} />
        </div>
      </section>
    );
  }

  const popularItems = items.slice(0, 4);

  if (popularItems.length === 0) return null;

  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Most <span className="text-primary">Popular</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover the top-rated dishes loved by our customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <FoodCard
              key={item._id}
              id={item._id}
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

        <div className="text-center mt-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View All Items
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
