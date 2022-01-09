// @ts-check

/**
 * The client end of the server socket used to process alerts requested from
 * the server
 * @author Jacob Kerr
 */

// @ts-ignore
const socket = io();
// const audio = new Audio('/views/discord-notification.mp3');


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
            setTimeout(() => {
                this.displayMessages();
            }, 1000);
        } else {
            this.lock = true;
            const message = this.messages.pop();
            this.element.innerText = message;
            // audio.play();
            setTimeout(() => {
                this.element.innerText = '';
                this.lock = false;
            }, 5000);
        }
    }
}

const channel = document.getElementById('channel').dataset.channel;
const queue = new AlertQueue(document.getElementById('message'));

socket.on('client connected', () => {
    socket.emit('alerts - channel sent', channel);
});

socket.on('alerts - message', function(message) {
    queue.queueMessage(message);
});
