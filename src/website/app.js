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
        const data = {};

        for (const field of dbschema.FIELDS) {
            const req = http.request(
                new URL(dbschema.fieldRequest(field)), (res) => {
                    res.on('data', (d) => {
                        data[field] = d.toString();
                    });
                },
            );
            req.on('error', (error) => {
                console.error(error);
            });
            req.end();
        }

        const dataString = JSON.stringify(data);
        socket.emit('data sent', [dataString]);
    });
});

frontServer.listen(
    addresses.CLIENTFRONTPORT, addresses.CLIENTFRONTHOSTNAME, () => {
        console.log(`* Website running at http://${addresses.CLIENTFRONTHOSTNAME}:${addresses.CLIENTFRONTPORT}/`);
    },
);
