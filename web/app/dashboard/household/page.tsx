import Link from "next/link";

// ✅ Dynamic Rendering (SSR) - Dashboard requires real-time user-specific data
// Force dynamic rendering - data must be fresh on every request
export const dynamic = "force-dynamic";

// Simulated data fetching (replace with actual API calls)
async function getHouseholdData() {
  // In production, fetch from your API with user authentication
  return {
    householdId: "HH-12345",
    address: "123 Green Street, Ward 15",
    segregationScore: 87,
    totalLogs: 156,
    currentStreak: 12,
    lastCollection: new Date().toISOString(),
    recentActivity: [
      { date: "2026-01-20", type: "Wet Waste", validated: true },
      { date: "2026-01-19", type: "Dry Waste", validated: true },
      { date: "2026-01-18", type: "Wet Waste", validated: true },
      { date: "2026-01-17", type: "Dry Waste", validated: false },
      { date: "2026-01-16", type: "Hazardous Waste", validated: true },
    ],
  };
}

async function getNotifications() {
  return [
    { id: 1, message: "Collection scheduled for tomorrow 8 AM", type: "info" },
    { id: 2, message: "Great job! 12-day segregation streak!", type: "success" },
  ];
}

export default async function HouseholdDashboard() {
  const [household, notifications] = await Promise.all([
    getHouseholdData(),
    getNotifications(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Overview
            </Link>
            <Link href="/dashboard/household" className="text-green-600 font-medium">
              My Household
            </Link>
            <Link href="/dashboard/reports" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-lg ${
                  notif.type === "success"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                }`}
              >
                {notif.message}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Household Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {household.address} • ID: {household.householdId}
            </p>
          </div>
          <Link
            href="/dashboard/reports/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Report Issue
          </Link>
        </div>

        {/* Score Card */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <ScoreCard
            title="Segregation Score"
            value={`${household.segregationScore}%`}
            subtitle="Based on collector validations"
            highlight
          />
          <ScoreCard
            title="Total Logs"
            value={household.totalLogs.toString()}
            subtitle="Waste disposals recorded"
          />
          <ScoreCard
            title="Current Streak"
            value={`${household.currentStreak} days`}
            subtitle="Consecutive proper segregation"
          />
          <ScoreCard
            title="Last Collection"
            value={new Date(household.lastCollection).toLocaleDateString()}
            subtitle="Most recent pickup"
          />
        </div>

        {/* Recent Activity */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-zinc-200 dark:border-zinc-700">
                  <th className="pb-3 text-zinc-600 dark:text-zinc-400 font-medium">Date</th>
                  <th className="pb-3 text-zinc-600 dark:text-zinc-400 font-medium">Waste Type</th>
                  <th className="pb-3 text-zinc-600 dark:text-zinc-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {household.recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-zinc-100 dark:border-zinc-700/50">
                    <td className="py-3 text-zinc-800 dark:text-zinc-200">{activity.date}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.type === "Wet Waste"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : activity.type === "Dry Waste"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {activity.type}
                      </span>
                    </td>
                    <td className="py-3">
                      {activity.validated ? (
                        <span className="text-green-600">✓ Validated</span>
                      ) : (
                        <span className="text-orange-500">⏳ Pending</span>
                      )}
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

function ScoreCard({
  title,
  value,
  subtitle,
  highlight = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 ${
        highlight
          ? "bg-green-600 text-white"
          : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
      }`}
    >
      <p className={`text-sm ${highlight ? "text-green-100" : "text-zinc-500 dark:text-zinc-400"}`}>
        {title}
      </p>
      <p className="text-3xl font-bold my-1">{value}</p>
      <p className={`text-xs ${highlight ? "text-green-200" : "text-zinc-500 dark:text-zinc-500"}`}>
        {subtitle}
      </p>
    </div>
  );
}
