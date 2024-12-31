const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, // Corrected from 'require' to 'required'
    },

    maxcount: {
        type: Number,
        required: true, // Corrected from 'require' to 'required'
    },

    phonenumber: {
        type: Number,
        required: true, // Corrected from 'require' to 'required'
    },

    rentperday: {
        type: Number,
        required: true, // Corrected from 'require' to 'required'
    },

    type: {
        type: String,
        required: true, // Corrected from 'require' to 'required'
    },

    description: {
        type: String,
        required: true, // Corrected from 'require' to 'required'
    },

    imageurls: [{
        type: String, // Assuming image URLs are strings
    }],

    currentbookings: [{

    }],
}, {
    timestamps: true,
});

const roomModel = mongoose.model('rooms', roomSchema); // Model name should ideally be singular

module.exports = roomModel;
