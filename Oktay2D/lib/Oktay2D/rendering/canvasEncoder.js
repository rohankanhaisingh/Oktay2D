import "../libs/whammyjs/WhammyJS.min.js";

import { CanvasScene } from "../index.js";

/**
 * Checks if the canvas can encode content.
 * @param {HTMLCanvasElement} canvas
 */
function checkEncodingSupport(canvas) {

    if (typeof canvas === "undefined" || !(canvas instanceof HTMLCanvasElement)) throw new Error("Cannot resolve encoding state on canvas since the given argument is not HTMLCanvas element.");

    return canvas.toDataURL("image/webp", 0.1).indexOf("image/webp") > -1;
}

export class FrameCapturer {

    /**
     * Instance that will capture frames from a specific scene and export it as a .webm file.
     * 
     * Can be used when creating animations and save it as a video file.
     * @param {CanvasScene} scene
     */
    constructor(scene) {

        if (!(scene instanceof CanvasScene)) throw new Error(`The given argument (as scene) is not a CanvasScene instance.`);

        if (!(checkEncodingSupport(scene.canvas))) throw new Error("Cannot execute encoding process. Browser may not support this.");
    }
}