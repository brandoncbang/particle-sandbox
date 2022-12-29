export function startGameLoop(
  inputCallback: () => void,
  processCallback: (delta: number) => void,
  renderCallback: () => void,
  timestep: number = 1.0 / 60.0
) {
  let previousTime = 0.0;
  let lag = 0.0;

  const loop = (currentTime: DOMHighResTimeStamp) => {
    const delta = currentTime - previousTime;

    lag += delta;

    previousTime = currentTime;

    inputCallback();

    while (lag >= timestep) {
      processCallback(timestep);

      lag -= timestep;
    }

    renderCallback();

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame((time: DOMHighResTimeStamp) => {
    previousTime = time;

    window.requestAnimationFrame(loop);
  });
}
