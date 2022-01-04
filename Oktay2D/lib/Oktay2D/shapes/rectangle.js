import { Color, ColorNode } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";

export class Rectangle extends RenderObject {
    /**
     * Creates a graphical rectangle.
     * @param {number} x Position on x-axis.
     * @param {number} y Position on y-axis.
     * @param {number} width Rectangle width.
     * @param {number} height Rectangle height.
     * 
     * @param {object} style Rectangle style
     * @param style.backgroundColor {string | ColorNode}
     * @param style.backgroundImage {Image | HTMLVideoElement}
     * @param style.borderColor {string | ColorNode}
     * @param style.borderWidth {number}
     * @param style.shadowOffsetX {number}
     * @param style.shadowOffsetY {number}
     * @param style.shadowColor {string | ColorNode}
     * @param style.shadowBlur {number}
     * @param style.opacity {number}
     * @param style.filter {string}
     */
    constructor(x, y, width, height, style) {

        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.rotation = null;
        this.transformation = null;

        this.style = style;
    }
    /**
     * Draws a rectangle.
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        // ctx.translate(this.x, this.y);

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

        // Background color
        if (this.style.backgroundColor instanceof Color) ctx.fillStyle = typeof this.style.backgroundColor.hex !== null ? this.style.backgroundColor.hex : "transparent";
        else ctx.fillStyle = typeof this.style.backgroundColor === "string" ? this.style.backgroundColor : "transparent";

        // Border color
        if (this.style.borderColor instanceof Color) ctx.strokeStyle = typeof this.style.borderColor.hex !== null ? this.style.borderColor.hex : "transparent";
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

        if (typeof this.style.backgroundImage !== "undefined" && (this.style.backgroundImage instanceof Image)) {

            // ctx.drawImage(this.style.backgroundImage, 0, 0, this.width, this.height);
            ctx.drawImage(this.style.backgroundImage, this.x, this.y, this.width, this.height);


        } else {
            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();
        }

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