import Image from "next/image";
import { Clock, User } from "lucide-react";
import { blogPosts } from "@/data/mockData";

export default function BlogSection() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Latest from Our <span className="text-primary">Blog</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Tips, guides, and stories from the world of food
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <span className="text-primary text-sm font-medium hover:text-primary-light transition-colors cursor-pointer">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
