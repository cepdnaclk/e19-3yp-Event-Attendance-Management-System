// true attendees who didn't leave the session

const asyncHandler = require('express-async-handler');
const { CurrentAttendee } = require('../models/currentAttendeeModel');

// Get current session Attendees details
const getCurrentAttendeeDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const currentAttendee = await CurrentAttendee.findOne({ conferenceId: id });

    if (!currentAttendee) {
        res.status(404);
        throw new Error('Session not found');
    }
    res.status(200).json({ currentAttendee });
});

module.exports = { getCurrentAttendeeDetails };