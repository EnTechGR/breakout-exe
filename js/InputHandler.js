class InputHandler {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            e.preventDefault();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            e.preventDefault();
        });
    }
    
    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }
    
    isLeftPressed() {
        return this.isKeyPressed('arrowleft') || this.isKeyPressed('a');
    }
    
    isRightPressed() {
        return this.isKeyPressed('arrowright') || this.isKeyPressed('d');
    }
}