const express = require("express");
const {
  getConferenceIds,
  getSessionIds,
  createConference,
  createSession,
  updateConferenceDetails,
  updateSessionDetails,
  getConferenceDetails,
  deleteConference,
  getSessionDetails,
  deleteSession,
  getAllConferences,
} = require("../controller/conferenceController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// router.use(validateToken);

// get all conferences ids
router.get("/conferenceIds", getConferenceIds);

// get all session ids
router.get("/:conferenceId/sessionIds", getSessionIds);

////////////// SESSIONS //////////////////////

// Create a new session
router.post("/session/:id", createSession);

// Update Session details
router.put("/:id/session/:sessionId", updateSessionDetails);

// Get session details
router.get("/:id/session/:sessionId", getSessionDetails);

// Delete a session
router.delete("/:id/session/:sessionId", deleteSession);

////////////// CONFERENCES //////////////////////

// Create a new conference
router.post("/", createConference);

// Update conference details
router.put("/:id", updateConferenceDetails);

// Get conference details
router.get("/:id", getConferenceDetails);

// Delete a conference
router.delete("/:id", deleteConference);

// Get all conferences
router.get("/", getAllConferences);

module.exports = router;
