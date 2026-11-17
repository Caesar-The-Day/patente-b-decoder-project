import { createFileRoute, Link } from "@tanstack/react-router";
import { ACTIVE_QUESTIONS, PENDING_QUESTIONS } from "@/content/questions";
import { VOCABULARY } from "@/content/vocabulary";
import { exportProgress, resetProgress, setIncludePending, useProgress } from "@/lib/progress";
import { computeStats } from "@/lib/stats";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My progress — Patente B Decoder" },
      { name: "description", content: "Your accuracy, weak spots and vocabulary progress, saved on this device." },
      { property: "og:title", content: "My progress — Patente B Decoder" },
      { property: "og:description", content: "Track accuracy by trap and vocabulary learned." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const p = useProgress();
  const s = computeStats(p);
  const cards = [
    ["Questions tried", s.questionsAttempted],
    ["Accuracy", s.accuracy === null ? "—" : `${s.accuracy}%`],
    ["Need review", s.needsReview],
    ["Words learned", `${s.vocabLearned} / ${VOCABULARY.length}`],
    ["Sessions done", s.sessions],
    ["Total answers", s.attempts],
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-4xl">My progress</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map(([k, v]) => (
          <div key={k} className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">{k}</p>
            <p className="font-display text-3xl">{v}</p>
          </div>
        ))}
      </div>
      <section className="space-y-3">
        <h2 className="text-2xl">Accuracy by trap</h2>
        {s.byTrap.map(({ trap, attempts, accuracy }) => (
          <div key={trap.id}>
            <div className="flex justify-between text-base"><span>{trap.number}. {trap.title}</span><span className="text-muted-foreground">{accuracy === null ? "not tried" : `${accuracy}% · ${attempts} answers`}</span></div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full bg-success" style={{ width: `${accuracy ?? 0}%` }} /></div>
          </div>
        ))}
      </section>
      {p.saved.length > 0 && <Link to="/practice" search={{ mode: "weak" }} className="inline-block rounded-lg bg-primary px-5 py-3 text-lg text-primary-foreground">Practise my weak spots</Link>}

      <section className="space-y-3 rounded-xl border bg-card p-5">
        <h2 className="text-2xl">Question set</h2>
        <p>{ACTIVE_QUESTIONS.length} questions have full study notes. {PENDING_QUESTIONS.length} more come straight from the guide (answer, translation and short explanation) without extra notes.</p>
        <label className="flex min-h-11 items-center gap-3 text-lg">
          <input type="checkbox" className="size-6 accent-[var(--color-primary)]" checked={p.includePending} onChange={(e) => setIncludePending(e.target.checked)} />
          Include the other {PENDING_QUESTIONS.length} guide questions in practice
        </label>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl">Your data</h2>
        <p className="text-muted-foreground">Progress is saved only in this browser on this device.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportProgress} className="min-h-12 rounded-lg border bg-card px-5 text-lg">Download my progress</button>
          <button onClick={() => { if (confirm("Delete all progress on this device?")) resetProgress(); }} className="min-h-12 rounded-lg border border-destructive px-5 text-lg text-destructive">Reset progress</button>
        </div>
      </section>
    </div>
  );
}
