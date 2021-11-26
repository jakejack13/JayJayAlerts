var messages = [];
var lock = false;

/**
 * Queues the message to be shodisplayedwn
 * @param {string} message - the message to queue 
 */
export function queueMessage(message) {
    messages.push(message);
    displayMessages();
}

/**
 * Displays the messages in the order they appear in the queue and continues
 * until the queue is empty
 */
function displayMessages() {
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
