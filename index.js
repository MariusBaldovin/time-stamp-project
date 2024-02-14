const express = require("express");
const app = express();

// Middleware for enabling CORS
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Middleware for serving static files
app.use(express.static("public"));

// Route handler for "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route handler for "/api/:date?"
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  if (!date) {
    // If date parameter is empty, return current time
    let currentDate = new Date();
    let unixTime = currentDate.getTime();
    let utcTime = currentDate.toUTCString();
    res.json({ unix: unixTime, utc: utcTime });
  } else {
    // Parse the provided date string or timestamp
    let parsedDate = isNaN(date) ? new Date(date) : new Date(parseInt(date));

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      // If the parsed date is valid, return UTC format
      let utcDate = parsedDate.toUTCString();
      let unixTime = parsedDate.getTime();
      res.json({ unix: unixTime, utc: utcDate });
    } else {
      // If the parsed date is invalid, return error message
      res.json({ error: "Invalid Date" });
    }
  }
});

// Route handler for "/api/:date"
app.get("/api/:date", (req, res) => {
  // Extract the date parameter from the request URL
  const { date } = req.params;

  // Parse the date parameter as a number
  const timestamp = parseInt(date);

  // Check if the parsed timestamp is valid
  if (!isNaN(timestamp)) {
    // Create a new Date object using the parsed timestamp
    const utcDate = new Date(timestamp);

    // Format the date to the specified format
    const formattedDate = utcDate.toUTCString();

    // Return the JSON object with the formatted date and timestamp
    res.json({ unix: timestamp, utc: formattedDate });
  } else {
    // If the timestamp is invalid, return an error
    res.json({ error: "Invalid Date" });
  }
});

// Route handler for "/api/hello"
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
