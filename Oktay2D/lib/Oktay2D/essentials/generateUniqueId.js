/**
 * Generates an unique ID.
 * @param {number | undefined} len Length of the ID, default length is 12 when no parameter has been given.
 */
export function generateUniqueID(len) {

    len = typeof len == "number" ? len : 12;

    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        generatedID = "";

    for (let i = 0; i < len; i++) {

        generatedID += chars.charAt(Math.floor(Math.random() * chars.length));

    }

    return {
        id: generatedID,
        timestamp: Date.now(),
        length: len,
        /**
         * Filters generated ID
         * @param {"numbers" | "letters" | "lettersUpperCase" | "lettersLowerCase"} filterName
         */
        filter: function (filterName) {

            let tempID = "";

            switch (filterName) {
                case "numbers":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (!isNaN(num)) tempID += num;

                    }

                    return tempID;

                    break;
                case "letters":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num)) tempID += char;

                    }

                    return tempID;

                    break;
                case "lettersLowerCase":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num) && char == char.toLowerCase()) {
                            tempID += char;
                        };

                    }

                    return tempID;

                    break;
                case "lettersUpperCase":

                    tempID = "";

                    for (let i = 0; i < this.id.length; i++) {

                        const char = this.id.charAt(i);

                        // Try parsing the char into a number;
                        const num = parseFloat(char);

                        if (isNaN(num) && char == char.toUpperCase()) {
                            tempID += char;
                        };

                    }

                    return tempID;

                    break;
                default:

                    throw new Error(`The given parameter '${filterName}' is not a recognized filter name for this method.`);

                    return;
                    break;
            }

        }
    }
}