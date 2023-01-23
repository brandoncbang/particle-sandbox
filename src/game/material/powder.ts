import { ParticleApi } from "../particle";
import { getRandomIndex, getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processPowder(api: ParticleApi) {
  if (api.getParticleAt(0, 1) === Material.Empty) {
    api.setParticleAt(0, 0, Material.Empty);
    api.setParticleAt(0, 1, api.particle);

    return;
  }

  let slidePositions: [number, number][] = [];

  if (api.getParticleAt(-1, 1) === Material.Empty) {
    slidePositions.push([-1, 1]);
  }
  if (api.getParticleAt(1, 1) === Material.Empty) {
    slidePositions.push([1, 1]);
  }

  if (slidePositions.length > 0) {
    const slidePosition = slidePositions[getRandomIndex(slidePositions.length)];

    api.setParticleAt(0, 0, Material.Empty);
    api.setParticleAt(...slidePosition, api.particle);

    return;
  }
}

export function processGunpowder(api: ParticleApi) {
  let reactX = getRandomInt(-1, 1);
  let reactY = getRandomInt(-1, 1);

  while (reactX === 0 && reactY === 0) {
    reactX = getRandomInt(-1, 1);
    reactY = getRandomInt(-1, 1);
  }

  const reactParticle = api.getParticleAt(reactX, reactY);

  if (reactParticle === Material.Fire) {
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (
          [Material.Gunpowder, Material.Empty].includes(
            api.getParticleAt(reactX + x, reactY + y)
          )
        ) {
          api.setParticleAt(reactX + x, reactY + y, Material.Fire);
        }
      }
    }
  }

  processPowder(api);
}
