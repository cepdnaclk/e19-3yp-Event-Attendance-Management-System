// true attendees who didn't leave the session

const asyncHandler = require('express-async-handler');
const { CurrentAttendee } = require('../models/currentAttendeeModel');

// get all current attendee ids
const getAllCurrentAttendeeIds = asyncHandler(async (req, res) => {
    try {
        const allCurrentAttendeeIds = await CurrentAttendee.find({}, '_id');
        const currentAttendeeIds = allCurrentAttendeeIds.map((currentAttendee) => currentAttendee._id.toString());

        console.log('Current Attendee ids:', currentAttendeeIds);
        res.status(200).json({ currentAttendeeIds });
    } 
    catch (error) {
        console.error('Error getting current attendee ids:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

module.exports = { getCurrentAttendeeDetails, getAllCurrentAttendeeIds };