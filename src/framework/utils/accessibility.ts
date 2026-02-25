/**
 * Accessibility utilities and constants for the app
 * Following WCAG 2.1 Level AA guidelines
 */

/**
 * Minimum touch target size (44x44 points) as per iOS Human Interface Guidelines
 * and Android Material Design
 */
export const MINIMUM_TOUCH_TARGET_SIZE = 44;

/**
 * Generate a unique accessibility label by combining multiple strings
 */
export function combineAccessibilityLabel(
  ...parts: (string | undefined)[]
): string {
  return parts.filter(Boolean).join(", ");
}

/**
 * Format a number as currency for screen readers
 */
export function formatCurrencyForA11y(amount: string): string {
  return amount.replace(/\$/g, "dollars ").replace(/,/g, "");
}

/**
 * Format a date for screen readers
 */
export function formatDateForA11y(date: string): string {
  return date;
}

/**
 * Common accessibility roles
 */
export const A11Y_ROLES = {
  button: "button" as const,
  header: "header" as const,
  link: "link" as const,
  search: "search" as const,
  image: "image" as const,
  text: "text" as const,
  adjustable: "adjustable" as const,
};

/**
 * Common accessibility traits for iOS
 */
export const A11Y_TRAITS = {
  button: ["button"] as const,
  header: ["header"] as const,
  link: ["link"] as const,
  disabled: ["disabled"] as const,
  selected: ["selected"] as const,
};
