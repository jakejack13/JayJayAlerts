const socket = io();

/**
 * A class representing a queue of alerts to show on the webpage
 */
 class AlertQueue {

    /**
     * Constructs a new message queue
     * @param {HTMLElement} element - element to change
     */
    constructor(element) {
        this.messages = [];
        this.lock = false;
        this.element = element;
    }

    /**
     * Queues the message to be displayed
     * @param {string} message - the message to queue 
     * @public
     */
    queueMessage(message) {
        this.messages.push(message);
        this.displayMessages();
    }

    /**
     * Displays the messages in the order they appear in the queue and continues
     * until the queue is empty
     * @private
     */
    displayMessages() {
        if (this.lock) {
            setTimeout(() => {this.displayMessages();}, 1000);
        } else {
            this.lock = true;
            const message = this.messages.pop();
            this.element.innerText = message;
            setTimeout(() => {this.element.innerText = ""; this.lock = false;}, 5000)
        }
    }
}

const channel = document.getElementById('channel').dataset.channel;
const queue = new AlertQueue(document.getElementById('message'));

socket.on('client connected', () => {
    socket.emit('channel sent', channel);
});

socket.on('message', function(message) {
    queue.queueMessage(message);
});


