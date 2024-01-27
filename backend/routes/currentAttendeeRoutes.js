const express = require('express');
const {getTopSessions, getCurrentAttendeeDetails, getAllCurrentAttendeeIds} = require('../controller/currentAttendeeController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// router.use(validateToken);

router.get("/topSessions", getTopSessions);
router.get('/', getAllCurrentAttendeeIds);
router.get('/:id', getCurrentAttendeeDetails);

module.exports = router;