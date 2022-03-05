import { CanvasScene } from "../index.js";
import { generateUniqueID } from "./generateUniqueId.js";

export const RenderObjects = new Array();

export let ObjectCount = 0,
    ObjectMaxLength = 10000000;

export class RenderObject {

    /**@type {number} */
    x;

    /**@type {number} */
    y;

    /**@type {number} */
    width;

    /**@type {number} */
    height;

    /**@type {number} */
    radius;

    /**@type {boolean} */
    visible;

    constructor() {

        this.id = generateUniqueID(18).id;
        this.objectCount = ObjectCount;
        this.creationTimeStamp = Date.now();

        this.events = {};

        this.visible = true;
        this.forceRendering = false;

        ObjectCount += 1;

        if (RenderObject.AddToGlobalArray) RenderObjects.push(this);
    }

    /**
     * Centers render object to specific coordinate based on width and height.
     * @param {number} x
     * @param {number} y
     */
    Center(x, y) {

        if (typeof this.x === "number" && typeof this.y === "number") {

            this.x = x - (this.width / 2);
            this.y = y - (this.height / 2);

            return this;
        }

        return false;
    }

    Destroy() {

        let i = 0;

        while (i < RenderObjects.length) {

            const object = RenderObjects[i];

            if (object.id === this.id) {

                RenderObjects.splice(i, 1);

                return this;

            }

            i += 1;
        }

    }
    /**
     * Event listener on 
     * @param {"click"} event
     * @param {Function} callback
     * @param {any | CanvasScene} arg
     */
    On(event, callback, arg) {

        if (typeof event !== "string") throw new Error("The given argument (as event) is not a event.");

        switch (event) {
            case "click":

                if (!(arg instanceof CanvasScene)) throw new Error(`A CanvasScene instance has not been specified as third argument. Please specify one.`);

                if (typeof callback !== "function") throw new Error("The given argument (as callback) is not a function.");

                this.events["click"] = callback;

                arg.On("mouseDown", (mouse, self) => {

                    // if(typeof this.events["click"])

                });

                break;
            default:
                throw new Error(`The given event name '${event}' is not a recognizable event for this instance.`);
                break;
        }
    }


    // Static methods.

    static AddToGlobalArray = true;

    static GetAllRenderObjects() {

        return RenderObjects;

    }

    static RenderAllObjects() {

        let i = 0;

        while (i < RenderObjects.length) {

            const obj = RenderObjects[i];

            if (typeof obj.appliedRenderContext !== "undefined") {

                if (typeof obj.Draw === "function") obj.Draw(obj.appliedRenderContext, Date.now());

            } else {

                console.warn(`Cannot render object with id '${obj.id}' because it has no render context applied.`);

            }

            i += 1;
        }

    }
}