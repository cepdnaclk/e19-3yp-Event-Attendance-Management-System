const asyncHandler = require("express-async-handler");
const {Conference} = require("../models/conferenceModel");

////////////////// CONFERENCES //////////////////////

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
  res.status(200).json(conference.conferenceDetails);
});


// this doent work________________________________________________________________
////////////////// Delete a conference
const deleteConference = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the conference exists
  const conference = await Conference.findById(id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found for the given id");
  }

  // Delete the conference
  await conference.remove();

  // console.log("Received conferenceId:", id);

  res.status(200).json({ message: "Conference deleted successfully" });
});



////////////////// SESSIONS //////////////////////


////////////////// Create a new session
const createSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sessions } = req.body;

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


module.exports = {
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
