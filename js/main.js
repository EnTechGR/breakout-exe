let gameScreen;
let paddle;
let ball;
let inputHandler;
let brickManager;

let lastTime = 0;
let frameCount = 0;
let fps = 0;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  paddle.update(deltaTime, inputHandler);
  ball.update(deltaTime);
  ball.checkPaddleCollision(paddle);

  // Check brick collisions
  const brickCollision = brickManager.checkCollisions(ball);
  if (brickCollision.hit) {
    console.log(`Brick hit!`);
  }

  frameCount++;
  if (frameCount % GAME_CONSTANTS.FPS_LOG_INTERVAL === 0) {
    fps = Math.round(1000 / deltaTime);
    console.log(`FPS: ${fps}`);
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  console.log("Arkanoid Game - DOM-based version loaded");
  console.log(
    `Game screen size: ${GAME_CONSTANTS.SCREEN_WIDTH}x${GAME_CONSTANTS.SCREEN_HEIGHT} pixels`
  );

  try {
    inputHandler = new InputHandler();
    paddle = new Paddle();
    ball = new Ball();
    brickManager = new BrickManager();

    gameScreen = new GameScreen();
    paddle.setGameScreenWidth(gameScreen.width);
    ball.setGameScreenDimensions(gameScreen.width, gameScreen.height);
    ball.positionOnPaddle(paddle);
    gameScreen.addGameObject(paddle);
    gameScreen.addGameObject(ball);
    brickManager.addBricksToGameScreen(gameScreen);
    console.log("Game ready - use Arrow Keys or A/D to move paddle");

    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("Failed to initialize game:", error);
    document.body.innerHTML =
      "<div style='color: white; text-align: center; padding: 50px;'>Game failed to load. Please refresh the page.</div>";
    return;
  }
});
