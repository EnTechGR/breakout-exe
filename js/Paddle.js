class Paddle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.element = null;
        
        this.states = {
            SMALL: 'small',
            NORMAL: 'normal', 
            BIG: 'big'
        };
        
        this.sizes = {
            small: { width: 60, height: 15 },
            normal: { width: 100, height: 15 },
            big: { width: 140, height: 15 }
        };
        
        this.currentState = this.states.NORMAL;
        this.x = 350;
        this.y = 560;
        this.speed = 300;
        
        this.createPaddleElement();
        this.updateSize();
    }
    
    createPaddleElement() {
        this.element = document.createElement('div');
        this.element.id = 'paddle';
        this.element.className = this.currentState;
        
        this.gameScreen.appendChild(this.element);
    }
    
    setState(newState) {
        if (this.states[newState.toUpperCase()]) {
            this.currentState = this.states[newState.toUpperCase()];
            this.element.className = this.currentState;
            this.updatePosition();
        }
    }
    
    updateSize() {
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    
    getWidth() {
        return this.sizes[this.currentState].width;
    }
    
    getHeight() {
        return this.sizes[this.currentState].height;
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
            bottom: this.y + this.getHeight()
        };
    }
}