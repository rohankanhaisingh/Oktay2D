import { Color, ColorNode } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";

export class Rectangle extends RenderObject {
    /**
     * Creates a graphical rectangle.
     * @param {number} x Position on x-axis.
     * @param {number} y Position on y-axis.
     * @param {number} width Rectangle width.
     * @param {number} height Rectangle height.
     * @param {object} style Rectangle style.
     * 
     * @param style.backgroundColor {string | ColorNode}
     * @param style.backgroundImage {Image}
     * @param style.borderColor {string}
     * @param style.borderWidth {number}
     * @param style.shadowOffsetX {number}
     * @param style.shadowOffsetY {number}
     * @param style.shadowColor {number}
     * @param style.shadowBlur {number}
     * @param style.opacity {number}
     */
    constructor(x, y, width, height, style) {

        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.style = style;
    }
    /**
     * Draws a rectangle.
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

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

        if (typeof this.style.backgroundImage !== "undefined" && this.style.backgroundImage instanceof Image) {

            ctx.drawImage(this.style.backgroundImage, this.x, this.y, this.width, this.height);


        } else {
            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();

    }
}