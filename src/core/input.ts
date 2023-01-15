import { clamp } from "./math";
import { Position } from "../game/world";

let mousePosition: Position = [0, 0];

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

    const [relativeX, relativeY] = [
      Math.floor((e.clientX - bounds.left) * scale),
      Math.floor((e.clientY - bounds.top) * scale),
    ];

    mousePosition = [
      clamp(relativeX, 0, canvas.width - 1),
      clamp(relativeY, 0, canvas.height - 1),
    ];
  });
}

export function getMousePosition() {
  return mousePosition;
}

export function getMousePressed() {
  return mousePressed;
}
