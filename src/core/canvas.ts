import { config } from "../../game.config";

/**
 * Prepare canvas for rendering at higher scales.
 */
export function setUpCanvas(canvas: HTMLCanvasElement) {
  canvas.width = config.world.width;
  canvas.height = config.world.height;

  canvas.style.width = `${config.world.width * config.rendering.scale}px`;
  canvas.style.height = `${config.world.height * config.rendering.scale}px`;
  canvas.style.imageRendering = "pixelated";
}
