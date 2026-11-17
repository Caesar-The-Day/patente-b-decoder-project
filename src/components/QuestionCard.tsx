import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Check, ImageOff, Languages, BookOpen, X } from "lucide-react";
import type { Question } from "@/content/questions";
import { getIllustration } from "@/content/illustrations";
import { TRAPS } from "@/content/traps";
import { VOCABULARY } from "@/content/vocabulary";
import { highlight } from "@/lib/highlight";
import { toggleSaved, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Props = {
  question: Question;
  /** Called once the learner picks an answer. */
  onAnswer: (correct: boolean) => void;
  /** Exam mode: no feedback after answering. */
  hideFeedback?: boolean;
  answered: boolean | null; // the learner's choice, null = not yet
};

export function QuestionCard({ question: q, onAnswer, hideFeedback, answered }: Props) {
  const [showEn, setShowEn] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const progress = useProgress();
  const saved = progress.saved.includes(q.id);
  const revealed = answered !== null && !hideFeedback;
  const correct = answered === q.answer;
  const vocab = (q.enrichment?.vocab ?? []).map((id) => VOCABULARY.find((v) => v.id === id)).filter(Boolean);
  const segments = highlight(q.italian, revealed || showVocab ? (q.enrichment?.highlights ?? []) : []);
  const trap = TRAPS.find((t) => t.id === q.trap);
  const illustration = getIllustration(q.illustrationRef);

  return (
    <article className="space-y-5">
      <div className="rounded-xl border bg-card p-5 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {q.officialId && (
            <>
              <span className="font-bold text-foreground">Ministero #{q.officialId}</span>
              <span aria-hidden>·</span>
            </>
          )}
          <span>Guide #{q.guideRank}</span>
          <span aria-hidden>·</span>
          <span>{q.topic}</span>
        </div>
        {illustration && (
          <figure className="mb-5 flex justify-center rounded-lg border bg-muted p-4">
            <img
              src={illustration}
              alt={`Official illustration for ministry question ${q.officialId}`}
              className="max-h-80 w-auto max-w-full object-contain"
              loading="lazy"
            />
          </figure>
        )}
        <p lang="it" className="font-display text-2xl leading-snug sm:text-[1.7rem]">
          {segments.map((s, i) =>
            s.mark ? (
              <mark key={i} className="rounded bg-mark px-1 text-foreground">{s.text}</mark>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </p>

        {q.flags.includes("Refers to a picture that is not included") && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <ImageOff className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>This question refers to a picture. The sign image is not included yet — check the official question bank to see it.</span>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setShowEn((v) => !v)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-base hover:bg-muted" aria-expanded={showEn}>
            <Languages className="size-4" aria-hidden /> {showEn ? "Hide translation" : "Translate"}
          </button>
          {vocab.length > 0 && (
            <button onClick={() => setShowVocab((v) => !v)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-base hover:bg-muted" aria-expanded={showVocab}>
              <BookOpen className="size-4" aria-hidden /> {showVocab ? "Hide vocabulary" : "Explain vocabulary"}
            </button>
          )}
        </div>
        {showEn && <p className="mt-4 border-l-4 border-accent pl-4 text-lg">{q.english}</p>}
        {showVocab && (
          <dl className="mt-4 grid gap-2 sm:grid-cols-2">
            {vocab.map((v) => (
              <div key={v!.id} className="rounded-lg bg-muted px-3 py-2">
                <dt lang="it" className="font-bold">{v!.it}</dt>
                <dd className="text-muted-foreground">{v!.en}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map((val) => {
          const chosen = answered === val;
          const isRight = revealed && q.answer === val;
          return (
            <button
              key={String(val)}
              disabled={answered !== null}
              onClick={() => onAnswer(val === q.answer)}
              data-choice={val ? "vero" : "falso"}
              className={cn(
                "min-h-20 rounded-xl border-2 text-2xl font-bold tracking-wide transition-colors",
                answered === null && "border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground",
                answered !== null && !isRight && !chosen && "border-border bg-card text-muted-foreground",
                isRight && "border-success bg-success text-success-foreground",
                revealed && chosen && !isRight && "border-destructive bg-destructive text-destructive-foreground",
                hideFeedback && chosen && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {val ? "VERO" : "FALSO"}
            </button>
          );
        })}
      </div>

      {revealed && (
        <section aria-live="polite" className="space-y-4">
          <div className={cn("flex items-center gap-3 rounded-xl p-4 text-lg font-bold", correct ? "bg-success-soft text-success" : "bg-accent-soft text-destructive")}>
            {correct ? <Check className="size-6" aria-hidden /> : <X className="size-6" aria-hidden />}
            {correct ? "Correct" : "Not quite"} — the answer is {q.answer ? "VERO (true)" : "FALSO (false)"}
          </div>

          <div className="space-y-4 rounded-xl border bg-card p-5">
            <Block title="Explanation" tag="From the study guide">{q.explanation}</Block>
            {q.enrichment && (
              <>
                <Block title="The trap" tag="Study note">
                  <span lang="it" className="rounded bg-mark px-1 font-bold">{q.enrichment.trapWord}</span>
                  {trap && <> — <Link to="/traps/$trapId" params={{ trapId: trap.id }} className="underline">Trap {trap.number}: {trap.title}</Link></>}
                </Block>
                <Block title="The rule" tag="Study note">{q.enrichment.ruleNote}</Block>
              </>
            )}
            <p className="text-sm text-muted-foreground">
              {q.errorRate !== null ? <>Reported error rate: <b>{q.errorRate}%</b> of learners (learner data from quiz-patente.com, not official). </> : "Error rate not available. "}
              Statement and answer verified against the official Conseguimento A-B italiano PDF (210926).
            </p>
          </div>

          <button onClick={() => toggleSaved(q.id)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-base hover:bg-muted" aria-pressed={saved}>
            {saved ? <BookmarkCheck className="size-5 text-accent" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}
            {saved ? "Saved for review" : "Save for review"}
          </button>
        </section>
      )}
    </article>
  );
}

function Block({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-baseline gap-2 font-sans text-base font-bold">
        {title} <span className="text-xs font-normal uppercase tracking-wide text-muted-foreground">{tag}</span>
      </h3>
      <p className="mt-1 text-lg">{children}</p>
    </div>
  );
}
