const express = require('express');
const {getRfidnoCount,
    getTimestamp,
    getOngoingSessionIds, getSessionCurrentDetails, getAllSessionCurrentIds} = require('../controller/sessionCurrentController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// router.use(validateToken);

// get hourly rfidNo count
router.get('/rfidNoCount/:conferenceId/:sessionId', getRfidnoCount);

router.get('/timestamp/:rfidNo', getTimestamp);
router.get('/ongoing', getOngoingSessionIds);
router.get('/:id', getSessionCurrentDetails);
router.get('/', getAllSessionCurrentIds);

module.exports = router;