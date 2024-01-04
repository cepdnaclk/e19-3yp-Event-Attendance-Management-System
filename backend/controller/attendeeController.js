const asyncHandler = require("express-async-handler");
const Attendee = require("../models/attendeeModel");

// @access Private  

const getAttendeeDetails = asyncHandler(async (req, res) => {
  const attendee = await Attendee.findById(req.params.id);

  if (!attendee) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, id, email, conNo } = attendee;

  res.status(200).json({ name, id, email, conNo });
});

module.exports = { getAttendeeDetails };

  




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