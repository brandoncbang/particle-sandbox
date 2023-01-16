import { startGameLoop } from "./core/game-loop";
import { getMousePosition, getMousePressed, setUpInput } from "./core/input";
import { drawLine } from "./core/math";
import { Material } from "./game/material";
import { getParticleApi } from "./game/particle";
import { getBlankWorld, processWorld, renderWorld } from "./game/world";
import { config } from "../game.config";
import { setUpCanvas } from "./core/canvas";
import { setUpUi } from "./game/ui";

export function setUpGame(canvas: HTMLCanvasElement, uiContainer: HTMLElement) {
  setUpCanvas(canvas);
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Couldn't get the canvas context.");
    return;
  }

  setUpInput(canvas);

  const input = () => {};

  let world = getBlankWorld(config.world.width, config.world.height);

  let currentMaterial = Material.Sand;

  const { onMaterialSelected } = setUpUi(uiContainer);

  onMaterialSelected((material: Material) => {
    currentMaterial = material;
  });

  let currentMousePosition = getMousePosition();
  let lastMousePosition = currentMousePosition;

  const process = () => {
    currentMousePosition = getMousePosition();

    if (getMousePressed()) {
      drawLine(...lastMousePosition, ...currentMousePosition, (x, y) => {
        const { getParticleAt, setParticleAt } = getParticleApi(world, x, y);

        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            if (
              currentMaterial !== Material.Empty &&
              getParticleAt(x, y) !== Material.Empty
            ) {
              continue;
            }

            setParticleAt(x, y, currentMaterial);
          }
        }
      });
    }

    processWorld(world);

    lastMousePosition = currentMousePosition;
  };

  const render = () => {
    renderWorld(ctx, world);
  };

  startGameLoop(input, process, render);
}
