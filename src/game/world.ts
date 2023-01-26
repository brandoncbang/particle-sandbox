import { Material, processMaterial } from "./material/material";
import { getParticleApi, Particle } from "./particle";
import { getShuffled, range } from "../core/math";
import { config } from "../../game.config";

export type Position = [x: number, y: number];

export class World {
  readonly width: number;
  readonly height: number;

  private state: Uint32Array;
  private view: DataView;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.state = new Uint32Array(this.width * this.height);
    this.view = new DataView(this.state.buffer);
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

    const index = (y * this.width + x) * 4;

    return {
      material: this.view.getUint8(index),
      r1: this.view.getUint8(index + 1),
      r2: this.view.getUint8(index + 2),
      updates: this.view.getUint8(index + 3),
    };
  }

  setParticleAt(x: number, y: number, particle: Particle) {
    if (!this.containsPosition(x, y)) {
      return;
    }

    const index = (y * this.width + x) * 4;

    this.view.setUint8(index, particle.material);
    this.view.setUint8(index + 1, particle.r1);
    this.view.setUint8(index + 2, particle.r2);
    this.view.setUint8(index + 3, particle.updates);
  }

  process() {
    let nonEmptyPositions: Position[] = [];

    for (const i of range(this.state.length)) {
      const [x, y] = [i % this.width, Math.floor(i / this.width)];

      if (this.getParticleAt(x, y).material === Material.Empty) {
        continue;
      }

      nonEmptyPositions.push([x, y]);
    }

    for (const [x, y] of getShuffled(nonEmptyPositions)) {
      processMaterial(getParticleApi(this, x, y));
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    let imageData = ctx.createImageData(this.width, this.height);

    for (let i = 0; i < imageData.data.length; i += 1) {
      const [x, y] = [
        i % config.world.width,
        Math.floor(i / config.world.width),
      ];
      const particle = this.getParticleAt(x, y);

      const { r, g, b } = config.materials[particle.material]?.color ?? {
        r: 255,
        g: 0,
        b: 255,
      };

      let pixelIndex = (y * this.width + x) * 4;

      imageData.data[pixelIndex] = r;
      imageData.data[pixelIndex + 1] = g;
      imageData.data[pixelIndex + 2] = b;
      imageData.data[pixelIndex + 3] = 255;

      // if (particle.material === Material.Fire) {
      //   if (particle.r1 > 45) {
      //     ctx.fillStyle = "red";
      //   } else if (particle.r1 > 20 && particle.r1 <= 45) {
      //     ctx.fillStyle = "orange";
      //   } else if (particle.r1 > 5 && particle.r1 <= 20) {
      //     ctx.fillStyle = "yellow";
      //   } else {
      //     ctx.fillStyle = "white";
      //   }
      // }
      //
      // ctx.fillRect(x, y, 1, 1);
    }

    ctx.putImageData(imageData, 0, 0);
  }
}
