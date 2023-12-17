const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
});

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = Broker;