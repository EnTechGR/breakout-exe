const gameScreen = document.getElementById("gameScreen");

function setBackgroundImage(imagePath) {
  gameScreen.style.backgroundImage = `url(${imagePath})`;
}

function removeBackgroundImage() {
  gameScreen.style.backgroundImage = "none";
}

let lastTime = 0;
let frameCount = 0;
let fps = 0;

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

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
  requestAnimationFrame(gameLoop);
});
