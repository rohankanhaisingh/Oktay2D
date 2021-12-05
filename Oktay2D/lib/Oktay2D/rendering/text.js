import { Color } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";

export class TextNode extends RenderObject {
    /**
     * Creates a text node that will appear on a renderer scene.
     * @param {string} text Text to show.
     * @param {number} x Text x position.
     * @param {number} y Text y position.
     * @param {object} style Possible styles and options for this text node instance. Allowing text look very sexy and fancy.
     * 
     * @param style.textColor {string | Color}
     * @param style.borderColor {string | Color}
     * @param style.font {string}
     * @param style.textAlign {"start" | "end" | "left" | "right" | "center"}
     * @param style.textBaseline {"top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"}
     * @param style.direction {"ltr" | "rtl" | "inherit"}
     */
    constructor(text, x, y, style) {
        super();

        if (typeof x !== "number") throw new Error("The given argument (as x) is not a number.");
        if (typeof y !== "number") throw new Error("The given argument (as y) is not a number.");

        this.text = text;
        this.x = x;
        this.y = y;
        this.style = style;
    }
    /**
     * Draws content.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} deltaTime
     * @return {this}
     */
    Draw(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        ctx.font = typeof this.style.font === "string" ? this.style.font : "10px sans-serif";
        ctx.textAlign = typeof this.style.textAlign === "string" ? this.style.textAlign : "start";
        ctx.textBaseline = typeof this.style.textBaseline === "string" ? this.style.textBaseline : "alphabetic";

        if (this.style.textColor instanceof Color) ctx.fillStyle = typeof this.style.textColor.hex !== null ? this.style.textColor.hex : "transparent";
        else ctx.fillStyle = typeof this.style.textColor === "string" ? this.style.textColor : "black";

        ctx.fillText(this.text, this.x, this.y);

        ctx.restore();

    }
}