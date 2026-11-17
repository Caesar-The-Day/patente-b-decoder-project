export type TrapId = "negations" | "absolutes" | "exceptions" | "numbers" | "swapped";

/** Maps the guide's trap_category strings to lesson ids. "Review" stays unmapped. */
export const TRAP_CATEGORY_MAP: Record<string, TrapId> = {
  Negations: "negations",
  "Absolutes and limiters": "absolutes",
  "Exceptions and conditions": "exceptions",
  "Numbers, units, and thresholds": "numbers",
  "Swapped details and look-alike terms": "swapped",
};

export type Trap = {
  id: TrapId;
  number: number;
  title: string;
  italianWords: string[];
  summary: string;
  body: string[];
  tip: string;
};

export const TRAPS: Trap[] = [
  {
    id: "negations", number: 1, title: "Negations and negative verbs",
    italianWords: ["non", "senza", "vieta", "vietato", "divieto"],
    summary: "A single 'non' or a verb like 'vieta' flips the whole statement.",
    body: [
      "Italian exam statements often hide the negation inside a verb rather than using 'not'. 'Vieta' means 'forbids', 'è vietato' means 'is forbidden' — these are negations even though there is no 'non'.",
      "'Senza' (without) works the same way: it removes something from the situation, and the rule may change completely.",
    ],
    tip: "Before answering, find every negative word and restate the sentence in positive English.",
  },
  {
    id: "absolutes", number: 2, title: "Absolutes and limiters",
    italianWords: ["sempre", "solo", "soli", "anche", "tutti", "sia … sia"],
    summary: "'Only', 'always', 'even', 'all' — small words that make a true rule false.",
    body: [
      "A statement can describe the right rule and still be false because it adds 'solo' (only) or 'sempre' (always). Rules rarely apply only to one group, or always without exception.",
      "'Anche' (also/even) and 'sia … sia' (both … and) widen a rule beyond what the law says.",
    ],
    tip: "Cover the limiter with your finger. Is the remaining sentence true? Then ask whether the limiter is really justified.",
  },
  {
    id: "exceptions", number: 3, title: "Exceptions and conditions",
    italianWords: ["se", "salvo", "purché", "tranne", "quando"],
    summary: "'If', 'unless', 'provided that' — the rule only holds under a condition.",
    body: [
      "Conditions narrow a rule. 'Salvo diversa segnalazione' means 'unless signs say otherwise' — a common phrase that is usually correct and should not distract you from the main claim.",
      "Read the condition and ask: is the main claim correct in that situation?",
    ],
    tip: "Split the sentence into the rule and the condition, and check each part.",
  },
  {
    id: "numbers", number: 4, title: "Numbers, units and thresholds",
    italianWords: ["almeno", "superiore a", "inferiore a", "non oltre", "metri", "tonnellate"],
    summary: "A wrong number or a 'more than' versus 'at least' makes it false.",
    body: [
      "The exam reuses the same numbers (3,5 t, 150 m, 50 km/h) in slightly wrong positions. Learn the threshold and the direction: 'superiore a' is 'over', 'almeno' is 'at least'.",
      "Italian uses a comma as decimal separator: 3,5 tonnellate = 3.5 tonnes.",
    ],
    tip: "Ask: is it the right number, the right unit, and the right direction (over / under)?",
  },
  {
    id: "swapped", number: 5, title: "Confused terms and swapped details",
    italianWords: ["ciclomotore / motociclo", "che precede / che segue", "revoca / sospensione"],
    summary: "Look-alike words, or details swapped between two parties.",
    body: [
      "This is the biggest trap in the guide's 100 most-missed questions. The statement uses a similar but wrong word (moped instead of motorcycle), or swaps who does what (the vehicle in front instead of the one behind).",
      "Look-alike signs are part of this trap: 'divieto di transito' and 'senso vietato' look similar but mean different things.",
    ],
    tip: "Identify who the rule applies to and where the sign stands. Swap them mentally and see which version is correct.",
  },
];
