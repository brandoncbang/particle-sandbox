import { Material } from "./material/material";

export type GameConfig = {
  rendering: {
    scale: number;
    backgroundColor: string;
  };
  world: {
    width: number;
    height: number;
    boundary: "solid" | "void"; // | "loop";
  };
  materials: { [key in Material]?: { color: string } };
};
