//Cristiano Michael 3147571

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const path = require('path');
const port = 3000;

const formParser = new multiparty.Form();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(bodyParser.text());

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + "/homepage.html"));
})

app.post('/raw-text', (req, res) => {
    res.send(`myValue: ${req.body.rawTextValue}`);
  });
  
  // Handle POST requests for JSON-encoded data
  app.post('/jsonEncoded', (req, res) => {
    res.json({ myValue: req.body.jsonValue });
  });
  
  // Handle POST requests for URL-encoded data
  app.post('/urlEncoded', (req, res) => {
    res.send(`myValue: ${req.body.urlEncodedValue}`);
  });
  
  // Handle POST requests for Multipart data
  app.post('/multipart', (req, res) => {
    formParser.parse(req, (err, fields) => {
      if (!err && fields.multipartValue && fields.multipartValue[0]) {
        res.send(`myValue: ${fields.multipartValue[0]}`);
      } else {
        res.status(500).send('Error parsing multipart data');
      }
    });
  });

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
