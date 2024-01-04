const asyncHandler = require("express-async-handler");
const Conference = require("../models/conferenceModel");

// Create a new conference
const createConference = asyncHandler(async (req, res) => {
    const { SessionDetails, maxAttendeeCap, startTime, endTime, sessionHolder } =
      req.body;
  
    const newConference = new Conference({
      SessionDetails,
      maxAttendeeCap,
      startTime,
      endTime,
      sessionHolder,
    });
  
    // Save the new conference
    await newConference.save();
  
    res.status(201).json({ message: "Conference created successfully" });
  });


// Update conference details
const updateConferenceDetails = asyncHandler(async (req, res) => {
  const { SessionDetails, maxAttendeeCap, startTime, endTime, sessionHolder } =
    req.body;

  const conference = await Conference.findById(req.params.id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  // Update the conference details
  conference.SessionDetails = SessionDetails;
  conference.maxAttendeeCap = maxAttendeeCap;
  conference.startTime = startTime;
  conference.endTime = endTime;
  conference.sessionHolder = sessionHolder;

  // Save the updated conference
  await conference.save();

  res.status(200).json({ message: "Conference details updated successfully" });
});

// Get conference details
const getConferenceDetails = asyncHandler(async (req, res) => {
  const conference = await Conference.findById(req.params.id);

  if (!conference) {
    res.status(404);
    throw new Error("Conference not found");
  }

  res.status(200).json(conference);
});

// Delete a conference
const deleteConference = asyncHandler(async (req, res) => {
    const conference = await Conference.findById(req.params.id);
  
    if (!conference) {
      res.status(404);
      throw new Error("Conference not found");
    }
  
    // Delete the conference
    await conference.remove();
  
    res.status(200).json({ message: "Conference deleted successfully" });
  });
  
  module.exports = {
    createConference,
    updateConferenceDetails,
    getConferenceDetails,
    deleteConference,
  };

module.exports = {createConference, updateConferenceDetails, getConferenceDetails, deleteConference };
