const mongoose = require("mongoose");

const sessionCurrentSchema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    conferenceId: String,
    timestamp: String,
    rfidNo: String ,
});

const SessionCurrent = mongoose.model('SessionCurrent', sessionCurrentSchema);

module.exports = { SessionCurrent };
  