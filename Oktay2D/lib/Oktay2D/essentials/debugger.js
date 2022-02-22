/**
 * Logs a advanced styled string in the console.
 * @param {string} sender From where the log got sent.
 * @param {string} content Main console contents.
 * @param {string} styles Optional CSS styles.
 */
export function log(sender, content, styles) {

    if (typeof sender !== "string") throw new Error("The required argument (as sender) has not been specified as a string.");
    if (typeof content !== "string") throw new Error("The required argument (as content) has not been specified as a string.");

    
    console.log(`%c[${sender}]%c ${content}`, "background: black; color: red;", styles);

    return log;
}