"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  MapPin,
  ArrowLeft,
  Heart,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { foodItems } from "@/data/mockData";
import { reviews } from "@/data/mockData";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import FoodCard from "@/components/ui/FoodCard";

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = foodItems.find((i) => i.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Item not found
          </h1>
          <Link href="/explore">
            <Button variant="primary">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedItems = foodItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
              <Image
                src={item.images[selectedImage]}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-text-primary">
                {item.title}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isWishlisted
                      ? "bg-secondary/10 border-secondary text-secondary"
                      : "border-border text-text-muted hover:border-secondary hover:text-secondary"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-2 rounded-xl border border-border text-text-muted hover:border-primary hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="text-lg font-semibold text-text-primary">
                  {item.rating}
                </span>
                <span className="text-text-muted">
                  ({item.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <Clock className="w-5 h-5" />
                <span>{item.preparationTime}</span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <MapPin className="w-5 h-5" />
                <span>{item.location}</span>
              </div>
            </div>

            <p className="text-text-secondary mb-6">{item.shortDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-bg-surface border border-border rounded-full text-sm text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-bg-card border border-border rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-secondary">Price</span>
                <span className="text-3xl font-bold text-primary">
                  ${(item.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-text-secondary">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-text-primary hover:bg-bg-hover transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold text-text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-text-primary hover:bg-bg-hover transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button variant="primary" className="w-full" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart — ${(item.price * quantity).toFixed(2)}
              </Button>
            </div>

            <div className="bg-bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                About this item
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {item.fullDescription}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">Restaurant</span>
                  <p className="text-text-primary font-medium">
                    {item.restaurant}
                  </p>
                </div>
                <div>
                  <span className="text-text-muted">Location</span>
                  <p className="text-text-primary font-medium">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Customer <span className="text-primary">Reviews</span>
          </h2>
          <p className="text-text-secondary mb-8">
            See what others are saying about this item
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "fill-transparent text-text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  {review.comment}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {review.userName}
                    </p>
                    <p className="text-xs text-text-muted">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Related <span className="text-primary">Items</span>
            </h2>
            <p className="text-text-secondary mb-8">
              More dishes from the {item.category} category
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((related) => (
                <FoodCard
                  key={related.id}
                  id={related.id}
                  title={related.title}
                  description={related.shortDescription}
                  price={related.price}
                  image={related.image}
                  rating={related.rating}
                  reviews={related.reviews}
                  category={related.category}
                  preparationTime={related.preparationTime}
                  location={related.location}
                  tags={related.tags}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
