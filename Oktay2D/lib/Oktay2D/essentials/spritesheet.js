import { Rectangle } from "../graphics/rectangle.js";
import { WaitFor } from "../index.js";
import { log } from "./debugger.js";
import { generateUniqueID } from "./generateUniqueId.js";
import { RenderObject } from "./renderobject.js";

/**
 * @typedef CutFramesDefinition
 * @property {Array<Array<HTMLImageElement>>} frames
 * @property {number} frameWidth
 * @property {number} frameHeight
 */

/**
 * @typedef CutEntireImageToSpritesOptionsDefinitions
 * @property {number} cutInterval
 * @property {boolean} useLogger
 */

/**
 * Callback when progress has been made.
 *
 * @callback CutOnProgressCallback
 * @param {number} estimatedTime Estimated time.
 * @param {number} loadedFrames Loaded and cut frames
 * @param {string} loadFramesInPercentage Loaded and cut frames but in percentage.
 */

/**
 * @typedef CutEntireImageToSpritesResponse
 * @property {number} frames 
 * @property {number} framesLength 
 * @property {{width: {number}, height: {number}}} frameDimension 
 */



/**
 * Cut the given spritesheet image into seperate images.
 * @param {HTMLImageElement} image Spritesheet image.
 * @param {number} horizontalFrames Length of horizontal frames.
 * @param {number} verticalFrames Length of vertical frames.
 * @returns {CutFramesDefinition}
 */
export async function CutImageToSprites(image, horizontalFrames, verticalFrames) {

    if (!(image instanceof HTMLImageElement)) throw new Error("The given argument (as image) is not a HTMLImage element.");
    if (typeof horizontalFrames !== "number") throw new Error("The given argument (as horizontalFrames) has not been specified as a number.");
    if (typeof verticalFrames !== "number") throw new Error("The given argument (as verticalFrames) has not been specified as a number.");

    const cutFrames = new Array();

    function checkCutState() {

        let finishedFrames = [];

        if (cutFrames.length == verticalFrames) {

            for (var i = 0; i < cutFrames.length; i++) {

                if (cutFrames[i].length === horizontalFrames) finishedFrames.push(cutFrames[i]);

            }

            if (finishedFrames.length == verticalFrames) {
                return cutFrames;
            } else {
                return false;
            }
        }


    }

    return new Promise(function (resolve, reject) {

        let tempCanvas = document.createElement("canvas"),
            tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });

        tempCanvas.width = image.width;
        tempCanvas.height = image.height;

        tempCanvas.style = "display: none !important; opacity: 0 !important;"
        tempCanvas.classList = "temp-ctx-sprite-" + generateUniqueID(18).id;

        tempCanvas.setAttribute("data-id", generateUniqueID(24).id);
        tempCanvas.setAttribute("data-type", "canvas-spritesheet-cutter");
        tempCanvas.setAttribute("data-spawndate", Date.now());

        document.body.appendChild(tempCanvas);

        if (tempCtx === null) throw new Error("Failed to cut spritesheet since the canvas rendering context cannot be initialized.");

        // Draw the image in the canvas.
        tempCtx.drawImage(image, 0, 0);

        let frameWidth = image.width / horizontalFrames,
            frameHeight = image.height / verticalFrames;

        for (let y = 0; y < verticalFrames; y++) {

            const cutHorizontalFrames = [];

            for (let x = 0; x < horizontalFrames; x++) {

                let imgCanvas = document.createElement("canvas"),
                    imgCtx = imgCanvas.getContext("2d"),
                    imgEm = document.createElement("img");

                imgCanvas.width = frameWidth;
                imgCanvas.height = frameHeight;

                imgCtx.putImageData(tempCtx.getImageData(x * frameWidth, y * frameHeight, frameWidth, frameHeight), 0, 0);

                imgEm.src = imgCanvas.toDataURL("image/png");
                // imgEm.src = imgCanvas.toDataURL("image/png");

                imgEm.addEventListener("load", function () {
                    cutHorizontalFrames.push(imgEm);

                    imgCanvas = null;
                    imgCtx = null;
                    imgEm = null;

                    const state = checkCutState();

                    if (state) resolve({
                        frames: state,
                        frameWidth: frameWidth,
                        frameHeight: frameHeight
                    });


                });
            }

            cutFrames.push(cutHorizontalFrames);
        }
    });

}

/**
 * Cut an entire image into seperate frames.
 * @param {HTMLImageElement} image Provided spritesheet image you'd like to cut.
 * @param {number} horizontalFrames Length of horizontal frames.
 * @param {number} verticalFrames Length of vertical frames.
 * @param {CutEntireImageToSpritesOptionsDefinitions | null} options Function methods.
 * @param {CutOnProgressCallback | null} onProgressCallback
 * @returns {CutEntireImageToSpritesResponse}
 */
export async function CutEntireImageToSprites(image, horizontalFrames, verticalFrames, options, onProgressCallback) {

    if (!(image instanceof HTMLImageElement)) throw new Error("The given argument (as image) is not a HTMLImage element.");
    if (typeof horizontalFrames !== "number") throw new Error("The given argument (as horizontalFrames) has not been specified as a number.");
    if (typeof verticalFrames !== "number") throw new Error("The given argument (as verticalFrames) has not been specified as a number.");

    // ========= Definitions =========

    const _options = { ...options }, // Create an empty object and add all existing properties from the 'options' argument object into this one.
        cutFrames = new Array(), // Create a new empty array.
        imageWidth = image.width, // Defined image width.
        imageHeight = image.height, // Define image height.
        frameWidth = imageWidth / horizontalFrames, // Calculate frame width.
        frameHeight = imageHeight / verticalFrames, // Calculate frame height.
        maxFrames = horizontalFrames * verticalFrames, // Calculate max amount of frames.
        start = Date.now(); // Define process start time.

    if (_options.useLogger) log("Image Frame Cutter", `Resolved image data: \n
    imageWidth: ${imageWidth}
    imageHeight: ${imageHeight}
    frameWidth: ${frameWidth}
    frameHeight: ${frameHeight}
    maxFrames: ${maxFrames}
    `);
   
    if (_options.useLogger) log("Image Frame Cutter", "Cutting spritesheet...");



    // ========= Intialization process =========

    // Create a temporary canvas and context to draw the image on.
    let mainCanvas = document.createElement("canvas"),
        ctx = mainCanvas.getContext("2d", {willReadFrequently: true});

    // Throw error if context cannot be initialized.
    if (ctx === null) throw new Error("Failed to cut entire image to sprites since the CanvasRenderingsContext2D cannot be initialized.");


    // Set important attributes to canvas.
    mainCanvas.classList.add("spritesheet-cutter-canvas", "hidden");
    mainCanvas.style = "display: none !important; opacity: 0 !important; visibility: hidden !important";

    // Set canvas dimension to the image size.
    mainCanvas.width = imageWidth;
    mainCanvas.height = imageHeight;



    // ========= Pre drawing process =========

    // Save the current canvas state.
    ctx.beginPath();

    // Draw the image.
    ctx.drawImage(image, 0, 0, imageWidth, imageHeight);


    document.body.appendChild(mainCanvas);

    // ========= Cut process in a promise =========
    return new Promise(async function (resolve, reject) {

        function checkResult() {

            if (cutFrames.length === maxFrames) resolve({
                processDuration: Date.now() - start,
                frames: cutFrames,
                framesLength: cutFrames.length,
                frameDimension: {
                    width: frameWidth,
                    height: frameHeight
                }
            });

        }

        // ========= Main cutting process =========

        for (let x = 0; x < horizontalFrames; x++) { // Loop through horizontal frames.

            for (let y = 0; y < verticalFrames; y++) { // Loop through vertical frames.

                let frameCanvas = document.createElement("canvas"), // Create a temporary frame canvas.
                    frameCtx = frameCanvas.getContext("2d", {willReadFrequently: true}), // Create a temporary canvs context.
                    frameData = ctx.getImageData(x * frameWidth, y * frameHeight, frameWidth, frameHeight); // Get the image data from the main canvas based on the frame x and y.

                if (_options.useLogger) log("Image Frame Cutter", `Gathered image data: \n
                    Frame x: ${x};
                    Frame y: ${y};
                    Position: ${x * frameWidth} - ${y * frameHeight};
                    Estimated time: ${Date.now() - start};
                `);

                // Set frame canvas attributes.
                frameCanvas.style = "display: none !important; opacity: 0 !important; visibility: hidden !important;";

                // Set dimesion to frame size.
                frameCanvas.width = frameWidth;
                frameCanvas.height = frameHeight;

                // Save canvas drawing state.
                frameCtx.save();
                frameCtx.beginPath();

                // Draw the gathered image data.
                frameCtx.putImageData(ctx.getImageData(x * frameWidth, y * frameHeight, frameWidth, frameHeight), 0, 0);

                // Restore previous saved canvas state.
                frameCtx.restore();


                // Initialize new image.
                let frameImage = new Image();

                // Convert frame canvas to image and load it into canvas.
                frameImage.src = frameCanvas.toDataURL("image/png");

                // Event when the image has been loaded, may take a while depending on the size of the image.
                frameImage.addEventListener("load", function () {

                    // Set every temporary frame variable to null to save cache memory.
                    frameCanvas = null;
                    frameCtx = null;
                    frameData = null;

                    // Check end result state.
                    checkResult();

                    if (typeof onProgressCallback === "function") onProgressCallback({
                        estimatedTime: Date.now() - start,
                        loadedFrames: cutFrames.length,
                        loadFramesInPercentage: 100 / maxFrames * cutFrames.length
                    });
                });

                // Already push the image to the array with cut frames.
                cutFrames.push(frameImage);


                if (typeof _options.cutInterval === "number") await WaitFor(typeof _options.cutInterval === "number" ? _options.cutInterval : 200);
            }

            // Wait for seconds to execute the next process operation.
            if (typeof _options === "number") await WaitFor(typeof _options.cutInterval === "number" ? _options.cutInterval : 200);
        }

        // Set the main canvas and its context to null to save cache memory.
        mainCanvas = null;
        ctx = null;

    });

}

export class SpritesheetAnimationController {
    constructor(frames, maxFrames, frameRate) {

        this.frames = frames;
        this.maxFrames = maxFrames;
        this.frameRate = frameRate;

        this.animationID = generateUniqueID(18).id;
        this.startTimestamp = Date.now();

        this.frameX = 0;
        this.frameY = 0;


        this.tick = 0;
    }
}

export class SpritesheetAnimator {

    // Definitions.

    /**
     * Overrides existing animations.
     * @type {boolean}
     */
    overrideAnimations = false;
    /**
     * Array with frames.
     * @type {Array<<HTMLImageElement>>}
     */
    frames;
    /**
     * Frame width.
     * @type {number}
     */
    frameWidth;
    /**
     * Frame width.
     * @type {number}
     */
    frameHeight;
    /**
     * Applied render object.
     * @type {Rectangle} */
    appliedRenderObject = null;

    /**
     * Creates a new spritesheet animator, allowing to animate sprites in a graphical element.
     * @param {CutFramesDefinition} frames Array with cut sprites.
     */
    constructor(sprites) {

        if (typeof frames === "undefined") throw new Error("The given argument (as frames) has not been specified as an array.");
       
        this.frames = sprites.frames;

        this.frameWidth = sprites.frameWidth;
        this.frameHeight = sprites.frameHeight;

        this.animations = {};
    }
    /**
     * Creates an animation with a specified range.
     * @param {string} animationName Name of the animation. For example: "doing-a-360"
     * @param {number} frameYIndex Starting y index of the array with frames.
     * @param {number} frameXIndex Starting x index of the array with frames, based on the y index.
     * @param {number} frameRange Length of frames.
     * @param {number} frameRate Frame rate, the lower means the faster.
     */
    CreateAnimation(animationName, frameYIndex, frameXIndex, frameRange, frameRate) {

        if (typeof animationName !== "string") throw new Error("The given argument (as animationName) has not been specified as a string.");
        if (typeof frameYIndex !== "number") throw new Error("The given argument (as frameYIndex) has not been specified as a number.");
        if (typeof frameXIndex !== "number") throw new Error("The given argument (as frameXIndex) has not been specified as a number.");
        if (typeof frameRange !== "number") throw new Error("The given argument (as frameRange) has not been specified as a number.");

        if (typeof this.animations[animationName] !== "undefined" && !this.overrideAnimations) throw new Error(`Cannot create animation since a animation named ${animationName} already exist.`);

        const frames = [];

        for (let i = 0; i < frameRange; i++) {

            frames.push(this.frames[frameYIndex][frameXIndex + i]);

        }

        this.animations[animationName] = frames;

        return new SpritesheetAnimationController(frames, frames.length, frameRate);
    }
}