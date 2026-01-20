import Link from "next/link";

// ✅ Hybrid Rendering (ISR) - Ward statistics regenerate every 5 minutes
// Data is fresh enough for analytics but doesn't need real-time updates
export const revalidate = 300; // Revalidate every 5 minutes (300 seconds)

async function getWardStatistics() {
  // Simulated API call - in production, fetch from your backend
  return {
    lastUpdated: new Date().toISOString(),
    overallStats: {
      totalHouseholds: 52340,
      participatingHouseholds: 48750,
      averageSegregationRate: 84.5,
      wetWasteCollected: "1,250 tons",
      dryWasteRecycled: "890 tons",
      issuesResolved: 2450,
    },
    wardData: [
      { ward: "Ward 1", score: 92, households: 2100, trend: "up", change: 3 },
      { ward: "Ward 2", score: 88, households: 1850, trend: "up", change: 2 },
      { ward: "Ward 3", score: 76, households: 2300, trend: "down", change: -4 },
      { ward: "Ward 4", score: 65, households: 1950, trend: "down", change: -2 },
      { ward: "Ward 5", score: 91, households: 2050, trend: "up", change: 5 },
      { ward: "Ward 6", score: 82, households: 2200, trend: "stable", change: 0 },
      { ward: "Ward 7", score: 79, households: 1900, trend: "up", change: 1 },
      { ward: "Ward 8", score: 87, households: 2150, trend: "up", change: 4 },
    ],
    monthlyTrend: [
      { month: "Aug", rate: 72 },
      { month: "Sep", rate: 75 },
      { month: "Oct", rate: 78 },
      { month: "Nov", rate: 81 },
      { month: "Dec", rate: 83 },
      { month: "Jan", rate: 85 },
    ],
  };
}

export const metadata = {
  title: "Ward Statistics | WasteWise",
  description: "View ward-level waste segregation statistics and performance metrics.",
};

export default async function StatisticsPage() {
  const stats = await getWardStatistics();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/statistics" className="text-green-600 font-medium">
              Overview
            </Link>
            <Link href="/statistics/leaderboard" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Leaderboard
            </Link>
            <Link href="/statistics/events" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Events
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Ward Statistics
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Performance metrics across all wards • Updated every 5 minutes
            </p>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <OverviewCard
            label="Total Households"
            value={stats.overallStats.totalHouseholds.toLocaleString()}
          />
          <OverviewCard
            label="Participating"
            value={stats.overallStats.participatingHouseholds.toLocaleString()}
          />
          <OverviewCard
            label="Avg Segregation"
            value={`${stats.overallStats.averageSegregationRate}%`}
            highlight
          />
          <OverviewCard label="Wet Waste" value={stats.overallStats.wetWasteCollected} />
          <OverviewCard label="Dry Recycled" value={stats.overallStats.dryWasteRecycled} />
          <OverviewCard label="Issues Resolved" value={stats.overallStats.issuesResolved.toLocaleString()} />
        </div>

        {/* Monthly Trend Chart */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Segregation Rate Trend (6 Months)
          </h2>
          <div className="flex items-end gap-4 h-48">
            {stats.monthlyTrend.map((month) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-zinc-100 dark:bg-zinc-700 rounded-t-lg relative flex-1">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all"
                    style={{ height: `${month.rate}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {month.month}
                </span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {month.rate}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Ward Performance Table */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Ward-Level Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left p-4 text-zinc-600 dark:text-zinc-400 font-medium">Ward</th>
                  <th className="text-left p-4 text-zinc-600 dark:text-zinc-400 font-medium">Households</th>
                  <th className="text-left p-4 text-zinc-600 dark:text-zinc-400 font-medium">Score</th>
                  <th className="text-left p-4 text-zinc-600 dark:text-zinc-400 font-medium">Progress</th>
                  <th className="text-left p-4 text-zinc-600 dark:text-zinc-400 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {stats.wardData.map((ward) => (
                  <tr
                    key={ward.ward}
                    className="border-b border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-700/30"
                  >
                    <td className="p-4 font-medium text-zinc-900 dark:text-white">
                      {ward.ward}
                    </td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">
                      {ward.households.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-bold ${
                          ward.score >= 85
                            ? "text-green-600"
                            : ward.score >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {ward.score}%
                      </span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            ward.score >= 85
                              ? "bg-green-500"
                              : ward.score >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${ward.score}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <TrendIndicator trend={ward.trend} change={ward.change} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function OverviewCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight ? "bg-green-600 text-white" : "bg-white dark:bg-zinc-800"
      }`}
    >
      <p className={`text-xs ${highlight ? "text-green-100" : "text-zinc-500 dark:text-zinc-400"}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? "" : "text-zinc-900 dark:text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function TrendIndicator({ trend, change }: { trend: string; change: number }) {
  if (trend === "up") {
    return (
      <span className="flex items-center gap-1 text-green-600">
        ↑ +{change}%
      </span>
    );
  }
  if (trend === "down") {
    return (
      <span className="flex items-center gap-1 text-red-600">
        ↓ {change}%
      </span>
    );
  }
  return <span className="text-zinc-500">→ No change</span>;
}
