const express = require("express");
// const { getEmail, getConferenceNo, getUserId, getUserName } = require("../controller/attendeeController");
const {
  // getAllAttendeeDetails,
  getRfidno,
  getAttendeeDetailsForConference,
  getAttendeeDetailsByRfidNo,
  createAttendee,
  getAttendeeDetails,
  getAllAttendeeIds,
  getAllAttendees,
} = require("../controller/attendeeController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
// router.use(validateToken);  // since all routes are protected routes, validated

router.get("/attendeesOfConf/:conferenceId", getAttendeeDetailsForConference);
router.get('/rfidNo/:rfidNo', getRfidno);
// router.get("/all", getAllAttendeeDetails);
router.get("/rfid/:rfidNo", getAttendeeDetailsByRfidNo);
router.post("/create", createAttendee);
// router.get('/', getAllAttendeeIds);
router.get("/:id/details", getAttendeeDetails);
router.get("/", getAllAttendees);

// router.get('/:id/name', getUserName);
// router.get('/:id/id', getUserId);
// router.get('/:id/email', getEmail);
// router.get('/:id/conferenceNo', getConferenceNo);

module.exports = router;
