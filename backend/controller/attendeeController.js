const asyncHandler = require("express-async-handler");
const { CurrentAttendee } = require('../models/currentAttendeeModel');
const Attendee = require("../models/attendeeModel");
const SessionRegistered = require("../models/sessionRegisteredModel");

// @access Private
// Get attendee details for all RFID numbers relevant to a conference ID
const getAttendeeDetailsForConference = asyncHandler(async (req, res) => {
  try {
    const { conferenceId } = req.params;

    // Find the current attendees for the given conferenceId
    const currentAttendees = await CurrentAttendee.findOne({ conferenceId });

    if (!currentAttendees) {
      return res.status(404).json({ message: 'No current attendees found for the given conferenceId' });
    }

    // Extract RFID numbers from the currentAttendees document
    const rfidNos = currentAttendees.rfidNo;

    // Fetch attendee details for each RFID number
    const attendeeDetails = [];
    for (const rfidNo of rfidNos) {
      const attendee = await Attendee.findOne({ rfidNo });

      if (attendee) {
        const { name, id, email, conNo } = attendee;
        attendeeDetails.push({ name, id, email, conNo, rfidNo });
      }
    }

    res.json({ attendeeDetails });
  } catch (error) {
    console.error('Error fetching attendee details for conference:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update rfidNo by userId
const putRfidNo = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { rfidNo } = req.body;

    // Update the rfidNo for the given userId
    const updatedAttendee = await Attendee.findOneAndUpdate(
      { userId },
      { $set: { rfidNo } },
      { new: true }
    );

    if (!updatedAttendee) {
      return res.status(404).json({ message: 'No attendee found for the given userId' });
    }

    res.json({ message: 'rfidNo updated successfully', attendee: updatedAttendee });
  } catch (error) {
    console.error('Error updating rfidNo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get userId by rfidNo
const getRfidno = asyncHandler(async (req, res) => {
  try {
    const { rfidNo } = req.params;

    // Find the attendee with the provided userId
    const attendee = await Attendee.findOne({ rfidNo });

    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found for the given rfidNo' });
    }

    // Return the rfidNo for the found attendee
    res.status(200).json({ userId: attendee.userId });
  } catch (error) {
    console.error('Error fetching userId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// get attendee datails by rfidNo
const getAttendeeDetailsByRfidNo = asyncHandler(async (req, res) => {
  const { rfidNo } = req.params;
  console.log(rfidNo);
  try {
    const attendee = await Attendee.findOne({ rfidNo: rfidNo });

    if (!attendee) {
      res.status(404);
      throw new Error("User not found");
    }

    const { name, id, email, conNo } = attendee;

    res.status(200).json({ name, id, email, conNo });
  } catch (error) {
    console.error("Error fetching attendee data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// dont need
const createAttendee = asyncHandler(async (req, res) => {
  const { name, email, password, conNo, rfidNo } = req.body;

  try {
      const attendee = await Attendee.create({
          name,
          email,
          password,
          conNo,
          rfidNo,
      });

      res.status(201).json({
          _id: attendee._id,
          name: attendee.name,
          email: attendee.email,
          conNo: attendee.conNo,
          rfidNo: attendee.rfidNo,
      });
  } catch (error) {
      console.error('Error creating attendee:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get all attendee ids
const getAllAttendeeIds = asyncHandler(async (req, res) => {
  try {
    console.log("Getting all attendee ids...");
    const allAttendeeIds = await Attendee.find({}, "_id");
    const attendeeIds = allAttendeeIds.map((attendee) => attendee._id.toString());

    console.log("Attendee ids:", attendeeIds);
    res.status(200).json({ attendeeIds });
  } 
  catch (error) {
    console.error("Error getting attendee ids:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// doesnt work and doent need ----------------------------------------
// get all attendee details for registered sessions
// const getAllAttendeeDetails = asyncHandler(async (req, res) => {
//   try {
//     // Fetch all registered session IDs
//     const allSessionRegisteredIds = await SessionRegistered.find({}, 'sessionId');
//     const sessionRegisteredIds = allSessionRegisteredIds.map((sessionRegistered) => sessionRegistered.sessionId.toString());

//     // Find attendees for the registered session IDs
//     const allAttendeeDetails = await Attendee.find({ sessionId: { $in: sessionRegisteredIds } });

//     console.log('All Attendee Details:', allAttendeeDetails);
//     res.status(200).json({ allAttendeeDetails });
//   } catch (error) {
//     console.error('Error getting attendee details:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// get all registered sessionIds
const getAllSessionRegisteredIds = async (req, res) => {
  try {
    // Find all documents and project only the 'sessionId' field
    const allSessionRegisteredIds = await SessionRegistered.find({}, 'sessionId');

    // Map the session IDs to strings
    const sessionRegisteredIds = allSessionRegisteredIds.map(session => session.sessionId.toString());

    console.log('Session Registered IDs:', sessionRegisteredIds);
    res.status(200).json({ sessionRegisteredIds });
  } catch (error) {
    console.error('Error getting session registered IDs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get attendee details
const getAttendeeDetails = asyncHandler(async (req, res) => {
  const attendee = await Attendee.findById(req.params.id);

  if (!attendee) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, id, email, conNo, rfidNo } = attendee;

  res.status(200).json({ name, id, email, conNo, rfidNo });
});

const getAllAttendees = asyncHandler(async (req, res) => {
  const attendee = await Attendee.find({});

  if (!attendee) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(attendee);
});

module.exports = { 
  // getAllAttendeeDetails, 
  getRfidno,
  putRfidNo,
  getAttendeeDetailsForConference,
  getAttendeeDetailsByRfidNo, createAttendee, getAttendeeDetails, getAllAttendees, getAllAttendeeIds };

  



// const getUserName = asyncHandler (async (req,res) => {
//     const contact = await Attendee.findById(req.params.id);
//     if(!contact){
//         res.status(404);
//         throw new Error("User not found");
//     }
//     // Extract the 'name' field from the contact
//     const { name } = contact;
//     res.status(200).json({ name });
//     }
// )

// // const getUserName = asyncHandler(async (req, res) => {
// //     try {
// //       const contact = await Attendee.findById(req.params.id);
// //       if (!contact) {
// //         res.status(404);
// //         throw new Error("User not found");
// //       }
  
// //       // Extract the 'name' field from the contact
// //       const { name } = contact;
  
// //       // Combine 'Hello' with the name in the HTML content
// //       const htmlContent = `<h1>Hello, ${name}!</h1>`;
  
// //       // Send the combined HTML content as the response
// //       res.status(200).send(htmlContent);
// //     } catch (error) {
// //       console.error('Error fetching attendee data:', error);
// //       res.status(500).send('Internal Server Error');
// //     }
// //   });
  


// /////////********************************************* */ have to look
// const getUserId = asyncHandler (async (req,res) => {
//     const contact = await Attendee.findById(req.params.id);
//     if(!contact){
//         res.status(404);
//         throw new Error("User not found");
//     }
//     const { id } = contact;
//     res.status(200).json({ id });
//     }
// )

// const getEmail = asyncHandler (async (req,res) => {
//     const contact = await Attendee.findById(req.params.id);
//     if(!contact){
//         res.status(404);
//         throw new Error("User not found");
//     }
//     const { email } = contact;
//     res.status(200).json({ email });
//     }
// )

// const getConferenceNo = asyncHandler (async (req,res) => {
//     const contact = await Attendee.findById(req.params.id);
//     if(!contact){
//         res.status(404);
//         throw new Error("User not found");
//     }
//     const { conNo } = contact;
//     res.status(200).json({ conNo });
//     }
// )

// module.exports = {getConferenceNo, getUserId, getUserName, getEmail};