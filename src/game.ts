import { startGameLoop } from "./core/game-loop";
import { getMousePosition, getMousePressed, setUpInput } from "./core/input";

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

  const process = () => {
    if (getMousePressed()) {
      ctx.fillStyle = "black";
      ctx.fillRect(getMousePosition().x, getMousePosition().y, 1, 1);
    }
  };

  const render = () => {
    // ctx.fillStyle = "cornflowerblue";
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  startGameLoop(input, process, render);
}
