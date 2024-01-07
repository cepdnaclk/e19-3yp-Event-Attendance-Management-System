const asyncHandler = require('express-async-handler');
const { SessionRegistered } = require('../models/sessionRegisteredModel');

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

module.exports = { getSessionRegisteredDetails };
