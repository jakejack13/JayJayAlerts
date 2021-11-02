const { log } = require('./debug');

var isRunning = false;

/**
 * The abstract type of a queue
 */
interface StringQueue {
    "queue": string[];
    "push": (e: string) => void;
    "pull": () => string | null;
    "isEmpty": () => boolean;
}

/**
 * An implementation of a queue using JS arrays
 */
class ArrayQueue {
    /**
     * The array representing the queue
     */
    queue: string[];

    /**
     * Constructs an empty queue
     */
    constructor() {
        this.queue = [];
    }

    /**
     * Pushes an element onto the queue
     * @param e the element to push onto the queue
     */
    push(e: string): void {
        this.queue.push(e);
    }

    /**
     * Removes the first element in the queue
     * @returns the first element in the queue
     */
    pull(): string | null {
        let element = this.queue.shift();
        if (element) {
            return element;
        } else {
            return null;
        }
    }

    /**
     * Returns whether the queue is empty or not
     * @returns true if the queue is empty, false otherwise
     */
    isEmpty(): boolean {
        return this.queue.length == 0;
    }
}

/**
 * The queue used to track names for the entire module
 */
const nameQueue = new ArrayQueue();

/**
 * Queues the name for display
 * @param name the name to queue
 */
exports.queueName = function (name: string): void {
    nameQueue.push(name);
    if (!isRunning) {
        showQueue(nameQueue);
    }
};

/**
 * Display the names in the queue until empty
 * @param queue the queue of names
 */
let showQueue = function(queue: StringQueue): void {
    const element = document.getElementById("name");
    const time = 5000;
    if (element) {
        isRunning = true;
        while (!queue.isEmpty()) {
            let name = queue.pull();
            if (name) {
                // log(name);
                element.innerText = name;
                element.style.opacity = "1.0";
                setTimeout(function() {
                    element.style.opacity = "0.0";
                }, time);
            }
        }
    }
    isRunning = false;
};