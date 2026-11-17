import { describe, expect, it } from "vitest";
import { ACTIVE_QUESTIONS, ALL_QUESTIONS } from "@/content/questions";
import { getIllustration } from "@/content/illustrations";
import { VOCABULARY } from "@/content/vocabulary";
import { applyAnswer, EMPTY, weakIds } from "@/lib/progress";
import { highlight } from "@/lib/highlight";

describe("content", () => {
  it("loads all 100 guide records with 20 active", () => {
    expect(ALL_QUESTIONS).toHaveLength(100);
    expect(ACTIVE_QUESTIONS).toHaveLength(20);
  });
  it("uses the verified ministry codes, including the disambiguated duplicates", () => {
    expect(ALL_QUESTIONS.every((q) => /^\d{5}$/.test(q.officialId ?? ""))).toBe(true);
    expect(ALL_QUESTIONS.find((q) => q.guideRank === 1)!.officialId).toBe("19587");
    expect(ALL_QUESTIONS.find((q) => q.guideRank === 2)!.officialId).toBe("19688");
    expect(ALL_QUESTIONS.find((q) => q.guideRank === 29)!.officialId).toBe("18911");
  });
  it("resolves all 66 official illustrations and leaves 34 text-only questions without one", () => {
    const illustrated = ALL_QUESTIONS.filter((q) => q.illustrationRef);
    expect(illustrated).toHaveLength(66);
    expect(ALL_QUESTIONS.length - illustrated.length).toBe(34);
    for (const q of illustrated) expect(getIllustration(q.illustrationRef), q.id).toMatch(/^\/__l5e\/assets-v1\//);
  });
  it("keeps guide answers (rank 1 false, rank 4 true)", () => {
    expect(ALL_QUESTIONS.find((q) => q.guideRank === 1)!.answer).toBe(false);
    expect(ALL_QUESTIONS.find((q) => q.guideRank === 4)!.answer).toBe(true);
  });
  it("highlights are exact substrings and vocab ids exist", () => {
    for (const q of ACTIVE_QUESTIONS) {
      for (const h of q.enrichment!.highlights) expect(q.italian.toLowerCase(), `#${q.guideRank} ${h}`).toContain(h.toLowerCase());
      for (const v of q.enrichment!.vocab) expect(VOCABULARY.some((t) => t.id === v), v).toBe(true);
    }
  });
});

describe("progress", () => {
  it("a wrong answer puts the question in weak spots, a later right answer removes it", () => {
    let p = applyAnswer(EMPTY, "g1", false);
    expect(weakIds(p)).toEqual(["g1"]);
    p = applyAnswer(p, "g1", true);
    expect(weakIds(p)).toEqual([]);
    expect(p.answers["g1"]).toMatchObject({ attempts: 2, correct: 1 });
  });
  it("highlight marks phrases", () => {
    expect(highlight("vieta il transito", ["vieta"])).toEqual([{ text: "vieta", mark: true }, { text: " il transito", mark: false }]);
  });
});
