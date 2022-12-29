export type Position = {
  x: number;
  y: number;
};

/**
 * Return a number clamped to a range from `min` to `max` (inclusive).
 */
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

export function drawLine(
  p1: Position,
  p2: Position,
  drawCallback: (p: Position) => void
) {
  let { x: x1, y: y1 } = p1;
  let { x: x2, y: y2 } = p2;

  drawCallback({ x: x1, y: y1 });

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

    drawCallback({ x: x1, y: y1 });
  }
}
