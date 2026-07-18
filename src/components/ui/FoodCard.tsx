"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin } from "lucide-react";
import Button from "./Button";

interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  preparationTime: string;
  location: string;
  tags?: string[];
}

export default function FoodCard({
  id,
  title,
  description,
  price,
  image,
  rating,
  reviews,
  category,
  preparationTime,
  location,
  tags,
}: FoodCardProps) {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
        {tags && tags[0] && (
          <div className="absolute top-3 right-3">
            <span className="bg-accent/90 text-bg-dark text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {tags[0]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{preparationTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-text-primary font-semibold">{rating}</span>
            <span className="text-text-muted text-xs">({reviews})</span>
          </div>
        </div>

        <Link href={`/items/${id}`} className="block">
          <Button variant="primary" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
