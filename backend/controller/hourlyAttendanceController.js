const express = require('express');
const asyncHandler = require('express-async-handler');
const HourlyAtten = require('../models/hourlyAttendanceModel');

// get array data based on conferenceId
const getHourlyAtten = asyncHandler(async (req, res) => {
  try {
    const { conferenceId } = req.params; 
    console.log(conferenceId);

    const hourlyAttenData = await HourlyAtten.findOne({ conferenceId });
    console.log(hourlyAttenData);
    if (!hourlyAttenData) {
      return res.status(404).json({ error: 'HourlyAtten data not found for the given conferenceId' });
    }    
    const data = hourlyAttenData.data;
    console.log(data);
    res.json({ data });
  } catch (error) {
    console.error('Error fetching HourlyAtten data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { getHourlyAtten };
