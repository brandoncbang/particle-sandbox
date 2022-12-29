/**
 * Return a number clamped to a range from `min` to `max` (inclusive).
 */
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}
