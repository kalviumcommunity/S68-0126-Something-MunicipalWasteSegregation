import Link from "next/link";

// ✅ Static Rendering (SSG) - About page with static organizational content
export const metadata = {
  title: "About WasteWise | Municipal Waste Segregation",
  description: "Learn about the WasteWise initiative for community-driven municipal waste management.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <span className="text-xl font-bold text-green-800 dark:text-green-400">WasteWise</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          About WasteWise
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Our Mission
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            WasteWise is a community-driven initiative designed to transform municipal waste management 
            through technology, transparency, and collective action. We bridge the gap between households, 
            waste collectors, and municipal authorities to create accountable and effective waste 
            segregation systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            The Problem We Solve
          </h2>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Ineffective municipal waste management stems from a lack of tracking and accountability 
              at the source. Without proper monitoring, waste segregation compliance drops, recycling 
              rates suffer, and landfills overflow with preventable waste.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <StepCard
              number={1}
              title="Register Your Household"
              description="Sign up and link your address to start tracking your segregation efforts."
            />
            <StepCard
              number={2}
              title="Segregate & Report"
              description="Properly segregate waste and log your daily disposal activities."
            />
            <StepCard
              number={3}
              title="Collector Validation"
              description="Waste collectors verify segregation quality during pickup."
            />
            <StepCard
              number={4}
              title="Track & Improve"
              description="Monitor your scores, compare with neighbors, and improve over time."
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Key Stakeholders
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StakeholderCard
              emoji="🏠"
              title="Households"
              description="Track segregation scores, report issues, and earn recognition for good practices."
            />
            <StakeholderCard
              emoji="🚛"
              title="Waste Collectors"
              description="Validate segregation quality, report violations, and optimize collection routes."
            />
            <StakeholderCard
              emoji="🏛️"
              title="Municipal Authorities"
              description="Access real-time dashboards, analytics, and ward-level performance data."
            />
          </div>
        </section>

        <section className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="mb-6 text-green-100">
            Be part of the solution. Start tracking your waste segregation today.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition"
          >
            Get Started
          </Link>
        </section>
      </main>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

function StakeholderCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
