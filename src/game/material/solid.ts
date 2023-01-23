import { ParticleApi } from "../particle";
import { getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processWood(api: ParticleApi) {
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
}
