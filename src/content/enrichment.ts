/**
 * Study-aid enrichment layered on top of the guide's source records, keyed by guide_rank.
 * Everything here is AI-assisted study material — NOT official ministry content.
 * - highlights: exact substrings of the Italian statement to emphasise.
 * - trapWord: the word/phrase responsible for the trap.
 * - ruleNote: short plain-English summary of the rule, derived from the guide's explanation.
 * - vocab: ids from src/content/vocabulary.ts.
 * To activate another question, add an entry here (see docs in src/content/README.md).
 */
export type Enrichment = {
  highlights: string[];
  trapWord: string;
  ruleNote: string;
  vocab: string[];
};

export const ENRICHMENT: Record<number, Enrichment> = {
  1: { highlights: ["che precede", "quello che lo segue", "almeno 70 metri"], trapWord: "che precede / che lo segue", ruleNote: "This distance sign applies to the vehicle behind: it must keep at least the shown distance from the vehicle ahead. The question swaps who must keep the gap.", vocab: ["precedere", "seguire", "distanziare", "almeno", "segnale-raffigurato"] },
  2: { highlights: ["vieta", "ciclomotori"], trapWord: "ciclomotori", ruleNote: "Ciclomotore (moped) and motociclo (motorcycle) are different vehicle classes. The sign concerns motorcycles, so a statement naming mopeds is false.", vocab: ["vietare", "ciclomotore", "motociclo", "transito"] },
  3: { highlights: ["obbligano", "anche se", "discontinue"], trapWord: "anche se", ruleNote: "According to the guide, with dashed (discontinuous) lane lines you may still change lane, so the arrows do not impose the direction 'even if' the lines are dashed.", vocab: ["anche-se", "obbligare", "discontinua", "corsia"] },
  4: { highlights: ["consente", "autobus", "autotreno"], trapWord: "autobus", ruleNote: "The overtaking ban in this sign targets goods vehicles over 3,5 t. A bus carries people, not goods, so it is not covered.", vocab: ["consentire", "autobus", "autotreno", "massa-a-pieno-carico", "sorpassare"] },
  5: { highlights: ["DIVIETO DI TRANSITO"], trapWord: "DIVIETO DI TRANSITO", ruleNote: "Two signs look alike: 'divieto di transito' (no vehicles in either direction) and 'senso vietato' (no entry). The pictured sign is no entry.", vocab: ["divieto-di-transito", "senso-vietato"] },
  6: { highlights: ["doppie stringhe", "scalzamenti"], trapWord: "doppie stringhe", ruleNote: "The guide marks this as an invented technical feature: motorcycle boots are not described as having double laces for this purpose.", vocab: ["stivali", "scalzamento"] },
  7: { highlights: ["servosterzo"], trapWord: "servosterzo", ruleNote: "Servosterzo means power steering. It is part of the steering system and does not cause weak or unbalanced braking.", vocab: ["servosterzo", "frenatura", "squilibrata"] },
  8: { highlights: ["due passaggi a livello consecutivi", "meno di 150 metri"], trapWord: "due passaggi a livello consecutivi", ruleNote: "The double cross indicates a level crossing with two or more tracks — not two separate crossings close together.", vocab: ["passaggio-a-livello", "binario", "preannunciare"] },
  9: { highlights: ["consentito", "autocaravan", "superiore a 3,5 tonnellate"], trapWord: "autocaravan", ruleNote: "The ban applies to goods vehicles. A motorhome (autocaravan) is not a goods vehicle, so it may pass.", vocab: ["autocaravan", "massa-a-pieno-carico", "superiore", "consentire"] },
  10: { highlights: ["tra le sole autovetture"], trapWord: "sole", ruleNote: "The end-of-no-overtaking sign ends the ban for all vehicles, not 'only' cars.", vocab: ["solo", "autovettura", "sorpasso"] },
  11: { highlights: ["sede tranviaria", "un solo binario"], trapWord: "sede tranviaria", ruleNote: "The St Andrew's cross stands at a railway level crossing. It is not a tram-track warning.", vocab: ["sede-tranviaria", "binario", "preannunciare"] },
  12: { highlights: ["in corrispondenza di"], trapWord: "in corrispondenza di", ruleNote: "Danger triangles are placed before the hazard. 'In corrispondenza di' means 'right at', so the statement places the sign in the wrong spot.", vocab: ["in-corrispondenza-di", "attraversamento-pedonale"] },
  13: { highlights: ["da sinistra", "salvo diversa segnalazione"], trapWord: "da sinistra", ruleNote: "When turning left on a two-way road you give way to oncoming traffic and to traffic from the right — not traffic from the left.", vocab: ["dare-precedenza", "svoltare", "doppio-senso", "salvo", "carreggiata"] },
  14: { highlights: ["striscia bianca trasversale", "DARE PRECEDENZA"], trapWord: "DARE PRECEDENZA", ruleNote: "A solid transverse white line goes with STOP. The give-way line is a dashed line.", vocab: ["striscia-trasversale", "dare-precedenza", "continua"] },
  15: { highlights: ["consentito", "regolate da agenti del traffico"], trapWord: "regolate da agenti del traffico", ruleNote: "The guide reports this as true as stated: overtaking is permitted at intersections controlled by traffic officers.", vocab: ["sorpasso", "intersezione", "agente-del-traffico", "consentire"] },
  16: { highlights: ["sia da destra sia da sinistra", "obbligatorio"], trapWord: "sia … sia", ruleNote: "The solid transverse line marks where to stop. The statement adds an over-broad 'both from the right and from the left' rule.", vocab: ["sia-sia", "striscia-trasversale", "obbligatorio", "continua"] },
  17: { highlights: ["ai soli veicoli per trasporto merci"], trapWord: "soli", ruleNote: "According to the guide, this sign bans every vehicle over 7 t, not 'only' goods vehicles.", vocab: ["solo", "trasporto-merci", "superiore", "vietare"] },
  18: { highlights: ["consentito", "carrello-appendice"], trapWord: "carrello-appendice", ruleNote: "A carrello-appendice is a small luggage trailer treated as part of the towing vehicle. The guide states it is not a trailer under this ban.", vocab: ["carrello-appendice", "trainare", "consentire"] },
  19: { highlights: ["quella di sinistra per il sorpasso"], trapWord: "carreggiata di sinistra", ruleNote: "On a dual carriageway the left carriageway carries oncoming traffic. You overtake in the left lane of your own carriageway.", vocab: ["carreggiata", "sorpasso", "corsia"] },
  20: { highlights: ["revoca", "sostituita", "stato estero"], trapWord: "revoca", ruleNote: "Revoca is the permanent withdrawal of a licence (different from sospensione, a temporary suspension). The guide reports this statement as true.", vocab: ["revoca", "sospensione", "patente"] },
};
