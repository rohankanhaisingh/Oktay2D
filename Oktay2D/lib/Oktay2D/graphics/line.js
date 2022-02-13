import { Color } from "../essentials/color.js";
import { RenderObject } from "../essentials/renderobject.js";

/**
    * @typedef LineDrawingStyleDefinition
    * @property {string | Color} lineColor
    * @property {number} lineWidth
    * @property {"butt" | "round" | "square"} lineCap
    * @property {"bevel" | "round" | "miter"} lineJoin
    * @property {string | Color} shadowColor
    * @property {number} shadowOffsetX
    * @property {number} shadowOffsetY
    * @property {number} shadowBlur
    */


export class Line extends RenderObject {

    /**
     * @typedef LinearPointDefinition
     * @property {number} x
     * @property {number} y
     * @property {LineDrawingStyles} style
     */

    /**
     * Creates a new line node with serveral drawing points.
     * @param {number} x Start x coordinate.
     * @param {number} y Starting y coordinate
     * @param {Array<LinearPointDefinition>} points Array with coordinates starting from the given start coordinates.
     * @param {LineDrawingStyleDefinition} style Styles
     */
    constructor(x, y, points, style) {
        super();

        this.x = x;
        this.y = y;

        this.points = points;

        this.style = style;

        this.width = 0;
        this.height = 0;

        for (let i = 0; i <= this.width; i++) {

            if (typeof points[i] !== "undefined") {
                if (points[i].x > this.width) {
                    this.width = points[i].x;
                }
            }

        }

        for (let i = 0; i <= points.length; i++) {

            if (typeof points[i] !== "undefined") {

                if (this.y + points[i].y > this.height) {
                    this.height = points[i].y;
                }

            }

        }

    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     */
    Draw(ctx) {

        if (typeof this.style !== "object") return;

        ctx.save();
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        if (this.style.lineColor instanceof Color) ctx.strokeStyle = typeof this.style.lineColor.hex !== null ? this.style.lineColor.hex : "transparent";
        else ctx.strokeStyle = typeof this.style.lineColor === "string" ? this.style.lineColor : "black";

        //const grad = ctx.createLinearGradient(this.x, this.y, this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);

        //grad.addColorStop(0, "red");
        //grad.addColorStop(1, "blue");

        //ctx.strokeStyle = grad;

        ctx.lineWidth = typeof this.style.lineWidth === "number" ? this.style.lineWidth : 1;
        ctx.lineCap = typeof this.style.lineCap === "string" ? (this.style.lineCap === "butt" || this.style.lineCap === "round" || this.style.lineCap === "square" ? this.style.lineCap : "butt") : "butt";
        ctx.lineJoin = typeof this.style.lineJoin === "string" ? (this.style.lineJoin === "bevel" || this.style.lineJoin === "round" || this.style.lineJoin === "miter" ? this.style.lineJoin : "bevel") : "bevel";

        if (this.style.shadowColor instanceof Color) ctx.shadowColor = typeof this.style.shadowColor.hex !== null ? this.style.shadowColor.hex : "transparent";
        else ctx.shadowColor = typeof this.style.shadowColor === "string" ? this.style.shadowColor : false;

        ctx.shadowBlur = typeof this.style.shadowBlur === "number" ? this.style.shadowBlur : 0;
        ctx.shadowOffsetX = typeof this.style.shadowOffsetX === "number" ? this.style.shadowOffsetX : 0;
        ctx.shadowOffsetY = typeof this.style.shadowOffsetY === "number" ? this.style.shadowOffsetY : 0;



        for (let point of this.points) {

            ctx.save();

            ctx.lineTo(this.x + point.x, this.y + point.y);

            ctx.restore();
        }

        ctx.stroke();


        ctx.closePath();
        ctx.restore();
    }
    ResolveSize() {

        let width = 0,
            height = 0;

        for (let i = 0; i <= 0; i++) {

            if (typeof this.points[i] !== "undefined") {
                if (this.points[i].x > 0) {
                    width = this.points[i].x;
                }
            }

        }

        for (let i = 0; i <= this.points.length; i++) {

            if (typeof this.points[i] !== "undefined") {

                if (this.y + this.points[i].y > height) {
                    height = this.points[i].y;
                }

            }

        }

        this.width = width;
        this.height = height;
    }
    /**
     * Creates a new drawing point.
     * @param {number} x X coordinate.
     * @param {number} y Y coordinate
     */
    CreatePoint(x, y) {

        if (typeof x !== "number" || typeof y !== "number") throw new Error("Cannot create a new drawing point since one of the arguments has not been specified as a number.");

        this.points.push({
            x: x - this.x,
            y: y - this.y,
        });

        return this.ResolveSize();
    }
}

export class QuadraticCurve extends RenderObject {

    /**
     * @typedef QuadraticCurvePointDefinition
     * @property {number} x
     * @property {number} y
     * @property {number} cpX
     * @property {number} cpY
     */

    /**
     * This instance allows you to draw quadratic bezier curves in a scene.
     * @param {number} x Starting draw point x.
     * @param {number} y Starting draw point y.
     * @param {Array<QuadraticCurvePointDefinition>} points Array with curve points coordinates.
     * @param {LineDrawingStyleDefinition} style Drawing styles.
     */
    constructor(x, y, points, style) {

        super();

        this.x = x;
        this.y = y;
        this.points = points;
        this.style = style;

    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     * @param {any} deltaTime
     */
    Draw(ctx, deltaTime) {

        if (typeof this.style !== "object") return;

        ctx.save();
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        if (this.style.lineColor instanceof Color) ctx.strokeStyle = typeof this.style.lineColor.hex !== null ? this.style.lineColor.hex : "transparent";
        else ctx.strokeStyle = typeof this.style.lineColor === "string" ? this.style.lineColor : "black";

        ctx.lineWidth = typeof this.style.lineWidth === "number" ? this.style.lineWidth : 1;
        ctx.lineCap = typeof this.style.lineCap === "string" ? (this.style.lineCap === "butt" || this.style.lineCap === "round" || this.style.lineCap === "square" ? this.style.lineCap : "butt") : "butt";
        ctx.lineJoin = typeof this.style.lineJoin === "string" ? (this.style.lineJoin === "bevel" || this.style.lineJoin === "round" || this.style.lineJoin === "miter" ? this.style.lineJoin : "bevel") : "bevel";

        if (this.style.shadowColor instanceof Color) ctx.shadowColor = typeof this.style.shadowColor.hex !== null ? this.style.shadowColor.hex : "transparent";
        else ctx.shadowColor = typeof this.style.shadowColor === "string" ? this.style.shadowColor : false;

        ctx.shadowBlur = typeof this.style.shadowBlur === "number" ? this.style.shadowBlur : 0;
        ctx.shadowOffsetX = typeof this.style.shadowOffsetX === "number" ? this.style.shadowOffsetX : 0;
        ctx.shadowOffsetY = typeof this.style.shadowOffsetY === "number" ? this.style.shadowOffsetY : 0;



        for (let point of this.points) {

            ctx.save();

            //ctx.lineTo(this.x + point.x, this.y + point.y);

            ctx.quadraticCurveTo(this.x + point.cpX, this.y + point.cpY, this.x + point.x, this.y + point.y);

            ctx.restore();
        }

        ctx.stroke();


        ctx.closePath();
        ctx.restore();


    }

    ResolveSize() {

        let width = 0,
            height = 0;

        for (let i = 0; i <= 0; i++) {

            if (typeof this.points[i] !== "undefined") {
                if (this.points[i].x > 0) {
                    width = this.points[i].x;
                }
            }

        }

        for (let i = 0; i <= this.points.length; i++) {

            if (typeof this.points[i] !== "undefined") {

                if (this.y + this.points[i].y > height) {
                    height = this.points[i].y;
                }

            }

        }

        this.width = width;
        this.height = height;

        return this;
    }

    CreatePoint(x, y, cpX, cpY) {

        if (typeof x !== "number" || typeof y !== "number" || typeof cpX !== "number" || typeof cpY !== "number") throw new Error("Cannot create a new drawing point since one of the arguments has not been specified as a number.");

        this.points.push({
            x: x - this.x,
            y: y - this.y,
            cpX: cpX - this.x,
            cpY: cpY - this.y
        });

        return this.ResolveSize();
    }
}