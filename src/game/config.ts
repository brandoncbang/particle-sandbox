export type GameConfig = {
  world: {
    width: number;
    height: number;
    boundary: "solid" | "void"; // | "loop";
  };
};
