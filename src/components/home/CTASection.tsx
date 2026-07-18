import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Order?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Join over 50,000 satisfied customers and get your favorite meals delivered in minutes.
          Download the FOOH app today!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/explore">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Order Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
            <Download className="w-5 h-5 mr-2" />
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
}
