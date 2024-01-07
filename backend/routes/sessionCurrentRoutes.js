const express = require('express');
const {getSessionCurrentDetails} = require('../controller/sessionCurrentController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
router.use(validateToken);

router.get('/:id', getSessionCurrentDetails);

module.exports = router;