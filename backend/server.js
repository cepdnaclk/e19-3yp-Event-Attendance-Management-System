const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

// const mqtt = require("./controller/sessionCurrentController"); // Import the MQTT controller

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

// Define a route to handle GET requests to the root
app.get("/", (req, res) => {
  // Send a basic HTML response
  res.send("<h1>Hello, this is your Express server!</h1>");
});

// MQTT setup
// const client = mqtt.connect('mqtt://your-iot-core-endpoint');

// client.on('connect', () => {
//   client.subscribe('devices/+/data', (err) => {
//     if (!err) {
//       console.log('Subscribed to data topic');
//     }
//   });
// });

// client.on('message', mqtt.handleMqttMessage);


// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/attendees", require("./routes/attendeeRoutes"));
app.use("/api/conferences", require("./routes/conferenceRoutes"));
app.use("/api/sessionreg", require("./routes/sessionRegisteredRoutes"));
app.use("/api/sessioncurrent", require("./routes/sessionCurrentRoutes"));
app.use("/api/currentattendee", require("./routes/currentAttendeeRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
