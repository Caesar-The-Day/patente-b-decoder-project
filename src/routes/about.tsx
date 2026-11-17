import { createFileRoute } from "@tanstack/react-router";
import { DATASET } from "@/content/questions";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sources & attribution — Patente B Decoder" },
      { name: "description", content: "Where the questions, answers and error rates in Patente B Decoder come from." },
      { property: "og:title", content: "Sources & attribution" },
      { property: "og:description", content: "Attribution and disclaimer for Patente B Decoder." },
    ],
  }),
  component: About,
});

function About() {
  const a = DATASET.attribution;
  return (
    <div className="space-y-6 text-lg">
      <h1 className="text-4xl">Sources & attribution</h1>
      <p className="rounded-xl bg-accent-soft p-4"><b>Disclaimer:</b> Patente B Decoder is an independent study aid. It is not an official Italian government product and is not affiliated with the Ministero delle Infrastrutture e dei Trasporti.</p>
      <dl className="space-y-4">
        <div><dt className="font-bold">Study guide</dt><dd>“{DATASET.dataset_title}” by {a.study_guide_author}, used with permission.</dd></div>
        <div><dt className="font-bold">Questions</dt><dd>{a.question_source}</dd></div>
        <div><dt className="font-bold">Illustrations</dt><dd>{a.illustration_source}</dd></div>
        <div><dt className="font-bold">Error rates</dt><dd>{a.error_rate_source} These are learner data, not official statistics.</dd></div>
      </dl>
      <h2 className="text-2xl">What is verified, and what isn't</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>All 100 Italian statements, answers and official ministry question codes were checked against the uploaded Conseguimento A-B italiano PDF (210926).</li>
        <li>Guide numbers (#1–#100) are the guide's ranking, not official codes. Translations and explanations remain guide-sourced.</li>
        <li>The 66 illustrated questions show the official image extracted from their matching ministry question row.</li>
        <li>Items marked “Study note”, vocabulary meanings and lesson texts were written with AI help to explain the guide's content. They are not official.</li>
      </ul>
    </div>
  );
}
