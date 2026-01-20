import Link from "next/link";

// ✅ Dynamic Rendering (SSR) - Collector validation requires real-time data
export const dynamic = "force-dynamic";

// Simulated data fetching
async function getCollectorData() {
  return {
    collectorId: "COL-789",
    name: "Ravi Kumar",
    assignedWard: "Ward 15",
    todayStats: {
      householdsVisited: 45,
      totalAssigned: 120,
      properlySegregated: 38,
      issues: 7,
    },
  };
}

async function getPendingValidations() {
  return [
    {
      id: "V001",
      householdId: "HH-12345",
      address: "123 Green Street",
      wasteType: "Wet Waste",
      scheduledTime: "08:30 AM",
      status: "pending",
    },
    {
      id: "V002",
      householdId: "HH-12346",
      address: "125 Green Street",
      wasteType: "Dry Waste",
      scheduledTime: "08:45 AM",
      status: "pending",
    },
    {
      id: "V003",
      householdId: "HH-12347",
      address: "127 Green Street",
      wasteType: "Wet Waste",
      scheduledTime: "09:00 AM",
      status: "pending",
    },
    {
      id: "V004",
      householdId: "HH-12348",
      address: "129 Green Street",
      wasteType: "Hazardous Waste",
      scheduledTime: "09:15 AM",
      status: "pending",
    },
  ];
}

export default async function CollectorDashboard() {
  const [collector, validations] = await Promise.all([
    getCollectorData(),
    getPendingValidations(),
  ]);

  const completionRate = Math.round(
    (collector.todayStats.householdsVisited / collector.todayStats.totalAssigned) * 100
  );

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
              🚛 {collector.name} • {collector.assignedWard}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Collector Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Today&apos;s collection route • {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Progress</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{completionRate}%</p>
            <div className="mt-2 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Visited</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              {collector.todayStats.householdsVisited}/{collector.todayStats.totalAssigned}
            </p>
            <p className="text-xs text-zinc-500">Households</p>
          </div>
          <div className="bg-green-600 rounded-xl p-6 text-white">
            <p className="text-sm text-green-100">Properly Segregated</p>
            <p className="text-3xl font-bold">{collector.todayStats.properlySegregated}</p>
            <p className="text-xs text-green-200">Validated today</p>
          </div>
          <div className="bg-orange-500 rounded-xl p-6 text-white">
            <p className="text-sm text-orange-100">Issues Found</p>
            <p className="text-3xl font-bold">{collector.todayStats.issues}</p>
            <p className="text-xs text-orange-200">Needs attention</p>
          </div>
        </div>

        {/* Pending Validations */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Pending Validations
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Upcoming households on your route
            </p>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {validations.map((validation) => (
              <div
                key={validation.id}
                className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-zinc-900 dark:text-white">
                    {validation.address}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {validation.householdId} • Scheduled: {validation.scheduledTime}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      validation.wasteType === "Wet Waste"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : validation.wasteType === "Dry Waste"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {validation.wasteType}
                  </span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
                    Validate
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition">
                    Flag Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
