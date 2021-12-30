const http = require('http');
const express = require('express');
const path = require('path');

const dbschema = require('../../shared/schema/database-schema');
const addresses = require('../../shared/schema/addresses');
const socketio = require('socket.io');

const app = express();
const frontServer = http.createServer(app);
/** @type {socketio.Server} */
// @ts-ignore
const io = socketio(frontServer);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use('/views', express.static('views'));

app.get('/', function(req, res) {
    res.render('index');
});


io.on('connection', function(socket) {
    socket.emit('client connected');

    socket.on('channel sent', function(channel) {
        const req = http.request(
            new URL(dbschema.entryRequest(channel)), (res) => {
                res.on('data', (d) => {
                    const dataString = d.toString();
                    console.log(dataString);
                    socket.emit('data sent', dataString);
                });
            },
        );
        req.on('error', (error) => {
            console.error(error);
        });
        req.end();
    });
});

frontServer.listen(
    addresses.WEBSITEPORT, addresses.WEBSITEHOSTNAME, () => {
        console.log(`* Website running at http://${addresses.WEBSITEHOSTNAME}:${addresses.WEBSITEPORT}/`);
    },
);
