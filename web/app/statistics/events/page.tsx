import Link from "next/link";

// ✅ Hybrid Rendering (ISR) - Events page regenerates every hour
// Events don't change frequently but should reflect recent additions
export const revalidate = 3600; // 1 hour

async function getEvents() {
  return {
    upcoming: [
      {
        id: "EVT-001",
        title: "Ward 15 Segregation Drive",
        date: "2026-01-25",
        time: "9:00 AM - 12:00 PM",
        location: "Community Hall, Ward 15",
        description: "Join us for a community awareness drive on proper waste segregation techniques.",
        type: "awareness",
      },
      {
        id: "EVT-002",
        title: "E-Waste Collection Day",
        date: "2026-02-01",
        time: "8:00 AM - 5:00 PM",
        location: "Municipal Ground, Central Zone",
        description: "Special collection day for electronic waste. Bring your old devices for safe disposal.",
        type: "collection",
      },
      {
        id: "EVT-003",
        title: "Composting Workshop",
        date: "2026-02-08",
        time: "10:00 AM - 1:00 PM",
        location: "Green Garden, Ward 5",
        description: "Learn how to compost wet waste at home and reduce your environmental footprint.",
        type: "workshop",
      },
    ],
    past: [
      {
        id: "EVT-P01",
        title: "New Year Cleanup Drive",
        date: "2026-01-02",
        participants: 450,
        wasteCollected: "2.5 tons",
        type: "cleanup",
      },
      {
        id: "EVT-P02",
        title: "School Awareness Program",
        date: "2025-12-15",
        participants: 1200,
        schools: 8,
        type: "awareness",
      },
    ],
  };
}

export const metadata = {
  title: "Events & Awareness Drives | WasteWise",
  description: "Upcoming and past community events for waste management awareness.",
};

export default async function EventsPage() {
  const events = await getEvents();

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
            <Link href="/statistics/leaderboard" className="text-zinc-600 hover:text-green-600 dark:text-zinc-300">
              Leaderboard
            </Link>
            <Link href="/statistics/events" className="text-green-600 font-medium">
              Events
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Events & Awareness Drives
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Community programs to promote better waste management
        </p>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
            📅 Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {events.upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6 flex items-center gap-2">
            ✅ Past Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {events.past.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-500">{event.date}</p>
                  </div>
                  <EventTypeBadge type={event.type} />
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-zinc-500">Participants</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      {event.participants.toLocaleString()}
                    </p>
                  </div>
                  {"wasteCollected" in event && (
                    <div>
                      <p className="text-zinc-500">Waste Collected</p>
                      <p className="font-semibold text-green-600">{event.wasteCollected}</p>
                    </div>
                  )}
                  {"schools" in event && (
                    <div>
                      <p className="text-zinc-500">Schools</p>
                      <p className="font-semibold text-zinc-900 dark:text-white">{event.schools}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Want to organize an event?</h2>
            <p className="text-green-100 mb-4">
              Community-led initiatives are the backbone of effective waste management.
              Get in touch with your ward officer to plan an awareness drive.
            </p>
            <Link
              href="/dashboard/reports/new"
              className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition"
            >
              Contact Ward Office
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function EventCard({
  event,
}: {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: string;
  };
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <EventTypeBadge type={event.type} />
          <span className="text-sm font-medium text-green-600">{event.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          {event.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {event.description}
        </p>
        <div className="space-y-2 text-sm text-zinc-500">
          <p className="flex items-center gap-2">
            🕐 {event.time}
          </p>
          <p className="flex items-center gap-2">
            📍 {event.location}
          </p>
        </div>
      </div>
      <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-700/50 border-t border-zinc-200 dark:border-zinc-700">
        <button className="w-full text-center text-green-600 font-medium hover:text-green-700">
          Register Interest →
        </button>
      </div>
    </div>
  );
}

function EventTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    awareness: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    collection: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    workshop: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    cleanup: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${styles[type] || styles.awareness}`}>
      {type}
    </span>
  );
}
