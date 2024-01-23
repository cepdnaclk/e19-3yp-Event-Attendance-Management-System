// true attendees who didn't leave the session

const asyncHandler = require('express-async-handler');
const { CurrentAttendee } = require('../models/currentAttendeeModel');

///////////get All hot session ids based on currentCapacity
const getTopSessions = async () => {
    try {
      const topSessions = await CurrentAttendee.find()
        .sort({ currentCapacity: -1 })
        .limit(3);
  
      // Extract session details using the fetched session data
      const sessionDetailsPromises = topSessions.map(async (attendee) => {
        const session = await Session.findOne({ _id: attendee.conferenceId });
        return {
          sessionName: session.sessionName,
          maxAttendeeCap: session.maxAttendeeCap,
          // Add other session details you want to include
        };
      });
      const sessionDetails = await Promise.all(sessionDetailsPromises);
  
      console.log('Top sessions based on currentCapacity:', sessionDetails);
      return sessionDetails;
    } catch (error) {
      console.error('Error getting top sessions by currentCapacity:', error);
      throw error;
    }
  };

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

module.exports = { getTopSessions, getCurrentAttendeeDetails, getAllCurrentAttendeeIds };