export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Privacy <span className="text-primary">Policy</span></h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed text-sm">
          <p>Last updated: January 2025</p>
          <h2 className="text-xl font-bold text-text-primary">1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, delivery address, and payment information when you create an account or place an order.</p>
          <h2 className="text-xl font-bold text-text-primary">2. How We Use Your Information</h2>
          <p>We use your information to process orders, communicate with you about your orders, improve our services, and send promotional communications (with your consent).</p>
          <h2 className="text-xl font-bold text-text-primary">3. Information Sharing</h2>
          <p>We share your information with restaurant partners to fulfill your orders and with delivery partners to complete deliveries. We do not sell your personal information to third parties.</p>
          <h2 className="text-xl font-bold text-text-primary">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          <h2 className="text-xl font-bold text-text-primary">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@fooh.com to exercise these rights.</p>
        </div>
      </div>
    </div>
  );
}
