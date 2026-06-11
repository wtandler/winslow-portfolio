// Content dates are date-only strings ("2026-06-10") that JS parses as UTC
// midnight. Formatting must also be pinned to UTC, or the date renders a day
// early in timezones west of UTC.
export function formatDate(
  date: string,
  style: "long" | "monthYear" = "long"
): string {
  return new Date(date).toLocaleDateString(
    "en-US",
    style === "long"
      ? { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
      : { year: "numeric", month: "short", timeZone: "UTC" }
  );
}
