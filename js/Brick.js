/**
 * @fileoverview Defines the Brick class for the BREAKOUT.EXE game.
 * The Brick class represents a single destructible block with different material types,
 * each having a specific number of hit points.
 */

class Brick {
    /**
     * Defines the different material types and their corresponding hit points.
     * These constants are used to initialize a new brick.
     */
    static MATERIALS = {
        GLASS: { health: 1, color: '#add8e6' }, // Light blue for glass
        WOOD: { health: 2, color: '#a0522d' },  // Sienna for wood
        CONCRETE: { health: 3, color: '#808080' } // Gray for concrete
    };

    /**
     * Creates a new Brick instance.
     * @param {number} x The x-coordinate of the brick's top-left corner.
     * @param {number} y The y-coordinate of the brick's top-left corner.
     * @param {number} width The width of the brick.
     * @param {number} height The height of the brick.
     * @param {string} material The type of material for the brick ('GLASS', 'WOOD', or 'CONCRETE').
     */
    constructor(x, y, width, height, material) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        // Find the material configuration based on the input string.
        const materialConfig = Brick.MATERIALS[material.toUpperCase()] || Brick.MATERIALS.GLASS;
        
        this.material = materialConfig;
        this.health = materialConfig.health;
        this.color = materialConfig.color;
        this.isDestroyed = false; // Flag to check if the brick is broken
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
        }
        return false;
    }

    /**
     * Draws the brick on the specified 2D rendering context.
     * @param {CanvasRenderingContext2D} ctx The rendering context of the game.
     */
    draw(ctx) {
        if (!this.isDestroyed) {
            // A simple way to represent health visually is by changing the color's opacity
            // or by drawing different borders/textures. For this example, we'll just
            // use a solid color.
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Add a simple border to make bricks more distinct
            ctx.strokeStyle = '#000000';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
