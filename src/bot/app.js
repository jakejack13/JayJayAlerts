// @ts-check

/**
 * The entry point to hosting the bot node
 * @author Jacob Kerr
 */

/** */
const {ClientCredentialsAuthProvider} = require('@twurple/auth');
const {ApiClient} = require('@twurple/api');
const {// DirectConnectionAdapter,
    // TODO: Switch from ngrok to DirectConnectionAdapter with SSL on production
    EventSubListener,
} = require('@twurple/eventsub');
// eslint-disable-next-line no-unused-vars
const eventsub = require('@twurple/eventsub');
const {NgrokAdapter} = require('@twurple/eventsub-ngrok');

const http = require('http');
const crypto = require('crypto');

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


const channelCallback = async () => {
    const authProvider = new ClientCredentialsAuthProvider(
        process.env.SEC_CLIENTID,
        process.env.SEC_CLIENTSECRET,
    );
    const cryptoSecret = crypto.randomUUID();
    const apiClient = new ApiClient({authProvider});
    const listener = new EventSubListener(
        {
            apiClient,
            adapter: new NgrokAdapter(),
            secret: cryptoSecret,
        },
    );
    await listener.listen();

    for (const channel of channels) {
        listener.subscribeToChannelFollowEvents(channel, onFollowHandler);
        listener.subscribeToChannelSubscriptionEvents(
            channel, onSubscriptionHandler,
        );
    }


    /**
     * Handles all follow events detected from registered channels
     * @param {eventsub.EventSubChannelFollowEvent} event
     */
    function onFollowHandler(event) {
        const followReq = http.request(new URL(
            dbschema.getRequest(event.broadcasterName, 'followMessage'),
        ), (res) => {
            res.on('data', (d) => {
                const followMessage = d.toString();

                const alertMessage = `${event.userDisplayName} \
                ${followMessage}`;

                const alReq = http.request(new URL(
                    alschema.messageRequest(
                        event.broadcasterName, alertMessage,
                    ),
                ));
                alReq.on('error', (error) => {
                    console.error(error);
                });
                alReq.end();
            });
        });
        followReq.on('error', (error) => {
            console.error(error);
        });
        followReq.end();
    }


    /**
     * Handles all subscription events detected from registered channels
     * @param {eventsub.EventSubChannelSubscriptionEvent} event
     */
    function onSubscriptionHandler(event) {
        const subReq = http.request(new URL(
            dbschema.getRequest(event.broadcasterName, 'subMessage'),
        ), (res) => {
            res.on('data', (d) => {
                const subMessage = d.toString();

                const alertMessage = `${event.userDisplayName} ${subMessage}`;

                const alReq = http.request(new URL(
                    alschema.messageRequest(
                        event.broadcasterName, alertMessage,
                    ),
                ));
                alReq.on('error', (error) => {
                    console.error(error);
                });
                alReq.end();
            });
        });
        subReq.on('error', (error) => {
            console.error(error);
        });
        subReq.end();
    }
};
