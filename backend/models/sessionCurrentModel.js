const mongoose = require("mongoose");

const sessionCurrentSchema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    conferenceId: String,
    timestamp: String,
    // timestamp: Date,
    rfidNo: String ,
});

const SessionCurrent = mongoose.model('SessionCurrent', sessionCurrentSchema);

module.exports = { SessionCurrent };
  