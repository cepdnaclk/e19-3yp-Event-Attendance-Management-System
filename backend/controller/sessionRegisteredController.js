const asyncHandler = require('express-async-handler');
const { SessionRegistered } = require('../models/sessionRegisteredModel');

//get all session registered attendee ids
const getAllSessionRegisteredIds = asyncHandler(async (req, res) => {
  try {
    const allSessionRegisteredIds = await SessionRegistered.find({}, '_id');
    const sessionRegisteredIds = allSessionRegisteredIds.map((sessionRegistered) => sessionRegistered._id.toString());

    console.log('Session Registered ids:', sessionRegisteredIds);
    res.status(200).json({ sessionRegisteredIds });
  } catch (error) { 
    console.error('Error getting session registered ids:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get session registered Attendees details
const getSessionRegisteredDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const sessionRegistered = await SessionRegistered.findById(id);

  if (!sessionRegistered) {
    res.status(404);
    throw new Error('Session not found');
  }

  res.status(200).json({ sessionRegistered });
});

module.exports = { getSessionRegisteredDetails, getAllSessionRegisteredIds };
