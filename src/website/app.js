// @ts-check

/**
 * The entry point to the website node
 * @author Jacob Kerr
 */

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

    socket.on('server connected', () => {
        socket.emit('fields sent', dbschema.FIELDS.join(','));
    });

    socket.on('channel sent', (channel) => {
        const req = http.request(
            new URL(dbschema.entryRequest(channel)), (res) => {
                res.on('data', (d) => {
                    const dataString = d.toString();
                    socket.emit('data sent', dataString);
                });
            },
        );
        req.on('error', (error) => {
            console.error(error);
        });
        req.end();
    });

    socket.on('values sent', (values) => {
        const data = JSON.parse(values);
        for (const field of dbschema.FIELDS) {
            const req = http.request(
                new URL(dbschema.setRequest(data['channel'],
                    field, data[field])), (res) => {
                    res.on('data', (d) => {
                        console.log(d);
                    });
                },
            );
            req.on('error', (error) => {
                console.error(error);
            });
            req.end();
        }
    });
});

frontServer.listen(
    addresses.WEBSITEPORT, addresses.WEBSITEHOSTNAME, () => {
        console.log(`* Website running at http://${addresses.WEBSITEHOSTNAME}:${addresses.WEBSITEPORT}/`);
    },
);
