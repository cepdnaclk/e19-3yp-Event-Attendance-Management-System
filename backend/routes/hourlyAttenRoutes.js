const express = require("express");
const { getHourlyAtten } = require("../controller/hourlyAttenController");

const router = express.Router();

router.get('/getArrayData/:conferenceId', getHourlyAtten);

module.exports = router;