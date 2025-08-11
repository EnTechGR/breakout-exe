/**
 * @fileoverview Defines the Brick class for the BREAKOUT.EXE game, now with image textures.
 * This version of the Brick class uses an array of images to represent different
 * damage states, providing a more dynamic visual experience.
 */

// We'll create a simple helper class to pre-load images.
// This is a best practice to avoid performance issues during gameplay.
class ImageLoader {
    constructor() {
        this.images = {};
        this.loadedCount = 0;
        this.totalCount = 0;
    }

    /**
     * Loads a single image.
     * @param {string} name The name to store the image under.
     * @param {string} url The URL path to the image file.
     * @returns {Promise<void>} A promise that resolves when the image is loaded.
     */
    loadImage(name, url) {
        return new Promise((resolve, reject) => {
            this.totalCount++;
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                this.loadedCount++;
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                this.loadedCount++;
                reject(new Error(`Failed to load image at ${url}`));
            };
            img.src = url;
        });
    }

    /**
     * Checks if all images have been loaded.
     * @returns {boolean} True if all images are loaded, false otherwise.
     */
    isDone() {
        return this.loadedCount === this.totalCount;
    }

    /**
     * Gets a loaded image by its name.
     * @param {string} name The name of the image.
     * @returns {HTMLImageElement|undefined} The loaded image or undefined.
     */
    getImage(name) {
        return this.images[name];
    }
}


class Brick {
    /**
     * Defines the different material types and their corresponding hit points and image paths.
     * These constants are used to initialize a new brick.
     */
    static MATERIALS = {
        // Paths to images for each damage state
        GLASS: { 
            health: 1, 
            images: [
                './assets/images/glass_brick.png' // Image for glass brick
            ]
        },
        WOOD: { 
            health: 2, 
            images: [
                './assets/images/wood_brick_full.png', // Image for full health
                './assets/images/wood_brick_cracked.png' // Image after one hit
            ]
        },
        CONCRETE: { 
            health: 3, 
            images: [
                './assets/images/concrete_brick_full.png', // Image for full health
                './assets/images/concrete_brick_chipped.png', // After one hit
                './assets/images/concrete_brick_cracked.png' // After two hits
            ]
        }
    };

    /**
     * Creates a new Brick instance.
     * @param {number} x The x-coordinate of the brick's top-left corner.
     * @param {number} y The y-coordinate of the brick's top-left corner.
     * @param {number} width The width of the brick.
     * @param {number} height The height of the brick.
     * @param {string} material The type of material for the brick ('GLASS', 'WOOD', or 'CONCRETE').
     * @param {ImageLoader} imageLoader An instance of the ImageLoader to get loaded images.
     */
    constructor(x, y, width, height, material, imageLoader) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        // Find the material configuration based on the input string.
        const materialConfig = Brick.MATERIALS[material.toUpperCase()] || Brick.MATERIALS.GLASS;
        
        this.material = materialConfig;
        this.health = materialConfig.health;
        this.isDestroyed = false; // Flag to check if the brick is broken
        
        this.images = materialConfig.images.map(imagePath => imageLoader.getImage(imagePath));
        this.imageIndex = 0; // Index of the current image to display
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
            // Update the image index to show the next damage state
            if (this.imageIndex < this.images.length - 1) {
                this.imageIndex++;
            }
        }
        return false;
    }

    /**
     * Draws the brick on the specified 2D rendering context.
     * @param {CanvasRenderingContext2D} ctx The rendering context of the game.
     */
    draw(ctx) {
        if (!this.isDestroyed && this.images[this.imageIndex]) {
            // Draw the current image for the brick's health state
            ctx.drawImage(
                this.images[this.imageIndex], 
                this.x, 
                this.y, 
                this.width, 
                this.height
            );
        }
    }
}
