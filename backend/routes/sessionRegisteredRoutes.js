const express = require('express');
const {getSessionRegisteredDetails} = require('../controller/sessionRegisteredController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
router.use(validateToken);

router.get('/:id', getSessionRegisteredDetails);

module.exports = router;

// {
//   "_id": "780",

//   "startTime": "2021-07-01T09:00:00.000Z",
//   "endTime": "2021-07-01T10:00:00.000Z",
//   "rfidNo": ["123456789", "987654321"],
// }


// {
//   "sessionId": "65993c78a87fe5df449913c5",  
//   "regAttendees": {
//       "registeredCapacity": "3", 
//       "registeredRfidNo": ["001", "002", "003"]  
//   }
// }