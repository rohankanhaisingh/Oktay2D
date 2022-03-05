import { Color, ColorNode } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";
import { SVGFilter } from "../rendering/filter.js";


export class Circle extends RenderObject {
    /**
     * Creates a graphical circle.
     * @param {number} x The horizontal coordinate of the circle its center.
     * @param {number} y The vertical coordinate of the circle its center.
     * @param {number} radius The arc's radius. Must be positive.
     * @param {number | null} startAngle The angle at which the arc starts in radians, measured from the positive x-axis.
     * @param {number | null} endAngle The angle at which the arc ends in radians, measured from the positive x-axis.
     * @param {object} style Circle styles.
     *
     * @param style.backgroundColor {string | ColorNode}
     * @param style.borderColor {string}
     * @param style.borderWidth {number}
     * @param style.shadowOffsetX {number}
     * @param style.shadowOffsetY {number}
     * @param style.shadowColor {number}
     * @param style.shadowBlur {number}
     * @param style.opacity {number}
     * @param style.filter {string}
     * @param style.globalCompositeOperation {"source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter"| "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"}
     */
    constructor(x, y, radius, startAngle, endAngle, style) {

        super();

        this.x = x;
        this.y = y;

        this.transformation = null;
        this.rotation = null;
        this.scaleX = 1;
        this.scaleY = 1;

        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.style = {...style};

        this.width = radius;
        this.height = radius;
    }
    /**
     * Draw method.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} deltaTime
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);

        if (typeof this.rotation === "number") ctx.rotate(this.rotation);

        if (this.transformation !== null) {

            ctx.transform(
                this.transformation.horizontalScaling,
                this.transformation.verticalSkewing,
                this.transformation.horizontalSkewing,
                this.transformation.verticalScaling,
                this.transformation.horizontalTranslation,
                this.transformation.verticalTranslation,
            );
        }

        if (typeof this.style.filter === "string") ctx.filter = this.style.filter;

        ctx.globalAlpha = typeof this.style.opacity === "number" ? this.style.opacity : 1;
        ctx.globalCompositeOperation = typeof this.style.globalCompositeOperation === "string" ? this.style.globalCompositeOperation : null;

        if (typeof this.style.filter === "string") ctx.filter = this.style.filter;
        if (typeof this.style.filter !== "undefined" && this.style.filter instanceof SVGFilter) ctx.filter = `url(#${this.style.filter.filterId})`;


        // Background color
        if (this.style.backgroundColor instanceof Color) ctx.fillStyle = typeof this.style.backgroundColor.hex !== null ? this.style.backgroundColor.hex : "transparent";
        else if (this.style.backgroundColor instanceof CanvasGradient) ctx.fillStyle = this.style.backgroundColor;
        else ctx.fillStyle = typeof this.style.backgroundColor === "string" ? this.style.backgroundColor : "transparent";

        // Border color
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
        if (this.style.shadowColor instanceof Color) ctx.shadowColor = typeof this.style.shadowColor.hex !== null ? this.style.shadowColor.hex : null;
        else ctx.shadowColor = typeof this.style.shadowColor === "string" ? this.style.shadowColor : null;


        ctx.arc(0, 0, typeof this.radius === "number" ? this.radius : 10, typeof this.startAngle === "number" ? this.startAngle : 0, typeof this.endAngle === "number" ? this.endAngle : (2 * Math.PI));

        ctx.fill();
        ctx.stroke();

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

    /**
     * Sets the radius of the circe, but also the width and the height.
     * @param {number} radius
     */
    SetRadius(radius) {

        if (typeof angle !== "number") throw new Error("The given argument (as radius) has not been specified as a number.");

        this.radius = radius;
        this.width = radius;
        this.height = radius;
    }
}