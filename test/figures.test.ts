import { describe, it, expect } from "vitest";
import { splitFigures } from "@/lib/figures";
import { getAllProjects } from "@/lib/mdx";

const figures = (text: string) =>
  splitFigures(text)
    .filter((s) => s.figure)
    .map((s) => s.text);

describe("splitFigures", () => {
  it("picks out counts, ranges, money, and percentages", () => {
    expect(
      figures("About 60 programs, 6-10 hours to 10 minutes, $250K a year, 40% fewer")
    ).toEqual(["60", "6-10", "10", "$250K", "40%"]);
  });

  it("keeps thousands separators but drops a trailing sentence comma", () => {
    expect(figures("used by about 1,000 change managers")).toEqual(["1,000"]);
    expect(figures("across 14, then 20 divisions")).toEqual(["14", "20"]);
  });

  it("takes only the number from a hyphenated compound", () => {
    expect(figures("a 12-month resource plan")).toEqual(["12"]);
  });

  it("ignores digits that start inside a word", () => {
    expect(figures("Q3 results on GPT4 and Office365")).toEqual([]);
  });

  it("takes K/M/B only as a standalone suffix", () => {
    expect(figures("a $2M budget and a 4Kb payload")).toEqual(["$2M", "4"]);
  });

  it("round-trips: joining the segments restores the input", () => {
    const text = "Two extensions across 14 divisions save 150-200 hours a month.";
    expect(splitFigures(text).map((s) => s.text).join("")).toBe(text);
  });

  it("round-trips every project summary", () => {
    for (const { frontmatter } of getAllProjects()) {
      const joined = splitFigures(frontmatter.summary)
        .map((s) => s.text)
        .join("");
      expect(joined).toBe(frontmatter.summary);
    }
  });
});
