import { Material } from "./material";
import { getWorldParticleAt, setWorldParticleAt, World } from "./world";

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
