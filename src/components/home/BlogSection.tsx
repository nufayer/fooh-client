"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Healthy Eating Tips for Busy People",
    excerpt:
      "Discover how to maintain a healthy diet even with a hectic schedule. Simple tips and tricks that work.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    date: "Jan 15, 2025",
    category: "Health Tips",
  },
  {
    id: 2,
    title: "The Secret to Perfect Homemade Pizza",
    excerpt:
      "Learn the secrets that professional chefs use to make the perfect pizza dough and toppings.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    date: "Jan 12, 2025",
    category: "Recipes",
  },
  {
    id: 3,
    title: "Why Fresh Ingredients Matter",
    excerpt:
      "The impact of fresh, locally-sourced ingredients on taste and nutrition. A deep dive.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop",
    date: "Jan 10, 2025",
    category: "Food Facts",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Our <span className="text-primary">Blog</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Stay updated with the latest food trends, recipes, and healthy eating tips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                  <span>{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-text-secondary mb-4">{post.excerpt}</p>

                <span className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
