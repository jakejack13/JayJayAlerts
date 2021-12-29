// @ts-check

/**
 * The entry point to hosting the bot node
 * @author Jacob Kerr
 */
// eslint-disable-next-line no-unused-vars
const _ = '';

const tmi = require('tmi.js');
const http = require('http');

const dbschema = require('../../shared/schema/database-schema');
const alschema = require('../../shared/schema/alerts-schema');


/**
 * The list of channels currently in the database
 * @type {string[]}
 */
let channels = [];

const req = http.request(new URL(dbschema.fieldRequest('channel')), (res) => {
    res.on('data', (d) => {
        channels = d.toString().split(',');
        channelCallback();
    });
});
req.on('error', (error) => {
    console.error(error);
});
req.end();


const channelCallback = () => {
/** @type {tmi.Options} */
    const opts = {
        identity: {
            username: process.env.SEC_BOTUSERNAME,
            password: process.env.SEC_OAUTHTOKEN,
        },
        channels: channels,
    };

    // eslint-disable-next-line new-cap
    const client = new tmi.client(opts);
    client.on('connected', onConnectedHandler);
    client.on('chat', onChatHandler);
    client.on('subscription', onSubscriptionHandler);
    client.connect();

    /**
     * Print connection information (address and port)
     * @param {string} addr - the connected IP address
     * @param {number} port - the connected port
     */
    function onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }


    /**
     *
     * @param {string} channel
     * @param {tmi.ChatUserstate} userstate
     * @param {string} message
     * @param {boolean} self
     */
    function onChatHandler(channel, userstate, message, self) {
        if (self) return;

        const alertMessage = `${userstate['display-name']}: ${message}`;

        const req = http.request(new URL(
            alschema.messageRequest(channel.substring(1), alertMessage),
        ));
        req.on('error', (error) => {
            console.error(error);
        });
        req.end();
    }


    /**
     * Handles all subscription events detected from registered channels
     * @param {string} channel - the channel that was subscribed to
     * @param {string} username - the name of the user who subscribed
     * @param {tmi.SubMethods} methods
     * @param {string} message - the message associated with the subscription
     * @param {tmi.SubUserstate} userstate - the state of the user subscribing
     */
    function onSubscriptionHandler(channel, username, methods,
        message, userstate) {
        if (self) return;

        let subMessage = '';

        const subReq = http.request(new URL(
            dbschema.getRequest(channel.substring(1), 'subMessage'),
        ), (res) => {
            res.on('data', (d) => {
                subMessage = d.toString();
            });
        });
        subReq.on('error', (error) => {
            console.error(error);
        });
        subReq.end();

        const alertMessage = `${username} ${subMessage}`;

        const alReq = http.request(new URL(
            alschema.messageRequest(channel.substring(1), alertMessage),
        ));
        alReq.on('error', (error) => {
            console.error(error);
        });
        alReq.end();
    }
};
