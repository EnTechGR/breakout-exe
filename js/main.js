let gameScreen;
let paddle;
let ball;
let inputHandler;
let brickManager;
let gameState;
let menu;

let lastTime = 0;
let frameCount = 0;
let fps = 0;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Handle input for pause/unpause
  if (inputHandler.isEscapeJustPressed()) {
    if (gameState.isPlaying()) {
      pauseGame();
    } else if (gameState.isPaused()) {
      resumeGame();
    }
  }

  // Clear just pressed keys after checking
  inputHandler.clearJustPressed();

  // Only update game logic if playing
  if (gameState.isPlaying()) {
    paddle.update(deltaTime, inputHandler);
    ball.update(deltaTime);
    ball.checkPaddleCollision(paddle);

    // Check brick collisions
    const brickCollision = brickManager.checkCollisions(ball);
    if (brickCollision.hit) {
      console.log(
        `Brick hit! Remaining: ${brickManager.getRemainingBricksCount()}`
      );

      // Check if all bricks are destroyed
      if (brickManager.areAllBricksDestroyed()) {
        levelComplete();
      }
    }

    // Check if ball is out of bounds (game over condition)
    if (ball.isOutOfBounds()) {
      gameOver();
    }

    frameCount++;
    if (frameCount % GAME_CONSTANTS.FPS_LOG_INTERVAL === 0) {
      fps = Math.round(1000 / deltaTime);
      console.log(`FPS: ${fps}`);
    }
  }

  // Always continue the game loop to maintain 60FPS
  requestAnimationFrame(gameLoop);
}

function pauseGame() {
  gameState.setState("paused");
  menu.show("pause");
  console.log("Game paused");
}

function resumeGame() {
  gameState.setState("playing");
  menu.hide();
  console.log("Game resumed");
}

function gameOver() {
  gameState.setState("gameOver");
  menu.show("gameOver");
  console.log("Game over - ball out of bounds");
}

function levelComplete() {
  gameState.setState("levelComplete");
  menu.show("levelComplete");
  console.log("Level complete - all bricks destroyed");
}

function restartGame() {
  // Reset all game objects
  ball.reset(paddle);
  brickManager.reset();
  brickManager.addBricksToGameScreen(gameScreen);

  // Resume playing
  gameState.setState("playing");
  menu.hide();

  console.log("Game restarted");
}

window.addEventListener("load", () => {
  console.log("Arkanoid Game - DOM-based version loaded");
  console.log(
    `Game screen size: ${GAME_CONSTANTS.SCREEN_WIDTH}x${GAME_CONSTANTS.SCREEN_HEIGHT} pixels`
  );

  try {
    // Initialize game state and menu
    gameState = new GameState();
    menu = new Menu();

    // Initialize game objects
    inputHandler = new InputHandler();
    paddle = new Paddle();
    ball = new Ball();
    brickManager = new BrickManager();

    gameScreen = new GameScreen();
    paddle.setGameScreenWidth(gameScreen.width);
    ball.setGameScreenDimensions(gameScreen.width, gameScreen.height);
    ball.positionOnPaddle(paddle);

    // Add game objects to screen
    gameScreen.addGameObject(paddle);
    gameScreen.addGameObject(ball);
    brickManager.addBricksToGameScreen(gameScreen);

    // Add menu to game screen
    gameScreen.element.appendChild(menu.element);

    // Set menu callbacks
    menu.setCallbacks(resumeGame, restartGame);

    console.log(
      "Game ready - use Arrow Keys or A/D to move paddle, ESC to pause"
    );

    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("Failed to initialize game:", error);
    document.body.innerHTML =
      "<div style='color: white; text-align: center; padding: 50px;'>Game failed to load. Please refresh the page.</div>";
    return;
  }
});

// let gameScreen;
// let paddle;
// let ball;
// let inputHandler;
// let brickManager;

// let lastTime = 0;
// let frameCount = 0;
// let fps = 0;

// function gameLoop(currentTime) {
//   const deltaTime = currentTime - lastTime;
//   lastTime = currentTime;

//   paddle.update(deltaTime, inputHandler);
//   ball.update(deltaTime);
//   ball.checkPaddleCollision(paddle);

//   // Check brick collisions
//   const brickCollision = brickManager.checkCollisions(ball);
//   if (brickCollision.hit) {
//     console.log(`Brick hit!`);
//   }

//   frameCount++;
//   if (frameCount % GAME_CONSTANTS.FPS_LOG_INTERVAL === 0) {
//     fps = Math.round(1000 / deltaTime);
//     console.log(`FPS: ${fps}`);
//   }

//   requestAnimationFrame(gameLoop);
// }

// window.addEventListener("load", () => {
//   console.log("Arkanoid Game - DOM-based version loaded");
//   console.log(
//     `Game screen size: ${GAME_CONSTANTS.SCREEN_WIDTH}x${GAME_CONSTANTS.SCREEN_HEIGHT} pixels`
//   );

//   try {
//     inputHandler = new InputHandler();
//     paddle = new Paddle();
//     ball = new Ball();
//     brickManager = new BrickManager();

//     gameScreen = new GameScreen();
//     paddle.setGameScreenWidth(gameScreen.width);
//     ball.setGameScreenDimensions(gameScreen.width, gameScreen.height);
//     ball.positionOnPaddle(paddle);
//     gameScreen.addGameObject(paddle);
//     gameScreen.addGameObject(ball);
//     brickManager.addBricksToGameScreen(gameScreen);
//     console.log("Game ready - use Arrow Keys or A/D to move paddle");

//     requestAnimationFrame(gameLoop);
//   } catch (error) {
//     console.error("Failed to initialize game:", error);
//     document.body.innerHTML =
//       "<div style='color: white; text-align: center; padding: 50px;'>Game failed to load. Please refresh the page.</div>";
//     return;
//   }
// });
