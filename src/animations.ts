const { log } = require('./debug');

var messages: string[] = [];
var lock: boolean = false;

export function queueMessage(message: string) {
    messages.push(message);
    displayMessages();
}

export function displayMessages() {
    if (lock) {
        setTimeout(displayMessages, 1000);
    } else {
        lock = true;
        const message = messages.pop();
        if (message) {
            const element = document.getElementById("name");
            if (element) {
                element.innerText = message;
                setTimeout(() => {element.innerText = ""; lock = false;}, 5000)
            }
        }
    }
}