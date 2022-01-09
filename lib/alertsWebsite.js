// @ts-check
// eslint-disable-next-line no-unused-vars
const socketio = require('socket.io');

/**
 * On socket connection with server, associate socket with channel
 * @param {socketio.Socket} socket - the socket that sent the event
 * @param {string} channel - the channel sent by the socket
 * @param {Map<string, socketio.Socket[]>} sockets - the sockets associated
 * with each channel
 */
exports.socketConnected = function(socket, channel, sockets) {
    let socketList;
    if (sockets.has(channel)) {
        socketList = sockets.get(channel);
    } else {
        socketList = [];
    }
    socketList.push(socket);
};
