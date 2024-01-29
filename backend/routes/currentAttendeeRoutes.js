const express = require('express');
const {getTotalCurrentCapacity,
    getRfidNos,
    getAllConferenceIds,
    getTotalCurrentCapacityByConference,
    getSumofMaxCapForConference,
    // getSumofCurrentCap,
    getSumofMaxCap,
    getCapacityPercentage,
    maxCurrentCapacityConference,
    getTopSessions, getCurrentAttendeeDetails, getAllCurrentAttendeeIds} = require('../controller/currentAttendeeController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
// router.use(validateToken);

///////////////////// ANALITYCS ///////////////////////

// get sum of currentCapacity of all conferences
router.get('/totalCapacity', getTotalCurrentCapacity);

// get sum of currentCapacity for each conferenceId
router.get('/totalCapacityByConference', getTotalCurrentCapacityByConference);

// get sum of maxAttendeeCap for a conferenceId
router.get('/sumOfCapOfConf/:conferenceId', getSumofMaxCapForConference);

//doesnt work
// get percentage of capacity for each conferenceId
router.get('/capacityPercentage', getCapacityPercentage);

// Get the sum of currentCapacity with conferenceIds
// router.get('/conference-capacity-sums', getSumofCurrentCap);

// Get the sum of maxAttendeeCap for each conferenceId
router.get('/sums', getSumofMaxCap);

// get conferenceId with max currentCapacity
router.get('/conferenceIds', getAllConferenceIds);
router.get('/maxCapacityConference', maxCurrentCapacityConference);
router.get('/getData/:id', getCurrentAttendeeDetails);
router.get('/rfidNos/:conferenceId', getRfidNos);
router.get("/topSessions", getTopSessions);
router.get('/', getAllCurrentAttendeeIds);

module.exports = router;