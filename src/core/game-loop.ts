export function startGameLoop(
  inputCallback: () => void,
  processCallback: (delta: number) => void,
  renderCallback: () => void,
  {
    targetFps = 60,
    fpsCounter = null,
  }: { targetFps?: number; fpsCounter?: HTMLElement | null }
) {
  const timestep = (1.0 / targetFps) * 1000;

  let previousTime: DOMHighResTimeStamp;

  const loop = (currentTime: DOMHighResTimeStamp) => {
    const delta = currentTime - previousTime;
    const fps = 1.0 / (delta / 1000.0);

    inputCallback();

    if (delta >= timestep) {
      if (fpsCounter !== null) {
        fpsCounter.textContent = `${fps.toFixed(2)}`;
      }

      previousTime = currentTime - (delta % timestep);

      processCallback(delta);
    }

    renderCallback();

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame((time: DOMHighResTimeStamp) => {
    previousTime = time;

    window.requestAnimationFrame(loop);
  });
}
