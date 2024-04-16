// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    date: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    smokingAllowed: { type: Boolean, default: false },
    luggageSpace: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    creator: { type: String, required: true },  // Firebase User ID
    participants: [{ type: String }]  // Array of Firebase User IDs
});

module.exports = mongoose.model('Trip', tripSchema);
