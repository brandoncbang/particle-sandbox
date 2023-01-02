import { Material } from "./material";
import { World } from "./world";

export type ParticleApi = {
  particle: Material;
  getParticleAt: (x: number, y: number) => Material | null;
  setParticleAt: (x: number, y: number, material: Material) => void;
};

export function getParticleApi(
  state: World,
  x: number,
  y: number
): ParticleApi {
  const particle = state[x][y];

  const getParticleAt = (localX: number, localY: number): Material | null => {
    const worldX = x + localX;
    const worldY = y + localY;

    if (
      worldX < 0 ||
      worldY < 0 ||
      worldX >= state.length ||
      worldY >= state[x].length
    ) {
      return null;
    }

    return state[x + localX][y + localY];
  };

  const setParticleAt = (
    localX: number,
    localY: number,
    material: Material
  ) => {
    const worldX = x + localX;
    const worldY = y + localY;

    if (
      worldX < 0 ||
      worldY < 0 ||
      worldX >= state.length ||
      worldY >= state[x].length
    ) {
      return;
    }

    state[x + localX][y + localY] = material;
  };

  return { particle, getParticleAt, setParticleAt };
}
