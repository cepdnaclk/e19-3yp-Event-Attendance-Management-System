const express = require("express");
// const { getEmail, getConferenceNo, getUserId, getUserName } = require("../controller/attendeeController");
const { getAttendeeDetails, getAllAttendeeIds } = require("../controller/attendeeController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// router.use(validateToken);  // since all routes are protected routes, validated

router.get('/', getAllAttendeeIds);
router.get('/:id/details', getAttendeeDetails);

// router.get('/:id/name', getUserName);
// router.get('/:id/id', getUserId);
// router.get('/:id/email', getEmail);
// router.get('/:id/conferenceNo', getConferenceNo);

module.exports = router;

