import { Material } from "./material/material";
import { getWorldParticleAt, setWorldParticleAt, World } from "./world";

export type Particle = {
  material: Material; // Particle's Material.
  registers: [number, number]; // Associate custom number data with the Particle.
  updates: number; // Amount of updates performed on the Particle this frame.
};

// const api: ParticleApi;
//
// let particle: Particle = {
//   material: Material.Fire,
//   registers: [5, 0],
//   updates: 0,
// };
//
// particle.registers[0] -= 1;
//
// if (particle.registers[0] <= 0) {
//   particle.material = Material.Empty;
//   api.setEmptyAt(0, 0);
// }
//
// particle.updates += 1;

export type ParticleApi = {
  particle: Material;
  getParticleAt: (x: number, y: number) => Material;
  setParticleAt: (x: number, y: number, material: Material) => void;
  getAlreadyModified: () => boolean;
};

export function getParticleApi(
  world: World,
  x: number,
  y: number
): ParticleApi {
  const particle = getWorldParticleAt(world, x, y);

  let alreadyModified = false;

  const getParticleAt = (localX: number, localY: number): Material => {
    return getWorldParticleAt(world, x + localX, y + localY);
  };

  const setParticleAt = (
    localX: number,
    localY: number,
    material: Material
  ) => {
    alreadyModified = true;
    setWorldParticleAt(world, x + localX, y + localY, material);
  };

  /**
   * Check if this particle was already modified. Useful when composing with multiple material processing functions.
   */
  const getAlreadyModified = () => {
    return alreadyModified;
  };

  return { particle, getParticleAt, setParticleAt, getAlreadyModified };
}
