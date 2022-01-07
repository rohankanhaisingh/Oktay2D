/*
 * Using js-easing-functions
 * 
 */

/**
 * Animates any integer.
 * @param {number} startPosition
 * @param {number} endPosition
 * @param {number} duration
 * @param {"easeInQuad" | "easeOutQuad" | "easeInOutQuad" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic" | "easeInQuart" | "easeOutQuart" | "easeInOutQuart" | "easeInQuint" | "easeOutQuint" | "easeInOutQuint" | "easeInSine" | "easeOutSine" | "easeInOutSine" | "easeInExpo" | "easeOutExpo" | "easeInOutExpo" | "easeInCirc" | "easeOutCirc" | "easeInOutCirc" | "easeInElastic" | "easeOutElastic" | "easeInOutElastic" | "easeInBack" | "easeOutBack" | "easeInOutBack" | "easeInBounce" | "easeOutBounce" | "easeInOutBounce"} animationName
 */
export function AnimateSingleInteger(startPosition, endPosition, duration, animationName, callback) {

    try {

        require.resolve("js-easing-functions");

    } catch (err) {  console.warn("Cannot use this function because it cannot use the 'js-easing-functions' module. In order to continue using animations, install the module using the following command: 'npm install --save js-easing-functions'."); return false; }

    let easings = require("js-easing-functions");

    if (typeof easings[animationName] === "undefined") throw new Error(`The given animation name '${animationName}' is not a recognizable animation type.`);

    let time = Date.now(),
        events = {};


    function tick() {

        const elapsedTime = Date.now() - time;

        callback(easings[animationName](elapsedTime, startPosition, endPosition, duration));

        if (elapsedTime < duration) {
            window.requestAnimationFrame(tick);
        } else {

            if (typeof events["end"] === "function") events["end"]();

            easings = null;
        }
    }

    tick();

    return {
        /**
         * Create an event listener.
         * @param {"end"} event
         * @param {Function} callback
         */
        On: function (event, callback) {

            let _events = ["end"],
                isValid = false;

            for (let e in _events) if (_events[e] === event) isValid = true;

            if (!isValid) throw new Error(`The given event '${event}' is not a recognizable event`);

            if (typeof callback !== "function") throw new Error(`The given argument (as callback) is not a function.`);

            events[event] = callback;
        },
        Stop() {

            

        }
    };
}