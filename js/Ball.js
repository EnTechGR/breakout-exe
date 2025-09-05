class Ball {
  constructor() {
    this.element = null;
    this.x = GAME_CONSTANTS.BALL_DEFAULT_POSITION.X;
    this.y = GAME_CONSTANTS.BALL_DEFAULT_POSITION.Y;
    this.vx = GAME_CONSTANTS.BALL_DEFAULT_VELOCITY.X;
    this.vy = GAME_CONSTANTS.BALL_DEFAULT_VELOCITY.Y;
    this.size = GAME_CONSTANTS.BALL_SIZE;
    this.gameScreenWidth = GAME_CONSTANTS.SCREEN_WIDTH;
    this.gameScreenHeight = GAME_CONSTANTS.SCREEN_HEIGHT;
    
    this.createBallElement();
  }

  createBallElement() {
    this.element = document.createElement("div");
    this.element.id = "ball";
    this.element.className = "ball";

    this.element.style.position = "absolute";
    this.element.style.width = this.size + "px";
    this.element.style.height = this.size + "px";
    this.element.style.borderRadius = "50%";
    
    this.element.style.zIndex = "1000";
    
    this.element.style.backgroundImage = `url(${GAME_CONSTANTS.ASSETS.SPRITE_SHEET})`;
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.imageRendering = "pixelated";
    
    const sprite = GAME_CONSTANTS.BALL_SPRITE_POSITION;
    this.element.style.backgroundPosition = `-${sprite.x}px -${sprite.y}px`;
    
    console.log("Ball created at position:", this.x, this.y);
    console.log("Ball sprite position:", sprite);
    
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  update(deltaTime) {
    const deltaSeconds = deltaTime / 1000;
    
    this.x += this.vx * deltaSeconds;
    this.y += this.vy * deltaSeconds;
    
    if (this.x <= 0) {
      this.x = 0;
      this.vx = Math.abs(this.vx);
    }
    
    if (this.x >= this.gameScreenWidth - this.size) {
      this.x = this.gameScreenWidth - this.size;
      this.vx = -Math.abs(this.vx);
    }
    
    if (this.y <= 0) {
      this.y = 0;
      this.vy = Math.abs(this.vy);
    }
    
    this.updatePosition();
  }

  checkPaddleCollision(paddle) {
    const ballBounds = this.getBounds();
    const paddleBounds = paddle.getBounds();
    
    if (ballBounds.right >= paddleBounds.left && 
        ballBounds.left <= paddleBounds.right && 
        ballBounds.bottom >= paddleBounds.top && 
        ballBounds.top <= paddleBounds.bottom) {
      
      if (this.vy > 0) {
        this.vy = -Math.abs(this.vy);
        this.y = paddleBounds.top - this.size;
        
        const paddleCenter = paddleBounds.left + (paddleBounds.right - paddleBounds.left) / 2;
        const ballCenter = this.x + this.size / 2;
        const hitOffset = (ballCenter - paddleCenter) / ((paddleBounds.right - paddleBounds.left) / 2);
        
        this.vx = hitOffset * 150;
      }
    }
  }

  reset() {
    this.x = GAME_CONSTANTS.BALL_DEFAULT_POSITION.X;
    this.y = GAME_CONSTANTS.BALL_DEFAULT_POSITION.Y;
    this.vx = GAME_CONSTANTS.BALL_DEFAULT_VELOCITY.X;
    this.vy = GAME_CONSTANTS.BALL_DEFAULT_VELOCITY.Y;
    this.updatePosition();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.size,
      top: this.y,
      bottom: this.y + this.size
    };
  }

  isOutOfBounds() {
    return this.y > this.gameScreenHeight;
  }

  setGameScreenDimensions(width, height) {
    this.gameScreenWidth = width;
    this.gameScreenHeight = height;
  }
}