import { startGameLoop } from "./core/game-loop";
import { getMousePosition, getMousePressed, setUpInput } from "./core/input";
import { drawLine } from "./core/math";
import { Material } from "./game/material/material";
import { getParticleApi } from "./game/particle";
import { World } from "./game/world";
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

  let world = new World(config.world.width, config.world.height);

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
              getParticleAt(x, y).material !== Material.Empty
            ) {
              continue;
            }

            setParticleAt(x, y, {
              material: currentMaterial,
              r1: 0,
              r2: 0,
              updates: 0,
            });
          }
        }
      });
    }

    world.process();

    lastMousePosition = currentMousePosition;
  };

  const render = () => {
    world.render(ctx);
  };

  startGameLoop(input, process, render);
}
