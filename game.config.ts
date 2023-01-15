import { GameConfig } from "./src/game/config";
import { Material } from "./src/game/material";

export const config: GameConfig = {
  rendering: {
    scale: 2,
    backgroundColor: "cornflowerblue",
  },
  world: {
    width: 300,
    height: 200,
    boundary: "solid",
  },
  materials: {
    [Material.Empty]: {
      color: "transparent",
    },
    [Material.Sand]: {
      color: "khaki",
    },
  },
};
