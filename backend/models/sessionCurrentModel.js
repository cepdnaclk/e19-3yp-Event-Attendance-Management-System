const mongoose = require("mongoose");

const sessionCurrentSchema = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    conferenceId: String,
    timestamp: String,
    rfidNo: String ,
});

const SessionCurrent = mongoose.model('SessionCurrent', sessionCurrentSchema);

module.exports = { SessionCurrent };

// {
//     "conferenceId": "665993c23a87fe5df449913c2",
//     "timestamp": "2023-11-01T12:34:56Z",
//     "currentAttendee": {
//       "rfidNo": ["RFID1", "RFID2", "RFID3"]
//     }
// }
  