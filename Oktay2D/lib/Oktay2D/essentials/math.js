/**
 * Returns a random number between two integers/
 * @param {number} number1
 * @param {number} number2
 */
export function RandomBetween(number1, number2) {

    if (typeof number1 == "number" && typeof number2 == "number") {
        let randomNumber = Math.floor(Math.random() * (number2 - number1 + 1) + number1);

        return randomNumber;
    }

    throw new Error("Cannot get a random number between two integers since arguments are not correct.");
}

/**
 * Returns an atan 2 value.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
export function PolarDirection(x1, y1, x2, y2) {

    const a = Math.atan2(y2 - y1, x2 - x1);

    return {
        formula: a,
        directionX: Math.cos(a),
        directionY: Math.sin(a),
        normalize: function () {
            return {
                directionX: parseFloat(this.directionX.toFixed(2)),
                directionY: parseFloat(this.directionY.toFixed(2)),
            }
        },
        complete: function () {
            return {
                directionX: parseInt(this.directionX),
                directionY: parseInt(this.directionY)
            }
        },
        addLength: function (len) {

            if (typeof len == "number") {
                return {
                    directionX: this.directionX * len,
                    directionY: this.directionY * len
                }
            } else {
                return this;
            }
        }
    }
}

/**
 * Returns an number which is the average value in an array.
 * @param {Array<number>} array
 * 
 * @returns {number}
 */
export function GetAverageValueFromArray(array) {

    let sum = 0,
        i = 0;

    while (i < array.length) {

        sum += parseInt(array[i], 10);

        i += 1;
    }

    const avg = sum / array.length;

    return avg;
}

/**
 * Calculates distance between two objects, can be used in collision detection methods.
 * @param {number} x1 x location from the first object.
 * @param {number} y1 y location from the first object.
 * @param {number} x2 x location from the second object.
 * @param {number} y2 y location from the second object.
 * @returns {number} Calculated distance between two objects.
 * 
 * @example <caption>Usage example:</caption>
 * GetDistance(25, 10, 120, 45);
 */
export function GetDistance(x1, y1, x2, y2) {
    if (typeof x1 == "number" && typeof x2 == "number" && typeof y1 == "number" && typeof y2 == "number") {

        let d1 = x1 - x2,
            d2 = y1 - y2,
            distance = Math.sqrt(d1 * d1, d2 * d2);

        return distance;

    } else {
        return 0;
    }
}

/**
 * Formats a timestamp and returs it as a hh:mm:ss string. 
 * 
 * For example: 6969 seconds will be formatted to 1:56:09.
 * @param {number} time Given time in seconds.
 */
export function FormatTimeStamp(time) {

    const hrs = ~~(time / 3600),
        mins = ~~((time % 3600) / 60),
        secs = ~~time % 60;

    let ret = "";


    if (hrs > 0) ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}

/**
 * Calculates the angle between two coordinates.
 * @param {number} cx 
 * @param {number} cy
 * @param {number} ex
 * @param {number} ey
 */
export function CalculateAngle(cx, cy, ex, ey) {

    let dy = ey - cy,
        dx = ex - cx,
        theta = Math.atan2(dy, dx);

    theta *= 180 / Math.PI; 

    if (theta < 0) theta = 360 + theta;

    return theta;
}

/**
 * @typedef LineIntersectionArgument
 * @property {number} x
 * @property {number} y
 */

/**
 * Calculate intersection points.
 * @param {LineIntersectionArgument} p1 Point 1. This argument is required.
 * @param {LineIntersectionArgument} p2 Point 2. This argument is required.
 * @param {LineIntersectionArgument} p3 Point 3. This argument is optional.
 * @param {LineIntersectionArgument} p4 Point 4. This argument is optional.
 */
export function CalculateIntersection(p1, p2, p3, p4) {

    // down part of intersection point formula
    var d1 = (p1.x - p2.x) * (p3.y - p4.y); // (x1 - x2) * (y3 - y4)
    var d2 = (p1.y - p2.y) * (p3.x - p4.x); // (y1 - y2) * (x3 - x4)
    var d = (d1) - (d2);

    if (d == 0) {
        throw new Error('Number of intersection points is zero or infinity.');
    }

    // upper part of intersection point formula
    var u1 = (p1.x * p2.y - p1.y * p2.x); // (x1 * y2 - y1 * x2)
    var u4 = (p3.x * p4.y - p3.y * p4.x); // (x3 * y4 - y3 * x4)

    var u2x = p3.x - p4.x; // (x3 - x4)
    var u3x = p1.x - p2.x; // (x1 - x2)
    var u2y = p3.y - p4.y; // (y3 - y4)
    var u3y = p1.y - p2.y; // (y1 - y2)

    // intersection point formula

    var px = (u1 * u2x - u3x * u4) / d;
    var py = (u1 * u2y - u3y * u4) / d;

    var p = { x: px, y: py };

    return p;
}