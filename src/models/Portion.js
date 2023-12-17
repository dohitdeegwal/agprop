const mongoose = require('mongoose');

const portionSchema = new mongoose.Schema({
    area: { type: String, required: true },
    broker: { type: mongoose.Schema.Types.ObjectId, ref: 'Broker', required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
});

const Portion = mongoose.model('Portion', portionSchema);

module.exports = Portion;
