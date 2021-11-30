const http = require('http');

const channels = require('../database/lib/channels')

const hostname = 'localhost';
const port = 3000;

var database = channels.channelContainsFactory();

const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === '/channel/add' && url.searchParams.get('channel') !== '') {
        database.add(url.searchParams.get('channel'));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Okay\n');
    } else if (url.pathname === '/channel/check' && url.searchParams.get('channel') !== '') {
        let check = database.contains(url.searchParams.get('channel'));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${check}\n`);
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bad request\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
