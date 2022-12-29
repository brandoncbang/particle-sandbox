import { startGameLoop } from "./core/game-loop";
import { getMousePosition, getMousePressed, setUpInput } from "./core/input";
import { Position, drawLine } from "./core/math";

export function setUpGame(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Couldn't get the canvas context.");
    return;
  }

  ctx.fillStyle = "cornflowerblue";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  setUpInput(canvas);

  const input = () => {};

  let currentMousePosition = getMousePosition();
  let lastMousePosition = currentMousePosition;

  const process = () => {
    currentMousePosition = getMousePosition();

    if (getMousePressed()) {
      drawLine(lastMousePosition, currentMousePosition, (p: Position) => {
        ctx.fillStyle = "black";
        ctx.fillRect(p.x, p.y, 1, 1);
      });
    }

    lastMousePosition = currentMousePosition;
  };

  const render = () => {
    // ctx.fillStyle = "cornflowerblue";
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  startGameLoop(input, process, render);
}
