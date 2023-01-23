import { processWood } from "./solid";
import { processGunpowder, processPowder } from "./powder";
import { processLiquid, processOil } from "./liquid";
import { processFire, processGas } from "./gas";
import { ParticleApi } from "../particle";

export enum Material {
  Empty,

  Wood,
  Brick,

  Sand,
  Gunpowder,

  Water,
  Oil,

  Steam,
  Fire,
}

export function processMaterial(api: ParticleApi) {
  switch (api.particle) {
    case Material.Wood:
      processWood(api);
      break;
    case Material.Sand:
      processPowder(api);
      break;
    case Material.Gunpowder:
      processGunpowder(api);
      break;
    case Material.Water:
      processLiquid(api);
      break;
    case Material.Oil:
      processOil(api);
      break;
    case Material.Steam:
      processGas(api);
      break;
    case Material.Fire:
      processFire(api);
      break;
  }
}
