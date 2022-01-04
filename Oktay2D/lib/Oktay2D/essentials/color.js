import { Renderer } from "../index.js";
import { generateUniqueID } from "./generateUniqueId.js";

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(value) {

    if (!Array.isArray(value)) return value;

    return "#" + componentToHex(value[0]) + componentToHex(value[1]) + componentToHex(value[2]);
}

function hexToRgb(value) {

    if (typeof value !== "string") return value;

    if (value.substring(0, 1) !== "#") return value;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);

    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

// Public classes.

export class Color {
    constructor() {

        this.id = generateUniqueID(18).id;
        this.creationTimeStamp = Date.now();
        this.type = "color";
    }
}

export class ColorNode extends Color {
    /**
     * Returns a ColorNode instance with all possible color values extracted from the given color value.
     * @param {string | Array} value
     */
    constructor(value) {

        super();

        this.originValue = value;

        this.rgb = hexToRgb(value);
        this.hex = rgbToHex(value);

    }
    /**
     * Generates a random color.
     * @param {"rgb" | "rgba" | "hex" | "hsl" | "hsla"} type
     */
    static Random(type) {

        switch (type) {

            case "rgb":

                const red = Math.floor(Math.random() * 256),
                    green = Math.floor(Math.random() * 256),
                    blue = Math.floor(Math.random() * 256);

                return `rgb(${red}, ${green}, ${blue})`;

                break;


            default:
                throw new Error(`The given argument as (type) is not a recognized color type. Given argument: ${type}`);
                break;
        }

    }
}

export class LinearGradientColorNode {
    /**
     * Creates a linear gradient color node.
     * @param {Renderer} renderer Renderer to initialize linear gradient on.
     * @param {any} x1
     * @param {any} y1
     * @param {any} x2
     * @param {any} y2
     */
    constructor(renderer, x1, y1, x2, y2) {

    }
}