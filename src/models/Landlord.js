const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
});

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;
