class GameScreen {
  constructor() {
    this.element = null;
    this.width = GAME_CONSTANTS.SCREEN_WIDTH;
    this.height = GAME_CONSTANTS.SCREEN_HEIGHT;
    
    this.createGameScreenElement();
  }

  createGameScreenElement() {
    this.element = document.getElementById("gameScreen");
    
    if (!this.element) {
      throw new Error("GameScreen element not found in DOM");
    }

    this.setupGameScreen();
  }

  setupGameScreen() {
    this.element.style.position = "relative";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.border = `${GAME_CONSTANTS.SCREEN_BORDER_WIDTH}px solid ${GAME_CONSTANTS.SCREEN_BORDER_COLOR}`;
    this.element.style.boxShadow = GAME_CONSTANTS.SCREEN_BOX_SHADOW;
    this.element.style.overflow = "hidden";
  }

  appendChild(childElement) {
    if (this.element) {
      this.element.appendChild(childElement);
    }
  }

  removeChild(childElement) {
    if (this.element && childElement.parentNode === this.element) {
      this.element.removeChild(childElement);
    }
  }

  getBounds() {
    return {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    };
  }

  getElement() {
    return this.element;
  }

  addGameObject(gameObject) {
    if (gameObject.element) {
      this.appendChild(gameObject.element);
    }
  }
}