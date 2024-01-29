// registeredRfidNo is the userId

const asyncHandler = require('express-async-handler');
const { SessionRegistered } = require('../models/sessionRegisteredModel');

// get rfid
 
// get all sessionIds for a rfidNo
const getSessionIds = asyncHandler(async (req, res) => {
  const { rfidNo } = req.params;

  try {
    const sessionRegistered = await SessionRegistered.find({ 'regAttendees.registeredRfidNo': rfidNo }, 'sessionId');
    const sessionIds = sessionRegistered.map((session) => session.sessionId.toString());

    console.log('Session ids:', sessionIds);
    res.status(200).json({ sessionIds });
  } catch (error) {
    console.error('Error getting session ids:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get all rfidNo for a sessionId

//get all registered sessionIds
const getAllSessionRegisteredIds = asyncHandler(async (req, res) => {
  try {
    // sessionId instead of _id
    const allSessionRegisteredIds = await SessionRegistered.find({}, 'sessionId');
    const sessionRegisteredIds = allSessionRegisteredIds.map((sessionRegistered) => sessionRegistered.sessionId.toString());

    console.log('Session Registered ids:', sessionRegisteredIds);
    res.status(200).json({ sessionRegisteredIds });
  } catch (error) { 
    console.error('Error getting session registered ids:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get session registered details
const getSessionRegisteredDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const sessionRegistered = await SessionRegistered.findById(id);
  const sessionRegistered = await SessionRegistered.findOne({ sessionId: id });


  if (!sessionRegistered) {
    res.status(404);
    throw new Error('Session not found');
  }

  res.status(200).json({ sessionRegistered });
});

module.exports = { getSessionIds, getSessionRegisteredDetails, getAllSessionRegisteredIds };
