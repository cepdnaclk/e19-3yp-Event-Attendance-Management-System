const express = require('express');
const {getCurrentAttendeeDetails} = require('../controller/currentAttendeeController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
router.use(validateToken);

router.get('/:id', getCurrentAttendeeDetails);

module.exports = router;