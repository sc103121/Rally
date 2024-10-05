// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

let broadcasts = [
    {
      "message": "Welcome to the event! We'll be starting shortly.",
      "timestamp": "2024-10-05T12:00:00Z"
    },
    {
      "message": "Remember to check in at the registration desk upon arrival.",
      "timestamp": "2024-10-05T12:10:00Z"
    },
    {
      "message": "Lunch break will begin at 1:00 PM. Enjoy!",
      "timestamp": "2024-10-05T12:45:00Z"
    },
    {
      "message": "Don’t forget to visit our sponsors’ booths in the lobby.",
      "timestamp": "2024-10-05T13:15:00Z"
    },
    {
      "message": "Reminder: The keynote speech will begin in 15 minutes in the main hall.",
      "timestamp": "2024-10-05T13:45:00Z"
    },
    {
      "message": "Thank you for attending! The event will close at 5:00 PM.",
      "timestamp": "2024-10-05T16:30:00Z"
    },
    {
      "message": "Networking session starts now! Join us in the lounge.",
      "timestamp": "2024-10-05T17:00:00Z"
    },
    {
      "message": "Raffle tickets are available at the main desk. The drawing is at 4:00 PM.",
      "timestamp": "2024-10-05T14:30:00Z"
    },
    {
      "message": "Please share your feedback in the survey form sent via email.",
      "timestamp": "2024-10-05T18:00:00Z"
    },
    {
      "message": "The next event session starts in 5 minutes. Grab a seat!",
      "timestamp": "2024-10-05T13:55:00Z"
    }
  ];

// Get all broadcasts
app.get('/api/broadcasts', (req, res) => {
  res.json(broadcasts);
});

// Add a new broadcast
app.post('/api/broadcasts', (req, res) => {
  const newBroadcast = {
    message: req.body.message,
    timestamp: new Date(),
  };
  broadcasts.unshift(newBroadcast); // Add new message to the top
  res.json(newBroadcast);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
