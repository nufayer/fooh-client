export default function PressPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Press</h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed">
          <p>
            FOOH has been featured in leading tech and food publications. Learn about our journey and media coverage.
          </p>
          <h2 className="text-2xl font-bold text-text-primary">In the News</h2>
          <div className="space-y-4">
            {[
              { title: "FOOH Raises $5M to Expand Food Delivery Network", source: "TechCrunch", date: "Mar 2025" },
              { title: "How FOOH is Changing the Takeaway Game", source: "Forbes", date: "Feb 2025" },
              { title: "Best Food Delivery Apps to Watch in 2025", source: "The Verge", date: "Jan 2025" },
            ].map((article) => (
              <div key={article.title} className="p-4 bg-bg-surface rounded-xl">
                <p className="font-semibold text-text-primary">{article.title}</p>
                <p className="text-sm text-text-muted mt-1">{article.source} · {article.date}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Media Contact</h2>
          <p>
            For press inquiries, reach out to <span className="text-primary">press@fooh.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
