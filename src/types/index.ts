export interface FoodItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  preparationTime: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  tags: string[];
  restaurant: string;
  location: string;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  itemCount: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: "price-low" | "price-high" | "rating" | "newest" | "popular";
}
