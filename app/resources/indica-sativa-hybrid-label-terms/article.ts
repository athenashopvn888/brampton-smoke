export const ARTICLE_PATH = "/resources/indica-sativa-hybrid-label-terms";
export const CANONICAL_URL = "https://www.bramptonsmokecannabis.com" + ARTICLE_PATH;

/** Approved article body only. */
export const ARTICLE_MARKDOWN = `# Indica Weed Brampton Guide: What Indica, Sativa and Hybrid Mean on a Label

Last checked: October 21, 2026

Three words run the whole flower aisle: indica, sativa, hybrid. They sit on menu cards, they get printed on packs, and they start plenty of counter debates. If you searched **indica weed Brampton**, here's the tidy, sourced version of what those words actually are, from Brampton Smoke Cannabis on Falby Rd.

Adults 19+ only. One promise up front: this guide covers what the words mean, where they come from and what the law requires on a label. It doesn't rank anything, name any strain or tell you what any type will do for you. Nobody can honestly back that up from a label word, so we don't try.

## Where the three words come from

Start with the botany, because the Canadian Food Inspection Agency has already done the homework. Its biology document on *Cannabis sativa L.* lists *Cannabis indica* Lam. as a synonym of *Cannabis sativa*, and says most botanical treatments describe cannabis as one highly diverse species with forms inside it.

Then it gets blunt:

- "The terms 'sativa' and 'indica' have been applied inconsistently and haphazardly."
- The shop-floor names date to the 1980s. In the CFIA's account, the plants nicknamed "sativa" were botanically *C. sativa* subsp. *indica* var. *indica*, and the ones nicknamed "indica" were *C. sativa* subsp. *indica* var. *afghanica*.
- "Extensive hybridization of these varieties has largely eliminated any distinction between modern strains."
- Strains often get labelled sativa or indica based on their THC:CBD ratios, which the CFIA says "does not reflect their taxonomic classification or genetic background."

So "hybrid" isn't a third box beside two clean ones. By the CFIA's reading, crossbreeding has blurred nearly everything on a modern shelf.

## Indica vs sativa vs hybrid: the side-by-side

| Label word | What it is | What it isn't |
|---|---|---|
| **Indica** | A naming convention from the 1980s, applied inconsistently | A legal class, a test result or a guaranteed lineage |
| **Sativa** | The same convention, also applied inconsistently | A legal class, a test result or a guaranteed lineage |
| **Hybrid** | A word for crossed plants, which the CFIA says describes most modern strains | A measured blend or a regulated ratio |

One more CFIA detail worth knowing: strain names aren't accepted as cultivars under the International Code of Nomenclature for Cultivated Plants. A name on a pack is a trade name, not a botanical registration.

## What the law actually requires on the pack

Here's the part most people get backwards. Canadian law doesn't make anyone print indica, sativa or hybrid at all.

The Cannabis Act's Schedule 4 sets the legal classes, and "dried cannabis" is the one your flower falls under. Section 123 of the Cannabis Regulations lists what every label must carry, including the class of cannabis, the brand name, the lot number, recommended storage conditions, the packaging date, "KEEP OUT OF REACH OF CHILDREN," a health warning and the licence holder's contact details. For dried flower not in discrete units, Health Canada's labelling guide says the front shows "Total THC" and "Total CBD" in mg/g.

The type word lives somewhere else entirely. Health Canada's packaging and labelling guide lists "strain name" among optional information a producer may add. Optional information has rules of its own:

1. It can't be false, misleading or deceptive.
2. It goes in regular type, no bigger than the mandatory information.
3. It never replaces any required line.

## Indica weed Brampton menus: how to read the card

On a menu, the type word often sits beside the product name like a headline. Treat it as a tag, not a spec. A tidy reading order:

1. **Class first.** Confirm it's dried cannabis, so you know which rules apply.
2. **Total THC and Total CBD second.** These are the regulated numbers printed on the pack.
3. **The type word last.** It's descriptive and optional, and the CFIA says it's used inconsistently.
4. **Packaging date.** Section 123 requires it, and the printed date can sit within seven days of the actual packaging day.

If a pack says one type and a menu card says another, ask. The pack's mandatory lines are what the law stands behind.

## Quick answers

**Is indica a legal category in Canada?** No. Dried cannabis is the legal class. Indica, sativa and hybrid are optional descriptors.

**Does every pack have to say indica, sativa or hybrid?** No. Health Canada lists strain name as optional information.

**Can the type word tell me what's in the pack?** No. A type word isn't a measurement. Total THC and Total CBD are the measured numbers on the label.

## Bring your indica weed Brampton questions to Falby Rd

Brampton Smoke Cannabis is on Falby Rd in Brampton. Bring ID showing you're 19 or older, bring your label questions, and we'll walk the pack with you, line by line. Indica vs sativa vs hybrid makes for a lively counter debate, and the label is where it gets settled. That's the honest answer to every indica weed Brampton search. Plan your stop on the [visit page](/visit).
`;

/** First sentence of the intro, used as the meta description. */
export function metaDescription(intro: string): string {
  const sentence = intro.match(/^[^.!?]+[.!?]/)?.[0] ?? intro;
  if (sentence.length > 155) {
    throw new Error("meta description exceeds 155 characters");
  }
  return sentence;
}
