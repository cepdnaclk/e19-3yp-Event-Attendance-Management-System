const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  regAttendees: {
    registeredCapacity: Number,
    registeredRfidNo: [String],   // this is the userId
  },
});

const SessionRegistered = mongoose.model('SessionRegistered', sessionSchema);

module.exports = { SessionRegistered };

