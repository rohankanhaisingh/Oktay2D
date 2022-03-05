import { RandomBetween } from "../essentials/math.js";
import { CanvasScene, Renderer, _LIB_OPTIONS } from "../index.js";

export class PostProcessor {
    /**
     * Creates a new post processor.
     * @param {Renderer} renderer Main canvas renderer.
     * @param {CanvasScene} scene Main canvas scene.
     */
    constructor(renderer, scene) {

        this.renderer = renderer;
        this.scene = scene;

        this.filters = _LIB_OPTIONS._POST_PROCESSING_SHADERS;

    }
    Brightness(strength) {

        const ctx = this.renderer.ctx,
            scene = this.scene;

        const imageData = ctx.getImageData(0, 0, scene.width, scene.height),
            buffer = new Uint8Array(imageData.data.buffer);

        for (let i = 0; i < buffer.length; i += 4) {

            buffer[i] = buffer[i] * strength;
            buffer[i + 1] = buffer[i + 1] * strength;
            buffer[i + 2] = buffer[i + 2] * strength;
            buffer[i + 3] = buffer[i + 3] * strength;

        }

        ctx.putImageData(imageData, 0, 0);
    }
}