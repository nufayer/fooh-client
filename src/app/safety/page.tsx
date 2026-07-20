export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Safety</h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed">
          <p>Your safety is our top priority. Learn about the measures we take to keep you and our delivery partners safe.</p>
          <h2 className="text-2xl font-bold text-text-primary">Contactless Delivery</h2>
          <p>All deliveries can be made contactless. Simply select &quot;Leave at door&quot; during checkout and our delivery partner will place your order at your doorstep.</p>
          <h2 className="text-2xl font-bold text-text-primary">Food Safety Standards</h2>
          <p>We work only with restaurants that meet strict food safety and hygiene standards. All partner restaurants are regularly inspected and must comply with local health regulations.</p>
          <h2 className="text-2xl font-bold text-text-primary">Delivery Partner Safety</h2>
          <p>Our delivery partners are trained in safe handling practices, wear protective gear, and are encouraged to stay home if feeling unwell.</p>
          <h2 className="text-2xl font-bold text-text-primary">Secure Payments</h2>
          <p>All online transactions are encrypted and processed through secure payment gateways. Your financial data is never stored on our servers.</p>
        </div>
      </div>
    </div>
  );
}
