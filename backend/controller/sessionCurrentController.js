// http://localhost:5001/api/sessioncurrent/659b4782d9dd7b6b93a527c2

const asyncHandler = require('express-async-handler');
const { SessionCurrent } = require('../models/sessionCurrentModel');
const { Conference, Session } = require("../models/conferenceModel");

///////////////////// ANALITYCS ///////////////////////

// get the number of rfidNos in a time range
const getRfidnoCount = asyncHandler(async (req, res) => {
  try {
    // const conferenceTime = await Conference.find({}, 'sessions.startTime sessions.endTime');
    // console.log("jhfkjh",conferenceTime);

    const { conferenceId, sessionId } = req.params;

    // console.log("hii",sessionId);
    // const sessionTime = await Session.findById(sessionId, 'startTime endTime');
    // console.log("jhfkjh",sessionTime);

    // const startTime = sessionTime.startTime;
    // const endTime = sessionTime.endTime;

    // Retrieve session details based on sessionId
    const sessionDetails = await Conference.findOne({ "sessions._id": sessionId })
      .select("sessions.$")
      .exec();
    console.log("sessionDetails: ",sessionDetails);
    
    if (!sessionDetails) {
      res.status(404).json({ error: "Session not found for the given sessionId" });
      return;
    }

    const startTime = sessionDetails.sessions[0].startTime;
    const endTime = sessionDetails.sessions[0].endTime;

    console.log('startTime:', startTime);
    console.log('endTime:', endTime);

    // Validate input parameters
    if (!sessionId || !startTime || !endTime) {
      return res.status(400).json({ message: 'Session ID, start time, and end time are required.' });
    }

    // Parse input parameters to Date objects
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    console.log("startDate: ",startDate);

    // MongoDB Aggregation Pipeline to count rfidNos within the specified time range for the given session
    const result = await SessionCurrent.aggregate([
      {
        $match: {
          conferenceId: conferenceId, // Assuming conferenceId in SessionCurrent matches conferenceId
          timestamp: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: '$timestamp',
              format: '%Y-%m-%dT%H', // Group by hour
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          hour: '$_id',
          value: '$count',
        },
      },
      {
        $sort: { hour: 1 },
      },
    ]);
    // Log the timestamps to the console
    const timestamps = await SessionCurrent.find({
      conferenceId: conferenceId,
      timestamp: { $gte: startDate, $lt: endDate },
    }).select('timestamp');
    console.log('Timestamps in SessionCurrent:', timestamps);

    console.log('RfidNo count for session:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching rfidNo count for session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get time using rfidNo
const getTimestamp = asyncHandler(async (req, res) => {
  try {
    const { rfidNo } = req.params;
    console.log(rfidNo)

    // Find the session current record for the given rfidNo
    const sessionCurrentRecord = await SessionCurrent.findOne({ rfidNo });

    if (!sessionCurrentRecord) {
      return res.status(404).json({ message: 'No record found for the given rfidNo' });
    }

    // Extract and send the timestamp
    const { timestamp } = sessionCurrentRecord;
    res.json({ timestamp });
  } catch (error) {
    console.error('Error fetching timestamp:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

////////////////////// Get sessionIds of ongoing sessions
const getOngoingSessionIds = asyncHandler(async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();

    // Find conferences that have ongoing sessions
    const conferences = await Conference.find({
      "sessions.startTime": { $lt: currentDate },
      "sessions.endTime": { $gt: currentDate }
    });

    // Extract sessionIds from ongoing sessions
    const ongoingSessionIds = conferences.reduce((sessionIds, conference) => {
      const ongoingSessions = conference.sessions.filter(
        session => session.startTime < currentDate && session.endTime > currentDate
      );
      const sessionIdsForConference = ongoingSessions.map(session => session._id.toString());
      return sessionIds.concat(sessionIdsForConference);
    }, []);

    console.log('Ongoing Session IDs:', ongoingSessionIds);
    res.status(200).json({ ongoingSessionIds });
  } catch (error) {
    console.error('Error getting ongoing sessionIds:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/////////////////////// Get all SessionCurrent IDs
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


////////////////// Get session registered Attendees details
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

module.exports = { getRfidnoCount,
  getTimestamp,
  getOngoingSessionIds,
  getSessionCurrentDetails, getAllSessionCurrentIds };




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
