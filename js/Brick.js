class Brick {
  constructor(x, y, colorIndex) {
    this.element = null;
    this.x = x;
    this.y = y;
    this.width = GAME_CONSTANTS.BRICK_WIDTH;
    this.height = GAME_CONSTANTS.BRICK_HEIGHT;
    this.colorIndex = colorIndex;
    this.sprite = GAME_CONSTANTS.BRICK_COLORS[colorIndex].sprite;
    this.isDestroyed = false;

    this.createBrickElement();
  }

  createBrickElement() {
    this.element = document.createElement("div");
    this.element.className = "brick";
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.backgroundImage = `url(${GAME_CONSTANTS.ASSETS.SPRITE_SHEET})`;
    this.element.style.backgroundPosition = `-${this.sprite.x}px -${this.sprite.y}px`;
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.imageRendering = "pixelated";

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  }

  destroy() {
    this.isDestroyed = true;
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  checkCollision(ball) {
    if (this.isDestroyed) return false;

    const ballBounds = ball.getBounds();
    const brickBounds = this.getBounds();

    return (
      ballBounds.right >= brickBounds.left &&
      ballBounds.left <= brickBounds.right &&
      ballBounds.bottom >= brickBounds.top &&
      ballBounds.top <= brickBounds.bottom
    );
  }
}

class BrickManager {
  constructor() {
    this.bricks = [];
    this.createBricks();
  }

  createBricks() {
    this.bricks = [];

    for (let row = 0; row < GAME_CONSTANTS.BRICK_ROWS; row++) {
      for (let col = 0; col < GAME_CONSTANTS.BRICK_COLS; col++) {
        const x =
          GAME_CONSTANTS.BRICK_OFFSET_LEFT +
          col * (GAME_CONSTANTS.BRICK_WIDTH + GAME_CONSTANTS.BRICK_PADDING);
        const y =
          GAME_CONSTANTS.BRICK_OFFSET_TOP +
          row * (GAME_CONSTANTS.BRICK_HEIGHT + GAME_CONSTANTS.BRICK_PADDING);

        const colorIndex = row % GAME_CONSTANTS.BRICK_COLORS.length;
        const brick = new Brick(x, y, colorIndex);
        this.bricks.push(brick);
      }
    }
  }

  addBricksToGameScreen(gameScreen) {
    this.bricks.forEach((brick) => {
      if (!brick.isDestroyed) {
        gameScreen.addGameObject(brick);
      }
    });
  }

  checkCollisions(ball) {
    let hitBrick = null;

    for (let brick of this.bricks) {
      if (brick.checkCollision(ball)) {
        hitBrick = brick;
        break;
      }
    }

    if (hitBrick) {
      hitBrick.destroy();

      // Simple collision response - reverse ball's Y velocity
      ball.vy = -ball.vy;

      return {
        hit: true,
        brick: hitBrick,
      };
    }

    return { hit: false };
  }

  reset() {
    this.bricks.forEach((brick) => {
      if (brick.element && brick.element.parentNode) {
        brick.element.parentNode.removeChild(brick.element);
      }
    });
    this.createBricks();
  }
}
