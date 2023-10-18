//Cristiano Michael 3147571

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const PORT = 3000;
let timer;
let correctNumber;
let isActive = true; // Declare isActive as a global variable
const interval = 10000;

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function startSwitch(res, isActive) {
    if (res.finished) {
      return;
    }
  
    correctNumber = generateRandomNumber();
    const responseData = {
      message: `Switch is active. Number to enter: ${correctNumber}`,
    };
    res.write(`data: ${JSON.stringify(responseData)}\n\n`);
  
    timer = setTimeout(() => {
      if (!res.finished) {
        const timeoutData = {
          message: "Dead Man's Switch timeout",
        };
        res.write(`data: ${JSON.stringify(timeoutData)}\n\n`);
        res.end();
        isActive = false;
      }
    }, interval);
  }
  

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '2-2Index.html'));
});

app.get('/2-2clientside.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, '2-2clientside.js'));
  });

  
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  startSwitch(res, isActive);

  req.on('close', () => {
    clearInterval(timer);
  });
});

app.post('/submit', express.json(), (req, res) => {
    const userNumber = req.body.number;
  
    if (parseInt(userNumber) === correctNumber) {
      clearTimeout(timer);
      const successData = {
        message: 'Correct number entered.',
      };
      res.json(successData);
    } else {
      const errorData = {
        message: `Incorrect. Try again. Enter: ${correctNumber}`,
      };
      res.json(errorData);
    }
  
    startSwitch(res, isActive);
  });

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
