import { Material } from "./material/material";
import { getWorldParticleAt, setWorldParticleAt, World } from "./world";

export type Particle = {
  material: Material; // Particle's Material.
  registers: [number, number]; // Associate custom number data with the Particle.
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
  const particle = getWorldParticleAt(world, x, y);

  let alreadyModified = false;

  const getParticleAt = (localX: number, localY: number): Particle => {
    return getWorldParticleAt(world, x + localX, y + localY);
  };

  const setParticleAt = (
    localX: number,
    localY: number,
    particle: Particle
  ) => {
    alreadyModified = true;
    setWorldParticleAt(world, x + localX, y + localY, particle);
  };

  const setEmptyAt = (localX: number, localY: number) => {
    setParticleAt(localX, localY, {
      material: Material.Empty,
      registers: [0, 0],
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
