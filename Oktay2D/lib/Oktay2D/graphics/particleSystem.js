import { Color } from "../essentials/color.js";
import { generateUniqueID } from "../essentials/generateUniqueId.js";
import { CalculateAngle, GetDistance, PolarDirection, RandomBetween } from "../essentials/math.js";
import { RenderObject } from "../essentials/renderobject.js";

const PARTICLE_RETURN_STATES = {
    PARTICLE_DIE: "PARTICLE_DIE"
}


class Particle {
    constructor() {

        this.id = generateUniqueID(18);
        this.creationTimestamp = performance.now();
    }
}


class CircleParticle extends Particle {
    constructor(start, end, lifeTime, velocity, style) {
        super();

        this.start = start;
        this.end = end;
        this.lifeTime = lifeTime;
        this.velocity = velocity;
        this.style = style;

        this.x = start.x;
        this.y = start.y;

        this.distance = GetDistance(start.x, start.y, end.x, end.y);

        this.startTimestamp = Date.now();
        this.endTimestamp = Date.now() + lifeTime;


        this.velX = PolarDirection(start.x, start.y, end.x, end.y).directionX;
        this.velY = PolarDirection(start.x, start.y, end.x, end.y).directionY;
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
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
        else ctx.shadowColor = typeof this.style.shadowColor === "string" ? this.style.shadowColor : (typeof this.style.backgroundColor !== "undefined" ? this.style.backgroundColor : null);

        ctx.arc(0, 0, typeof this.style.radius === "number" ? this.style.radius : 5, 0, 2 * Math.PI, false);

        ctx.fill();
        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }
    update(ctx, deltaTime) {

        const currentTime = Date.now();

        if (currentTime < this.endTimestamp) {

            if (typeof this.style.fadeOutOnLifeTime === "boolean") {

                if (this.style.fadeOutOnLifeTime) {
                    const opacity = 1 / this.lifeTime * (this.endTimestamp - currentTime);

                    this.style.opacity = opacity;
                }

            }

            this.x += (this.velX * this.velocity) * deltaTime;
            this.y += (this.velY * this.velocity) * deltaTime;

        } else {

            this.x = this.start.x;
            this.y = this.start.y;

            this.endTimestamp = Date.now() + this.lifeTime;

        }


        this.draw(ctx, deltaTime);
    }
}

class ImageParticle_Pulse extends Particle {
    constructor(x, y, options) {

        super();

        this.start = {
            x: x,
            y: y
        }

        this.x = x;
        this.y = y;

        this.imageSource = options.imageSource;
        this.imageSize = options.imageSize;
        this.imageStyle = options.imageStyle;

        this.opacity = 1;

        this.lifeTime = options.particleAnimationDuration;
        this.velocity = options.particleAnimationSpeed;

        this.effects = options.particleLifeTimeEffects;

        this.startTimestamp = Date.now();
        this.endTimestamp = Date.now() + this.lifeTime;

        this.calculatedVelX = PolarDirection(x, y, x + RandomBetween(-1, 1), y + RandomBetween(-1, 1)).addLength(this.velocity).directionX;
        this.calculatedVelY = PolarDirection(x, y, x + RandomBetween(-1, 1), y + RandomBetween(-1, 1)).addLength(this.velocity).directionY;

        this.velX = this.calculatedVelX;
        this.velY = this.calculatedVelY;

        this.loop = options.loop;

        // console.log(this.effects);
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {

        ctx.save();

        ctx.translate(this.x, this.y);

        if (typeof this.imageStyle === "object") {
            
            if (typeof this.imageStyle.rotation === "number") ctx.rotate(this.imageStyle.rotation * Math.PI / 180);
            if (typeof this.imageStyle.globalCompositeOperation === "string") ctx.globalCompositeOperation = this.imageStyle.globalCompositeOperation;

            ctx.shadowBlur = typeof this.imageStyle.shadowBlur === "number" ? this.imageStyle.shadowBlur : 0;

            if (this.imageStyle.shadowColor instanceof Color) ctx.shadowColor = typeof this.imageStyle.shadowColor.hex !== null ? this.imageStyle.shadowColor.hex : null;
            else ctx.shadowColor = typeof this.imageStyle.shadowColor === "string" ? this.imageStyle.shadowColor : null;

            ctx.shadowOffsetX = typeof this.imageStyle.shadowOffsetX === "number" ? this.imageStyle.shadowOffsetX : 0;
            ctx.shadowOffsetY = typeof this.imageStyle.shadowOffsetY === "number" ? this.imageStyle.shadowOffsetY : 0;


        }

        ctx.globalAlpha = this.opacity;


        ctx.beginPath();

        ctx.drawImage(this.imageSource, 0, 0, this.imageSize, this.imageSize);

        ctx.closePath();

        ctx.restore();


    }
    update(ctx, deltaTime) {

        const currentTime = Date.now();

        if (currentTime < this.endTimestamp) {

            if (typeof this.effects.changeOpacityOnLifeTime === "object") {

                const opacity = this.effects.changeOpacityOnLifeTime.from / this.lifeTime * (this.endTimestamp - currentTime);

                this.opacity = this.effects.changeOpacityOnLifeTime.to + opacity;

            }

            if (typeof this.effects.changeVelocityOnLifeTime === "object") {

                if (this.velX > this.effects.changeVelocityOnLifeTime.value) this.velX -= this.effects.changeVelocityOnLifeTime.speed * deltaTime;
                if (this.velY > this.effects.changeVelocityOnLifeTime.value) this.velY -= this.effects.changeVelocityOnLifeTime.speed * deltaTime;


                if (this.velX < this.effects.changeVelocityOnLifeTime.value) this.velX += this.effects.changeVelocityOnLifeTime.speed * deltaTime;
                if (this.velY < this.effects.changeVelocityOnLifeTime.value) this.velY += this.effects.changeVelocityOnLifeTime.speed * deltaTime;

            }

            this.x += this.velX * deltaTime;
            this.y += this.velY * deltaTime;

            this.draw(ctx);
        } else {

            if (this.loop) {

                this.x = this.start.x;
                this.y = this.start.y;

                this.velX = this.calculatedVelX;
                this.velY = this.calculatedVelY;

                this.endTimestamp = Date.now() + this.lifeTime;

            } else {

                return PARTICLE_RETURN_STATES.PARTICLE_DIE;

            }

        }
    }
}

export class ParticleSystem extends RenderObject {
    constructor(x, y, width, height) {

        super();

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.particles = [];

    }

    /** @typedef {{min: {number}, max: {number}}} LifeTimeOptions */
    /** @typedef {{x: {number}, y: {number}}} EndDestinationOptions */
    /** @typedef {{min: {number}, min: {number}}} VelocityOptions */


    /**
     * Emit particles to a certain angle.
     * @param {number} amount Amount of particles being emitted.
     * @param {EndDestinationOptions} endDestination Coordinates from the emitter position.
     * @param {number} angleSize Angle size in radians.
     * @param {(number | LifeTimeOptions)} lifeTime Lifetime in milliseconds. For example, 1000 is one second.
     * @param {number | VelocityOptions} velocity Particle speed.
     * 
     * @param {object} style Particle styles.
     *
     * @param style.radius {number}
     * @param style.backgroundColor {string | ColorNode}
     * @param style.borderColor {string}
     * @param style.borderWidth {number}
     * @param style.shadowOffsetX {number}
     * @param style.shadowOffsetY {number}
     * @param style.shadowColor {number}
     * @param style.shadowBlur {number}
     * @param style.opacity {number}
     * @param style.fadeOutOnLifeTime {boolean}
     */
    EmitParticlesToAngle(amount, endDestination, angleSize, lifeTime, velocity, style) {

        console.warn("This method is desperate. It still works but will be either updated or removed in the future.\n\nFor more detailed information, head over to https://github.com/babahgee/Oktay2D/tree/master/Oktay2D/docs");

        if (typeof amount !== "number") throw new Error("The given argument (as amount) is not a number.");
        if (typeof endDestination !== "object") throw new Error("The given argument (as endDestination) does not contain the necessary properties.");
        if (typeof angleSize !== "number") throw new Error("The given argument (as angleSize) is not a number.");
        if (typeof lifeTime !== "number" && typeof lifeTime !== "object") throw new Error("The given argument (as lifeTime) is not a number or an object.");
        if (typeof velocity !== "object" && typeof velocity !== "number") throw new Error("The given argument (as velocity) is not a number or an object.");

        const calculatedAngle = CalculateAngle(this.x, this.y, this.x + endDestination.x, this.y + endDestination.y);

        this.calculatedAngle = calculatedAngle;

        for (let i = 0; i < amount; i++) {

            this.particles.push(new CircleParticle(
                {
                    x: this.x,
                    y: this.y
                },
                {
                    x: (this.x + Math.cos(Math.PI * (calculatedAngle + RandomBetween(-angleSize, angleSize)) / 180) * 100),
                    y: (this.y + Math.sin(Math.PI * (calculatedAngle + RandomBetween(-angleSize, angleSize)) / 180) * 100),
                },
                typeof lifeTime === "object" ? RandomBetween(lifeTime.min, lifeTime.max) : lifeTime,
                typeof velocity === "object" ? RandomBetween(velocity.min, velocity.max) : velocity,
                style
            ));


        }


    }

    /**
     * @typedef {{ min: {number}, max: {number} }} ParticleImageRandomizerSize 
     * @description Random size between two numbers
     */
    /**
     * All possible styles for the image.
     * 
     * @typedef {Object} ParticleImageStyles 
     * @property {number} shadowBlur
     * @property {Color | string} shadowColor
     * @property {number} shadowOffsetX
     * @property {number} shadowOffsetY
     * @property {number | {min: {number}, max: {number}}} rotation - Rotation in radians.
     * @property {"source-over" | "source-in" | "source-out" | "source-atop" | "destination-over" | "destination-in" | "destination-out" | "destination-atop" | "lighter"| "copy" | "xor" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"} globalCompositeOperation - Global composite oprations.
     */
    /**
     * @typedef {"pulse" | "directional"} ParticleAnimationType   
    */
    /**
     * @typedef ParticleAnimationDuration
     * @property {number} min
     * @property {number} max
     */
    /**
     * @typedef ParticleAnimationSpeed
     * @property {number} min
     * @property {number} max
     */
    /**
     * @typedef ParticleLifeTimeEffects
     * @property {{from: {number}, to: {number}}} changeSizeOnLifeTime
     * @property {{from: {number}, to: {number}}} changeOpacityOnLifeTime
     * @property {{from: {number}, to: {number}}} changeRotationOnLifeTime
     * @property {{value: {number}, speed: {number}}} changeVelocityOnLifeTime
     */

    /**
     * Emit particles as an image
     * @param {object} options
     * @param options.amount {number}
     * @param options.imageSource {HTMLImageElement}
     * @param options.imageSize {number | ParticleImageRandomizerSize}
     * @param options.imageStyle {null | ParticleImageStyles}
     * @param options.particleAnimationType {ParticleAnimationType}
     * @param options.particleAnimationDuration {number | ParticleAnimationDuration}
     * @param options.particleAnimationSpeed {number | ParticleAnimationSpeed}
     * @param options.particleLifeTimeEffects {ParticleLifeTimeEffects}
     * @param options.loop {boolean}
     */
    EmitParticlesAsImage(options) {

        if (typeof options !== "object") throw new Error("The given argument (as options) is not an object type.");

        if (typeof options["amount"] !== "number") throw new Error("Cannot emit particles since no amount has been specified in the object.");
        if (!(options["imageSource"] instanceof HTMLImageElement) && !(options["imageSource"] instanceof HTMLVideoElement)) throw new Error("Cannot emit particles since no image source has been specified in the object.");

        switch (options.particleAnimationType) {
            case "pulse":

                for (let i = 0; i < options.amount; i++) {

                    const formattedOptions = {};

                    for (let o in options) {

                        if (typeof options[o] !== "object") {

                            formattedOptions[o] = options[o];
                            
                        } else {

                            if (typeof options[o].min === "number" && typeof options[o].max === "number") {
                                formattedOptions[o] = RandomBetween(options[o].min, options[o].max);
                            } else {
                                switch (o) {
                                    case "imageSource":
                                        if (options[o] instanceof HTMLImageElement || options[o] instanceof HTMLVideoElement) formattedOptions[o] = options[o];
                                        break;
                                    case "imageStyle":

                                        if (typeof options[o] === "object") {

                                            const s = {};

                                            for (let style in options[o]) {


                                                if (typeof options[o][style] === "object") {

                                                    if (typeof options[o][style].min === "number" && typeof options[o][style].max === "number") {

                                                        s[style] = RandomBetween(options[o][style].min, options[o][style].max);

                                                    }

                                                } else {
                                                    s[style] = options[o][style];
                                                }

                                            }

                                            formattedOptions[o] = s;
                                        }

                                        break;
                                    case "particleLifeTimeEffects":

                                        formattedOptions[o] = options[o];

                                        break;
                                }

                            }

                        }

                    }


                   this.particles.push(new ImageParticle_Pulse(this.x, this.y, formattedOptions));

                }

                break;
            case "directional":

                break;
            default:

                throw new Error(`The given animation type '${options.particleAnimationType}' is not a recognized type for this emitter.`);

                break;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     * @param {any} deltaTime
     */
    Update(ctx, deltaTime) {

        ctx.save();
        ctx.beginPath();

        //ctx.strokeStyle = "red";
        //ctx.strokeRect(this.x, this.y, this.width, this.height);

        let i = 0;

        while (i < this.particles.length) {

            const particle = this.particles[i];

            particle.start.x = this.x;
            particle.start.y = this.y;

            const returnState = particle.update(ctx, deltaTime);

            switch (returnState) {

                case PARTICLE_RETURN_STATES.PARTICLE_DIE:

                    this.particles.splice(i, 1);

                    break;

            }

            i += 1;
        }

        ctx.closePath();
        ctx.restore();


    }
}