const express = require("express");
const errorHandler = require("./middleware/errorHandler");
// const { connect } = require("./routes/contactRoutes");  //look at this
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDB();
const app = express();

const port = process.env.PORT || 5000;

// app.get('/api/contacts', (req,res) => {
//     res.json({message: "Get all contacts"});
// });

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Define a route to handle GET requests to the root
app.get("/", (req, res) => {
    // Send a basic HTML response
    res.send("<h1>Hello, this is your Express server!</h1>");
});


// app.use("/api/contacts", require("./routes/conferenceRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/attendees", require("./routes/attendeeRoutes"));
app.use("/api/conferences", require("./routes/conferenceRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
