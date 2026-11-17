import { useSyncExternalStore } from "react";

export type AnswerStat = { attempts: number; correct: number; lastCorrect: boolean; lastAt: number };
export type Resume = { mode: string; trap?: string | undefined; ids: string[]; index: number; results: Record<string, boolean>; startedAt: number };
export type Progress = {
  version: 1;
  answers: Record<string, AnswerStat>;
  saved: string[];
  learnedVocab: string[];
  sessionsCompleted: number;
  completedLessons: string[];
  resume: Resume | null;
  includePending: boolean;
};

const KEY = "patente-b-decoder:v1";
export const EMPTY: Progress = {
  version: 1, answers: {}, saved: [], learnedVocab: [], sessionsCompleted: 0,
  completedLessons: [], resume: null, includePending: false,
};

let state: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...JSON.parse(raw) };
  } catch { /* ignore corrupt storage */ }
}

function set(next: Progress) {
  state = next;
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota */ }
  listeners.forEach((l) => l());
}

export function update(fn: (p: Progress) => Progress) { load(); set(fn(state)); }

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => { load(); listeners.add(cb); cb(); return () => listeners.delete(cb); },
    () => { load(); return state; },
    () => EMPTY,
  );
}

/** Pure reducer — exported for tests. */
export function applyAnswer(p: Progress, id: string, correct: boolean, now = Date.now()): Progress {
  const prev = p.answers[id] ?? { attempts: 0, correct: 0, lastCorrect: false, lastAt: 0 };
  return { ...p, answers: { ...p.answers, [id]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0), lastCorrect: correct, lastAt: now } } };
}
export const recordAnswer = (id: string, correct: boolean) => update((p) => applyAnswer(p, id, correct));
export const toggleSaved = (id: string) => update((p) => ({ ...p, saved: p.saved.includes(id) ? p.saved.filter((x) => x !== id) : [...p.saved, id] }));
export const toggleLearned = (id: string) => update((p) => ({ ...p, learnedVocab: p.learnedVocab.includes(id) ? p.learnedVocab.filter((x) => x !== id) : [...p.learnedVocab, id] }));
export const setResume = (r: Resume | null) => update((p) => ({ ...p, resume: r }));
export const completeSession = (lessonId?: string) => update((p) => ({
  ...p, resume: null, sessionsCompleted: p.sessionsCompleted + 1,
  completedLessons: lessonId && !p.completedLessons.includes(lessonId) ? [...p.completedLessons, lessonId] : p.completedLessons,
}));
export const setIncludePending = (v: boolean) => update((p) => ({ ...p, includePending: v }));
export const resetProgress = () => update(() => EMPTY);
export function exportProgress() {
  load();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `patente-b-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/** Questions answered wrong last time, or saved. */
export function weakIds(p: Progress) {
  const wrong = Object.entries(p.answers).filter(([, s]) => !s.lastCorrect).map(([id]) => id);
  return Array.from(new Set([...wrong, ...p.saved]));
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j]!, a[i]!]; }
  return a;
}
