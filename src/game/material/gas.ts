import { ParticleApi } from "../particle";
import { getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processGas(api: ParticleApi) {
  const newX = getRandomInt(-1, 1);
  const newY = getRandomInt(-1, 1);

  if (api.getParticleAt(newX, newY) === Material.Empty) {
    api.setParticleAt(0, 0, Material.Empty);
    api.setParticleAt(newX, newY, api.particle);
  }
}

export function processFire(api: ParticleApi) {
  const flammables = [Material.Wood, Material.Gunpowder, Material.Oil];
  const explosives = [Material.Gunpowder];

  let reactX = getRandomInt(-1, 1);
  let reactY = getRandomInt(-1, 1);

  while (reactX === 0 && reactY === 0) {
    reactX = getRandomInt(-1, 1);
    reactY = getRandomInt(-1, 1);
  }

  const reactParticle = api.getParticleAt(reactX, reactY);

  if (flammables.includes(reactParticle)) {
    api.setParticleAt(reactX, reactY, Material.Fire);
  }
  if (explosives.includes(reactParticle)) {
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (
          [...explosives, Material.Empty].includes(
            api.getParticleAt(reactX + x, reactY + y)
          )
        ) {
          api.setParticleAt(reactX + x, reactY + y, Material.Fire);
        }
      }
    }
  }

  if (getRandomInt(1, 16) === 1) {
    api.setParticleAt(0, 0, Material.Empty);
    return;
  }

  const newX = getRandomInt(-1, 1);
  const newY = getRandomInt(-1, 0);

  if (api.getParticleAt(newX, newY) === Material.Empty) {
    api.setParticleAt(0, 0, Material.Empty);
    api.setParticleAt(newX, newY, api.particle);
  }
}
