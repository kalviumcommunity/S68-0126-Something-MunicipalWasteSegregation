import Link from "next/link";

// ✅ Static Rendering (SSG) - FAQ content is static and SEO-friendly
export const metadata = {
  title: "Frequently Asked Questions | WasteWise",
  description: "Common questions about waste segregation, the WasteWise platform, and how to participate.",
};

const faqs = [
  {
    question: "What is WasteWise?",
    answer:
      "WasteWise is a community-driven platform that helps households, waste collectors, and municipal authorities track and improve waste segregation at the source. It provides real-time monitoring, scoring, and reporting features.",
  },
  {
    question: "How do I register my household?",
    answer:
      "You can register by creating an account on the dashboard. You'll need to provide your address and ward details. Once registered, you can start logging your segregation activities.",
  },
  {
    question: "What are the three categories of waste?",
    answer:
      "Waste is categorized into: (1) Wet Waste - biodegradable items like food scraps and garden waste, (2) Dry Waste - recyclable materials like paper, plastic, and glass, and (3) Hazardous Waste - dangerous items like batteries, electronics, and medical waste.",
  },
  {
    question: "How is my segregation score calculated?",
    answer:
      "Your score is based on collector validations during pickup, consistency of segregation over time, and any reported issues. Properly segregated waste earns points, while mixing or contamination reduces your score.",
  },
  {
    question: "What happens if I don't segregate properly?",
    answer:
      "Improper segregation leads to a lower household score and may be flagged by collectors. Persistent issues may result in notices from municipal authorities. The goal is improvement, not punishment.",
  },
  {
    question: "Can I report issues with waste collection?",
    answer:
      "Yes! You can report missed collections, improper handling by collectors, or any other issues through the dashboard. All reports are tracked and routed to the appropriate authorities.",
  },
  {
    question: "How do collectors validate my segregation?",
    answer:
      "During pickup, collectors use the WasteWise app to mark whether your waste was properly segregated. They can flag issues like mixed waste, contamination, or use of wrong bags.",
  },
  {
    question: "Are there rewards for good segregation?",
    answer:
      "Yes! Households with consistently high scores appear on community leaderboards and may be eligible for recognition certificates, reduced waste collection fees, or other incentives depending on your municipality.",
  },
  {
    question: "How can I see my ward's performance?",
    answer:
      "The Statistics section shows ward-level data including average segregation rates, trends over time, and comparisons with other wards. This data is updated periodically using ISR (Incremental Static Regeneration).",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Individual household data is only visible to you and authorized municipal officials. Public statistics are anonymized and aggregated at the ward level.",
  },
];

export default function FAQPage() {
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

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Find answers to common questions about waste segregation and the WasteWise platform.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <section className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
            Still have questions?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Contact your local municipal office or reach out through the dashboard.
          </p>
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700"
          >
            Submit a Query →
          </Link>
        </section>
      </main>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-zinc-200 dark:border-zinc-700 pb-4">
      <summary className="cursor-pointer list-none flex items-center justify-between">
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 pr-4">{question}</h3>
        <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
      </summary>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">{answer}</p>
    </details>
  );
}
