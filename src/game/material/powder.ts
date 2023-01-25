import { ParticleApi } from "../particle";
import { getRandomIndex, getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processPowder(api: ParticleApi) {
  if (
    [Material.Empty, Material.Steam, Material.Fire].includes(
      api.getParticleAt(0, 1).material
    )
  ) {
    api.setParticleAt(0, 0, api.getParticleAt(0, 1));
    api.setParticleAt(0, 1, api.particle);

    return;
  }

  let slidePositions: [number, number][] = [];

  if (api.getParticleAt(-1, 1).material === Material.Empty) {
    slidePositions.push([-1, 1]);
  }
  if (api.getParticleAt(1, 1).material === Material.Empty) {
    slidePositions.push([1, 1]);
  }

  if (slidePositions.length > 0) {
    const slidePosition = slidePositions[getRandomIndex(slidePositions.length)];

    api.setEmptyAt(0, 0);
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

  if (reactParticle.material === Material.Fire) {
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (
          [Material.Gunpowder, Material.Empty].includes(
            api.getParticleAt(reactX + x, reactY + y).material
          )
        ) {
          api.setParticleAt(reactX + x, reactY + y, {
            material: Material.Fire,
            registers: [0, 0],
            updates: 0,
          });
        }
      }
    }
  }

  processPowder(api);
}
