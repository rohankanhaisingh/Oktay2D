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