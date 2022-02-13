import { Rectangle } from "../graphics/rectangle.js";
import { generateUniqueID } from "./generateUniqueId.js";
import { RenderObject } from "./renderobject.js";

/**
 * @global
 * @typedef CutFramesDefinition
 * @property {Array<Array<HTMLImageElement>>} frames
 * @property {number} frameWidth
 * @property {number} frameHeight
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

export class SpritesheetAnimationController {
    constructor(frames, maxFrames, frameRate) {

        this.frames = frames;
        this.maxFrames = maxFrames;
        this.frameRate = frameRate;

        this.animationID = generateUniqueID(18).id;
        this.startTimestamp = Date.now();

        this.frame = 0;
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