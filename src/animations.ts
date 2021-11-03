const queue = require('queue');
const { log } = require('./debug');

const q = queue({concurrency: true, autostart: true});

/**
 * Queues the name for display
 * @param name the name to queue
 */
exports.queueName = function(name: string) {
    q.push(function(cb: ((err: Error | null, result: any) => (void))) {
        showName(name);
        cb(null, null);
    });
}

let showName = async function(name: string) {
    const element = document.getElementById("name");
    const time = 5000;
    if (element) {
        // log(name);
        element.innerText = name;
        element.style.opacity = "1.0";
        setTimeout(function() {
            element.style.opacity = "0.0";
        }, time);
    }
}