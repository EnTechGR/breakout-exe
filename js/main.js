const gameScreen = document.getElementById("gameScreen");
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
  if (frameCount % 60 === 0) {
    fps = Math.round(1000 / deltaTime);
    console.log(`FPS: ${fps}`);
  }

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  console.log("Arkanoid Game - DOM-based version loaded");
  console.log("Game screen size: 800x600 pixels");

  inputHandler = new InputHandler();
  paddle = new Paddle(gameScreen);
  console.log("Paddle ready - use Arrow Keys or A/D to move");

  requestAnimationFrame(gameLoop);
});
