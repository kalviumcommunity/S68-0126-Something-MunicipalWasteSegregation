import Link from "next/link";

// ✅ Static Rendering (SSG) - Landing page with static content
// This page is statically generated at build time for optimal performance and SEO
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-zinc-900 dark:to-black">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">
              WasteWise
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/about" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              About
            </Link>
            <Link href="/education" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Learn
            </Link>
            <Link href="/faq" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              FAQ
            </Link>
            <Link 
              href="/dashboard" 
              className="rounded-full bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6">
        {/* Hero */}
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            Community-Driven <span className="text-green-600">Waste Segregation</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Track, report, and improve municipal waste management through collaborative 
            efforts between households, collectors, and authorities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
            >
              Get Started →
            </Link>
            <Link 
              href="/education"
              className="inline-flex items-center gap-2 rounded-full border border-green-600 px-6 py-3 text-green-600 font-medium hover:bg-green-50 dark:hover:bg-zinc-800 transition"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            emoji="🏠"
            title="Household Tracking"
            description="Monitor your segregation score and track your contribution to cleaner communities."
            href="/dashboard/household"
          />
          <FeatureCard 
            emoji="📊"
            title="Real-time Analytics"
            description="Access live reports, heatmaps, and performance metrics for your ward."
            href="/statistics"
          />
          <FeatureCard 
            emoji="📝"
            title="Issue Reporting"
            description="Report segregation issues and track resolution status in real-time."
            href="/dashboard/reports"
          />
        </section>

        {/* Stats Preview */}
        <section className="py-16 bg-green-600 rounded-3xl text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Making an Impact Together</h2>
          <div className="grid md:grid-cols-4 gap-8 px-8">
            <StatItem value="50,000+" label="Households Registered" />
            <StatItem value="85%" label="Average Segregation Rate" />
            <StatItem value="120+" label="Wards Covered" />
            <StatItem value="2,500+" label="Issues Resolved" />
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="container mx-auto px-6 text-center text-zinc-600 dark:text-zinc-400">
          <p>&copy; 2026 WasteWise Municipal Waste Segregation System</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  emoji, 
  title, 
  description, 
  href 
}: { 
  emoji: string; 
  title: string; 
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition border border-zinc-100 dark:border-zinc-700">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </Link>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-green-100">{label}</div>
    </div>
  );
}
