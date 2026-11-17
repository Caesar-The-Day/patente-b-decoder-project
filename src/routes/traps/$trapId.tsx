import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getQuestion } from "@/content/questions";
import { TRAPS } from "@/content/traps";
import { trapPracticeIds } from "@/lib/sessions";

export const Route = createFileRoute("/traps/$trapId")({
  loader: ({ params }) => {
    const trap = TRAPS.find((t) => t.id === params.trapId);
    if (!trap) throw notFound();
    return { trap };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Trap ${loaderData.trap.number}: ${loaderData.trap.title} — Patente B Decoder` : "Lesson unavailable" },
      { name: "description", content: loaderData?.trap.summary ?? "Patente B trap lesson" },
      { property: "og:title", content: loaderData ? `Trap ${loaderData.trap.number}: ${loaderData.trap.title}` : "Lesson unavailable" },
      { property: "og:description", content: loaderData?.trap.summary ?? "Patente B trap lesson" },
    ],
  }),
  component: TrapLesson,
});

function TrapLesson() {
  const { trap } = Route.useLoaderData();
  const examples = trapPracticeIds(trap.id).map(getQuestion).filter((q) => !!q);
  return (
    <div className="space-y-8">
      <div>
        <Link to="/traps" className="text-base underline">← All traps</Link>
        <p className="mt-4 text-sm uppercase tracking-wide text-accent">Trap {trap.number}</p>
        <h1 className="text-4xl">{trap.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {trap.italianWords.map((w) => <span key={w} lang="it" className="rounded-md bg-mark px-2 py-1 font-bold">{w}</span>)}
        </div>
      </div>
      <div className="space-y-4 text-lg">{trap.body.map((b, i) => <p key={i}>{b}</p>)}</div>
      <p className="rounded-xl border-l-4 border-success bg-success-soft p-4 text-lg"><b>Tip:</b> {trap.tip}</p>
      <section className="space-y-3">
        <h2 className="text-2xl">Real examples from the guide</h2>
        {examples.length === 0 && <p className="text-muted-foreground">No examples in the dataset yet.</p>}
        {examples.slice(0, 3).map((q) => (
          <div key={q.id} className="rounded-xl border bg-card p-4">
            <p lang="it" className="font-display text-xl">{q.italian}</p>
            <p className="mt-1 text-muted-foreground">{q.english}</p>
            <p className="mt-2"><b>{q.answer ? "VERO" : "FALSO"}</b> — {q.explanation}</p>
            <Link to="/practice" search={{ mode: "single", id: q.id }} className="mt-2 inline-block underline">Open this question</Link>
          </div>
        ))}
      </section>
      {examples.length > 0 && (
        <div className="space-y-2">
          <Link to="/practice" search={{ mode: "trap", trap: trap.id }} className="block min-h-14 rounded-xl bg-primary py-4 text-center text-xl font-bold text-primary-foreground">
            Practise {examples.length} questions
          </Link>
          {examples.length < 5 && <p className="text-sm text-muted-foreground">The guide only contains {examples.length} questions in this category.</p>}
          {examples.some((q) => !q.enrichment) && <p className="text-sm text-muted-foreground">Some practice questions come straight from the guide and don't have extra study notes yet.</p>}
        </div>
      )}
    </div>
  );
}
