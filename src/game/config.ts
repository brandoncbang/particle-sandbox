export type GameConfig = {
  rendering: {
    scale: number;
  };
  world: {
    width: number;
    height: number;
    boundary: "solid" | "void"; // | "loop";
  };
};
