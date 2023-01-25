import { Material, processMaterial } from "./material/material";
import { getParticleApi, Particle } from "./particle";
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
    if (world[i].material === Material.Empty) {
      continue;
    }

    result.push(i);
  }

  return result;
}

export type World = Particle[];

export type Position = [x: number, y: number];

export function getBlankWorld(width: number, height: number): World {
  return Array(width * height).fill({
    material: Material.Empty,
    registers: [0, 0],
    updates: 0,
  });
}

export function getWorldParticleAt(
  world: World,
  x: number,
  y: number
): Particle {
  if (x < 0 || y < 0 || x >= config.world.width || y >= config.world.height) {
    if (config.world.boundary === "solid") {
      return {
        material: Material.Brick,
        registers: [0, 0],
        updates: 0,
      };
    }
    if (config.world.boundary === "void") {
      return {
        material: Material.Empty,
        registers: [0, 0],
        updates: 0,
      };
    }

    throw new Error("Particle read position is out of bounds.");
  }

  return world[getWorldIndex(x, y)];
}

export function setWorldParticleAt(
  world: World,
  x: number,
  y: number,
  particle: Particle
) {
  if (x < 0 || y < 0 || x >= config.world.width || y >= config.world.height) {
    return;
  }

  world[getWorldIndex(x, y)] = particle;
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
    const particle = world[i];

    ctx.fillStyle = config.materials[particle.material]?.color ?? "magenta";

    if (particle.material === Material.Fire) {
      if (particle.registers[0] > 45) {
        ctx.fillStyle = "red";
      } else if (particle.registers[0] > 20 && particle.registers[0] <= 45) {
        ctx.fillStyle = "orange";
      } else if (particle.registers[0] > 5 && particle.registers[0] <= 20) {
        ctx.fillStyle = "yellow";
      } else {
        ctx.fillStyle = "white";
      }
    }

    ctx.fillRect(x, y, 1, 1);
  }
}
