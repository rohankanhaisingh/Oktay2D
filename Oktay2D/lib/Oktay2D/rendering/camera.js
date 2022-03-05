import { CanvasScene, Renderer } from "../index.js";

export class Camera {

    // Private fields/

    /**@type {Renderer} */
    #renderer;

    /**@type {CanvasRenderingContext2D} */
    #ctx;

    /** @type {CanvasScene} */
    #scene;

    /** @type {number} */
    x;

    /** @type {number} */
    y

    /** @type {number} */
    width;

    /** @type {number} */
    height;

    /** @type {number} */
    scaleX;

    /** @type {number} */
    scaleY;

    /** @type {boolean} */
    offscreenRendering;


    /**
     * Creates a camera instance. Allowing to change the perspective of the scene.
     * @param {Renderer} renderer
     */
    constructor(renderer, scene) {

        if (!(renderer instanceof Renderer)) throw new Error("The given argument (as renderer) is not a Renderer instance.");
        if (!(scene instanceof CanvasScene)) throw new Error("The given argument (as scene) is not a CanvasScene instance.");

        // Private fields.
        this.#renderer = renderer;
        this.#scene = scene;
        this.#ctx = renderer.ctx;

        this.width = scene.width;
        this.height = scene.height;

        this.lastCamaraOffset = {
            x: 0,
            y: 0
        }

        // Coordinates.
        this.x = 0;
        this.y = 0;

        // Scale
        this.scaleX = 1;
        this.scaleY = 1;

        this.rotation = 0;

        this.offscreenRendering = true;

        this.events = {};

        renderer.camera = this;
    }

    /**Will project the camera in the scene, giving the view of the camera size. Showing a red border. */
    ProjectCamera() {

        if (typeof this.#ctx === "undefined") return;

        const ctx = this.#ctx;

        ctx.save();
        ctx.beginPath();

        ctx.strokeStyle = "red";
        ctx.lineWidth = 6;

        ctx.strokeRect(this.x, this.y, this.width, this.height);


        ctx.closePath();
        ctx.restore()
    }
    /**
     * Create an event listener.
     * @param {"move"} event
     * @param {Function} callback
     */
    On(event, callback) {

        if (typeof event !== "string") throw new Error("The given argument (as event) is not a string.");

        switch (event) {

            case "move":

                if (typeof callback !== "function") throw new Error("The given argument (as callback) is not a function.");

                this.events["onMove"] = callback;

                return this;

                break;

        }

    }
    /**
     * Adds a direction to the current coordinates.
     * @param {number | null} x
     * @param {number | null} y
     * @returns {Camera}
     */
    AddDirection(x, y) {

        if (typeof this.x === "number") {

            this.lastCamaraOffset.x = this.x;

            this.x -= x;
        }
        if (typeof this.y === "number") {

            this.lastCamaraOffset.y = this.y;

            this.x -= y;
        }

    }
    Set(x, y) {

        if (typeof this.x === "number") {

            this.lastCamaraOffset.x = this.x;

            this.x = -x;
        }
        if (typeof this.y === "number") {

            this.lastCamaraOffset.y = this.y;

            this.x = -y;
        }

    }
}
