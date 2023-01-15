import { Material, processMaterial } from "./material";
import { getParticleApi } from "./particle";
import { getRandomInt } from "../core/math";
import { config } from "../../game.config";

function getWorldIndex(x: number, y: number): number {
  return y * config.world.width + x;
}

function getWorldPosition(index: number): Position {
  return [index % config.world.width, Math.floor(index / config.world.width)];
}

/**
 * Get an array of randomized non-empty positions to process to overcome bias.
 */
function getShuffledWorldPositions(world: World) {
  let result: [number, number][] = [];

  for (let x = 0; x < config.world.width; x += 1) {
    for (let y = 0; y < config.world.height; y += 1) {
      if (getWorldParticleAt(world, x, y) === Material.Empty) {
        continue;
      }

      result.push([x, y]);
    }
  }

  for (let i = result.length - 1; i >= 0; i -= 1) {
    const randomIndex = getRandomInt(0, i);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
}

export type World = Material[];

export type Position = [x: number, y: number];

export function getBlankWorld(width: number, height: number): World {
  return Array(width * height).fill(Material.Empty);
}

export function getWorldParticleAt(
  world: World,
  x: number,
  y: number
): Material | null {
  if (x < 0 || y < 0 || x >= config.world.width || y >= config.world.height) {
    return null;
  }

  return world[getWorldIndex(x, y)];
}

export function setWorldParticleAt(
  world: World,
  x: number,
  y: number,
  material: Material
) {
  if (x < 0 || y < 0 || x >= config.world.width || y >= config.world.height) {
    return;
  }

  world[getWorldIndex(x, y)] = material;
}

export function processWorld(world: World) {
  for (const [x, y] of getShuffledWorldPositions(world)) {
    processMaterial(getParticleApi(world, x, y));
  }
}

export function renderWorld(ctx: CanvasRenderingContext2D, world: World) {
  ctx.fillStyle = "cornflowerblue";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < world.length; i += 1) {
    const material = world[i];

    if (material === Material.Empty) {
      continue;
    }

    const [x, y] = getWorldPosition(i);

    ctx.fillStyle = "khaki";
    ctx.fillRect(x, y, 1, 1);
  }
}
