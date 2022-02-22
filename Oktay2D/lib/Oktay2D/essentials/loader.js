// ========== Definitions ==========

import { log } from "./debugger.js";


/**
 * @typedef LoadImageSyncOptionDefinitions
 * @property {boolean} useLogger
 */

/**
 * Loads an image asynchronously.
 * @param {string} imagePath Path to the image, will return an error if the path does not exist.
 * @param {LoadImageSyncOptionDefinitions} options Loader options.
 */
export async function LoadImageSync(imagePath, options) {

    if (typeof imagePath !== "string") throw new Error("The given argument (as imagePath) has not been specified as a a string.");

    const _options = { ...options };

    return new Promise(function (resolve, reject) {

        const xhr = new XMLHttpRequest(),
            start = Date.now();


        if (_options.useLogger) log("LoadImageSync", `Loading image (${imagePath})...`);

        xhr.addEventListener("readystatechange", function () {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    if (_options.useLogger) log("LoadImageSync", `Succesfully loaded image in ${Date.now() - start}ms. Now preparing to convert image into base64...`);

                    const reader = new FileReader();

                    reader.addEventListener("load", function () {

                        if (_options.useLogger) log("LoadImageSync", `Succesfully converted image into base64 in ${Date.now() - start}ms. Now preparing to resolve image...`);

                        const image = new Image();

                        image.src = reader.result;

                        image.addEventListener("load", function () {

                            if (_options.useLogger) log("LoadImageSync", `Succesfully executed 3 operations (load, convert and resolve) in ${Date.now() - start}ms!`, "color: lime;");

                            resolve(image);

                        });

                    });

                    reader.readAsDataURL(xhr.response);
                } else {

                    return reject("The given image path does not exist, it may be moved or been removed.");
                }

            }

        });

        xhr.open("GET", imagePath, true);
        xhr.responseType = "blob";
        xhr.send(null);


    });

}