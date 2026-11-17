import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Flame, ListChecks, PlayCircle, Shuffle } from "lucide-react";
import { ACTIVE_QUESTIONS } from "@/content/questions";
import { TRAPS } from "@/content/traps";
import { useProgress } from "@/lib/progress";
import { computeStats } from "@/lib/stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patente B Decoder — Italian driving theory, explained in English" },
      { name: "description", content: "Understand why Patente B questions are tricky: Italian wording, traps and key vocabulary, explained for English speakers." },
      { property: "og:title", content: "Patente B Decoder" },
      { property: "og:description", content: "Italian driving theory questions, decoded for English speakers." },
    ],
  }),
  component: Home,
});

function Home() {
  const p = useProgress();
  const s = computeStats(p);
  const seen = ACTIVE_QUESTIONS.filter((q) => p.answers[q.id]).length;
  const pct = Math.round((seen / ACTIVE_QUESTIONS.length) * 100);
  const resume = p.resume && p.resume.index < p.resume.ids.length ? p.resume : null;
  const nextTrap = TRAPS.find((t) => !p.completedLessons.includes(t.id));
  const suggestion = s.needsReview >= 3
    ? <>Review the {s.needsReview} questions you missed or saved. <Link to="/practice" search={{ mode: "weak" }} className="font-bold text-accent underline">Start</Link></>
    : nextTrap
      ? <>Learn trap {nextTrap.number}: {nextTrap.title.toLowerCase()}. <Link to="/traps/$trapId" params={{ trapId: nextTrap.id }} className="font-bold text-accent underline">Start</Link></>
      : <>Try a timed exam simulation. <Link to="/practice" search={{ mode: "exam" }} className="font-bold text-accent underline">Start</Link></>;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl leading-tight sm:text-5xl">Understand the Italian, <span className="text-accent">pass the exam.</span></h1>
        <p className="max-w-2xl text-xl text-muted-foreground">The hardest Patente B questions, explained in plain English: what the words mean, and the trap hidden in each one.</p>
      </section>

      <section className="rounded-2xl border bg-card p-5 sm:p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-sans text-lg font-bold">Your progress</h2>
          <Link to="/progress" className="text-base underline">Details</Link>
        </div>
        <p className="mt-1 text-muted-foreground">{seen} of {ACTIVE_QUESTIONS.length} questions tried · accuracy {s.accuracy === null ? "—" : `${s.accuracy}%`} · {s.vocabLearned} words learned</p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Questions tried">
          <div className="h-full bg-success" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-4 rounded-lg bg-muted p-3"><b>Today:</b> {suggestion}</p>
      </section>

      {resume && (
        <Link to="/practice" search={{ mode: "resume" }} className="flex items-center gap-4 rounded-2xl bg-primary p-5 text-primary-foreground">
          <PlayCircle className="size-8 shrink-0" aria-hidden />
          <span className="flex-1">
            <span className="block text-xl font-bold">Resume where you left off</span>
            <span className="opacity-80">Question {resume.index + 1} of {resume.ids.length}</span>
          </span>
          <ArrowRight aria-hidden />
        </Link>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <Tile to={{ to: "/practice", search: { mode: "quick" } }} icon={<Shuffle />} title="Start studying" desc="10 random questions with explanations." />
        <Tile to={{ to: "/practice", search: { mode: "missed" } }} icon={<Flame />} title="Most-missed questions" desc="Hardest first, by reported learner error rate." />
        <Tile to={{ to: "/traps" }} icon={<ListChecks />} title="The five traps" desc="Short lessons on wording tricks." />
        <Tile to={{ to: "/vocabulary" }} icon={<BookOpen />} title="Driving vocabulary" desc="Flashcards for the key Italian terms." />
      </section>
    </div>
  );
}

function Tile({ to, icon, title, desc }: { to: { to: "/practice"; search: { mode: "quick" | "missed" } } | { to: "/traps" | "/vocabulary" }; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link {...to} className="flex gap-4 rounded-2xl border bg-card p-5 hover:border-primary">
      <span className="text-accent [&>svg]:size-7" aria-hidden>{icon}</span>
      <span>
        <span className="block text-xl font-bold">{title}</span>
        <span className="text-muted-foreground">{desc}</span>
      </span>
    </Link>
  );
}
