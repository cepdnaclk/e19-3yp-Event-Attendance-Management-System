const express = require('express');
const {getSessionCurrentDetails, getAllSessionCurrentIds} = require('../controller/sessionCurrentController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// router.use(validateToken);

router.get('/:id', getSessionCurrentDetails);
router.get('/', getAllSessionCurrentIds);

module.exports = router;