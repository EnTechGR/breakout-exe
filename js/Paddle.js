class Paddle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.element = null;

    this.states = {
      SMALL: "small",
      NORMAL: "normal",
      BIG: "big",
    };

    this.sizes = {
      small: { width: 60, height: 15 },
      normal: { width: 100, height: 15 },
      big: { width: 140, height: 15 },
    };

    // Sprite positions for different paddle sizes (from sprite sheet bottom row)
    this.spritePositions = {
      small: { x: 192, y: 116, width: 80, height: 16 },
      normal: { x: 160, y: 84, width: 112, height: 16 },
      big: { x: 4, y: 116, width: 154, height: 16 },
    };

    this.currentState = this.states.NORMAL;
    this.x = 350;
    this.y = 560;
    this.speed = 300;

    this.createPaddleElement();
    this.updateSize();
  }

  createPaddleElement() {
    this.element = document.createElement("div");
    this.element.id = "paddle";
    this.element.className = this.currentState;

    // Set up sprite background
    this.element.style.backgroundImage = "url(assets/BasicArkanoidPack.png)";
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.imageRendering = "pixelated";

    this.gameScreen.appendChild(this.element);
  }

  setState(newState) {
    if (this.states[newState.toUpperCase()]) {
      this.currentState = this.states[newState.toUpperCase()];
      this.element.className = this.currentState;
      this.updateSize();
    }
  }

  updateSize() {
    const sprite = this.spritePositions[this.currentState];

    // Set element dimensions
    this.element.style.width = sprite.width + "px";
    this.element.style.height = sprite.height + "px";

    // Set sprite background position
    this.element.style.backgroundPosition = `-${sprite.x}px -${sprite.y}px`;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  getWidth() {
    return this.spritePositions[this.currentState].width;
  }

  getHeight() {
    return this.spritePositions[this.currentState].height;
  }

  update(deltaTime, inputHandler) {
    const deltaSeconds = deltaTime / 1000;

    if (inputHandler.isLeftPressed()) {
      this.x -= this.speed * deltaSeconds;
    }

    if (inputHandler.isRightPressed()) {
      this.x += this.speed * deltaSeconds;
    }

    this.x = Math.max(0, Math.min(this.x, 796 - this.getWidth()));

    this.updatePosition();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.getWidth(),
      top: this.y,
      bottom: this.y + this.getHeight(),
    };
  }
}
