import { describe, it, expect } from "vitest";
import {
  generateMetadata,
  generateStaticParams,
} from "@/app/writing/[slug]/page";
import { getWritingSlugs } from "@/lib/writing";

describe("writing detail route", () => {
  it("generates static params for every writing entry", async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.slug).sort()).toEqual(
      getWritingSlugs().sort()
    );
  });

  it("generates metadata from frontmatter for an existing entry", async () => {
    expect(getWritingSlugs().length).toBeGreaterThan(0);
    const slug = getWritingSlugs()[0];
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug }),
    });
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });

  it("falls back to Not Found metadata for a missing entry", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "does-not-exist" }),
    });
    expect(metadata).toEqual({ title: "Not Found" });
  });
});
