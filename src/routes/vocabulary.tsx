import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { VOCAB_CATEGORIES, VOCABULARY, type VocabCategory } from "@/content/vocabulary";
import { toggleLearned, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Driving vocabulary — Patente B Decoder" },
      { name: "description", content: "Flashcards for the Italian driving-exam words that matter most, grouped by topic." },
      { property: "og:title", content: "Italian driving vocabulary" },
      { property: "og:description", content: "Flashcards for key Patente B exam terms." },
    ],
  }),
  component: Vocabulary,
});

function Vocabulary() {
  const p = useProgress();
  const [cat, setCat] = useState<VocabCategory>("signs");
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const terms = VOCABULARY.filter((v) => v.category === cat);
  const t = terms[i % terms.length]!;
  const learned = p.learnedVocab.includes(t.id);
  const move = (d: number) => { setI((x) => (x + d + terms.length) % terms.length); setFlipped(false); };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">Driving vocabulary</h1>
      <p className="text-lg text-muted-foreground">{p.learnedVocab.length} of {VOCABULARY.length} words learned. English meanings are study notes, not official definitions.</p>
      <div className="flex flex-wrap gap-2" role="tablist">
        {VOCAB_CATEGORIES.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => { setCat(c.id); setI(0); setFlipped(false); }}
            className={cn("min-h-11 rounded-lg border px-3 text-base", cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}>
            {c.label}
          </button>
        ))}
      </div>

      <button onClick={() => setFlipped((f) => !f)} className="flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center" aria-label={flipped ? "Show Italian side" : "Show meaning"}>
        <span lang="it" className="font-display text-4xl">{t.it}</span>
        {flipped ? (
          <span className="mt-5 space-y-3">
            <span className="block text-2xl text-success">{t.en}</span>
            {t.example && <span lang="it" className="block text-lg italic text-muted-foreground">“{t.example.it}” <span className="not-italic">(guide #{t.example.rank})</span></span>}
            {t.note && <span className="block text-base text-muted-foreground">{t.note}</span>}
          </span>
        ) : (
          <span className="mt-5 text-base text-muted-foreground">Tap to see the meaning</span>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => move(-1)} className="min-h-12 rounded-lg border bg-card px-5 text-lg">← Previous</button>
        <span className="text-muted-foreground">{(i % terms.length) + 1} / {terms.length}</span>
        <button onClick={() => move(1)} className="min-h-12 rounded-lg border bg-card px-5 text-lg">Next →</button>
      </div>
      <button onClick={() => toggleLearned(t.id)} aria-pressed={learned}
        className={cn("flex min-h-14 w-full items-center justify-center gap-2 rounded-xl text-xl font-bold", learned ? "bg-success text-success-foreground" : "border-2 border-success text-success")}>
        <Check className="size-6" aria-hidden /> {learned ? "Learned" : "Mark as learned"}
      </button>
    </div>
  );
}
