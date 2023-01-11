import { Material, processMaterial } from "./material";
import { getParticleApi } from "./particle";
import { getRandomInt } from "../core/math";

/**
 * Get an array of randomized non-empty positions to process to overcome bias.
 */
function getShuffledWorldPositions(world: World) {
  let result: [number, number][] = [];

  for (let x = 0; x < world.length; x += 1) {
    for (let y = 0; y < world[x].length; y += 1) {
      if (world[x][y] === Material.Empty) {
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

export type World = Material[][];

export function getBlankWorld(width: number, height: number): World {
  return [...Array(width)].map((_) => Array(height).fill(Material.Empty));
}

export function processWorld(world: World) {
  for (const [x, y] of getShuffledWorldPositions(world)) {
    processMaterial(getParticleApi(world, x, y));
  }
}
