const express = require('express');
const {getOngoingSessionIds, getSessionCurrentDetails, getAllSessionCurrentIds} = require('../controller/sessionCurrentController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// router.use(validateToken);

router.get('/ongoing', getOngoingSessionIds);
router.get('/:id', getSessionCurrentDetails);
router.get('/', getAllSessionCurrentIds);

module.exports = router;