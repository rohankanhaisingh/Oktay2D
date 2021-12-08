import { generateUniqueID } from "./generateUniqueId.js";

export const RenderObjects = new Array();

export let ObjectCount = 0,
    ObjectMaxLength = 10000000;

export class RenderObject {
    constructor() {

        this.id = generateUniqueID(18).id;
        this.objectCount = ObjectCount;
        this.creationTimeStamp = Date.now();

        ObjectCount += 1;

        RenderObjects.push(this);
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

    // Static methods.

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