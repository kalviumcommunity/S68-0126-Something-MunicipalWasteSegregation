import Link from "next/link";

// ✅ Dynamic Rendering (SSR) - Reports feed requires real-time data
export const dynamic = "force-dynamic";

async function getUserReports() {
  return [
    {
      id: "RPT-001",
      title: "Missed collection on Monday",
      type: "Missed Collection",
      status: "resolved",
      createdAt: "2026-01-18",
      resolvedAt: "2026-01-19",
    },
    {
      id: "RPT-002",
      title: "Collector mixed wet and dry waste",
      type: "Improper Handling",
      status: "in-progress",
      createdAt: "2026-01-19",
      resolvedAt: null,
    },
    {
      id: "RPT-003",
      title: "Overflowing community bin",
      type: "Infrastructure",
      status: "open",
      createdAt: "2026-01-20",
      resolvedAt: null,
    },
  ];
}

async function getCommunityIssues() {
  return [
    {
      id: "COM-001",
      title: "Stray animals opening waste bags",
      ward: "Ward 15",
      reportedBy: "Multiple households",
      upvotes: 23,
      status: "under-review",
    },
    {
      id: "COM-002",
      title: "Need more dry waste collection days",
      ward: "Ward 15",
      reportedBy: "Community Forum",
      upvotes: 45,
      status: "acknowledged",
    },
  ];
}

export default async function ReportsPage() {
  const [userReports, communityIssues] = await Promise.all([
    getUserReports(),
    getCommunityIssues(),
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
            <Link href="/dashboard/household" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              My Household
            </Link>
            <Link href="/dashboard/reports" className="text-green-600 font-medium">
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Issues & Reports
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Track your reports and community issues
            </p>
          </div>
          <Link
            href="/dashboard/reports/new"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + New Report
          </Link>
        </div>

        {/* My Reports */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              My Reports
            </h2>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {userReports.map((report) => (
              <div key={report.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-zinc-900 dark:text-white">
                    {report.title}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {report.id} • {report.type} • Reported on {report.createdAt}
                  </p>
                </div>
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Community Issues */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Community Issues
            </h2>
            <p className="text-sm text-zinc-500">Issues affecting your ward</p>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {communityIssues.map((issue) => (
              <div key={issue.id} className="p-4 flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <button className="text-zinc-400 hover:text-green-600">▲</button>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {issue.upvotes}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-zinc-900 dark:text-white">
                    {issue.title}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {issue.ward} • Reported by {issue.reportedBy}
                  </p>
                </div>
                <StatusBadge status={issue.status} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "in-progress": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "under-review": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    acknowledged: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.open}`}>
      {status.replace("-", " ")}
    </span>
  );
}
