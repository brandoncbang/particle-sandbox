import { Material, processMaterial } from "./material";
import { getParticleApi } from "./particle";
import { getShuffled, range } from "../core/math";
import { config } from "../../game.config";

function getWorldIndex(x: number, y: number): number {
  return y * config.world.width + x;
}

function getWorldPosition(index: number): Position {
  return [index % config.world.width, Math.floor(index / config.world.width)];
}

function getNonEmptyIndexes(world: World): number[] {
  let result = [];

  for (const i of range(world.length)) {
    if (world[i] === Material.Empty) {
      continue;
    }

    result.push(i);
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
): Material {
  if (x < 0 || y < 0 || x >= config.world.width || y >= config.world.height) {
    throw new Error("Particle read position is out of bounds.");
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
    throw new Error("Particle write position is out of bounds.");
  }

  world[getWorldIndex(x, y)] = material;
}

export function processWorld(world: World) {
  for (const i of getShuffled(getNonEmptyIndexes(world))) {
    if (getWorldParticleAt(world, ...getWorldPosition(i)) === null) {
      continue;
    }

    processMaterial(getParticleApi(world, ...getWorldPosition(i)));
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
