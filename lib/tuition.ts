/**
 * Tuition formatting.
 *
 * A chunk of the course feed carries no usable fee: `tuition_fees` arrives as
 * null (blank cell) or 0 ("AUD 0" / "0" in the client's sheets). Neither means
 * the course is free, so both are treated as "not published" and never
 * rendered as a zero amount.
 */

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  Euros: "€",
  EUR: "€",
  Pound: "£",
  GBP: "£",
  AUD: "A$",
  AED: "AED ",
}

export const TUITION_UNAVAILABLE = "Fees on request"

/** True when the feed has a real fee for this course. */
export function hasTuition(amount?: number | null): amount is number {
  return typeof amount === "number" && amount > 0
}

export function currencySymbol(currency?: string | null): string {
  if (!currency) return "$"
  return CURRENCY_SYMBOLS[currency] ?? `${currency} `
}

/** Formats a known fee, or returns `null` when there is nothing to show. */
export function formatTuition(amount?: number | null, currency?: string | null): string | null {
  if (!hasTuition(amount)) return null
  return `${currencySymbol(currency)}${Math.round(amount).toLocaleString("en-US")}`
}

/** Same, but falls back to the "Fees on request" label instead of null. */
export function formatTuitionOrLabel(amount?: number | null, currency?: string | null): string {
  return formatTuition(amount, currency) ?? TUITION_UNAVAILABLE
}
