// doesnt need this - implemented in aws

// should auto run the loop to update the currentAttendees collection

const asyncHandler = require('express-async-handler');
const { SessionCurrent } = require('../models/sessionCurrentModel');
const { CurrentAttendee } = require('../models/currentAttendeeModel');

// Get session registered Attendees details
const updateCurrentAttendees = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sessionCurrent = await SessionCurrent.findOne({ conferenceId: id });
  
  if (!sessionCurrent) {
    res.status(404);
    throw new Error('Session not found');
  }
  
  const { conferenceId, details } = sessionCurrent;

  // Create a map to count occurrences of each RFID number
  const rfidCountMap = new Map();

  // Count occurrences in SessionCurrent
  for (const detail of details) {
    const rfid = detail.currentAttendee.rfidNo;
    rfidCountMap.set(rfid, (rfidCountMap.get(rfid) || 0) + 1);
  }
  
// Loop through RFID numbers in CurrentAttendee
for (const detail of details) {
  const rfid = detail.currentAttendee.rfidNo; // Change this line

  // Check if RFID appears even or odd times in SessionCurrent
  const countInSessionCurrent = rfidCountMap.get(rfid) || 0;

  // Find or create a CurrentAttendee document with the specific RFID number
  try {
    const existingAttendee = await CurrentAttendee.findOneAndUpdate(
      { 'rfidNo': rfid },
      {
        $addToSet: {
          'rfidNo': { $each: [rfid] },
        },
        $inc: {
          'currentCapacity': countInSessionCurrent % 2 === 0 ? 0 : 1,
        },
      },
      { upsert: true, new: true }
    );

    console.log('Existing Attendee:', existingAttendee);
  } catch (error) {
    console.error('Error updating attendee:', error);
  }

  console.log(`Updated CurrentAttendee for RFID: ${rfid}`);
}

  res.status(200).json({ message: 'CurrentAttendees updated successfully' });
});

module.exports = { updateCurrentAttendees };
