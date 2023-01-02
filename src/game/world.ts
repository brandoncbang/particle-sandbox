import { Material } from "./material";

// type Tuple<T, N extends number, A extends any[] = []> = A extends { length: N }
//   ? A
//   : Tuple<T, N, [...A, T]>;
//
// export type World<X extends number, Y extends number> = Tuple<
//   Tuple<Material, Y, Material[]>,
//   X
// >;

export type World = Material[][];

export function getBlankWorld(width: number, height: number): World {
  return [...Array(width)].map((_) => Array(height).fill(Material.Empty));
}
