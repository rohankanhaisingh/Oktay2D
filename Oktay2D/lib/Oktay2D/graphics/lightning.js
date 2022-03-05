import { Color } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";
import { SVGFilter } from "../rendering/filter.js";

// ================ DEFINITIONS ================
/**@typedef LightningStyleDefinitions
 * @property {"auto" | string | Color} shadowColor
 * @property {number} shadowOffsetX
 * @property {number} shadowOffsetY
 * @property {number} shadowBlur
 * @property style.opacity {number}
 * @property style.filter {string}
 * @property style.globalCompositeOperation {"source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter"| "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"}
 * 
*/

export class PointLight extends RenderObject {
    /**
     * Creates a new point light.
     * @param {number} x The x-axis of the start coordinate
     * @param {number} y The y-axis of the start-coordinate.
     * @param {number} range Light range.
     * @param {number} radius Light radius.
     * @param {number} direction Direction in degrees, for example 40 degrees. 
     * @param {string} colors Light color(s).
     * @param {LightningStyleDefinitions} style Drawing styles
     */
    constructor(x, y, range, radius, direction, color, style) {

        super();

        this.x = x;
        this.y = y;

        this.range = range;
        this.radius = radius;
        this.direction = direction;

        this.color = color;
        this.style = { ...style };

        this.width = 1;
        this.height = 1;

        this.transformation = null;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     * @param {any} deltaTime
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);

        ctx.rotate(this.direction * Math.PI / 180);

        if (this.transformation !== null) ctx.transform(this.transformation.horizontalScaling, this.transformation.verticalSkewing, this.transformation.horizontalSkewing, this.transformation.verticalScaling, this.transformation.horizontalTranslation, this.transformation.verticalTranslation,);


        if (typeof this.style.filter === "string") ctx.filter = this.style.filter;
        if (typeof this.style.filter !== "undefined" && this.style.filter instanceof SVGFilter) ctx.filter = `url(#${this.style.filter.filterId})`;

        ctx.globalAlpha = typeof this.style.opacity === "number" ? this.style.opacity : 1;
        ctx.globalCompositeOperation = typeof this.style.globalCompositeOperation === "string" ? this.style.globalCompositeOperation : null;


        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.range);

        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.shadowOffsetX = typeof this.style.shadowOffsetX === "number" ? this.style.shadowOffsetX : 0;
        ctx.shadowOffsetY = typeof this.style.shadowOffsetY === "number" ? this.style.shadowOffsetY : 0;
        ctx.shadowBlur = typeof this.style.shadowBlur === "number" ? this.style.shadowBlur : 0;
        ctx.shadowColor = typeof this.style.shadowColor === "string" ? (this.style.shadowColor === "auto" ? this.color : this.style.shadowColor) : null;



        ctx.moveTo(0, 0);
        ctx.lineTo(0 - this.radius, 0 + this.range);
        ctx.lineTo(0 + this.radius, 0 + this.range);
        ctx.lineTo(0, 0);

        ctx.fillStyle = gradient;
        ctx.fill();

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

} 