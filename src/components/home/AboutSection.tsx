import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const highlights = [
  "Fresh ingredients sourced daily",
  "Real-time order tracking",
  "Contactless delivery available",
  "24/7 customer support",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=500&fit=crop"
                alt="About FOOH"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-bg-card border border-border rounded-2xl p-4 shadow-xl hidden lg:block">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-text-secondary">Years of Service</div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              About <span className="text-primary">FOOH</span>
            </h2>
            <p className="text-text-secondary mb-6">
              FOOH is your go-to food delivery and takeaway platform, connecting you with the best
              restaurants in your area. We believe that great food should be accessible to everyone,
              anytime, anywhere.
            </p>
            <p className="text-text-secondary mb-6">
              Since 2015, we&apos;ve been on a mission to transform the way people enjoy food. From
              quick lunches to special dinner deliveries, we&apos;ve got you covered with a curated
              selection of top-rated restaurants and dishes.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/explore">
              <Button variant="primary" size="lg" className="group">
                Explore Restaurants
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
