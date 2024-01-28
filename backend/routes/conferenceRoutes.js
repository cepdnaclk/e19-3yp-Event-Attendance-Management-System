const express = require("express");
const {
  // getTopSessions,
  getAllSessionDetails,
  getSessionDetailsForConference,
  // getHotSessionIds,
  getSessionDetailsBySesId,
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

// Get hot sessions
// router.get("/topSessions", getTopSessions);
// router.get("/hotSessions", getHotSessionIds);

// get all session details for a list of sessionIds
router.get("/allSessionDetails", getAllSessionDetails);

// Get all conferences
router.get("/get", getAllConferences);

// get all conferences ids
router.get("/conferenceIds", getConferenceIds);

// get all session ids
router.get("/:conferenceId/sessionIds", getSessionIds);

////////////// SESSIONS //////////////////////

// Create a new session
router.post("/session/:id", createSession);

// Update Session details
router.put("/:id/sessionup/:sessionId", updateSessionDetails);

// Get session details
router.get("/:id/session/:sessionId", getSessionDetails);

// Get all session details for a conferenceId
router.get("/:conferenceId/sessions", getSessionDetailsForConference);

// Get session details without conferenceId
router.get("/sessions/:sessionId", getSessionDetailsBySesId);

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

module.exports = router;
