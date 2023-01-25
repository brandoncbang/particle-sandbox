import { ParticleApi } from "../particle";
import { getRandomInt } from "../../core/math";
import { Material } from "./material";

export function processGas(api: ParticleApi) {
  const newX = getRandomInt(-1, 1);
  const newY = getRandomInt(-1, 1);

  if (api.getParticleAt(newX, newY).material === Material.Empty) {
    api.setEmptyAt(0, 0);
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

  if (reactParticle.material === Material.Water) {
    api.setEmptyAt(0, 0);
  }
  if (flammables.includes(reactParticle.material)) {
    api.setParticleAt(reactX, reactY, {
      material: Material.Fire,
      registers: [0, 0],
      updates: 0,
    });
  }
  if (explosives.includes(reactParticle.material)) {
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        if (
          [...explosives, Material.Empty].includes(
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

  if (api.particle.registers[0] >= 60) {
    api.setEmptyAt(0, 0);
    return;
  }

  const newY = getRandomInt(-1, 0);

  if (api.getParticleAt(0, newY).material === Material.Empty) {
    api.setEmptyAt(0, 0);
    api.setParticleAt(0, newY, {
      material: api.particle.material,
      registers: [api.particle.registers[0] + getRandomInt(1, 2), 0],
      updates: 0,
    });
  } else {
    api.setParticleAt(0, 0, {
      material: api.particle.material,
      registers: [api.particle.registers[0] + getRandomInt(1, 2), 0],
      updates: 0,
    });
  }
}
