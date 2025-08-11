/**
 * @fileoverview Defines the Paddle class for the BREAKOUT.EXE game.
 * The paddle can have three different sizes: normal, wide, and small,
 * each with a corresponding sprite on the sprite sheet.
 */

class Paddle {
    /**
     * Defines the different paddle sizes and their corresponding sprite sheet coordinates.
     * These constants are used to set the paddle's visual appearance and dimensions.
     */
    static SIZES = {
        NORMAL: {
            x: 152,
            y: 79,
            width: 128,
            height: 25
        },
        WIDE: {
            x: 0,
            y: 111,
            width: 161,
            height: 25
        },
        SMALL: {
            x: 184,
            y: 111,
            width: 96,
            height: 25
        }
    };

    /**
     * Creates a new Paddle instance.
     * @param {number} x The initial x-coordinate of the paddle's top-left corner on the canvas.
     * @param {number} y The initial y-coordinate of the paddle's top-left corner on the canvas.
     * @param {ImageLoader} imageLoader The ImageLoader instance with the loaded sprite sheet.
     */
    constructor(x, y, imageLoader) {
        this.x = x;
        this.y = y;
        
        // Default to the normal paddle size on initialization
        this.currentSize = Paddle.SIZES.NORMAL;
        this.width = this.currentSize.width;
        this.height = this.currentSize.height;

        this.spriteSheet = imageLoader.spriteSheet;
    }

    /**
     * Draws the paddle on the specified 2D rendering context using the sprite sheet.
     * @param {CanvasRenderingContext2D} ctx The rendering context of the game.
     */
    draw(ctx) {
        if (this.spriteSheet) {
            const sprite = this.currentSize;
            
            ctx.drawImage(
                this.spriteSheet, // The image object to use
                sprite.x,         // The x-coordinate of the top-left corner of the source rectangle
                sprite.y,         // The y-coordinate of the top-left corner of the source rectangle
                sprite.width,     // The width of the source rectangle
                sprite.height,    // The height of the source rectangle
                this.x,           // The x-coordinate of the destination rectangle on the canvas
                this.y,           // The y-coordinate of the destination rectangle on the canvas
                this.width,       // The width of the destination rectangle
                this.height       // The height of the destination rectangle
            );
        }
    }
    
    /**
     * Sets the paddle's size to the normal dimensions.
     */
    setToNormal() {
        this.currentSize = Paddle.SIZES.NORMAL;
        this.width = this.currentSize.width;
        this.height = this.currentSize.height;
    }

    /**
     * Sets the paddle's size to the wide dimensions, typically for a bonus.
     */
    setToWide() {
        this.currentSize = Paddle.SIZES.WIDE;
        this.width = this.currentSize.width;
        this.height = this.currentSize.height;
    }

    /**
     * Sets the paddle's size to the small dimensions, typically for a penalty.
     */
    setToSmall() {
        this.currentSize = Paddle.SIZES.SMALL;
        this.width = this.currentSize.width;
        this.height = this.currentSize.height;
    }
}
