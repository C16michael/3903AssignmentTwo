//Cristiano Michael
const express = require('express');
const serveIndex = require('serve-index');
const expressWs = require('express-ws');

const app = express();
const port = 3000;

const wsInstance = expressWs(app);

app.use(__dirname, serveIndex(__dirname + "/chatroom.html"));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chatroom.html');
});

app.ws('/accept-msg', (ws, req) => {
    console.log('Web Socket opened');
    const aWss = wsInstance.getWss('/accept-msg');

    ws.on('message', (msg) => {
        const messageData = JSON.parse(msg);
        aWss.clients.forEach(function (client) {
            client.send(JSON.stringify(messageData));
        });
    });
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}/test.html`);
});
