const asyncHandler = require('express-async-handler');
const { SessionCurrent } = require('../models/sessionCurrentModel');

// Get session registered Attendees details
const getSessionCurrentDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sessionCurrent = await SessionCurrent.findOne({ conferenceId: id });

  if (!sessionCurrent) {
    res.status(404);
    throw new Error('Session not found');
  }

  // Extract only the rfidNo from the currentAttendee object
  // const { rfidNo } = sessionCurrent.currentAttendee;
  // const { _id } = sessionCurrent;

  // res.status(200).json({ rfidNo });
  // res.status(200).json({ _id });

  // const { conferenceId, currentAttendee, timestamp } = sessionCurrent;
  const { conferenceId, details } = sessionCurrent;

  if (!details || details.length === 0) {
    res.status(404);
    throw new Error('Session details not found');
  }

  // Extract the first item from the details array
  const [{ timestamp, currentAttendee }] = details;

  // You can send specific fields separately
  res.status(200).json({
    conferenceId,
    currentAttendee,
    timestamp,
  });

  // res.status(200).json({ sessionCurrent });
});

module.exports = { getSessionCurrentDetails };
