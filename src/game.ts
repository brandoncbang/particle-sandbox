import { startGameLoop } from "./core/game-loop";
import { getMousePosition, getMousePressed, setUpInput } from "./core/input";
import { Position, drawLine } from "./core/math";
import { Material } from "./game/material";
import { getParticleApi } from "./game/particle";
import { getBlankWorld, processWorld } from "./game/world";

export function setUpGame(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Couldn't get the canvas context.");
    return;
  }

  setUpInput(canvas);

  let state = getBlankWorld(300, 200);

  const input = () => {};

  let currentMousePosition = getMousePosition();
  let lastMousePosition = currentMousePosition;

  const process = () => {
    currentMousePosition = getMousePosition();

    if (getMousePressed()) {
      drawLine(lastMousePosition, currentMousePosition, (p: Position) => {
        const { setParticleAt } = getParticleApi(state, p.x, p.y);

        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            setParticleAt(x, y, Material.Sand);
          }
        }
      });
    }

    processWorld(state);

    lastMousePosition = currentMousePosition;
  };

  const render = () => {
    ctx.fillStyle = "cornflowerblue";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let x = 0; x < 300; x += 1) {
      for (let y = 0; y < 200; y += 1) {
        const material = state[x][y];

        if (material === Material.Empty) {
          continue;
        }

        ctx.fillStyle = "khaki";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  startGameLoop(input, process, render);
}
