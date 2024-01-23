const asyncHandler = require("express-async-handler");
const {Conference, Session } = require("../models/conferenceModel");
// const { CurrentAttendee } = require('..models/currentAttendeeModel');

// dont need

///////////get All hot session ids based on currentCapacity
// const getTopSessions = async () => {
//   try {
//     const topSessions = await CurrentAttendee.find()
//       .sort({ currentCapacity: -1 })
//       .limit(3);

//     // Extract session details using the fetched session data
//     const sessionDetailsPromises = topSessions.map(async (attendee) => {
//       const session = await Session.findOne({ _id: attendee.conferenceId });
//       return {
//         sessionName: session.sessionName,
//         maxAttendeeCap: session.maxAttendeeCap,
//         // Add other session details you want to include
//       };
//     });
//     const sessionDetails = await Promise.all(sessionDetailsPromises);

//     console.log('Top sessions based on currentCapacity:', sessionDetails);
//     return sessionDetails;
//   } catch (error) {
//     console.error('Error getting top sessions by currentCapacity:', error);
//     throw error;
//   }
// };

// const getTopSessions = async () => {
//   try {
//     // Find sessions, sort them in descending order based on maxAttendeeCap, and limit to the top 3
//     const topSessions = await Session.find()
//       .sort({ maxAttendeeCap: -1 })
//       .limit(3);

//     return topSessions;
//   } catch (error) {
//     console.error('Error getting top sessions:', error);
//     throw error;
//   }
// };



//wrong
// const getHotSessionIds = async (conferenceId, sessionId) => {
//   try {
//     const matchStage = { $match: { _id: mongoose.Types.ObjectId(conferenceId) } };
//     const unwindStage = { $unwind: "$sessions" };
//     const matchSessionStage = { $match: { "sessions._id": mongoose.Types.ObjectId(sessionId) } };
//     const sortStage = { $sort: { "sessions.maxAttendeeCap": -1 } };
//     const limitStage = { $limit: 3 };

//     const hotSessions = await Conference.aggregate([
//       matchStage,
//       unwindStage,
//       matchSessionStage,
//       sortStage,
//       limitStage,
//     ]);

//     console.log('Hot sessions maxAttendeeCap:', hotSessions.map(session => session.sessions.maxAttendeeCap));

//     if (!hotSessions || hotSessions.length === 0) {
//       console.log('No hot sessions found');
//       return [];
//     }

//     const hotSessionDetails = hotSessions.map(session => ({
//       _id: session._id.toString(),
//       sessionName: session.sessions.sessionName,
//       maxAttendeeCap: session.sessions.maxAttendeeCap,
//       startTime: session.sessions.startTime,
//       endTime: session.sessions.endTime,
//     }));

//     return hotSessionDetails;
//   } catch (error) {
//     console.error('Error getting hot session details:', error);
//     throw error;
//   }
// };

const getHotSessionIds = async () => {
  try {
    const hotSessions = await Session.find()
      .sort({ maxAttendeeCap: -1 }) // Sort sessions in descending order based on maxAttendeeCap
      .limit(3); // Limit the result to the top 3 sessions (adjust as needed)

    console.log('Hot sessions maxAttendeeCap:', hotSessions.map(session => session.maxAttendeeCap));

    if (!hotSessions || hotSessions.length === 0) {
      // Check if hotSessions is empty
      console.log('No hot sessions found');
      return [];
    }

    const hotSessionDetails = hotSessions.map(session => ({
      _id: session._id.toString(),
      sessionName: session.sessionName,
      maxAttendeeCap: session.maxAttendeeCap,
      startTime: session.startTime,
      endTime: session.endTime,
    }));

    return hotSessionDetails;
  } catch (error) {
    console.error('Error getting hot session details:', error);
    throw error;
  }
};

////////////////// CONFERENCES //////////////////////

///////////get All conference ids
const getConferenceIds = asyncHandler (async (req, res) => {
  try {
    const conferences = await Conference.find({}, '_id');
    const conferenceIds = conferences.map(conference => conference._id.toString());
    console.log('Conference IDs:', conferenceIds);
    res.status(200).json({ conferenceIds });
    // return [...new Set(conferenceIds)];
  } catch (error) {
    console.error('Error getting conferenceIds:', error);
    throw error;
  }
});

/////////////////////// Get all conference details
const getAllConferences = asyncHandler(async (req, res) => {

  // const conference = await Conference.findById(id);
  const conference = await Conference.find({});

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  res.status(200).json(conference);
});


////////////////// Create a new conference room
const createConference = asyncHandler(async (req, res) => {
  try {
    const { conferenceDetails } = req.body;

    // Log the received conferenceDetails
    // console.log("Received conferenceDetails:", conferenceDetails);

    // Create a new conference
    const newConference = new Conference({ conferenceDetails });

    // Save the new conference
    await newConference.save();

    // Access the generated _id
    const conferenceId = newConference._id;

    res.status(201).json({ message: "Conference created successfully", conferenceId });
  } catch (error) {
    console.error("Error creating conference:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//////////// Update conference details
const updateConferenceDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { conferenceDetails } = req.body;

  const conference = await Conference.findById(id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  // Update the conferenceDetails
  conference.conferenceDetails = conferenceDetails;

  // Save the updated conference
  await conference.save();

  res.status(200).json({ message: "Conference details updated successfully" });
});


/////////////////////// Get conference details
const getConferenceDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const conference = await Conference.findById(id);
  const conference = await Conference.findById(id, 'conferenceDetails');

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  // res.status(200).json(conference);
  res.status(200).json(conference);
});


////////////////// Delete a conference
const deleteConference = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the conference exists
  const conference = await Conference.findByIdAndDelete(id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found for the given id");
  }

  // Delete the conference
  // await conference.remove();

  // console.log("Received conferenceId:", id);

  res.status(200).json({ message: "Conference deleted successfully" });
});



////////////////// SESSIONS //////////////////////

// Assuming you have the sessionIds array in the request body like this:
// {
//   "sessionIds": [
//     "65993c78a87fe5df449913c5",
//     "659d04a8eaf8a86c393d4335"
//   ]
// }

///////////get All session ids
const getSessionIds = asyncHandler(async (req, res) => {
  const { conferenceId } = req.params;

  try {
    const conference = await Conference.findById(conferenceId);

    if (!conference) {
      res.status(404).json({ message: "Conference not found" });
      return;
    }

    const sessionIds = conference.sessions.map(session => session._id.toString());

    res.status(200).json({ sessionIds });
  } catch (error) {
    console.error('Error getting session IDs:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// have to check this -------------------------------------
// get all sessionDetails for a list of sessionIds
const getAllSessionDetails = async (req, res) => {
  try {
    const { sessionIds } = req.body;
    // const {["65993c78a87fe5df449913c5","659d04a8eaf8a86c393d4335"]: sessionIds } = req.body;    

    // Find sessions that match the provided sessionIds
    const sessions = await Session.find({ _id: { $in: sessionIds } });

    if (sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found for the provided sessionIds' });
    }

    console.log('Session Details:', sessions);
    res.status(200).json({ sessionDetails: sessions });
  } catch (error) {
    console.error('Error getting session details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

////////////////// Create a new session
const createSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sessions } = req.body;

  // console.log(req.body);

  // Check if the conference exists
  const conference = await Conference.findById(id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found for the given id");
  }

  // Add each session to the existing sessions array
  sessions.forEach(session => {
    conference.sessions.push(session);
  });

  // Save the updated conference
  await conference.save();

  // Access the generated _id of the last session added
  const sessionId = conference.sessions[conference.sessions.length - 1]._id;

  res.status(201).json({ message: "Sessions created successfully", sessionId });
});


////////////// Update Session details including session
const updateSessionDetails = asyncHandler(async (req, res) => {
  const { id: conferenceId, sessionId } = req.params;
  const { session } = req.body;

  // Check if the conference exists
  const conferenceExists = await Conference.exists({ _id: conferenceId });

  if (!conferenceExists) {
    res.status(404);
    throw new Error("Conference not found for the given id");
  }

  const conference = await Conference.findById(conferenceId);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  // Find the session in the sessions array based on sessionId
  const sessionToUpdate = conference.sessions.find(session => session._id.toString() === sessionId);

  if (!sessionToUpdate) {
    res.status(404);
    throw new Error("Session not found for the given sessionId");
  }

  // Update the session details
  sessionToUpdate.sessionName = session.sessionName;
  sessionToUpdate.SessionDetails = session.SessionDetails;
  sessionToUpdate.maxAttendeeCap = session.maxAttendeeCap;
  sessionToUpdate.startTime = session.startTime;
  sessionToUpdate.endTime = session.endTime;
  sessionToUpdate.speaker = session.speaker;

  // Save the updated conference
  await conference.save();

  res.status(200).json({ message: "Session details updated successfully" });
});


////////////////// Get session details by session ID without conference ID
const getSessionDetailsBySesId = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find the session in the sessions array based on sessionId across all conferences
    const sessionDetails = await Conference.findOne({ "sessions._id": sessionId })
      .select("sessions.$")
      .exec();

    if (!sessionDetails) {
      res.status(404).json({ error: "Session not found for the given sessionId" });
      return;
    }

    res.status(200).json(sessionDetails.sessions[0]);
  } catch (error) {
    console.error("Error fetching session details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


////////////////// Get session details by session ID
const getSessionDetails = asyncHandler(async (req, res) => {
  const { id: conferenceId, sessionId } = req.params;

  // Check if the conference exists
  const conference = await Conference.findById(conferenceId);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found for the given conferenceId");
  }

  // Find the session in the sessions array based on sessionId
  const sessionDetails = conference.sessions.id(sessionId);

  if (!sessionDetails) {
    res.status(404);
    throw new Error("Session not found for the given sessionId");
  }

  res.status(200).json(sessionDetails);
});


//////////////////// Delete session by session ID
const deleteSession = asyncHandler(async (req, res) => {
  const { id: conferenceId, sessionId } = req.params;

  // Check if the conference exists
  const conference = await Conference.findById(conferenceId);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found for the given conferenceId");
  }

  // Find the index of the session in the sessions array based on sessionId
  const sessionIndex = conference.sessions.findIndex(session => session._id.toString() === sessionId);

  if (sessionIndex === -1) {
    res.status(404);
    throw new Error("Session not found for the given sessionId");
  }

  // Remove the session from the sessions array
  conference.sessions.splice(sessionIndex, 1);

  // Save the updated conference
  await conference.save();

  res.status(200).json({ message: "Session deleted successfully" });
});

// get all 

// const getSessionIds = async () => {
//   try {
//     const sessions = await Session.find({}, '_id');
//     const sessionIds = sessions.map(session => session._id.toString());
//     console.log('Session IDs:', sessionIds);
//     return [...new Set(sessionIds)];
//   } catch (error) {
//     console.error('Error getting session IDs:', error);
//     throw error;
//   }
// };

module.exports = {
  // getTopSessions,
  getAllSessionDetails,
  getHotSessionIds,
  getSessionDetailsBySesId,
  getConferenceIds,
  getSessionIds,
  createConference,
  createSession,
  updateConferenceDetails,
  updateSessionDetails,
  getConferenceDetails,
  getSessionDetails,
  deleteSession,
  deleteConference,
  getAllConferences,
};
