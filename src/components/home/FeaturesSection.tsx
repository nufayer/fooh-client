import { Truck, Clock, Shield, CreditCard, Headphones, Gift } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your food delivered in 30 minutes or less, piping hot and fresh.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Order anytime, day or night. We never close, so your cravings are always covered.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Contactless delivery options and secure payment processing for your peace of mind.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Pay with credit card, debit card, or digital wallets. Split bills made easy.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is always here to help with any questions or concerns.",
  },
  {
    icon: Gift,
    title: "Exclusive Deals",
    description: "Unlock special discounts, promo codes, and loyalty rewards with every order.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Why Choose <span className="text-primary">FOOH</span>?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We deliver more than just food — we deliver an experience. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
