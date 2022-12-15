let ball = {
  radius: 12,
  color: "firebrick",

  position: {
    x: 50,
    y: 30,
  },
  velocity: {
    x: 0.1,
    y: 0.1,
  },
};

function input() {}

function process(delta: number) {
  ball.position.x += ball.velocity.x * delta;
  ball.position.y += ball.velocity.y * delta;

  if (
    ball.position.x + ball.radius > 300 ||
    ball.position.x - ball.radius < 0
  ) {
    ball.velocity.x *= -1;
  }
  if (
    ball.position.y + ball.radius > 200 ||
    ball.position.y - ball.radius < 0
  ) {
    ball.velocity.y *= -1;
  }
}

function render(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "cornflowerblue";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function setUpGame(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Couldn't get the canvas context.");
    return;
  }

  const timeStep = 1.0 / 60.0;

  let previousTime = 0.0;
  let lag = 0.0;

  const loop = (currentTime: DOMHighResTimeStamp) => {
    const delta = currentTime - previousTime;

    lag += delta;

    previousTime = currentTime;

    input();

    while (lag >= timeStep) {
      process(timeStep);

      lag -= timeStep;
    }

    render(ctx);

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame((time: DOMHighResTimeStamp) => {
    previousTime = time;

    window.requestAnimationFrame(loop);
  });
}

export { setUpGame };
