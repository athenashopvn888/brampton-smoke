export const ARTICLE_PATH = "/resources/what-does-terpy-mean";
export const CANONICAL_URL = "https://www.bramptonsmokecannabis.com" + ARTICLE_PATH;

/** Approved article body only. */
export const ARTICLE_MARKDOWN = `# Terpy Meaning: What "Terpy" Weed Actually Means (and What It Doesn't)

Last checked: November 17, 2026

Somebody cracks a jar, takes one sniff and says it: "Oh, that's terpy." Everybody nods. Half the room isn't sure what they just agreed to. So let's settle the **terpy meaning** once, in plain terms, the Brampton Smoke Cannabis way: tidy, organised, one lane at a time. For adults 19+.

## What does terpy mean?

"Terpy" means weed with a big, obvious smell. It's slang built from "terpenes," the aroma compounds in cannabis, so calling a bud terpy is just saying the nose hits you first and hits you hard.

That's the whole definition. Terpy is a smell word. It isn't a grade, a lab result or a promise about anything else in the jar.

## What is terpy weed?

Terpy weed is flower whose aroma comes through strongly when you open the container or break a bud. People use the word for all kinds of smells: citrus, pine, skunk, earth, spice. What makes it "terpy" is how loud the smell is, not which smell it is.

| You hear | What they usually mean |
|---|---|
| "Super terpy" | The smell jumps out of the jar |
| "Not very terpy" | Mild aroma, you have to lean in |
| "Terpy cart" or "terpy concentrate" | Same idea, applied to a non-flower product's aroma |

## Where does "terpy" come from?

It comes from terpenes. Health Canada describes terpenes as chemicals made and stored in the plant's trichomes, alongside the cannabinoids, and says terpenes give cannabis its distinctive smell. Its page on cannabis odours goes further: the main odour-causing molecules in cannabis are terpenes, and depending on the mix, the smell gets described as spicy, floral, fruity, earthy, skunky or pungent.

Plenty of other plants carry the same terpenes. Health Canada's own example is limonene, found in cannabis and in citrus like oranges and lemons, and responsible for a citrus smell. So when someone calls a lemony bud terpy, they're closer to the science than they might think.

Slang did the rest. "Terpenes" became "terps," and "terps" became "terpy." That's the **terpy meaning** in one family tree.

## Terpy vs gassy vs loud: what's the difference?

These three get thrown around together, but they aren't the same word. One line each:

- **Terpy:** a strong aroma of any kind.
- **Gassy:** a specific aroma, the fuel-like, diesel-ish one.
- **Loud:** a smell so big it fills the room. Some people use it as general hype, too.

So a bud can be terpy and gassy at once, if the strong smell is the fuel one. A fruity bud can be terpy without being gassy at all. Treat all three as smell talk. None of them is a quality score.

## How do labels list terpenes?

Terpenes aren't on the list of required label items in Health Canada's guide to reading a cannabis product label. The required items include the class of product, Total THC and Total CBD, net weight, storage conditions, the lot number and packaging date. If a package or menu shows terpene names, that's extra information the producer chose to share.

Here's how to read the label in order:

1. **Class first.** Dried cannabis, extract, edible and so on.
2. **Total THC and Total CBD.** Printed on the front.
3. **Lot number and packaging date.** Useful if you ever need to contact the producer.
4. **Any terpene line.** Treat it as aroma info, the same way you'd read "citrus" on a menu.

Want the label words that sit beside terpy on a menu? Our guide to [indica, sativa and hybrid label terms](/resources/indica-sativa-hybrid-label-terms) covers those, one term at a time.

## Terpy meaning at the counter

Terpy is handy shorthand once you know what it covers. A few tidy ways to use it:

- **Ask about smell, specifically.** "Which of these is the most terpy?" is a fair, clear question.
- **Name the smell you like.** "Terpy and citrus" narrows things faster than "something terpy."
- **Keep it separate from the numbers.** The label carries the measured info. Terpy describes your nose's opinion.

What terpy doesn't tell you:

- How the flower was grown.
- What's printed on the label.
- How anything will feel. That's not what the word is for.

## Quick recap

- **Terpy meaning:** strong-smelling weed. Slang from "terpenes."
- **What is terpy weed?** Flower with an aroma that jumps out.
- **Terpy vs gassy vs loud:** any strong smell, a fuel smell, a room-filling smell.
- **On a label:** terpenes are optional extra info, not a required item.

## Talk terps with us in Brampton

Now you've got the **terpy meaning** down, come put it to work. Brampton Smoke Cannabis is on Falby Rd in Brampton, and we're happy to talk aroma words, label terms and anything else on the menu that's got you curious. Check the [visit page](/visit) before you head over.

Bring government-issued photo ID.`;

/** First sentence of the intro, used as the meta description. */
export function metaDescription(intro: string): string {
  const sentence = intro.match(/^[^.!?]+[.!?]"?/)?.[0] ?? intro;
  if (sentence.length > 155) {
    throw new Error("meta description exceeds 155 characters");
  }
  return sentence;
}
