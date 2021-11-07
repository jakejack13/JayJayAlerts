const { log } = require('./debug');

export function displayMessage(message: string) {
    const element = document.getElementById("name");
    if (element) {
        element.innerText = message;
    }
}