const express = require("express");
const {
  createConference,
  updateConferenceDetails,
  getConferenceDetails,
  deleteConference,
} = require("../controller/conferenceController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

// Create a new conference
router.post("/", createConference);

// Update conference details
router.put("/:id", updateConferenceDetails);

// Get conference details
router.get("/:id", getConferenceDetails);

// Delete a conference
router.delete("/:id", deleteConference);

module.exports = router;
