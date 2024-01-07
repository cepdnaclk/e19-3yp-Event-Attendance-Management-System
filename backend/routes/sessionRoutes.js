// Example route configuration in sessionRoutes.js
const express = require('express');
const { updateCurrentAttendees } = require('../controller/sessionController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
router.use(validateToken);

// Ensure that the route is correctly defined
router.post('/:id', updateCurrentAttendees);

module.exports = router;
