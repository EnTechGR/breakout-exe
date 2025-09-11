class InputHandler {
    constructor() {
        this.keys = {};
        this.keyJustPressed = {};
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (!this.keys[key]) {
                this.keyJustPressed[key] = true;
            }
            this.keys[key] = true;
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
    
    wasKeyJustPressed(key) {
        return !!this.keyJustPressed[key.toLowerCase()];
    }
    
    isEscapeJustPressed() {
        return this.wasKeyJustPressed('escape');
    }
    
    clearJustPressed() {
        this.keyJustPressed = {};
    }
}