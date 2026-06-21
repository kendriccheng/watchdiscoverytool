import type { WatchListing } from "../data/mockListings";

export type Marketplace = WatchListing["marketplace"];

const MARKETPLACE_MULTIPLIERS: Record<Marketplace, number> = {
  ebay: 1.0,
  etsy: 0.9,
  chrono24: 1.25,
  other: 1.0,
};

/** Strip spaces and uppercase for parsing. */
export function stripPostalInput(input: string): string {
  return input.replace(/\s/g, "").toUpperCase();
}

/** Format a 6-character Canadian postal code as A1A 1A1. */
export function formatCanadianPostalCode(stripped: string): string {
  return `${stripped.slice(0, 3)} ${stripped.slice(3)}`;
}

/**
 * Returns normalized postal (A1A 1A1) when valid, otherwise null.
 * Accepts input with or without the space.
 */
export function getValidPostalCode(input: string): string | null {
  const stripped = stripPostalInput(input);
  if (stripped.length !== 6) return null;

  const valid = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
    stripped
  );

  if (!valid) return null;

  return formatCanadianPostalCode(stripped);
}

export function isValidCanadianPostalCode(input: string): boolean {
  return getValidPostalCode(input) !== null;
}

/** Distance-from-Toronto zone multiplier using the first postal letter. */
export function getZoneMultiplier(postalCode: string): number {
  const letter = stripPostalInput(postalCode)[0];

  switch (letter) {
    case "M":
    case "L":
      return 1.0;
    case "K":
    case "N":
      return 1.1;
    case "G":
    case "H":
    case "J":
      return 1.2;
    case "P":
      return 1.25;
    case "A":
    case "B":
    case "C":
    case "E":
      return 1.35;
    case "R":
    case "S":
    case "T":
      return 1.45;
    case "V":
      return 1.5;
    case "X":
    case "Y":
      return 1.6;
    default:
      return 1.1;
  }
}

export function getMarketplaceMultiplier(marketplace: Marketplace): number {
  return MARKETPLACE_MULTIPLIERS[marketplace];
}

/** Estimated shipping in CAD — rounded to whole dollars. */
export function estimateShipping(
  baseShipping: number,
  postalCode: string,
  marketplace: Marketplace
): number {
  const zone = getZoneMultiplier(postalCode);
  const market = getMarketplaceMultiplier(marketplace);

  return Math.round(baseShipping * zone * market);
}

export function getShippingZoneLabel(postalCode: string): string {
  const letter = stripPostalInput(postalCode)[0];

  switch (letter) {
    case "M":
    case "L":
      return "Southern Ontario";
    case "K":
    case "N":
      return "Ontario";
    case "G":
    case "H":
    case "J":
      return "Quebec";
    case "P":
      return "Northern Ontario";
    case "A":
    case "B":
    case "C":
    case "E":
      return "Atlantic Canada";
    case "R":
    case "S":
    case "T":
      return "Prairies";
    case "V":
      return "British Columbia";
    case "X":
    case "Y":
      return "Northern Canada";
    default:
      return "Canada";
  }
}
