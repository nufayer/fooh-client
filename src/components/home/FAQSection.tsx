import { faqs } from "@/data/mockData";
import FAQItem from "@/components/ui/FAQItem";

export default function FAQSection() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-text-secondary">
            Got questions? We&apos;ve got answers. Find everything you need to know about FOOH.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
