export default function CareersPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-6">Careers</h1>
        <div className="bg-bg-card border border-border rounded-2xl p-8 space-y-6 text-text-secondary leading-relaxed">
          <p>
            Join the FOOH team and help us shape the future of food delivery. We&apos;re always looking for talented individuals who are passionate about food and technology.
          </p>
          <h2 className="text-2xl font-bold text-text-primary">Open Positions</h2>
          <div className="space-y-4">
            {[
              { title: "Senior Full-Stack Developer", type: "Engineering", location: "Remote" },
              { title: "UX/UI Designer", type: "Design", location: "New York" },
              { title: "Marketing Manager", type: "Marketing", location: "Remote" },
              { title: "Customer Support Lead", type: "Operations", location: "Los Angeles" },
            ].map((job) => (
              <div key={job.title} className="p-4 bg-bg-surface rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-primary">{job.title}</p>
                  <p className="text-sm text-text-muted">{job.type} · {job.location}</p>
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                  Apply
                </span>
              </div>
            ))}
          </div>
          <p>
            Don&apos;t see your role? Send your resume to <span className="text-primary">careers@fooh.com</span> and we&apos;ll keep you in mind for future openings.
          </p>
        </div>
      </div>
    </div>
  );
}
