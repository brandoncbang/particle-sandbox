import { clamp, Position } from "./math";

let mousePosition: Position = {
  x: 0,
  y: 0,
};

let mousePressed: boolean = false;

export function setUpInput(canvas: HTMLCanvasElement) {
  canvas.addEventListener("mousedown", (_) => {
    mousePressed = true;
  });

  document.addEventListener("mouseup", (_) => {
    mousePressed = false;
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    const bounds = canvas.getBoundingClientRect();
    const scale = canvas.width / bounds.width;

    const relativePosition = {
      x: Math.floor((e.clientX - bounds.left) * scale),
      y: Math.floor((e.clientY - bounds.top) * scale),
    };

    mousePosition = {
      x: clamp(relativePosition.x, 0, canvas.width - 1),
      y: clamp(relativePosition.y, 0, canvas.height - 1),
    };
  });
}

export function getMousePosition() {
  return mousePosition;
}

export function getMousePressed() {
  return mousePressed;
}
