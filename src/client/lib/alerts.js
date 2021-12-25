//@ts-check

/**
 * A library of functions used to queue up and display alerts
 * @author Jacob Kerr
 */

const express = require('express');


/**
 * Aclass representing a queue of alerts to show on the webpage
 */
exports.AlertQueue = class {
    /**
     * Constructs a new message queue
     * @param {string} channel - the name of the channel for the queue
     * @param {express.Response} response - the response to push messages to
     */
    constructor(channel, response) {
        this.channel = channel;
        this.response = response;
        this.messages = [];
        this.lock = false;
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
            setTimeout(this.displayMessages, 1000);
        } else {
            this.lock = true;
            const message = this.messages.pop();
            this.response.render('index', {message: message});
            setTimeout(() => {this.response.render('../pages/index', {message: ""}); this.lock = false;}, 5000)
        }
    }
}