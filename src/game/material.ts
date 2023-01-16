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

function processLiquid({
  particle,
  getParticleAt,
  setParticleAt,
  getAlreadyModified,
}: ParticleApi) {
  processPowder({ particle, getParticleAt, setParticleAt, getAlreadyModified });

  if (getAlreadyModified()) {
    return;
  }

  let newX = 0;

  if (getParticleAt(1, 0) === particle) {
    newX = -1;
  }
  if (getParticleAt(-1, 0) === particle) {
    newX = 1;
  }

  if (newX === 0) {
    newX = getRandomInt(-1, 2);
  }

  if (getParticleAt(newX, 0) === Material.Empty) {
    setParticleAt(0, 0, getParticleAt(newX, 0));
    setParticleAt(newX, 0, particle);
  }
}

function processGas({}: ParticleApi) {}
