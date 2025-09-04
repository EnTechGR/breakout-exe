class Paddle {
  constructor() {
    this.element = null;
    this.gameScreenWidth = GAME_CONSTANTS.SCREEN_WIDTH;

    // Sprite positions for different paddle sizes (from sprite sheet bottom row)
    this.spritePositions = GAME_CONSTANTS.PADDLE_SPRITE_POSITIONS;

    this.currentState = GAME_CONSTANTS.PADDLE_STATES.NORMAL;
    this.x = GAME_CONSTANTS.PADDLE_DEFAULT_POSITION.X;
    this.y = GAME_CONSTANTS.PADDLE_DEFAULT_POSITION.Y;
    this.speed = GAME_CONSTANTS.PADDLE_SPEEDS.DEFAULT;

    this.createPaddleElement();
    this.updateSize();
  }

  createPaddleElement() {
    this.element = document.createElement("div");
    this.element.id = "paddle";
    this.element.className = this.currentState;

    // Set positioning
    this.element.style.position = "absolute";

    // Set up sprite background
    this.element.style.backgroundImage = `url(${GAME_CONSTANTS.ASSETS.SPRITE_SHEET})`;
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.imageRendering = "pixelated";
  }

  setState(newState) {
    if (GAME_CONSTANTS.PADDLE_STATES[newState.toUpperCase()]) {
      this.currentState = GAME_CONSTANTS.PADDLE_STATES[newState.toUpperCase()];
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

    this.x = Math.max(0, Math.min(this.x, this.gameScreenWidth - this.getWidth()));

    this.updatePosition();
  }

  setGameScreenWidth(width) {
    this.gameScreenWidth = width;
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
