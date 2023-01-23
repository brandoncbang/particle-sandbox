import { Material } from "./material/material";
import { config } from "../../game.config";

function setUpMaterialSelectionButtons(container: HTMLElement) {
  let callbacks: ((material: Material) => void)[] = [];

  const onMaterialSelected = (callback: (material: Material) => void) => {
    callbacks.push(callback);
  };

  let buttons: HTMLButtonElement[] = [];

  for (const key of Object.keys(Material)) {
    if (typeof Material[key as keyof typeof Material] === "string") {
      continue;
    }

    const material = Material[key as keyof typeof Material];

    let button = document.createElement("button");
    button.style.setProperty(
      "--material-color",
      config.materials[material]?.color ?? "magenta"
    );
    button.textContent = key;

    button.addEventListener("click", (_) => {
      buttons.forEach((button) => button.classList.remove("selected"));
      button.classList.add("selected");

      callbacks.forEach((callback) =>
        callback(Material[key as keyof typeof Material])
      );
    });

    if (material === Material.Sand) {
      button.classList.add("selected");
    }

    buttons.push(button);
    container.appendChild(button);
  }

  return { onMaterialSelected };
}

export function setUpUi(container: HTMLElement) {
  return {
    ...setUpMaterialSelectionButtons(
      container.querySelector("#materials") as HTMLDivElement
    ),
  };
}
