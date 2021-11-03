const EmbeddedQueue = require("embedded-queue");
const { log } = require('./debug');

var queue: any;

interface StringData {
    "str": string
}

interface Job {
    "type": string,
    "data": StringData
}

// Start the queue with the correct type of job
(async () => {
    // argument path through nedb
    queue = await EmbeddedQueue.Queue.createQueue({ inMemoryOnly: true });

    // set up job processor for "adder" type, concurrency is 1
    queue.process(
        "show",
        async (job: Job) => {
            const element = document.getElementById("name");
            const time = 5000;
            if (element) {
                // log(name);
                element.innerText = job.data.str;
                element.style.opacity = "1.0";
                setTimeout(function() {
                    element.style.opacity = "0.0";
                }, time);
            }},
        1
    );
})();


/**
 * Queues the name for display
 * @param name the name to queue
 */
exports.queueName = async function(name: string) {
    let job : Job = {
        type: "show",
        data: { str: name },
    }
    await queue.createJob(job);
}