// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
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
    // Parse the provided date string
    let parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      // If the parsed date is valid, return UTC format
      let utcDate = parsedDate.toUTCString();
      res.json({ unix: parsedDate.getTime(), utc: utcDate });
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

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
