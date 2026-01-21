import Link from "next/link";

// ✅ Dynamic Rendering (SSR) - Authority dashboard with live reports and heatmaps
export const dynamic = "force-dynamic";

async function getAuthorityData() {
  return {
    officerId: "AUTH-001",
    name: "Municipal Officer",
    jurisdiction: "Zone A - Wards 1-25",
  };
}

async function getLiveStats() {
  return {
    totalHouseholds: 52340,
    activeCollectors: 156,
    todayCollections: 34521,
    averageSegregationRate: 84.5,
    openIssues: 127,
    resolvedToday: 45,
  };
}

async function getWardPerformance() {
  return [
    { ward: "Ward 1", score: 92, households: 2100, status: "excellent" },
    { ward: "Ward 2", score: 88, households: 1850, status: "good" },
    { ward: "Ward 3", score: 76, households: 2300, status: "average" },
    { ward: "Ward 4", score: 65, households: 1950, status: "needs-attention" },
    { ward: "Ward 5", score: 91, households: 2050, status: "excellent" },
    { ward: "Ward 6", score: 82, households: 2200, status: "good" },
  ];
}

async function getRecentIssues() {
  return [
    { id: "ISS-001", ward: "Ward 4", type: "Mixed Waste", priority: "high", time: "10 min ago" },
    { id: "ISS-002", ward: "Ward 3", type: "Missed Collection", priority: "medium", time: "25 min ago" },
    { id: "ISS-003", ward: "Ward 4", type: "Improper Disposal", priority: "high", time: "1 hour ago" },
    { id: "ISS-004", ward: "Ward 2", type: "Container Overflow", priority: "low", time: "2 hours ago" },
  ];
}

export default async function AuthorityDashboard() {
  const [authority, stats, wardPerformance, recentIssues] = await Promise.all([
    getAuthorityData(),
    getLiveStats(),
    getWardPerformance(),
    getRecentIssues(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-zinc-600 dark:text-zinc-400">
              🏛️ {authority.jurisdiction}
            </span>
            <Link
              href="/dashboard/authority/reports"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
            >
              View All Reports
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Authority Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Real-time monitoring • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700">
            🔄 Refresh Data
          </button>
        </div>

        {/* Live Stats */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <StatCard label="Total Households" value={stats.totalHouseholds.toLocaleString()} />
          <StatCard label="Active Collectors" value={stats.activeCollectors.toString()} />
          <StatCard label="Today's Collections" value={stats.todayCollections.toLocaleString()} />
          <StatCard
            label="Avg Segregation"
            value={`${stats.averageSegregationRate}%`}
            highlight
          />
          <StatCard label="Open Issues" value={stats.openIssues.toString()} warning />
          <StatCard label="Resolved Today" value={stats.resolvedToday.toString()} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ward Performance */}
          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Ward Performance
              </h2>
              <p className="text-sm text-zinc-500">Segregation scores by ward</p>
            </div>
            <div className="p-6 space-y-4">
              {wardPerformance.map((ward) => (
                <div key={ward.ward} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {ward.ward}
                  </div>
                  <div className="flex-1">
                    <div className="h-6 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          ward.status === "excellent"
                            ? "bg-green-500"
                            : ward.status === "good"
                            ? "bg-blue-500"
                            : ward.status === "average"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${ward.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right font-semibold text-zinc-900 dark:text-white">
                    {ward.score}%
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <Link
                href="/statistics"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                View detailed statistics →
              </Link>
            </div>
          </section>

          {/* Recent Issues */}
          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Recent Issues
                </h2>
                <p className="text-sm text-zinc-500">Live feed of reported problems</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {issue.type}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {issue.ward} • {issue.time}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.priority === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : issue.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Heatmap Placeholder */}
        <section className="mt-8 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Segregation Heatmap
          </h2>
          <div className="h-64 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 dark:from-green-900/20 dark:via-yellow-900/20 dark:to-red-900/20 rounded-lg flex items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              📍 Interactive heatmap showing segregation compliance by area
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
  warning = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight
          ? "bg-green-600 text-white"
          : warning
          ? "bg-orange-500 text-white"
          : "bg-white dark:bg-zinc-800"
      }`}
    >
      <p
        className={`text-xs ${
          highlight || warning ? "text-white/80" : "text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-2xl font-bold ${
          highlight || warning ? "" : "text-zinc-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
