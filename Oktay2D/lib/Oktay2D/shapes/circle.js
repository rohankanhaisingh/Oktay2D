import { Color, ColorNode } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";

export class Circle extends RenderObject {
    /**
     * Creates a graphical circle.
     * @param {number} x The horizontal coordinate of the circle its center.
     * @param {number} y The vertical coordinate of the circle its center.
     * @param {number} radius The arc's radius. Must be positive.
     * @param {number | null} startAngle The angle at which the arc starts in radians, measured from the positive x-axis.
     * @param {number | null} endAngle The angle at which the arc ends in radians, measured from the positive x-axis.
     * @param {object} style Rectangle style.
     *
     * @param style.backgroundColor {string | ColorNode}
     * @param style.borderColor {string}
     * @param style.borderWidth {number}
     * @param style.shadowOffsetX {number}
     * @param style.shadowOffsetY {number}
     * @param style.shadowColor {number}
     * @param style.shadowBlur {number}
     * @param style.opacity {number}
     */
    constructor(x, y, radius, startAngle, endAngle, style) {

        super();

        this.x = x;
        this.y = y;



        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.style = style;

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

        ctx.arc(0, 0, typeof this.radius === "number" ? this.radius : 10, typeof this.startAngle === "number" ? this.startAngle : 0, typeof this.endAngle === "number" ? this.endAngle : (2 * Math.PI));

        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
}