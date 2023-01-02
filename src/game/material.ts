import { ParticleApi } from "./particle";
import { getRandomInt } from "../core/math";

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
    case Material.Sand:
    case Material.Gunpowder:
      processPowder(api);
      break;
    case Material.Water:
    case Material.Oil:
      processLiquid(api);
      break;
    case Material.Steam:
    case Material.Fire:
      processGas(api);
      break;
  }
}

function processPowder({
  particle,
  getParticleAt,
  setParticleAt,
}: ParticleApi) {
  if (getParticleAt(0, 1) === Material.Empty) {
    setParticleAt(0, 0, Material.Empty);
    setParticleAt(0, 1, particle);

    return;
  }

  let slidePositions: [number, number][] = [];

  if (getParticleAt(-1, 1) === Material.Empty) {
    slidePositions.push([-1, 1]);
  }
  if (getParticleAt(1, 1) === Material.Empty) {
    slidePositions.push([1, 1]);
  }

  if (slidePositions.length > 0) {
    const slidePosition =
      slidePositions[getRandomInt(0, slidePositions.length)];

    setParticleAt(0, 0, Material.Empty);
    setParticleAt(...slidePosition, particle);

    return;
  }
}

function processLiquid({}: ParticleApi) {}

function processGas({}: ParticleApi) {}
