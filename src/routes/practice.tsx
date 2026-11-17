import { createFileRoute, Link } from "@tanstack/react-router";
import { useHydrated } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { EXAM_MAX_ERRORS, EXAM_MINUTES, EXAM_QUESTIONS, PracticeSession } from "@/components/PracticeSession";
import { getPool } from "@/content/questions";
import { TRAPS } from "@/content/traps";
import { useProgress, weakIds } from "@/lib/progress";
import { buildSession, type Mode } from "@/lib/sessions";

const search = z.object({
  mode: z.enum(["quick", "missed", "weak", "exam", "single", "trap", "resume"]).optional(),
  id: z.string().optional(),
  trap: z.enum(["negations", "absolutes", "exceptions", "numbers", "swapped"]).optional(),
});

export const Route = createFileRoute("/practice")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Practice — Patente B Decoder" },
      { name: "description", content: "Practise Italian Patente B true/false questions with translations and trap explanations." },
      { property: "og:title", content: "Practice — Patente B Decoder" },
      { property: "og:description", content: "Quick practice, most-missed questions, weak spots and a timed simulation." },
    ],
  }),
  component: PracticePage,
});

const TITLES: Record<string, string> = { quick: "Quick practice", missed: "Most missed", weak: "My weak spots", exam: "Exam simulation", single: "Question review", trap: "Trap practice" };

function PracticePage() {
  const { mode, id, trap } = Route.useSearch();
  const hydrated = useHydrated();
  if (!mode) return <ModePicker />;
  if (!hydrated) return <p className="text-lg text-muted-foreground">Loading…</p>;
  return <Session key={`${mode}-${id}-${trap}`} mode={mode} id={id} trap={trap} />;
}

function Session({ mode, id, trap }: { mode: Mode | "resume"; id?: string | undefined; trap?: (typeof TRAPS)[number]["id"] | undefined }) {
  const p = useProgress();
  // Build once per mount; progress changes during the session must not reshuffle.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => (mode === "resume" && p.resume ? p.resume : buildSession(mode === "resume" ? "quick" : mode, p, { id, trap })), []);
  const m = initial.mode;
  const trapInfo = TRAPS.find((t) => t.id === initial.trap);
  return (
    <PracticeSession
      initial={initial}
      exam={m === "exam"}
      lessonId={m === "trap" ? initial.trap : undefined}
      title={trapInfo ? `Trap ${trapInfo.number}: ${trapInfo.title}` : TITLES[m] ?? "Practice"}
    />
  );
}

function ModePicker() {
  const p = useProgress();
  const pool = getPool(p.includePending);
  const weak = weakIds(p).length;
  const examSize = Math.min(EXAM_QUESTIONS, pool.length);
  const modes = [
    { mode: "quick", title: "Quick practice", desc: "10 random questions." },
    { mode: "missed", title: "Most missed", desc: `All ${pool.length} questions, hardest first by reported learner error rate.` },
    { mode: "weak", title: "My weak spots", desc: weak ? `${weak} questions you got wrong or saved.` : "Nothing yet — questions you miss or save appear here.", disabled: !weak },
    { mode: "exam", title: "Exam simulation", desc: `${examSize} questions, ${EXAM_MINUTES} minutes, pass with ${EXAM_MAX_ERRORS} errors or fewer. Feedback at the end.` },
  ] as const;
  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Choose how to practise</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((m) => (
          <Link
            key={m.mode}
            to="/practice"
            search={{ mode: m.mode }}
            disabled={"disabled" in m && m.disabled}
            className="block rounded-xl border bg-card p-5 hover:border-primary aria-disabled:pointer-events-none aria-disabled:opacity-60"
          >
            <h2 className="text-2xl">{m.title}</h2>
            <p className="mt-1 text-muted-foreground">{m.desc}</p>
          </Link>
        ))}
      </div>
      <p className="rounded-xl bg-muted p-4 text-base">
        <b>About the simulation:</b> the real exam draws 30 questions from the full ministry bank of thousands. This
        simulation uses the same format but only the {pool.length} questions in this app, so it is a practice drill, not a full-bank simulation.
      </p>
    </div>
  );
}
