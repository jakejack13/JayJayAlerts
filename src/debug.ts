/**
 * Adds a log to the debugging element of the DOM
 * @param message the message to add to the log
 */
exports.log = function(message: string): void {
    const element = document.getElementById("debug");
    if (element) {
        element.innerText += message + '\n';
    }
}