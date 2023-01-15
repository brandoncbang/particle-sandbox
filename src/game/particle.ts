import { Material } from "./material";
import { getWorldParticleAt, setWorldParticleAt, World } from "./world";

export type ParticleApi = {
  particle: Material | null;
  getParticleAt: (x: number, y: number) => Material | null;
  setParticleAt: (x: number, y: number, material: Material) => void;
};

export function getParticleApi(
  world: World,
  x: number,
  y: number
): ParticleApi {
  const particle = getWorldParticleAt(world, x, y);

  const getParticleAt = (localX: number, localY: number): Material | null => {
    return getWorldParticleAt(world, x + localX, y + localY);
  };

  const setParticleAt = (
    localX: number,
    localY: number,
    material: Material
  ) => {
    setWorldParticleAt(world, x + localX, y + localY, material);
  };

  return { particle, getParticleAt, setParticleAt };
}
