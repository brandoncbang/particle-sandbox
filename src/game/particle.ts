import { Material } from "./material/material";
import { World } from "./world";

export const PARTICLE_BYTES = 4;

export type Particle = {
  material: Material; // Particle's Material.
  r1: number; // Associate custom number data with the Particle.
  r2: number;
  updates: number; // Amount of updates performed on the Particle this frame.
};

export type ParticleApi = {
  particle: Particle;
  getParticleAt: (x: number, y: number) => Particle;
  setParticleAt: (x: number, y: number, particle: Particle) => void;
  setEmptyAt: (x: number, y: number) => void;
  getAlreadyModified: () => boolean;
};

export function getParticleApi(
  world: World,
  x: number,
  y: number
): ParticleApi {
  const particle = world.getParticleAt(x, y);

  let alreadyModified = false;

  const getParticleAt = (localX: number, localY: number): Particle => {
    return world.getParticleAt(x + localX, y + localY);
  };

  const setParticleAt = (
    localX: number,
    localY: number,
    particle: Particle
  ) => {
    alreadyModified = true;
    world.setParticleAt(x + localX, y + localY, particle);
  };

  const setEmptyAt = (localX: number, localY: number) => {
    setParticleAt(localX, localY, {
      material: Material.Empty,
      r1: 0,
      r2: 0,
      updates: 0,
    });
  };

  /**
   * Check if this particle was already modified. Useful when composing with multiple material processing functions.
   */
  const getAlreadyModified = () => {
    return alreadyModified;
  };

  return {
    particle,
    getParticleAt,
    setParticleAt,
    setEmptyAt,
    getAlreadyModified,
  };
}
