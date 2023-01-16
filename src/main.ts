import { setUpGame } from "./game";

setUpGame(
  document.querySelector("#game") as HTMLCanvasElement,
  document.querySelector("#ui") as HTMLDivElement
);
