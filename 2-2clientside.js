const statusElement = document.getElementById('status');
const numberElement = document.getElementById('number');
const timeoutElement = document.getElementById('timeout');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('submitButton');

console.log(submitButton);
console.log(numberElement);
console.log(timeoutElement);
console.log(userInput);

let active = true;

let source = new EventSource('/events');

source.onmessage = function (event) {
    const data = event.data;
    console.log("Received data:", data);
  
    try {
      const parsedData = JSON.parse(data);
  
      if (parsedData.message) {
        statusElement.textContent = parsedData.message;
      }
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  };
  

submitButton.addEventListener('click', () => {
    const number = userInput.value;
    if (active) {
      fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Response data:", data); // Add this to check the response
  
          // Update the UI with the response data if needed
          if (data && data.message) {
            statusElement.textContent = data.message;
          }
        })
        .catch(error => {
          console.error('Network error:', error);
        });
    } else {
      statusElement.textContent = 'Switch is not active. Please refresh the page.';
    }
  });
  
