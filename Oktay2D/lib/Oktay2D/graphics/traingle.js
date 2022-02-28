import { Color } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";
import { SVGFilter } from "../rendering/filter.js";


// =============== TYPE DEFINITIONS  ===============


/**
 * @typedef TriangleStyleDefinition 
 * @property {string | Color} backgroundColor
 * @property {string | Color} borderColor
 * @property {number} borderWidth
 * @property {"auto" | string | Color} shadowColor
 * @property {number} shadowOffsetX
 * @property {number} shadowOffsetY
 * @property {number} shadowBlur
 * @property style.opacity {number}
 * @property style.filter {string}
 * @property style.globalCompositeOperation {"source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter"| "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"}
*/



// =============== CONSTRUCTORS ===============

export class IsoscelesTriangle extends RenderObject {
    /**
     * Creates an isosceles triangle.
     * @param {number} x The x-axis of the start point.
     * @param {number} y The y-axis of the start point.
     * @param {number} size Triangle size,
     * @param {number} isoscelesLength Length of the two "legs".
     * @param {TriangleStyleDefinition} style Drawing styles.
     */
    constructor(x, y, size, isoscelesLength, style) {

        super();

        this.x = x;
        this.y = y;

        this.size = size;
        this.isoscelesLength = isoscelesLength;

        this.rotateAroundPoint = true;
        this.rotation = null;
        this.transformation = null;

        this.scaleX = 1;
        this.scaleY = 1;

        this.style = { ...style };

    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} deltaTime
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);

        if (typeof this.rotation === "number") ctx.rotate(this.rotation);
        if (this.transformation !== null) ctx.transform(this.transformation.horizontalScaling, this.transformation.verticalSkewing, this.transformation.horizontalSkewing, this.transformation.verticalScaling, this.transformation.horizontalTranslation, this.transformation.verticalTranslation,);

        ctx.translate(-this.x, -this.y)

        if (typeof this.style.filter === "string") ctx.filter = this.style.filter;
        if (typeof this.style.filter !== "undefined" && this.style.filter instanceof SVGFilter) ctx.filter = `url(#${this.style.filter.filterId})`;

        ctx.globalAlpha = typeof this.style.opacity === "number" ? this.style.opacity : 1;
        ctx.globalCompositeOperation = typeof this.style.globalCompositeOperation === "string" ? this.style.globalCompositeOperation : null;


        // =============== STYLING ===============


        // Background color drawing logic.
        if (this.style.backgroundColor instanceof Color) ctx.fillStyle = typeof this.style.backgroundColor.hex !== null ? this.style.backgroundColor.hex : "transparent";
        else if (this.style.backgroundColor instanceof CanvasGradient) ctx.fillStyle = this.style.backgroundColor;
        else ctx.fillStyle = typeof this.style.backgroundColor === "string" ? this.style.backgroundColor : "transparent";

        // Border color drawing logic.
        if (this.style.borderColor instanceof Color) ctx.strokeStyle = typeof this.style.borderColor.hex !== null ? this.style.borderColor.hex : "transparent";
        else if (this.style.borderColor instanceof CanvasGradient) ctx.strokeStyle = this.style.borderColor;
        else ctx.strokeStyle = typeof this.style.borderColor === "string" ? this.style.borderColor : "transparent";

        // Border width
        ctx.lineWidth = typeof this.style.borderWidth === "number" ? this.style.borderWidth : 1;

        // Shadow offsets.
        ctx.shadowOffsetX = typeof this.style.shadowOffsetX === "number" ? this.style.shadowOffsetX : 0;
        ctx.shadowOffsetY = typeof this.style.shadowOffsetY === "number" ? this.style.shadowOffsetY : 0;

        // Shadow blur
        ctx.shadowBlur = typeof this.style.shadowBlur === "number" ? this.style.shadowBlur : 0;

        // Shadow color.
        ctx.shadowColor = typeof this.style.shadowColor === "string" ? (this.style.shadowColor === "auto" ? this.style.backgroundColor || this.style.borderColor : this.style.shadowColor) : null;

        ctx.moveTo(this.x, this.y - (this.size * 2));
        ctx.lineTo(this.x - this.size, this.y + this.isoscelesLength);
        ctx.lineTo(this.x + this.size, this.y + this.isoscelesLength);
        ctx.lineTo(this.x, this.y - (this.size * 2));

        ctx.fill();
        ctx.stroke();

        ctx.closePath();
        ctx.restore();

    }

    /**
     * Sets matrix transform on shape.
     * @param {number} horizontalScaling Horizontal scaling. A value of '1' results in no scaling.
     * @param {number} verticalSkewing Vertical skewing.
     * @param {number} horizontalSkewing Horizontal skewing.
     * @param {number} verticalScaling Vertical scaling. A value of '1' results in no scaling.
     * @param {number} horizontalTranslation Horizontal translation.
     * @param {number} verticalTranslation Vetical translation.
     */
    SetTransform(horizontalScaling, verticalSkewing, horizontalSkewing, verticalScaling, horizontalTranslation, verticalTranslation) {

        if (horizontalScaling === null) {

            this.transformation = null;

            return this;
        }


        this.transformation = {
            horizontalScaling: horizontalScaling,
            verticalSkewing: verticalSkewing,
            horizontalSkewing: horizontalSkewing,
            verticalScaling: verticalScaling,
            horizontalTranslation: horizontalTranslation,
            verticalTranslation: verticalTranslation
        }

        return this.transformation;

    }

    /**
     * Sets rotation on shape.
     * @param {number | null} angle The rotation angle, clockwise in radians. You can use degree * Math.PI / 180 to calculate a radian from a degree.
     */
    SetRotation(angle) {

        if (angle === null) {

            this.rotation = null;

            return this;
        }

        if (typeof angle !== "number") throw new Error("The given argument (as angle) is not a number.");

        this.rotation = angle;

        return this;
    }
}