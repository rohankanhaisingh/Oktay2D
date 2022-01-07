import { generateUniqueID } from "../essentials/generateUniqueId.js";
import { RenderObject } from "../essentials/renderobject.js";
import { CanvasScene, Renderer } from "../index.js";
import { Camera } from "../rendering/camera.js";


/**
 * Checks if any collision has been made.
 * @param {RenderObject} obj1
 * @param {RenderObject} obj2
 */
function checkCollision(obj1, obj2) {

    const xIntersection = (obj1.x >= obj2.x - obj1.width && obj1.x <= obj2.x + obj2.width),
        yIntersection = (obj1.y >= obj2.y - obj1.height && obj1.y <= obj2.y + obj2.height);

    if (xIntersection && yIntersection) return true;

    return false;
}


export class PhysicsController {
    /**
     * Creates a new physics controller, allowing to project objects with real life- like physics.
     * @param {CanvasScene} scene
     * @param {Renderer} renderer
     */
    constructor(scene, renderer) {

        this.id = generateUniqueID(18).id;
        this.creationTimeStamp = Date.now();

        this.scene = scene;
        this.renderer = renderer;

        this.physicsObjects = [];
        this.visibleObjects = [];

        this.__options = {
            __globalGravityForce: 1,
            __sceneBoundaryCollision: false,
            __updateOnCameraMovement: false
        }
    }

    // Getters and setters

    // Global gravity force
    get globalGravityForce() {
        return this.__globalGravityForce;
    }
    set globalGravityForce(force) {

        if (typeof force !== "number") throw new Error("The given argument (as force) is not a number");

        this.__globalGravityForce = force;
    }

    // Scene boundary collision
    get sceneBoundaryCollision() {
        return this.__options.__sceneBoundaryCollision;
    }
    set sceneBoundaryCollision(bool) {

        if (!(this.scene instanceof CanvasScene)) throw new Error("Cannot set collision on scene boundaries since no scene has been applied.");

        typeof bool === "boolean" ? this.__options.__sceneBoundaryCollision = bool : false;
    }

    // Update on camera movement
    get updateOnCameraMovement() {
        return this.__options.__updateOnCameraMovement;
    }
    set updateOnCameraMovement(bool) {

        if (!(this.renderer instanceof Renderer)) throw new Error("Cannot update on camera movement since no renderer has been applied.");

        if (!(this.renderer.camera) instanceof Camera) throw new Error("Cannot update on camera movement since no camera has been applied to the given renderer.");

        this.__options.__updateOnCameraMovement = bool;
    }

    /**
     * Adds a render object to this physics controller.
     * @param {RenderObject} renderObject
     */
    Add(renderObject) {

        if (!(renderObject instanceof RenderObject)) throw new Error(`The given argument (as renderObject) is not a RenderObject instance.`);

        if (typeof renderObject.physics === "undefined") {

            renderObject.physics = {
                static: false,
                movable: true,
                gravity: 1,
                weight: 10,
                velocityX: 0,
                velocityY: 0,
                isColliding: false,
                controller: {
                    id: generateUniqueID(18).id,
                    appliedController: this
                }
            }
        }

        this.physicsObjects.push(renderObject);

        return this;
    }


    Update(deltaTime) {

        let ctx = this.renderer.ctx,
            i = 0;

        if (this.__options.__updateOnCameraMovement) {

            return;
        }

        while (i < this.physicsObjects.length) {

            let j = i + 1;

            /**@type {RenderObject} */
            const obj1 = this.physicsObjects[i];

            while (j < this.physicsObjects.length) {

                /**@type {RenderObject} */
                const obj2 = this.physicsObjects[j];

                if (checkCollision(obj1, obj2)) {

                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    let obj1VelX = obj1.physics.velocityX,
                        obj1VelY = obj1.physics.velocityY,
                        obj2VelX = obj2.physics.velocityX,
                        obj2VelY = obj2.physics.velocityY;

                    //obj1.physics.velocityX = 0;
                    //obj1.physics.velocityY = 0;
                    //obj2.physics.velocityX = 0;
                    //obj2.physics.velocityY = 0;


                    let vCollision = {
                        x: obj2.x - obj1.x,
                        y: obj2.y - obj1.y
                    }

                    let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));

                    let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };

                    let vRelativeVelocity = {
                        x: obj1.physics.velocityX - obj2.physics.velocityY,
                        y: obj1.physics.velocityX - obj2.physics.velocityY
                    };

                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;



                    if (obj1.physics.movable) {
                        obj1.physics.velocityX -= .1 + (speed * vCollisionNorm.x);
                        obj1.physics.velocityY -= .1 + (speed * vCollisionNorm.y);
                    }


                    if (obj2.physics.movable) {
                        obj2.physics.velocityX += .1 + (speed * vCollisionNorm.x);
                        obj2.physics.velocityY += .1 + (speed * vCollisionNorm.y);
                    }

                    obj1.style.backgroundColor = "red";
                    obj2.style.backgroundColor = "red";


                } else {
                    obj1.isColliding = false;
                    obj2.isColliding = false;

                    obj1.style.backgroundColor = null;
                    obj2.style.backgroundColor = null;

                }

                j += 1;
            }

            if (obj1.physics.movable) {

                if (!obj1.isColliding && this.globalGravityForce !== 0) obj1.physics.velocityY += this.__options.__globalGravityForce * obj1.physics.gravity;

                if (obj1.isColliding) {

                    obj1.physics.velocityY = 0;

                }

                if (obj1.physics.velocityX < 0 || obj1.physics.velocityX > 0) {
                    if (obj1.physics.velocityX < 0) obj1.physics.velocityX += 1 * deltaTime;
                    if (obj1.physics.velocityX > 1) obj1.physics.velocityX -= 1 * deltaTime;
                } else {
                    obj1.physics.velocityX = 0;
                }

                if (this.globalGravityForce === 0) {

                    if (obj1.physics.velocityY < -1) obj1.physics.velocityY += 1 * deltaTime;
                    if (obj1.physics.velocityY > 1) obj1.physics.velocityY -= 1 * deltaTime;

                }


                obj1.x += obj1.physics.velocityX * deltaTime;
                obj1.y += obj1.physics.velocityY * deltaTime;

            }


            i += 1;
        }
    }
}