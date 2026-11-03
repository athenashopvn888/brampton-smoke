export const ARTICLE_PATH = "/resources/nug-run-vs-trim-run";
export const CANONICAL_URL = "https://www.bramptonsmokecannabis.com" + ARTICLE_PATH;

/** Approved article body only. */
export const ARTICLE_MARKDOWN = `# Nug Run vs Trim Run: What Goes Into a Concentrate

Last checked: October 27, 2026

Concentrate menus speak their own language, and two phrases trip people up more than most: "nug run" and "trim run." They sound like gym routines. They're actually about the raw material a producer fed into extraction. Brampton Smoke Cannabis, the Falby Road walk-in, sorts out nug run vs trim run for adults 19+ with a tidy table, a glossary and the label checks that actually matter.

## Nug run vs trim run: the definitions

**Nug run.** An extract made from whole buds ("nugs") instead of leftover clippings. The flower that could have been packaged as dried cannabis goes into extraction instead.

**Trim run.** An extract made from trim: the small, resin-coated leaves cut away when buds are shaped after harvest. Trim is a by-product of getting flower ready for packaging.

Some producers run a mix of the two. You may also see "full plant" or "whole plant" on concentrate descriptions, which means more of the harvested plant went in.

## Nug run vs trim run at a glance

| | Nug run | Trim run |
|---|---|---|
| Input | Whole buds | Trimmed sugar leaf and small clippings |
| Source | Flower set aside for extraction | By-product of trimming flower |
| Where the term appears | Producer descriptions | Producer descriptions |
| Label class | Cannabis extract | Cannabis extract |
| Standard label line? | No | No |

Look at the last two rows. Both end up in the same legal product class, and neither phrase is a standard line on a Canadian label.

## Where the inputs come from

Step by step, from harvest to extraction:

1. **Harvest.** The plant is cut.
2. **Trim.** Leaves are removed to shape buds. The resin-dusted clippings are kept.
3. **Sort.** Buds headed for jars go one way. Clippings, and any buds set aside for extraction, go another.
4. **Extract.** Input goes through a solvent-based or solventless process.
5. **Package and label.** The finished product is labelled as a cannabis extract.

"Nug run" and "trim run" describe step 3. They say nothing about which method was used in step 4.

## Related input words

- **Fresh frozen:** plant material frozen right after harvest instead of dried. Feeds "live" products.
- **Cured:** dried-and-cured material.
- **Smalls:** small whole buds. Sometimes used as nug run input.
- **Shake:** loose bits that fall off buds in handling.
- **Full plant:** a mix of buds and leaf from the harvested plant.

Each describes what went in, not how it performed.

## What nug run does NOT promise

Tidy list, no hype:

- **Not a THC number.** The only reliable values are Total THC and Total CBD on the legal label.
- **Not automatically "better."** It's a different input. Quality depends on the whole process.
- **Not a regulated claim.** "Nug run" is producer language.
- **Not a method.** Nug run can go through different extraction processes.

And trim run isn't a defect. Using trim is a normal part of making concentrates.

## Reading the label on any concentrate

Whether a product says nug run, trim run or nothing at all, check:

1. **Product class:** cannabis extract.
2. **Total THC and Total CBD.**
3. **Net weight.**
4. **Packaging date.**
5. **Ingredients,** where listed.
6. **The standard health warning.**

Keep the description and the label separate in your head. The description is the producer's story. The label is the regulated part.

## Storage and handling

Concentrates can soften with heat and stick to everything. Keep them in the original sealed, labelled container, in a cool spot, and well out of reach of children and pets. Use the tool that came with the product, or a clean one, rather than fingers.

## Questions from the Falby Road counter

**Is nug run the same as live?** No. "Nug run" is about which part of the plant went in. "Live" is about whether that material was frozen fresh instead of dried. A product can be one, both or neither.

**Why would a producer use whole buds?** It's a production choice tied to the product they're aiming for. The description tells you the choice; the label tells you the numbers.

**Is there a "best" run?** No ranking from us. Read the label and choose what fits you.

## The bottom line

Nug run vs trim run comes down to input: whole buds or trimmed leaf. Both end up as cannabis extracts on the label, and neither phrase is regulated. Use the words to understand a description, then read the label for the facts.

Heading in? The [Brampton Smoke Cannabis visit page](/visit) has the details, and the [Falby Road weed dispensary page](/weed-dispensary-falby-road) covers the area. Brampton Smoke Cannabis is for adults 19 and over. Bring government-issued photo ID.`;

/** First sentence of the intro, used as the meta description. */
export function metaDescription(intro: string): string {
  const sentence = intro.match(/^[^.!?]+[.!?]"?/)?.[0] ?? intro;
  if (sentence.length > 155) {
    throw new Error("meta description exceeds 155 characters");
  }
  return sentence;
}
