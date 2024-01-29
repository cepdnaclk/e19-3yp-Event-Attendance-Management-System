// true attendees who didn't leave the session

const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { CurrentAttendee } = require('../models/currentAttendeeModel');
const { Conference, Session } = require("../models/conferenceModel");

///////////////////// ANALITYCS ///////////////////////

// Get total _current capacity_ of all conferences
const getTotalCurrentCapacity = asyncHandler(async (req, res) => {
  try {
    const result = await CurrentAttendee.aggregate([
      {
        $group: {
          _id: null,
          totalCurrentCapacity: { $sum: "$currentCapacity" },
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json({ totalCurrentCapacity: result[0].totalCurrentCapacity });
    } else {
      res.status(200).json({ totalCurrentCapacity: 0 }); // Return 0 if no records are found
    }
  } catch (error) {
    console.error('Error calculating sum of currentCapacity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get the total _maxAttendeeCap_ of all conferences
const getSumofMaxCap = asyncHandler(async (req, res) => {
  try {
    // Aggregate to get the sum of maxAttendeeCap for each conferenceId
    const result = await Conference.aggregate([
      {
        $unwind: '$sessions', // Unwind the sessions array
      },
      {
        $group: {
          _id: '$sessions.conferenceId', // Group by the conferenceId within sessions
          totalMaxAttendeeCap: { $sum: '$sessions.maxAttendeeCap' },
        },
      },
      {
        $project: {
          _id: 0,
          // conferenceId: '$_id', // Rename _id to conferenceId
          totalMaxAttendeeCap: 1,
        },
      },
    ]);

    console.log(result.map(item => item.totalMaxAttendeeCap));
    res.status(200).json(result);
  } catch (error) {
    console.error('Error calculating sums of maxAttendeeCap:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// to get the percentage __________
// Get total _current capacity_ for each conference
const getTotalCurrentCapacityByConference = asyncHandler(async (req, res) => {
  try {
    const result = await CurrentAttendee.aggregate([
      {
        $group: {
          _id: "$conferenceId",
          totalCurrentCapacity: { $sum: "$currentCapacity" },
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json({ totalCurrentCapacityByConference: result });
    } else {
      res.status(200).json({ totalCurrentCapacityByConference: [] }); // Return empty array if no records are found
    }
  } catch (error) {
    console.error('Error calculating sum of currentCapacity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get sum of maxAttendeeCap of a conferenceId
const getSumofMaxCapForConference = asyncHandler(async (req, res) => {
  try {
    const { conferenceId } = req.params;
    console.log(conferenceId);

    // Check if the provided conferenceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(conferenceId)) {
      res.status(400).json({ message: 'Invalid conferenceId' });
      return;
    }

    // Convert conferenceId to ObjectId
    const conferenceObjectId = new mongoose.Types.ObjectId(conferenceId);

    // Aggregate to get the sum of maxAttendeeCap for a specific conferenceId
    const result = await Conference.aggregate([
      {
        $match: { '_id': conferenceObjectId },
      },
      {
        $unwind: '$sessions', // Unwind the sessions array
      },
      {
        $group: {
          _id: '$sessions.conferenceId', // Group by the conferenceId within sessions
          totalMaxAttendeeCap: { $sum: '$sessions.maxAttendeeCap' },
        },
      },
      {
        $project: {
          _id: 0,
          // conferenceId: '$_id', // Rename _id to conferenceId
          totalMaxAttendeeCap: 1,
        },
      },
    ]);

    console.log(result);

    if (result.length === 0) {
      res.status(404).json({ message: 'Conference not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error('Error calculating sum of maxAttendeeCap:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



//// doesnt work _________
// Get percentage of capacity for each conferenceId
const getCapacityPercentage = asyncHandler(async (req, res) => {
  try {
    // Fetch currentAttendee data with corresponding session details
    const result = await CurrentAttendee.aggregate([
      {
        $group: {
          _id: '$conferenceId',
          totalCurrentCapacity: { $sum: '$currentCapacity' },
        },
      },
      {
        $lookup: {
          from: 'conferences', // The name of the collection to join with
          localField: '_id',
          foreignField: '_id',
          as: 'conferenceDetails',
        },
      },
      {
        $unwind: '$conferenceDetails',
      },
      {
        $addFields: {
          conferenceId: {
            $toObjectId: '$conferenceId',
          },
        },
      },
      {
        $lookup: {
          from: 'conferences',
          localField: 'conferenceId',
          foreignField: '_id',
          as: 'conferenceDetails',
        },
      },
      {
        $unwind: '$conferenceDetails',
      },
      {
        $unwind: '$conferenceDetails.sessions',
      },
      {
        $group: {
          _id: '$conferenceId',
          totalMaxAttendeeCap: { $sum: '$conferenceDetails.sessions.maxAttendeeCap' },
          totalCurrentCapacity: { $first: '$totalCurrentCapacity' }, // Keep total current capacity
        },
      },
      {
        $project: {
          _id: 0,
          conferenceId: '$_id',
          // time: 1,
          rfidNo: 1,
          currentCapacity: '$totalCurrentCapacity',
          maxAttendeeCap: '$totalMaxAttendeeCap',
          percentage: {
            $multiply: [
              { $divide: ['$totalCurrentCapacity', '$totalMaxAttendeeCap'] },
              100,
            ],
          },
        },
      },
    ]);

    console.log('MaxAttendeeCap values after the $group stage:', result.map(item => item.totalMaxAttendeeCap));
    console.log('CurrentCapacity values after the $group stage:', result.map(item => item.totalCurrentCapacity));
    console.log('ConferenceIds after the first $group stage:', result.map(item => item._id));
    console.log('ConferenceIds after $lookup and $unwind stages:', result.map(item => item.conferenceId));
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error calculating capacity percentage:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// dont need
// Get the conferenceId with max currentCapacity
const maxCurrentCapacityConference = asyncHandler( async (req, res) => {
  try {
    const maxCapacityConference = await CurrentAttendee
      .aggregate([
        { $group: { _id: '$conferenceId', maxCapacity: { $max: '$currentCapacity' } } },
        { $sort: { maxCapacity: -1 } },
        { $limit: 1 },
      ])
      .exec();

    if (!maxCapacityConference || maxCapacityConference.length === 0) {
      res.status(404).json({ message: 'No conference found' });
      return;
    }

    const result = {
      conferenceId: maxCapacityConference[0]._id,
      maxCapacity: maxCapacityConference[0].maxCapacity,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching max current capacity conference:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  

///////////get All hot session ids based on currentCapacity
// const getTopSessions = async (req, res) => {
//   try {
//     const topSessions = await CurrentAttendee.find()
//       .sort({ currentCapacity: -1 })
//       .limit(3);

//     const sessionDetailsPromises = topSessions.map(async (attendee) => {
//       const conference = await Conference.findOne({ _id: attendee.conferenceId });
//       // const session = conference.sessions.find((session) => /* add your condition to select the session based on time */);
      
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

const getTopSessions = async (req, res) => {
    try {
      const topSessions = await CurrentAttendee.find()
        .sort({ currentCapacity: -1 })
        .limit(3);

      // console.log('Top sessions based on currentCapacity:', topSessions);

      // Extract conferenceIds from the fetched sessions
      const conferenceIds = topSessions.map((session) => session.conferenceId);

      console.log('Top conferenceIds based on currentCapacity:', conferenceIds);
      res.status(200).json({ conferenceIds });
      // return conferenceIds;
  
      // // Extract session details using the fetched session data
      // const sessionDetailsPromises = topSessions.map(async (attendee) => {
      //   const session = await Session.findOne({ _id: attendee.conferenceId });
      //   return {
      //     sessionName: session.sessionName,
      //     maxAttendeeCap: session.maxAttendeeCap,
      //   };
      // });
      // const sessionDetails = await Promise.all(sessionDetailsPromises);
      // console.log('Top sessions based on currentCapacity:', sessionDetails);
      // return sessionDetails;

    } catch (error) {
      console.error('Error getting top sessions by currentCapacity:', error);
      throw error;
    }
  };

// Get all conferenceIds
const getAllConferenceIds = asyncHandler(async (req, res) => {
  try {
    const conferenceIds = await CurrentAttendee.distinct('conferenceId');
    res.json({ conferenceIds });
  } catch (error) {
    console.error('Error retrieving conferenceIds:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// doesnt need
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

// Get current capacity of session Attendees 
// const getCurrentAttendeeDetails = asyncHandler(async (req, res) => {
//   try {
//       const { conferenceId } = req.params;

//       // Validate conferenceId
//       if (!mongoose.Types.ObjectId.isValid(conferenceId)) {
//           return res.status(400).json({ message: 'Invalid conferenceId' });
//       }

//       // Find current attendees based on conferenceId
//       const currentAttendees = await CurrentAttendee.find({ conferenceId: mongoose.Types.ObjectId(conferenceId) });

//       if (!currentAttendees || currentAttendees.length === 0) {
//           return res.status(404).json({ message: 'Current attendees not found for the given conferenceId' });
//       }

//       res.status(200).json({ currentAttendees });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// const getCurrentAttendeeDetails = asyncHandler(async (req, res) => {
//     const { id } = req.params;
    
//     const currentAttendee = await CurrentAttendee.findOne({ conferenceId: id });
//     console.log(currentAttendee);
//     if (!currentAttendee) {
//         res.status(404);
//         throw new Error('Session not found');
//     }
//     res.status(200).json({ currentAttendee });
// });

// Get current session Attendees details
const getCurrentAttendeeDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Find the current attendee based on conferenceId and populate the conference details
    const currentAttendee = await CurrentAttendee
      .findOne({ conferenceId: new mongoose.Types.ObjectId(id) })
      .populate({
        path: 'conferenceId',
        select: 'currentCapacity', 
      });

    if (!currentAttendee) {
      console.error(error);
      res.status(404).json({ message: 'Session not found' });
      return;
    }

    res.status(200).json({ currentCapacity: currentAttendee.currentCapacity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get current rfidNos for conferenceId
const getRfidNos = asyncHandler(async (req, res) => {
  try {
    const { conferenceId } = req.params;

    // Find the current attendees for the given conferenceId
    const currentAttendees = await CurrentAttendee.findOne({ conferenceId });

    if (!currentAttendees) {
      return res.status(404).json({ message: 'No current attendees found for the given conferenceId' });
    }

    // Extract rfidNOs from the currentAttendees document
    const rfidNOs = currentAttendees.rfidNo;

    res.json({ rfidNOs });
  } catch (error) {
    console.error('Error fetching rfidNOs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { 
  getRfidNos,
  getTotalCurrentCapacity,
  getTotalCurrentCapacityByConference,
  getSumofMaxCapForConference,
  // getSumofCurrentCap,
  getSumofMaxCap,
  getCapacityPercentage,
  maxCurrentCapacityConference,
  getTopSessions,
  getAllConferenceIds, getCurrentAttendeeDetails, getAllCurrentAttendeeIds };

  // dont need
// Get the sum of currentCapacity with conferenceIds
// const getSumofCurrentCap = asyncHandler(async (req, res) => {
//   try {
//     const result = await CurrentAttendee.aggregate([
//       {
//         $group: {
//           _id: '$conferenceId',
//           totalCurrentCapacity: { $sum: '$currentCapacity' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           conferenceId: '$_id',
//           totalCurrentCapacity: 1,
//         },
//       },
//     ]);

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error getting conference capacity sums:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });