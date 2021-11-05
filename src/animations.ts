const queue = require('queue');
const { log } = require('./debug');

const q = queue({concurrency: true, autostart: true});

/**
 * Queues the name for display
 * @param name the name to queue
 */
export function queueMessage(message: string): void {
    q.push(function(cb: ((err: Error | null, result: any) => (void))) {
        showMessage(message);
        cb(null, null);
    });
}

let showMessage = async function(message: string) {
    const element = document.getElementById("name");
    const time = 5000;
    if (element) {
        // log(name);
        element.innerText = message;
        element.style.opacity = "1.0";
        setTimeout(function() {
            element.style.opacity = "0.0";
        }, time);
    }
}