const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema({
  // Other fields...
  SessionDetails: String,
  maxAttendeeCap: Number,
  startTime: Date,
  endTime: Date,
  sessionHolder: String,
});

const Conference = mongoose.model("Conference", conferenceSchema);

module.exports = Conference;
