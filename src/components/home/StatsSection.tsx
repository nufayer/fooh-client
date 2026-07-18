"use client";

import { useEffect, useState, useRef } from "react";
import { Users, Store, MapPin, Truck } from "lucide-react";
import { stats } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  store: Store,
  "map-pin": MapPin,
  truck: Truck,
};

function AnimatedCounter({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = numericTarget / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericTarget]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-bg-dark to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                  <AnimatedCounter target={stat.value} />
                </div>
                <p className="text-text-secondary">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
