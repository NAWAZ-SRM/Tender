const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
    title: String,
    description: String,
    weight: Number,
    isHazardous: Boolean,
    origin: String,
    destination: String,
    createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 } // 24 hours
});

module.exports = mongoose.model('Cargo', cargoSchema);
