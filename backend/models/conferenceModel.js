const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionName: String,
  SessionDetails: String,
  maxAttendeeCap: Number,
  startTime: Date,
  endTime: Date,
  speaker: String,
});

const conferenceSchema = new mongoose.Schema({
  conferenceDetails: String,
  sessions: [sessionSchema],
});

const Conference = mongoose.model("Conference", conferenceSchema);
const Session = mongoose.model("Session", sessionSchema);

module.exports = { Conference, Session };
