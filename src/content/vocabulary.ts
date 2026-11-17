/**
 * Vocabulary flashcards. English glosses and categories are AI-assisted study notes.
 * `example` is quoted from a guide question (rank given) where possible.
 */
export type VocabCategory =
  | "signs" | "vehicles" | "rightofway" | "parking" | "limits" | "mechanical" | "legal" | "grammar";

export const VOCAB_CATEGORIES: { id: VocabCategory; label: string; blurb: string }[] = [
  { id: "signs", label: "Road signs & markings", blurb: "Signs, lines and their names" },
  { id: "vehicles", label: "Vehicles & classes", blurb: "Who a rule applies to" },
  { id: "rightofway", label: "Right of way & junctions", blurb: "Giving way, turning, overtaking" },
  { id: "parking", label: "Parking & stopping", blurb: "Sosta, fermata and related terms" },
  { id: "limits", label: "Speed, distance & weight", blurb: "Numbers and thresholds" },
  { id: "mechanical", label: "Mechanical & safety", blurb: "Parts, equipment, protection" },
  { id: "legal", label: "Legal obligations", blurb: "Licences, bans, permissions" },
  { id: "grammar", label: "Misleading expressions", blurb: "Small words that flip an answer" },
];

export type VocabTerm = {
  id: string;
  it: string;
  en: string;
  category: VocabCategory;
  example?: { it: string; rank: number };
  note?: string;
};

export const VOCABULARY: VocabTerm[] = [
  { id: "segnale-raffigurato", it: "il segnale raffigurato", en: "the sign shown (in the picture)", category: "signs", example: { it: "Il segnale raffigurato vieta il transito ai ciclomotori", rank: 2 } },
  { id: "divieto-di-transito", it: "divieto di transito", en: "no vehicles (in either direction)", category: "signs", example: { it: "Il segnale raffigurato è un DIVIETO DI TRANSITO", rank: 5 } },
  { id: "senso-vietato", it: "senso vietato", en: "no entry (one direction only)", category: "signs", note: "Often confused with divieto di transito." },
  { id: "striscia-trasversale", it: "striscia trasversale", en: "transverse line (across the lane)", category: "signs", example: { it: "La striscia bianca trasversale in figura viene abbinata con il segnale di DARE PRECEDENZA", rank: 14 } },
  { id: "continua", it: "continua", en: "solid / continuous (line)", category: "signs" },
  { id: "discontinua", it: "discontinua / tratteggiata", en: "broken / dashed (line)", category: "signs", example: { it: "…anche se le strisce di corsia sono discontinue (tratteggiate)", rank: 3 } },
  { id: "passaggio-a-livello", it: "passaggio a livello", en: "level (railway) crossing", category: "signs", example: { it: "…due passaggi a livello consecutivi…", rank: 8 } },
  { id: "attraversamento-pedonale", it: "attraversamento pedonale", en: "pedestrian crossing", category: "signs", example: { it: "…in corrispondenza di un attraversamento pedonale", rank: 12 } },
  { id: "sede-tranviaria", it: "sede tranviaria", en: "tram track area", category: "signs", example: { it: "…preannuncia una sede tranviaria con un solo binario", rank: 11 } },
  { id: "binario", it: "binario", en: "track (rail)", category: "signs" },
  { id: "preannunciare", it: "preannunciare", en: "to give advance warning of", category: "signs" },
  { id: "ciclomotore", it: "ciclomotore", en: "moped", category: "vehicles", note: "Not the same as motociclo." },
  { id: "motociclo", it: "motociclo", en: "motorcycle", category: "vehicles" },
  { id: "autovettura", it: "autovettura", en: "car (passenger car)", category: "vehicles", example: { it: "…la fine del divieto di sorpasso tra le sole autovetture", rank: 10 } },
  { id: "autobus", it: "autobus", en: "bus", category: "vehicles" },
  { id: "autotreno", it: "autotreno", en: "lorry with trailer (road train)", category: "vehicles" },
  { id: "autocaravan", it: "autocaravan", en: "motorhome", category: "vehicles", example: { it: "…il transito di un'autocaravan di massa a pieno carico superiore a 3,5 tonnellate", rank: 9 } },
  { id: "trasporto-merci", it: "veicolo per trasporto merci", en: "goods vehicle", category: "vehicles" },
  { id: "carrello-appendice", it: "carrello-appendice", en: "small luggage trailer", category: "vehicles", example: { it: "…un autoveicolo trainante un carrello-appendice", rank: 18 } },
  { id: "trainare", it: "trainare", en: "to tow", category: "vehicles" },
  { id: "dare-precedenza", it: "dare la precedenza", en: "to give way / yield", category: "rightofway" },
  { id: "svoltare", it: "svoltare", en: "to turn", category: "rightofway" },
  { id: "intersezione", it: "intersezione", en: "intersection / junction", category: "rightofway" },
  { id: "sorpasso", it: "sorpasso", en: "overtaking", category: "rightofway" },
  { id: "sorpassare", it: "sorpassare", en: "to overtake", category: "rightofway" },
  { id: "carreggiata", it: "carreggiata", en: "carriageway", category: "rightofway", note: "A road may have one or two carriageways; each may have several lanes." },
  { id: "corsia", it: "corsia", en: "lane", category: "rightofway" },
  { id: "doppio-senso", it: "a doppio senso di circolazione", en: "two-way (traffic)", category: "rightofway" },
  { id: "agente-del-traffico", it: "agente del traffico", en: "traffic officer", category: "rightofway" },
  { id: "precedere", it: "precedere / che precede", en: "to go ahead / the vehicle in front", category: "rightofway" },
  { id: "seguire", it: "seguire / che segue", en: "to follow / the vehicle behind", category: "rightofway" },
  { id: "sosta", it: "sosta", en: "parking (leaving the vehicle)", category: "parking", note: "Different from fermata (a brief stop with the driver present)." },
  { id: "fermata", it: "fermata", en: "brief stop", category: "parking" },
  { id: "almeno", it: "almeno", en: "at least", category: "limits" },
  { id: "superiore", it: "superiore a", en: "greater than / over", category: "limits" },
  { id: "massa-a-pieno-carico", it: "massa a pieno carico", en: "maximum laden mass", category: "limits" },
  { id: "distanziare", it: "distanziare", en: "to keep a distance from", category: "limits" },
  { id: "servosterzo", it: "servosterzo", en: "power steering", category: "mechanical" },
  { id: "frenatura", it: "frenatura", en: "braking", category: "mechanical" },
  { id: "squilibrata", it: "squilibrata", en: "unbalanced", category: "mechanical" },
  { id: "stivali", it: "stivali", en: "boots", category: "mechanical" },
  { id: "scalzamento", it: "scalzamento", en: "coming off (of footwear)", category: "mechanical" },
  { id: "patente", it: "patente", en: "driving licence", category: "legal" },
  { id: "revoca", it: "revoca", en: "revocation (permanent withdrawal)", category: "legal" },
  { id: "sospensione", it: "sospensione", en: "suspension (temporary)", category: "legal" },
  { id: "vietare", it: "vietare / vieta", en: "to forbid / it forbids", category: "legal" },
  { id: "consentire", it: "consentire / è consentito", en: "to allow / it is allowed", category: "legal" },
  { id: "obbligare", it: "obbligare / obbliga", en: "to require / it requires", category: "legal" },
  { id: "obbligatorio", it: "obbligatorio", en: "compulsory", category: "legal" },
  { id: "transito", it: "transito", en: "passage / transit", category: "legal" },
  { id: "solo", it: "solo / soli / sole", en: "only", category: "grammar", note: "Limiters often make a statement false." },
  { id: "anche-se", it: "anche se", en: "even if", category: "grammar" },
  { id: "sia-sia", it: "sia … sia", en: "both … and", category: "grammar" },
  { id: "salvo", it: "salvo", en: "except / unless", category: "grammar" },
  { id: "in-corrispondenza-di", it: "in corrispondenza di", en: "right at / at the point of", category: "grammar" },
  { id: "doppio-negazione", it: "non … mai", en: "never", category: "grammar" },
  { id: "senza", it: "senza", en: "without", category: "grammar" },
  { id: "purche", it: "purché", en: "provided that", category: "grammar" },
];
