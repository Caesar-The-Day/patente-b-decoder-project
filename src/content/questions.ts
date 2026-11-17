import raw from "./source/guide-100.json";
import { ENRICHMENT, type Enrichment } from "./enrichment";
import { TRAP_CATEGORY_MAP, type TrapId } from "./traps";

export type SourceRecord = {
  guide_rank: number;
  official_question_id: string | null;
  reported_error_rate: string | null;
  topic: string;
  italian_statement: string;
  english_translation: string;
  official_answer_as_reported: boolean;
  explanation_from_guide: string;
  trap_category: string;
  content_validation_status: string;
  illustration_ref?: string | null;
};

export type Question = {
  id: string; // stable app id, derived from guide rank (NOT an official ministry code)
  guideRank: number;
  officialId: string | null;
  italian: string;
  english: string;
  answer: boolean; // as reported by the guide
  explanation: string; // from the guide
  trapCategoryRaw: string;
  trap: TrapId | null;
  topic: string;
  errorRate: number | null; // learner data, not official
  illustrationRef: string | null;
  validationStatus: string;
  enrichment: Enrichment | null; // AI-assisted study notes
  /** Missing-data flags so gaps are never silently filled. */
  flags: string[];
};

export const DATASET = raw as {
  dataset_title: string;
  attribution: { study_guide_author: string; question_source: string; illustration_source: string; error_rate_source: string; warning: string };
  source_note: string;
  questions: SourceRecord[];
};

function toQuestion(r: SourceRecord): Question {
  const enrichment = ENRICHMENT[r.guide_rank] ?? null;
  const rate = r.reported_error_rate ? parseFloat(r.reported_error_rate) : NaN;
  const flags: string[] = [];
  if (!r.official_question_id) flags.push("Official ministry question code unavailable");
  const illustration = r.illustration_ref ?? null;
  if (!illustration && /raffigurat|in figura/i.test(r.italian_statement)) flags.push("Refers to a picture that is not included");
  if (!enrichment) flags.push("Study notes not yet written");
  return {
    id: `g${r.guide_rank}`,
    guideRank: r.guide_rank,
    officialId: r.official_question_id,
    italian: r.italian_statement,
    english: r.english_translation,
    answer: r.official_answer_as_reported,
    explanation: r.explanation_from_guide,
    trapCategoryRaw: r.trap_category,
    trap: TRAP_CATEGORY_MAP[r.trap_category] ?? null,
    topic: r.topic,
    errorRate: Number.isFinite(rate) ? rate : null,
    illustrationRef: illustration,
    validationStatus: r.content_validation_status,
    enrichment,
    flags,
  };
}

export const ALL_QUESTIONS: Question[] = DATASET.questions.map(toQuestion).sort((a, b) => a.guideRank - b.guideRank);
/** Active study set: records with completed study notes. */
export const ACTIVE_QUESTIONS = ALL_QUESTIONS.filter((q) => q.enrichment);
/** Source-only records waiting for study notes. */
export const PENDING_QUESTIONS = ALL_QUESTIONS.filter((q) => !q.enrichment);

export function getPool(includePending: boolean) {
  return includePending ? ALL_QUESTIONS : ACTIVE_QUESTIONS;
}
export function getQuestion(id: string) {
  return ALL_QUESTIONS.find((q) => q.id === id);
}
