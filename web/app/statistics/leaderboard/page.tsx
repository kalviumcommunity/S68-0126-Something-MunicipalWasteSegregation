import Link from "next/link";

// ✅ Hybrid Rendering (ISR) - Leaderboard updates periodically
// Revalidates every 10 minutes for reasonably fresh rankings
export const revalidate = 600; // 10 minutes

async function getLeaderboardData() {
  return {
    lastUpdated: new Date().toISOString(),
    householdLeaders: [
      { rank: 1, name: "Sharma Family", ward: "Ward 5", score: 98, streak: 45, badge: "🥇" },
      { rank: 2, name: "Patel Residence", ward: "Ward 1", score: 97, streak: 38, badge: "🥈" },
      { rank: 3, name: "Kumar Household", ward: "Ward 8", score: 96, streak: 42, badge: "🥉" },
      { rank: 4, name: "Singh Family", ward: "Ward 2", score: 95, streak: 30, badge: "⭐" },
      { rank: 5, name: "Reddy Home", ward: "Ward 1", score: 94, streak: 28, badge: "⭐" },
      { rank: 6, name: "Gupta Residence", ward: "Ward 6", score: 93, streak: 25, badge: "" },
      { rank: 7, name: "Joshi Family", ward: "Ward 5", score: 92, streak: 22, badge: "" },
      { rank: 8, name: "Mehta Household", ward: "Ward 3", score: 91, streak: 20, badge: "" },
      { rank: 9, name: "Verma Home", ward: "Ward 7", score: 90, streak: 18, badge: "" },
      { rank: 10, name: "Iyer Residence", ward: "Ward 2", score: 89, streak: 15, badge: "" },
    ],
    wardLeaders: [
      { rank: 1, ward: "Ward 1", score: 92, households: 2100, improvement: 5 },
      { rank: 2, ward: "Ward 5", score: 91, households: 2050, improvement: 8 },
      { rank: 3, ward: "Ward 2", score: 88, households: 1850, improvement: 3 },
      { rank: 4, ward: "Ward 8", score: 87, households: 2150, improvement: 6 },
      { rank: 5, ward: "Ward 6", score: 82, households: 2200, improvement: 2 },
    ],
    collectorLeaders: [
      { rank: 1, name: "Ravi Kumar", validations: 1250, accuracy: 99.2 },
      { rank: 2, name: "Suresh B", validations: 1180, accuracy: 98.8 },
      { rank: 3, name: "Mohan S", validations: 1150, accuracy: 98.5 },
    ],
  };
}

export const metadata = {
  title: "Community Leaderboard | WasteWise",
  description: "See top performing households, wards, and collectors in waste segregation.",
};

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/statistics" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Overview
            </Link>
            <Link href="/statistics/leaderboard" className="text-green-600 font-medium">
              Leaderboard
            </Link>
            <Link href="/statistics/events" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Events
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            🏆 Community Leaderboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Celebrating champions of waste segregation • Updated every 10 minutes
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Households */}
          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-t-xl">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                🏠 Top Households
              </h2>
              <p className="text-sm text-zinc-500">Highest segregation scores this month</p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
              {data.householdLeaders.map((household) => (
                <div
                  key={household.rank}
                  className={`p-4 flex items-center gap-4 ${
                    household.rank <= 3 ? "bg-yellow-50/50 dark:bg-yellow-900/10" : ""
                  }`}
                >
                  <div className="w-8 text-center">
                    {household.badge || <span className="text-zinc-400">{household.rank}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {household.name}
                    </p>
                    <p className="text-sm text-zinc-500">{household.ward}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{household.score}%</p>
                    <p className="text-xs text-zinc-500">{household.streak} day streak</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Wards */}
          <section className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-xl">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                🏘️ Top Wards
              </h2>
              <p className="text-sm text-zinc-500">Best performing wards overall</p>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
              {data.wardLeaders.map((ward) => (
                <div key={ward.rank} className="p-4 flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      ward.rank === 1
                        ? "bg-yellow-500 text-white"
                        : ward.rank === 2
                        ? "bg-zinc-300 text-zinc-700"
                        : ward.rank === 3
                        ? "bg-orange-400 text-white"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {ward.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-zinc-900 dark:text-white">{ward.ward}</p>
                    <p className="text-sm text-zinc-500">
                      {ward.households.toLocaleString()} households
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{ward.score}%</p>
                    <p className="text-xs text-green-500">↑ {ward.improvement}% this month</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Top Collectors */}
        <section className="mt-8 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-xl">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              🚛 Top Collectors
            </h2>
            <p className="text-sm text-zinc-500">Most validations with highest accuracy</p>
          </div>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-700">
            {data.collectorLeaders.map((collector) => (
              <div key={collector.rank} className="p-6 text-center">
                <div className="text-4xl mb-2">
                  {collector.rank === 1 ? "🥇" : collector.rank === 2 ? "🥈" : "🥉"}
                </div>
                <p className="font-semibold text-zinc-900 dark:text-white">{collector.name}</p>
                <p className="text-2xl font-bold text-blue-600 my-2">
                  {collector.validations.toLocaleString()}
                </p>
                <p className="text-sm text-zinc-500">validations • {collector.accuracy}% accuracy</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 bg-green-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want to see your name here?</h2>
          <p className="text-green-100 mb-4">
            Improve your segregation consistency and climb the leaderboard!
          </p>
          <Link
            href="/dashboard/household"
            className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition"
          >
            View My Progress
          </Link>
        </section>
      </main>
    </div>
  );
}
