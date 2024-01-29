const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // unique: true,
    },
    conNo: {
        type: String,
        required: true,
    },
    rfidNo: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Attendee', attendeeSchema);
