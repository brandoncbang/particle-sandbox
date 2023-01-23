import { ParticleApi } from "../particle";
import { processPowder } from "./powder";
import { getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processLiquid(api: ParticleApi) {
  processPowder(api);

  if (api.getAlreadyModified()) {
    return;
  }

  let newX = 0;

  if (api.getParticleAt(1, 0) === api.particle) {
    newX = -1;
  }
  if (api.getParticleAt(-1, 0) === api.particle) {
    newX = 1;
  }

  if (newX === 0) {
    newX = getRandomInt(-1, 1);
  }

  if (api.getParticleAt(newX, 0) === Material.Empty) {
    api.setParticleAt(0, 0, Material.Empty);
    api.setParticleAt(newX, 0, api.particle);
  }
}

export function processOil(api: ParticleApi) {
  let reactX = getRandomInt(-1, 1);
  let reactY = getRandomInt(-1, 1);

  while (reactX === 0 && reactY === 0) {
    reactX = getRandomInt(-1, 1);
    reactY = getRandomInt(-1, 1);
  }

  const reactParticle = api.getParticleAt(reactX, reactY);

  if (reactParticle === Material.Fire) {
    api.setParticleAt(0, 0, Material.Fire);
  }

  processLiquid(api);
}
