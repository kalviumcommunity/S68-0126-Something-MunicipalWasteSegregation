import Link from "next/link";

// ✅ Static Rendering (SSG) - Educational content doesn't change frequently
// Optimized for SEO and fast load times
export const metadata = {
  title: "Learn About Waste Segregation | WasteWise",
  description: "Educational content about proper waste segregation - wet waste, dry waste, and hazardous waste categories.",
};

export default function EducationPage() {
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

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
          Understanding Waste Segregation
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Why Segregation Matters
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            Proper waste segregation at source is the foundation of effective municipal waste management. 
            When waste is separated correctly, it enables recycling, composting, and safe disposal of 
            hazardous materials, reducing landfill burden and environmental impact.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <WasteCard
            type="Wet Waste"
            emoji="🥬"
            color="green"
            description="Biodegradable waste that can be composted"
            items={[
              "Food scraps and leftovers",
              "Fruit and vegetable peels",
              "Coffee grounds and tea bags",
              "Garden waste and leaves",
              "Eggshells",
            ]}
          />
          <WasteCard
            type="Dry Waste"
            emoji="📦"
            color="blue"
            description="Recyclable materials that can be processed"
            items={[
              "Paper and cardboard",
              "Plastic bottles and containers",
              "Glass bottles and jars",
              "Metal cans and foils",
              "Cloth and fabric scraps",
            ]}
          />
          <WasteCard
            type="Hazardous Waste"
            emoji="⚠️"
            color="red"
            description="Dangerous materials requiring special disposal"
            items={[
              "Batteries and electronics",
              "Medical waste and syringes",
              "Paint and chemicals",
              "Fluorescent bulbs",
              "Expired medicines",
            ]}
          />
        </section>

        <section className="bg-green-50 dark:bg-zinc-800 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Best Practices for Households
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>Keep separate bins for wet, dry, and hazardous waste</li>
            <li>Rinse containers before putting them in dry waste</li>
            <li>Wrap wet waste in newspaper to prevent leakage</li>
            <li>Store hazardous waste safely until collection day</li>
            <li>Compost wet waste at home if possible</li>
            <li>Avoid mixing waste types in the same bag</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Ready to Track Your Progress?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Join thousands of households actively improving their segregation practices.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
          >
            Go to Dashboard →
          </Link>
        </section>
      </main>
    </div>
  );
}

function WasteCard({
  type,
  emoji,
  color,
  description,
  items,
}: {
  type: string;
  emoji: string;
  color: "green" | "blue" | "red";
  description: string;
  items: string[];
}) {
  const colorClasses = {
    green: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
    red: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
  };

  return (
    <div className={`rounded-2xl p-6 border-2 ${colorClasses[color]}`}>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{type}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
