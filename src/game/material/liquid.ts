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

  if (api.getParticleAt(newX, 0).material === Material.Empty) {
    api.setEmptyAt(0, 0);
    api.setParticleAt(newX, 0, api.particle);
  }
}

export function processWater(api: ParticleApi) {
  let reactX = getRandomInt(-1, 1);
  let reactY = getRandomInt(-1, 1);

  while (reactX === 0 && reactY === 0) {
    reactX = getRandomInt(-1, 1);
    reactY = getRandomInt(-1, 1);
  }

  const reactParticle = api.getParticleAt(reactX, reactY);

  if (reactParticle.material === Material.Fire) {
    api.setParticleAt(reactX, reactY, {
      material: Material.Empty,
      r1: 0,
      r2: 0,
      updates: 0,
    });
  }

  processLiquid(api);
}

export function processOil(api: ParticleApi) {
  // let reactX = getRandomInt(-1, 1);
  // let reactY = getRandomInt(-1, 1);
  //
  // while (reactX === 0 && reactY === 0) {
  //   reactX = getRandomInt(-1, 1);
  //   reactY = getRandomInt(-1, 1);
  // }
  //
  // const reactParticle = api.getParticleAt(reactX, reactY);
  //
  // if (reactParticle.material === Material.Fire) {
  //   api.setParticleAt(0, 0, {
  //     material: Material.Fire,
  //     registers: [0, 0],
  //     updates: 0,
  //   });
  // }

  processLiquid(api);
}
