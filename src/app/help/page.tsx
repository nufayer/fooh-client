export default function HelpPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Help <span className="text-primary">Center</span></h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed">
          <p>Find answers to common questions and get the help you need.</p>
          <h2 className="text-2xl font-bold text-text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I track my order?", a: "Go to My Orders page after placing an order. You can see real-time status updates there." },
              { q: "Can I cancel my order?", a: "You can cancel within 15 minutes of placing your order. After that, the order may already be in preparation." },
              { q: "How do I get a refund?", a: "Contact our support team at support@fooh.com within 24 hours of delivery with your order details." },
              { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, digital wallets (Apple Pay, Google Pay), and cash on delivery." },
            ].map((faq) => (
              <div key={faq.q} className="p-4 bg-bg-surface rounded-xl">
                <p className="font-semibold text-text-primary">{faq.q}</p>
                <p className="text-sm text-text-secondary mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
          <p>Still need help? Email us at <span className="text-primary">support@fooh.com</span></p>
        </div>
      </div>
    </div>
  );
}
