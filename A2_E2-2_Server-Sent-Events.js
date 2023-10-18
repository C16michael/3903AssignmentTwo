const express = require("express");
const app = express();
const port = 3000;

let targetNumber;
let countdown = 10;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Generate a new random target number and reset the countdown
  targetNumber = Math.floor(Math.random() * 11);
  countdown = 10;
  res.status(200).sendFile(__dirname + "/2-2Index.html");
});

app.get("/timer", (req, res) => {
  console.log("Timer Started");

  res.set({
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const countdownInterval = setInterval(() => {
    countdown--;

    if (countdown <= 0) {
      // Send a Timeout event when countdown reaches zero
      console.log("Time out reach... WHY IS THIS STILL NOT WORKING")
      res.write("event: Timeout\ndata: TIMEOUT\n\n");
    } else {
      // Send a countdown message
      res.write(`data: Confirm ${targetNumber} in ${countdown} seconds!\n\n`);
    }
  }, 1000);

  res.on("close", () => {
    // Clear the countdown interval when the client closes the connection
    clearInterval(countdownInterval);
    res.end();
  });
});

app.post("/checkNumber", (req, res) => {
  const submittedNumber = parseInt(req.body.number, 10);

  if (targetNumber === submittedNumber) {
    // The submitted number is correct
    console.log("Yes")
    countdown = 10; // Reset the countdown
    targetNumber = Math.floor(Math.random() * 21); // Generate a new target number
    res.status(200).send("<p>Correct</p>");
  } else {
    // The submitted number is incorrect
    res.status(200).send("<p>Incorrect</p>");
    console.log("wrong")
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
