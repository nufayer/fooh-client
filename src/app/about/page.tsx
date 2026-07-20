export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">About <span className="text-primary">Us</span></h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed">
          <p>
            FOOH is a modern food delivery platform designed to connect hungry customers with the best local restaurants. Our mission is to make ordering food fast, easy, and enjoyable.
          </p>
          <h2 className="text-2xl font-bold text-text-primary">Our Mission</h2>
          <p>
            We believe everyone deserves access to delicious, freshly prepared meals without the hassle of cooking or dining out. FOOH bridges the gap between your favorite restaurants and your doorstep.
          </p>
          <h2 className="text-2xl font-bold text-text-primary">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Wide selection of restaurants and cuisines</li>
            <li>Fast and reliable delivery</li>
            <li>Real-time order tracking</li>
            <li>Secure online payments</li>
            <li>24/7 customer support</li>
          </ul>
          <h2 className="text-2xl font-bold text-text-primary">Our Team</h2>
          <p>
            Founded in 2025, FOOH was built by a team of food enthusiasts and tech professionals who wanted to revolutionize the food delivery experience. We work with hundreds of local restaurants to bring you the best meals at competitive prices.
          </p>
        </div>
      </div>
    </div>
  );
}
