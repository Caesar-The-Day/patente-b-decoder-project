import { createFileRoute, Link } from "@tanstack/react-router";
import { TRAPS } from "@/content/traps";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/traps/")({
  head: () => ({
    meta: [
      { title: "The five question traps — Patente B Decoder" },
      { name: "description", content: "Short lessons on the five wording traps behind the most-missed Patente B questions." },
      { property: "og:title", content: "The five question traps" },
      { property: "og:description", content: "Negations, absolutes, conditions, numbers and swapped details." },
    ],
  }),
  component: TrapsIndex,
});

function TrapsIndex() {
  const p = useProgress();
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">The five question traps</h1>
      <p className="text-lg text-muted-foreground">Most wrong answers come from a handful of wording tricks. Learn to spot them.</p>
      <ol className="space-y-3">
        {TRAPS.map((t) => (
          <li key={t.id}>
            <Link to="/traps/$trapId" params={{ trapId: t.id }} className="flex items-start gap-4 rounded-xl border bg-card p-5 hover:border-primary">
              <span className="font-display text-3xl text-accent">{t.number}</span>
              <span className="flex-1">
                <span className="block text-xl font-bold">{t.title}</span>
                <span className="text-muted-foreground">{t.summary}</span>
              </span>
              {p.completedLessons.includes(t.id) && <span className="rounded-full bg-success-soft px-3 py-1 text-sm text-success">Done</span>}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
