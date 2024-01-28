const mongoose = require('mongoose');

const currentAttendeeSchema = new mongoose.Schema({
   // conferenceId: String,
   conferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conferences',
    },
   // time: String,
   rfidNo: [{ type: String }],
   currentCapacity: Number,
});

const CurrentAttendee = mongoose.model('CurrentAttendee', currentAttendeeSchema);

module.exports = { CurrentAttendee };
