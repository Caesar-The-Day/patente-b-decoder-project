import { ALL_QUESTIONS } from "@/content/questions";
import { TRAPS } from "@/content/traps";
import { weakIds, type Progress } from "./progress";

export function computeStats(p: Progress) {
  const entries = Object.entries(p.answers);
  const attempts = entries.reduce((s, [, a]) => s + a.attempts, 0);
  const correct = entries.reduce((s, [, a]) => s + a.correct, 0);
  const byTrap = TRAPS.map((t) => {
    const ids = new Set(ALL_QUESTIONS.filter((q) => q.trap === t.id).map((q) => q.id));
    const rel = entries.filter(([id]) => ids.has(id));
    const at = rel.reduce((s, [, a]) => s + a.attempts, 0);
    const co = rel.reduce((s, [, a]) => s + a.correct, 0);
    return { trap: t, attempts: at, accuracy: at ? Math.round((co / at) * 100) : null };
  });
  return {
    questionsAttempted: entries.length,
    attempts,
    accuracy: attempts ? Math.round((correct / attempts) * 100) : null,
    byTrap,
    needsReview: weakIds(p).length,
    vocabLearned: p.learnedVocab.length,
    sessions: p.sessionsCompleted,
  };
}
