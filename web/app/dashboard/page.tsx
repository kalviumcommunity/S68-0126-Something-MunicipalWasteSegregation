import Link from "next/link";

// ✅ Dynamic Rendering (SSR) - Dashboard overview needs real-time user context
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | WasteWise",
  description: "Access your waste segregation dashboard",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Welcome to WasteWise
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Select your role to access your personalized dashboard
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <RoleCard
            emoji="🏠"
            title="Household"
            description="Track your segregation score, log waste disposal, and view your household's performance."
            href="/dashboard/household"
            color="green"
          />
          <RoleCard
            emoji="🚛"
            title="Collector"
            description="Validate household segregation, manage your collection route, and report issues."
            href="/dashboard/collector"
            color="blue"
          />
          <RoleCard
            emoji="🏛️"
            title="Authority"
            description="Access real-time analytics, ward performance, heatmaps, and issue management."
            href="/dashboard/authority"
            color="purple"
          />
        </div>

        <section className="mt-12 p-6 bg-white dark:bg-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <QuickLink href="/statistics" label="View Statistics" emoji="📊" />
            <QuickLink href="/dashboard/reports" label="Report Issue" emoji="📝" />
            <QuickLink href="/education" label="Learn About Segregation" emoji="📚" />
            <QuickLink href="/statistics/leaderboard" label="Community Leaderboard" emoji="🏆" />
          </div>
        </section>
      </main>
    </div>
  );
}

function RoleCard({
  emoji,
  title,
  description,
  href,
  color,
}: {
  emoji: string;
  title: string;
  description: string;
  href: string;
  color: "green" | "blue" | "purple";
}) {
  const colors = {
    green: "hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20",
    blue: "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    purple: "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  };

  return (
    <Link
      href={href}
      className={`block p-6 bg-white dark:bg-zinc-800 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 transition ${colors[color]}`}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{description}</p>
    </Link>
  );
}

function QuickLink({
  href,
  label,
  emoji,
}: {
  href: string;
  label: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
    >
      <span className="text-2xl">{emoji}</span>
      <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
    </Link>
  );
}
