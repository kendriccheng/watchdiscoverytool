import { getValidPostalCode } from "./shippingEstimate";

export const POSTAL_CODE_STORAGE_KEY = "watch-discovery:postal-code:v1";

export function loadStoredPostalCode(): string {
  try {
    const raw = localStorage.getItem(POSTAL_CODE_STORAGE_KEY);
    if (!raw) return "";

    return getValidPostalCode(raw) ?? "";
  } catch {
    return "";
  }
}

export function saveStoredPostalCode(postalCode: string): void {
  try {
    if (!postalCode) {
      localStorage.removeItem(POSTAL_CODE_STORAGE_KEY);
      return;
    }

    localStorage.setItem(POSTAL_CODE_STORAGE_KEY, postalCode);
  } catch {
    // Ignore quota / private mode errors
  }
}

export function clearStoredPostalCode(): void {
  saveStoredPostalCode("");
}
