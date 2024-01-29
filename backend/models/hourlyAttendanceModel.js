const mongoose = require('mongoose');

const hourlyAttenSchema = new mongoose.Schema({ 
conferenceId: String,
  data: [{
    hour: {
      type: Number,
    },
    value: {
      type: Number,
    },
  }],
});

const HourlyAtten = mongoose.model('HourlyAtten', hourlyAttenSchema);

module.exports = HourlyAtten;
