// http://localhost:5001/api/sessioncurrent/659b4782d9dd7b6b93a527c2

const asyncHandler = require('express-async-handler');
const { SessionCurrent } = require('../models/sessionCurrentModel');

// Get all SessionCurrent IDs
const getAllSessionCurrentIds = asyncHandler(async (req, res) => {
  try {
    console.log('Getting all SessionCurrent IDs...');
    const allSessionCurrentIds = await SessionCurrent.find({}, '_id');
    const sessionCurrentIds = allSessionCurrentIds.map((session) => session._id.toString());

    console.log('SessionCurrent IDs:', sessionCurrentIds);
    res.status(200).json({ sessionCurrentIds });
    // return [...new Set(sessionCurrentIds)];
  } catch (error) {
    console.error('Error getting SessionCurrent IDs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get session registered Attendees details
const getSessionCurrentDetails = asyncHandler(async (req, res) => {
  try {
    const sessionCurrent = await SessionCurrent.findById(req.params.id);

    if (!sessionCurrent) {
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    const { rfidNo, timestamp } = sessionCurrent;
    res.status(200).json({ rfidNo, timestamp });
  } catch (error) {
    console.error('Error in getSessionCurrentDetails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { getSessionCurrentDetails, getAllSessionCurrentIds };




// const getSessionCurrentDetails = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const sessionCurrent = await SessionCurrent.findOne({ conferenceId: id });

//   if (!sessionCurrent) {
//     res.status(404);
//     throw new Error('Session not found');
//   }

//   // Extract only the rfidNo from the currentAttendee object
//   // const { rfidNo } = sessionCurrent.currentAttendee;
//   // const { _id } = sessionCurrent;

//   // res.status(200).json({ rfidNo });
//   // res.status(200).json({ _id });

//   // const { conferenceId, currentAttendee, timestamp } = sessionCurrent;
//   const { conferenceId, details } = sessionCurrent;

//   if (!details || details.length === 0) {
//     res.status(404);
//     throw new Error('Session details not found');
//   }

//   // Extract the first item from the details array
//   const [{ timestamp, currentAttendee }] = details;

//   // You can send specific fields separately
//   res.status(200).json({
//     conferenceId,
//     currentAttendee,
//     timestamp,
//   });

//   // res.status(200).json({ sessionCurrent });
// });

// module.exports = { getSessionCurrentDetails };
