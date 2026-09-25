// Splits prose into plain and figure segments so card summaries can set their
// numbers ("60", "6-10", "$250K", "1,000", "40%") in darker ink. A figure is a
// run of digits that does not start inside a word, with optional thousands
// separators, decimals, a hyphenated range, a leading "$", and a trailing
// K/M/B, "%" or "+". Hyphenated compounds like "12-month" yield just "12".
export type Segment = { text: string; figure: boolean };

const FIGURE =
  /(?<![\w$])\$?\d[\d,]*(?:\.\d+)?(?:-\d[\d,]*(?:\.\d+)?)?(?:[KMB](?![a-z])|%|\+)?/g;

export function splitFigures(text: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(FIGURE)) {
    // A trailing comma belongs to the sentence, not the number.
    const value = match[0].replace(/,+$/, "");
    const start = match.index;
    if (start > last) segments.push({ text: text.slice(last, start), figure: false });
    segments.push({ text: value, figure: true });
    last = start + value.length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), figure: false });
  return segments;
}
