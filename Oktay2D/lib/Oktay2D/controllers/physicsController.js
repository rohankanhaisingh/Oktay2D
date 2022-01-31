import { generateUniqueID } from "../essentials/generateUniqueId.js";
import { RenderObject } from "../essentials/renderobject.js";
import { CanvasScene, Renderer } from "../index.js";
import { Camera } from "../rendering/camera.js";
import { Rectangle } from "../graphics/rectangle.js";

let SAT = undefined;

(function (_0x21dce8, _0x158d12) { var _0x4a1b6e = _0x1aeb, _0x3ebca3 = _0x21dce8(); while (!![]) { try { var _0x4a10ea = parseInt(_0x4a1b6e(0x1f2)) / 0x1 * (parseInt(_0x4a1b6e(0x1e9)) / 0x2) + parseInt(_0x4a1b6e(0x1e7)) / 0x3 * (-parseInt(_0x4a1b6e(0x1e6)) / 0x4) + -parseInt(_0x4a1b6e(0x1ea)) / 0x5 + -parseInt(_0x4a1b6e(0x1ec)) / 0x6 * (-parseInt(_0x4a1b6e(0x1f1)) / 0x7) + parseInt(_0x4a1b6e(0x1eb)) / 0x8 + -parseInt(_0x4a1b6e(0x1e5)) / 0x9 + parseInt(_0x4a1b6e(0x1ee)) / 0xa; if (_0x4a10ea === _0x158d12) break; else _0x3ebca3['push'](_0x3ebca3['shift']()); } catch (_0x3b5d24) { _0x3ebca3['push'](_0x3ebca3['shift']()); } } }(_0x36cd, 0x60b75), function init(_0x4bbf21, _0x4d139d) { var _0x283473 = _0x1aeb; !(_0x283473(0x1e8) in _0x4bbf21 || 'amd' in _0x4bbf21) && _0x4d139d[_0x283473(0x1ef)]('Failed\x20to\x20load\x20modules!'); try { SAT = require(_0x283473(0x1f0)); } catch (_0x32469d) { if (_0x32469d instanceof Error && _0x32469d[_0x283473(0x1ed)] === _0x283473(0x1f4)) _0x4d139d[_0x283473(0x1ef)](_0x283473(0x1f3)), _0x4d139d[_0x283473(0x1ef)](_0x32469d); else throw _0x32469d; } }(window, console)); function _0x1aeb(_0x6fc317, _0x319fe9) { var _0x36cd3a = _0x36cd(); return _0x1aeb = function (_0x1aebca, _0x56ae28) { _0x1aebca = _0x1aebca - 0x1e5; var _0x5cc2ab = _0x36cd3a[_0x1aebca]; return _0x5cc2ab; }, _0x1aeb(_0x6fc317, _0x319fe9); } function _0x36cd() { var _0x50bfd5 = ['3FRkIwn', 'require', '529054CSbDwC', '3819555hHZzef', '1153248MvLxbD', '672lSrvaV', 'code', '4908970RrCHys', 'warn', 'sat', '34223pjxEPI', '1aWdDsQ', 'Failed\x20to\x20load\x20module\x20sat.js.\x20Please\x20be\x20sure\x20that\x20sat.js\x20is\x20installed\x20correctly\x20in\x20order\x20to\x20use\x20physics\x20controllers.', 'MODULE_NOT_FOUND', '1011978hnkjrh', '698584QnPhAM']; _0x36cd = function () { return _0x50bfd5; }; return _0x36cd(); }

const { Box, Vector, Response, testPolygonPolygon} = SAT;


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

export class PhysicsObject {
    /**
     * Creates a new physics object.
     * @param {RenderObject} renderObject
     * @param {PhysicsController} controller
     */
    constructor(renderObject, controller) {

        this.id = generateUniqueID(18).id;

        this.static = false;
        this.movable = true;
        this.gravity = 1;
        this.weight = 1;

        this.velocityX = 0;
        this.velocityY = 0;

        this.collision = {
            collisionObject: null,
            type: null,
            isColliding: false
        };

        this.controller = controller;

        switch (true) {
            case (renderObject instanceof Rectangle):

                this.collision.collisionObject = new Box(new Vector(renderObject.x, renderObject.y), renderObject.width, renderObject.height).toPolygon();
                this.collision.type = "rectangle";

                break;
        }
    }
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

        if (typeof SAT !== "object") console.warn("Cannot use 'PhysicsController' properly since sat.js is not installed. Please install it using the following command: 'npm install sat'.");
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

        if (typeof SAT === "undefined") {

            console.log("Method has been disabled since sat.js is not installed.");

            return;
        }

        if (typeof renderObject.physics === "undefined") {

            /**@type {object} */
            renderObject.physics = new PhysicsObject(renderObject, this);


        }

        this.physicsObjects.push(renderObject);

        return this;
    }


    Update(deltaTime) {

        let ctx = this.renderer.ctx,
            i = 0;


        while (i < this.physicsObjects.length) {

            let j = i + 1;

            /**@type {RenderObject} */
            const obj1 = this.physicsObjects[i];

            /**@type {PhysicsObject} */
            const boxPhysics1 = obj1.physics;

            if (this.__options.__updateOnCameraMovement && obj1.visible) {

            
                if (this.__options.__globalGravityForce !== 0) {

                    if (!boxPhysics1.collision.isColliding) boxPhysics1.velocityY += (boxPhysics1.gravity * this.__options.__globalGravityForce) * deltaTime;


                }

                if (boxPhysics1.movable) {


                    if (this.__options.__globalGravityForce !== 0) {


                        obj1.x += boxPhysics1.velocityX * deltaTime;
                        obj1.y += boxPhysics1.velocityY * deltaTime;

                    }

                }


                while (j < this.physicsObjects.length) {

                    /**@type {RenderObject} */
                    const obj2 = this.physicsObjects[j];

                    /**@type {PhysicsObject} */
                    const boxPhysics2 = obj2.physics;

                    switch (true) {
                        case (obj1 instanceof Rectangle && obj2 instanceof Rectangle):

                            boxPhysics1.collision.collisionObject.pos = { x: obj1.x, y: obj1.y }
                            boxPhysics2.collision.collisionObject.pos = { x: obj2.x, y: obj2.y }

                            if (checkCollision(obj1, obj2)) {

                                const collisionBox1 = boxPhysics1.collision.collisionObject,
                                    collisionBox2 = boxPhysics2.collision.collisionObject,
                                    response = new Response();

                                const collision = testPolygonPolygon(collisionBox1, collisionBox2, response);


                                if (boxPhysics1.static) {

                                    boxPhysics2.velocityY = 0;

                                    obj2.x += response.overlapV.x * deltaTime;
                                    obj2.y += response.overlapV.y * deltaTime;

                                    //obj2.y = obj1.y - obj2.height;
                                } else {

                                    boxPhysics1.velocityY = 0;

                                    obj1.x -= response.overlapV.x * deltaTime;
                                    obj1.y -= response.overlapV.y * deltaTime;

                                    //obj1.x = obj2.x + response.overlapV.x;
                                    // obj1.y = obj2.y + response.overlapV.y;
                                }

                                // console.log(collisionBox1);

                                boxPhysics1.collision.isColliding = true;
                                boxPhysics2.collision.isColliding = true;

                            } else {
                                boxPhysics1.collision.isColliding = false;
                                boxPhysics2.collision.isColliding = false;
                            }
                            break;
                    }

                    j += 1;
                }
            }
            
            i += 1;
        }
    }
}