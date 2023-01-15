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
    if (config.world.boundary === "solid") {
      return Material.Brick;
    }
    if (config.world.boundary === "void") {
      return Material.Empty;
    }

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
    return;
  }

  world[getWorldIndex(x, y)] = material;
}

export function processWorld(world: World) {
  for (const i of getShuffled(getNonEmptyIndexes(world))) {
    processMaterial(getParticleApi(world, ...getWorldPosition(i)));
  }
}

export function renderWorld(ctx: CanvasRenderingContext2D, world: World) {
  ctx.fillStyle = config.rendering.backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (const i of getNonEmptyIndexes(world)) {
    const [x, y] = getWorldPosition(i);
    const material = world[i];

    ctx.fillStyle = config.materials[material]?.color ?? "magenta";
    ctx.fillRect(x, y, 1, 1);
  }
}
