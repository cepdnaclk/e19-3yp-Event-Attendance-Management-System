const express = require("express");
const {
  createConference,
  createSession,
  updateConferenceDetails,
  updateSessionDetails,
  getConferenceDetails,
  deleteConference,
  getSessionDetails,
  deleteSession,
} = require("../controller/conferenceController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

////////////// CONFERENCES //////////////////////

// Create a new conference
router.post("/", createConference);

// Update conference details 
router.put("/:id", updateConferenceDetails);

// Get conference details
router.get("/:id", getConferenceDetails);

// Delete a conference
router.delete("/:id", deleteConference);


////////////// SESSIONS //////////////////////

// Create a new session
router.post("/session/:id", createSession);

// Update Session details
router.put("/:id/session/:sessionId", updateSessionDetails);

// Get session details
router.get("/:id/session/:sessionId", getSessionDetails);

// Delete a session
router.delete("/:id/session/:sessionId", deleteSession);

module.exports = router;
