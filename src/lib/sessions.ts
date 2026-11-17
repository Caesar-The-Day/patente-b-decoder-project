import { getPool, type Question } from "@/content/questions";
import type { TrapId } from "@/content/traps";
import { shuffle, weakIds, type Progress, type Resume } from "./progress";

export type Mode = "quick" | "missed" | "weak" | "exam" | "single" | "trap";

export function byDifficulty(qs: Question[]) {
  return [...qs].sort((a, b) => (b.errorRate ?? -1) - (a.errorRate ?? -1) || a.guideRank - b.guideRank);
}

export function buildSession(mode: Mode, p: Progress, opts: { id?: string | undefined; trap?: TrapId | undefined; examSize?: number } = {}): Resume {
  const pool = getPool(p.includePending);
  let ids: string[] = [];
  if (mode === "quick") ids = shuffle(pool).slice(0, 10).map((q) => q.id);
  else if (mode === "missed") ids = byDifficulty(pool).map((q) => q.id);
  else if (mode === "weak") ids = weakIds(p);
  else if (mode === "exam") ids = shuffle(pool).slice(0, opts.examSize ?? 30).map((q) => q.id);
  else if (mode === "single" && opts.id) ids = [opts.id];
  else if (mode === "trap" && opts.trap) ids = trapPracticeIds(opts.trap, p.includePending);
  return { mode, trap: opts.trap, ids, index: 0, results: {}, startedAt: Date.now() };
}

/** Five practice questions for a trap lesson: active set first, then source-only records from the guide. */
export function trapPracticeIds(trap: TrapId, includePending = true) {
  const all = getPool(true).filter((q) => q.trap === trap);
  const active = all.filter((q) => q.enrichment);
  const rest = includePending || active.length < 5 ? all.filter((q) => !q.enrichment) : [];
  return [...active, ...rest].slice(0, 5).map((q) => q.id);
}
