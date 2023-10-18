const express = require('express');
const serveIndex = require('serve-index');

const expressWs = require('express-ws');

const app = express();
const port = 3000;

const wsInstance = expressWs(app);

app.use(__dirname, serveIndex(__dirname + "/test.html"));
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    console.log(req.body);
    req.body.message = "Data Received!";
    res.status(200).send(req.body);
});

app.ws("/accept-msg",(ws,req)=>{
    console.log("Web Socket opened");
    const aWss = wsInstance.getWss('/accept-msg');
    ws.on('message', (msg)=>{
        console.log(msg);
        console.log(aWss.clients);
        aWss.clients.forEach(function (client) {
            client.send(msg);
            
        });
    })
})

app.listen(port, ()=>{
    console.log(`Running on http://localhost:${port}/test.html`)
})