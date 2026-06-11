import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/dates";

describe("formatDate", () => {
  it("formats a date-only string without shifting a day in local time", () => {
    // Without the UTC pin, this renders "June 9, 2026" anywhere west of UTC.
    expect(formatDate("2026-06-10")).toBe("June 10, 2026");
  });

  it("formats month-year without shifting into the previous month", () => {
    // First-of-month dates are the month-shift edge case.
    expect(formatDate("2026-04-01", "monthYear")).toBe("Apr 2026");
  });

  it("defaults to the long style", () => {
    expect(formatDate("2020-01-01")).toBe("January 1, 2020");
  });
});
