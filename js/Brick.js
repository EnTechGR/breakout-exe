// Brick.js
class Brick {
    /**
     * Defines the different material types, their hit points, and the sprite sheet coordinates
     * provided by the user.
     * The values for 'x', 'y', 'width', and 'height' define the location of the texture
     * within the single sprite sheet image.
     */
    static MATERIALS = {
        // --- Core Bricks ---
        UNBREAKABLE: { // Using the Metal/Gray smooth block (Index 1)
            health: Infinity,
            sprites: [{ x: 1, y: 1, width: 24, height: 10 }]
        },
        WOOD: { // Using Dark wood plank (Index 2) and Light wood plank (Index 3)
            health: 2,
            sprites: [
                { x: 27, y: 1, width: 24, height: 10 }, // Full health
                { x: 53, y: 1, width: 24, height: 10 }  // Cracked state
            ]
        },
        CRYSTAL: { // Using the Purple crystal blocks (Index 4, 5) and (Index 9, 10)
            health: 2,
            sprites: [
                { x: 79, y: 1, width: 24, height: 10 }, // Full health (smooth)
                { x: 105, y: 1, width: 24, height: 10 }  // Damaged state (patterned)
            ]
        },
        FIREWALL: { // Using the Yellow-orange crack patterns (Index 6, 11, 12)
            health: 3,
            sprites: [
                { x: 131, y: 1, width: 32, height: 10 }, // Full health
                { x: 53, y: 13, width: 24, height: 10 }, // Chipped
                { x: 79, y: 13, width: 24, height: 10 }  // Cracked
            ]
        },
        MOSS: { // Using the Small green moss block (Index 7)
            health: 1,
            sprites: [{ x: 167, y: 1, width: 12, height: 12 }]
        },
        // For the Glitch Zone, using the Blue ice crack pattern (Index 13, 17, 19, 20, 22)
        GLITCH: {
            health: 3,
            sprites: [
                { x: 131, y: 15, width: 28, height: 12 }, // Full health (from user's table, index 13)
                { x: 105, y: 25, width: 24, height: 10 }, // Medium health (index 17)
                { x: 79, y: 37, width: 24, height: 10 }   // Low health (index 20)
            ]
        }
    };

    /**
     * Creates a new Brick instance.
     * @param {number} x The x-coordinate of the brick's top-left corner on the canvas.
     * @param {number} y The y-coordinate of the brick's top-left corner on the canvas.
     * @param {number} width The width of the brick on the canvas.
     * @param {number} height The height of the brick on the canvas.
     * @param {string} material The type of material ('UNBREAKABLE', 'WOOD', 'CRYSTAL', etc.).
     * @param {ImageLoader} imageLoader An instance of the ImageLoader with the sprite sheet.
     */
    constructor(x, y, width, height, material, imageLoader) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const materialConfig = Brick.MATERIALS[material.toUpperCase()] || Brick.MATERIALS.WOOD;

        this.health = materialConfig.health;
        this.isDestroyed = false;

        this.sprites = materialConfig.sprites;
        this.spriteIndex = 0; // Index of the current sprite to display
        this.spriteSheet = imageLoader.spriteSheet; // Reference to the loaded sprite sheet image
    }

    /**
     * Handles a hit from the ball.
     * @returns {boolean} Returns true if the brick is destroyed, otherwise false.
     */
    hit() {
        if (!this.isDestroyed) {
            this.health--;
            if (this.health <= 0) {
                this.isDestroyed = true;
                return true;
            }
            if (this.spriteIndex < this.sprites.length - 1) {
                this.spriteIndex++;
            }
        }
        return false;
    }

    /**
     * Draws the brick on the specified 2D rendering context using the sprite sheet.
     * @param {CanvasRenderingContext2D} ctx The rendering context of the game.
     */
    draw(ctx) {
        if (!this.isDestroyed && this.spriteSheet) {
            const sprite = this.sprites[this.spriteIndex];
            
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
}
