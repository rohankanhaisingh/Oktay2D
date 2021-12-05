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
}

export class LinearGradientColorNode {
    constructor(colorStops) {

    }
}