# Content

- `source/guide-100.json` — the extracted guide (Gregg Poss). Do not edit answers here.
- `enrichment.ts` — AI-assisted study notes keyed by `guide_rank`. A question becomes part of the
  default study set once it has an entry here.
- `vocabulary.ts`, `traps.ts` — flashcards and lessons.

## Importing more questions
1. Append validated records to `source/guide-100.json` using the same fields
   (`official_question_id` stays `null` unless you have the real code; add `illustration_ref`
   only with a licensed image registered in `illustrations.ts`).
2. Add an entry to `ENRICHMENT` for each new `guide_rank` (highlights must be exact substrings).
3. Run `bunx vitest run` — the content test checks highlights, vocab ids and answers.
