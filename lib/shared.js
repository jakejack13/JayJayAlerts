// @ts-check

// eslint-disable-next-line no-unused-vars
const express = require('express');

/**
 * Creates a new alerts page for the specified channel
 * @param {express.Express} app - the express app serving the websites
 * @param {string} channel - the channel to create the new page for
 */
exports.createNewAlertSite = function(app, channel) {
    app.get(`/${channel}`, (req, res) => {
        res.render('alerts/index', {channel: channel});
    });
};
