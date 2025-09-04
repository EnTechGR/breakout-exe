let gameScreen;
let paddle;
let inputHandler;

let lastTime = 0;
let frameCount = 0;
let fps = 0;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  paddle.update(deltaTime, inputHandler);

  frameCount++;
  if (frameCount % GAME_CONSTANTS.FPS_LOG_INTERVAL === 0) {
    fps = Math.round(1000 / deltaTime);
    console.log(`FPS: ${fps}`);
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  console.log("Arkanoid Game - DOM-based version loaded");
  console.log(`Game screen size: ${GAME_CONSTANTS.SCREEN_WIDTH}x${GAME_CONSTANTS.SCREEN_HEIGHT} pixels`);

  try {
    inputHandler = new InputHandler();
    paddle = new Paddle();
    
    gameScreen = new GameScreen();
    paddle.setGameScreenWidth(gameScreen.width);
    gameScreen.addGameObject(paddle);
    console.log("Paddle ready - use Arrow Keys or A/D to move");

    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("Failed to initialize game:", error);
    document.body.innerHTML = "<div style='color: white; text-align: center; padding: 50px;'>Game failed to load. Please refresh the page.</div>";
    return;
  }
});
