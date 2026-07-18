"use client";

import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviews?: number;
}

export default function Rating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  reviews,
}: RatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`${sizes[size]} ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-text-muted"
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-text-primary font-medium">{rating}</span>
      )}
      {reviews !== undefined && (
        <span className="ml-1 text-text-muted">({reviews})</span>
      )}
    </div>
  );
}
