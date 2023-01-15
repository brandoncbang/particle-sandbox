/**
 * Return a number clamped to a range from `min` to `max` (inclusive).
 */
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function drawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  drawCallback: (x: number, y: number) => void
) {
  drawCallback(x1, y1);

  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (x1 !== x2 || y1 !== y2) {
    let e2 = 2 * err;

    if (e2 > dy * -1) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }

    drawCallback(x1, y1);
  }
}

/**
 * Return a whole number between `min` (inclusive) & `max` (exclusive).
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

export function range(length: number): number[] {
  return Array.from({ length }, (_, i: number) => i);
}

export function getShuffled(array: any[]) {
  let result = array;

  for (let i = result.length - 1; i >= 0; i -= 1) {
    const randomIndex = getRandomInt(0, i);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
}
