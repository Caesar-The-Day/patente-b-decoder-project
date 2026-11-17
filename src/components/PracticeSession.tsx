import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getQuestion } from "@/content/questions";
import { completeSession, recordAnswer, setResume, type Resume } from "@/lib/progress";
import { QuestionCard } from "./QuestionCard";

export const EXAM_QUESTIONS = 30;
export const EXAM_MINUTES = 20;
export const EXAM_MAX_ERRORS = 3;

type Props = {
  initial: Resume;
  exam?: boolean;
  lessonId?: string | undefined;
  title: string;
};

export function PracticeSession({ initial, exam, lessonId, title }: Props) {
  const [ids] = useState(initial.ids);
  const [index, setIndex] = useState(initial.index);
  const [results, setResults] = useState<Record<string, boolean>>(initial.results);
  const [choices, setChoices] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [now, setNow] = useState(Date.now());
  const questions = useMemo(() => ids.map(getQuestion).filter((q) => !!q), [ids]);
  const q = questions[index];
  const deadline = initial.startedAt + EXAM_MINUTES * 60_000;

  useEffect(() => {
    if (!exam || done) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [exam, done]);
  useEffect(() => { if (exam && now >= deadline && !done) finish(); });

  function finish() {
    setDone(true);
    completeSession(lessonId);
  }

  function answer(correct: boolean) {
    if (!q) return;
    setChoices((c) => ({ ...c, [q.id]: correct ? q.answer : !q.answer }));
    const next = { ...results, [q.id]: correct };
    setResults(next);
    recordAnswer(q.id, correct);
    if (!lessonId) setResume({ ...initial, index: index + 1, results: next });
    if (exam) setTimeout(() => go(), 250);
  }
  function go() {
    if (index + 1 >= questions.length) finish();
    else setIndex((i) => i + 1);
    window.scrollTo({ top: 0 });
  }

  if (questions.length === 0) {
    return <p className="text-lg">No questions here yet. <Link to="/practice" className="underline">Choose another mode</Link>.</p>;
  }

  if (done) {
    const answeredCount = Object.keys(results).length;
    const right = Object.values(results).filter(Boolean).length;
    const errors = questions.length - right;
    return (
      <div className="space-y-6">
        <h1 className="text-3xl">{exam ? "Simulation finished" : "Session complete"}</h1>
        <p className="text-xl">You got <b>{right}</b> of <b>{questions.length}</b> right{answeredCount < questions.length && ` (${questions.length - answeredCount} unanswered)`}.</p>
        {exam && (
          <p className="rounded-xl bg-muted p-4 text-lg">
            {errors <= EXAM_MAX_ERRORS ? "Within" : "Over"} the official limit of {EXAM_MAX_ERRORS} errors. Remember: this simulation only uses the questions in this app, which are among the hardest — not the full ministry bank.
          </p>
        )}
        <ul className="space-y-2">
          {questions.map((x) => (
            <li key={x.id} className="flex gap-3 rounded-lg border bg-card p-3">
              <span className={results[x.id] ? "font-bold text-success" : "font-bold text-destructive"}>{results[x.id] ? "✓" : "✗"}</span>
              <span lang="it" className="flex-1">{x.italian} <span className="text-muted-foreground">— {x.answer ? "VERO" : "FALSO"}</span></span>
              <Link to="/practice" search={{ mode: "single", id: x.id }} className="shrink-0 underline">Review</Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          {lessonId && <Link to="/traps/$trapId" params={{ trapId: lessonId }} className="rounded-lg border px-5 py-3 text-lg">Back to lesson</Link>}
          <Link to="/" className="rounded-lg bg-primary px-5 py-3 text-lg text-primary-foreground">Back to home</Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, deadline - now);
  const answered = q ? (choices[q.id] ?? null) : null;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-sans text-lg font-bold">{title}</h1>
        <div className="flex items-center gap-4 text-base text-muted-foreground">
          {exam && <span aria-live="off" className="font-bold text-foreground">{Math.floor(remaining / 60000)}:{String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}</span>}
          <span>Question {index + 1} of {questions.length}</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={index + 1} aria-valuemax={questions.length}>
        <div className="h-full bg-success" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>
      {q && <QuestionCard key={q.id} question={q} answered={answered} onAnswer={answer} hideFeedback={!!exam} />}
      {answered !== null && !exam && (
        <button onClick={go} className="min-h-14 w-full rounded-xl bg-primary text-xl font-bold text-primary-foreground">
          {index + 1 >= questions.length ? "See results" : "Next question"}
        </button>
      )}
    </div>
  );
}
