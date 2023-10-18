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



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
