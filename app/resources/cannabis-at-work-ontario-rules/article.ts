export const ARTICLE_PATH = "/resources/cannabis-at-work-ontario-rules";
export const CANONICAL_URL = "https://www.bramptonsmokecannabis.com" + ARTICLE_PATH;

/** Approved article body only. Frontmatter is not published. */
export const ARTICLE_MARKDOWN = `# Cannabis and your job in Ontario: can you smoke or vape at work, and what can your employer decide?

Last checked: September 30, 2026
Legal cannabis for adults 19 and over doesn't make every place legal for lighting up. At work, two sets of Ontario rules overlap: the Smoke-Free Ontario Act, 2017, which decides where smoking and vaping are banned outright, and the Occupational Health and Safety Act (OHSA), which sets out what employers, supervisors and workers each have to do to keep a workplace safe. This guide sorts out both, and every rule below traces to a page on ontario.ca. It explains the rules; it isn't legal advice, and your employer's written policy may be stricter.

## First, what counts as "smoking" and "vaping"

The province's smoke-free and vape-free page defines the two words broadly:

- **Smoking** means "smoking (inhaling and exhaling) or holding lighted tobacco or cannabis."
- **Vaping** means "inhaling or exhaling vapour from an electronic cigarette (e-cigarette) or holding an activated e-cigarette," and the page adds that nicotine doesn't have to be in the vapour for it to count.

Note the word *holding*. Carrying a lit joint or an activated vape through a banned space counts, even if you never take a puff there.

## Is this a workplace?

| Place | What ontario.ca says | Smoking or vaping cannabis? |
|---|---|---|
| Office building | Listed as an example of an enclosed workplace | Not allowed |
| Trailer office on a construction site | Listed as an example of an enclosed workplace | Not allowed |
| Delivery truck | Listed as an example of an enclosed workplace | Not allowed |
| Your workplace once it has closed for the day | The ban applies "even when the workplace is closed" | Not allowed |
| Covered outdoor shelter, walled on three or more sides, that staff are invited to use | Covered by the sheltered-areas rule | Not allowed |
| Within 9 metres of an entrance or exit of a hospital, psychiatric facility, long-term care home or independent health facility | Named on the workplace safety page | Not allowed |
| Long-term care home, or a retirement home that provides care | Called enclosed workplaces | Not allowed (outside any registered controlled area for residents) |
| Open-air work area with no roof | Outside the enclosed-workplace definition, which turns on a roof; employer policies can restrict "non-enclosed workplaces" | Not banned by the enclosed-workplace rule, but other smoke-free rules (for example hospital grounds), municipal bylaws or your employer's policy can still ban it |

## The rules, one at a time

### Rule 1: No smoking or vaping in an enclosed workplace

The workplace safety page lists what is illegal in enclosed workplaces: smoking tobacco, using e-cigarettes "to vape any substance including cannabis," and smoking cannabis. Ontario's cannabis-laws page puts it just as plainly: "Consuming recreational cannabis in an enclosed workplace remains illegal after legalization on October 17, 2018."

What makes a workplace "enclosed"? According to ontario.ca, it covers a building, structure or vehicle "with a roof that an employee works in or visits." A roof is the deciding feature, which is why a delivery truck and a site trailer are on the list alongside ordinary offices.

### Rule 2: Closed doesn't mean exempt

A shop after closing, an empty office on a weekend or a parked delivery vehicle between shifts is still an enclosed workplace. The province's wording is direct: you can't smoke or vape there "even when the workplace is closed."

### Rule 3: Roofed shelters count too

Stepping outside isn't always enough. Ontario's sheltered-areas rule covers a roofed outdoor shelter that has "more than two walls" whenever "the public or employees are invited to use it." A covered break area with three walls falls under that rule, even though it's technically outdoors.

### Rule 4: Hospital and care-home entrances have a buffer

If your job takes you to a hospital, psychiatric facility, long-term care home or independent health facility, the Smoke-Free Ontario Act prohibits smoking and vaping within 9 metres of the entrance or exit, and on the outdoor grounds of hospitals and psychiatric facilities.

### Rule 5: Your employer can go further than the Act

The Act sets the floor, not the ceiling. The workplace safety page says employers "can also create policies to restrict smoking and vaping that go beyond the requirements" of the Act, "such as restricting smoking and vaping in non-enclosed workplaces." The cannabis-laws page adds that extra limits may come from employer policies, as well as from municipal bylaws, leases and property owners. So an uncovered loading yard can still be off-limits if your employer's policy says so.

### Rule 6: What the law asks of employers

Under the OHSA, an employer "must take every precaution reasonable in the circumstances for the protection of a worker." Ontario's page says that, depending on the circumstances, this may include making sure workers are not "impaired while performing their work." Employers must also:

- prepare a written occupational health and safety policy,
- look at it again at least once a year,
- maintain a program to put it into practice, and
- give workers information, instruction and supervision to protect their health and safety.

The province notes it "may be reasonable" for that policy to include a section on workplace impairment from substance use. If you've never read your employer's policy, ask for it.

### Rule 7: What the law asks of workers

Workers have duties as well. Under the OHSA, as summarised on ontario.ca, you:

- "must work in a way that will not hurt yourself or another worker,"
- "should know about workplace hazards and what to do about them," and
- "have a right to refuse work that you believe is unsafe."

The cannabis-laws page also says employees have a duty "to report any hazards to their supervisor or employer."

### Rule 8: Following the smoke-free rules can't cost you your job

An employer "may not fire, threaten to fire, discipline, suspend, penalize, intimidate or coerce an employee who follows the Smoke-Free Ontario Act, 2017." If that happens, ontario.ca directs workers to the Ontario Labour Relations Board, toll-free at 1-877-339-3335.

## Safety call-out: supervisors

Supervisors carry their own OHSA duties. Ontario's example: if a supervisor knows a worker is impaired and may cause a hazard, the supervisor must take every reasonable precaution to protect that worker and others, which "could include stopping the impaired worker from doing work that may be hazardous." That's the province's wording, and it's the extent of what we'll say on impairment.

## What happens if someone breaks the smoke-free rules

Breaking these rules can lead to a charge. Ontario says you "may be charged with an offence" and, on conviction, face a fine; the page sets a larger amount for any repeat offence.

## A short checklist before your next shift

1. Find out whether your workplace or work vehicle has a roof, and whether your break shelter has a roof and more than two walls. If so, the ban applies.
2. Read your employer's written health and safety policy, including any section on substance use.
3. Treat "holding" a lit joint or an active vape the same as using it.
4. Report hazards to your supervisor or employer, as the OHSA expects.

For anything about the store itself, the [Brampton Smoke Cannabis visit page](/visit) covers how to find us on Falby Rd. Legal cannabis in Ontario is for adults 19 and over.`;

/** Trim the H1 to about 60 characters on a word boundary, keeping the clause through "work". */
export function deriveMetaTitle(heading: string): string {
  const max = 63;
  if (heading.length <= 60) return heading;
  const words = heading.split(" ");
  let title = "";
  for (const word of words) {
    const cleanWord = word.replace(/,+$/, "");
    const next = title ? `${title} ${cleanWord}` : cleanWord;
    if (next.length > max) break;
    title = next;
  }
  return title;
}
