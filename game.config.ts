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
      color: {
        r: 100,
        g: 149,
        b: 237,
      },
    },
    [Material.Wood]: {
      color: {
        r: 205,
        g: 133,
        b: 63,
      },
    },
    [Material.Brick]: {
      color: {
        r: 220,
        g: 20,
        b: 60,
      },
    },
    [Material.Sand]: {
      color: {
        r: 240,
        g: 230,
        b: 140,
      },
    },
    [Material.Gunpowder]: {
      color: {
        r: 105,
        g: 105,
        b: 105,
      },
    },
    [Material.Water]: {
      color: {
        r: 0,
        g: 0,
        b: 255,
      },
    },
    [Material.Oil]: {
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
    },
    [Material.Steam]: {
      color: {
        r: 245,
        g: 245,
        b: 245,
      },
    },
    [Material.Fire]: {
      color: {
        r: 255,
        g: 165,
        b: 0,
      },
    },
  },
};
