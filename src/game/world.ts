import { Material, processMaterial } from "./material/material";
import { getParticleApi, Particle, PARTICLE_BYTES } from "./particle";
import { getShuffled } from "../core/math";
import { config } from "../../game.config";

export type Position = [x: number, y: number];

export class World {
  readonly width: number;
  readonly height: number;

  private readonly state: Uint8Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.state = new Uint8Array(this.width * this.height * PARTICLE_BYTES);
  }

  containsPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getParticleAt(x: number, y: number): Particle {
    if (!this.containsPosition(x, y)) {
      if (config.world.boundary === "solid") {
        return {
          material: Material.Brick,
          r1: 0,
          r2: 0,
          updates: 0,
        };
      }
      if (config.world.boundary === "void") {
        return {
          material: Material.Empty,
          r1: 0,
          r2: 0,
          updates: 0,
        };
      }

      throw new Error("Particle read position is out of bounds.");
    }

    const index = (y * this.width + x) * PARTICLE_BYTES;

    return {
      material: this.state[index],
      r1: this.state[index + 1],
      r2: this.state[index + 2],
      updates: this.state[index + 3],
    };
  }

  setParticleAt(x: number, y: number, particle: Particle) {
    if (!this.containsPosition(x, y)) {
      return;
    }

    const index = (y * this.width + x) * PARTICLE_BYTES;

    this.state[index] = particle.material;
    this.state[index + 1] = particle.r1;
    this.state[index + 2] = particle.r2;
    this.state[index + 3] = particle.updates;
  }

  process() {
    let nonEmptyIndexes: number[] = [];

    for (let i = 0; i < this.state.length; i += PARTICLE_BYTES) {
      const material: Material = this.state[i];

      if (material === Material.Empty) {
        continue;
      }

      nonEmptyIndexes.push(i / PARTICLE_BYTES);
    }

    for (const i of getShuffled(nonEmptyIndexes)) {
      processMaterial(
        getParticleApi(this, i % this.width, Math.floor(i / this.width))
      );
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    let imageData = ctx.createImageData(this.width, this.height);

    for (let i = 0; i < this.state.length; i += 1) {
      const stateIndex = PARTICLE_BYTES * Math.floor(i / PARTICLE_BYTES);
      const material: Material = this.state[stateIndex];

      let { r, g, b } = config.materials[material]?.color ?? {
        r: 255,
        g: 0,
        b: 255,
      };

      if (material === Material.Fire) {
        const lifetime = this.state[stateIndex + 1];

        if (lifetime > 45) {
          r = 255;
          g = 0;
          b = 0;
        } else if (lifetime > 20 && lifetime <= 45) {
          r = 255;
          g = 165;
          b = 0;
        } else if (lifetime > 5 && lifetime <= 20) {
          r = 255;
          g = 255;
          b = 0;
        } else {
          r = 255;
          g = 255;
          b = 255;
        }
      }

      const rgbaBytes = 4;
      const pixelIndex = rgbaBytes * Math.floor(i / rgbaBytes);

      imageData.data[pixelIndex] = r;
      imageData.data[pixelIndex + 1] = g;
      imageData.data[pixelIndex + 2] = b;
      imageData.data[pixelIndex + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }
}
