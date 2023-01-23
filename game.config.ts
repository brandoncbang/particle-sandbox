import { GameConfig } from "./src/game/config";
import { Material } from "./src/game/material/material";

export const config: GameConfig = {
  rendering: {
    scale: 3,
    backgroundColor: "cornflowerblue",
  },
  world: {
    width: 300,
    height: 200,
    boundary: "solid",
  },
  materials: {
    [Material.Empty]: {
      color: "cornflowerblue",
    },
    [Material.Wood]: {
      color: "peru",
    },
    [Material.Brick]: {
      color: "crimson",
    },
    [Material.Sand]: {
      color: "khaki",
    },
    [Material.Gunpowder]: {
      color: "dimgray",
    },
    [Material.Water]: {
      color: "blue",
    },
    [Material.Oil]: {
      color: "black",
    },
    [Material.Steam]: {
      color: "whitesmoke",
    },
    [Material.Fire]: {
      color: "orange",
    },
  },
};
