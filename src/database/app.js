//@ts-check

/**
 * The entry point to hosting the database node
 * @author Jacob Kerr
 */

const http = require('http');

const { databaseFactory } = require('./lib/database-factory');
const dbschema = require('../../lib/schema/database-schema');
const adschema = require('../../lib/schema/addresses');

var database = databaseFactory();

const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    res.setHeader('Content-Type', 'text/plain');

    let value = undefined;
    switch(url.pathname) {
        case dbschema.GET:
            value = database.getValue(
                url.searchParams.get('channel'), url.searchParams.get('field')
            );
            if (value === undefined) {
                res.statusCode = 406;
                res.end('Channel or field not found\n');
            } else {
                res.statusCode = 200;
                res.end(`${value}\n`);
            }
            break;
        case dbschema.SET:
            value = database.setValue(
                url.searchParams.get('channel'), 
                url.searchParams.get('field'),
                url.searchParams.get('value')
            );
            if (!value) {
                res.statusCode = 406;
                res.end('Field for channel already set or channel not found\n');
            } else {
                res.statusCode = 200;
                res.end(`Done\n`);
            }
            break;
        case dbschema.IS:
            value = database.isValue(
                url.searchParams.get('field'), url.searchParams.get('value')
            );
            res.statusCode = 200;
            res.end(`${value}\n`);
            break;
        case dbschema.ADD:
            let input = [];
            for (let v of url.searchParams.values()) input.push(v);

            value = database.addEntry(input);
            if (!value) {
                res.statusCode = 406;
                res.end('Channel already added\n');
            } else {
                res.statusCode = 200;
                res.end(`Done\n`);
            }
            break;
        case dbschema.FIELD:
            value = database.getField(url.searchParams.get('field'));
            if (value === undefined) {
                res.statusCode = 406;
                res.end('Field not found\n');
            } else {
                res.statusCode = 200;
                res.end(`${value.join(',')}\n`);
            }
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Request not found\n');
    }
});

server.listen(adschema.DATABASEPORT, adschema.HOSTNAME, () => {
    console.log(`* Server running at http://${adschema.HOSTNAME}:${adschema.DATABASEPORT}/`);
});
